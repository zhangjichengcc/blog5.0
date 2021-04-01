
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 5000 });

const user = [];
let online = 0;

// 获取url参数对象
const getUrlQuery = (url) => {
  const query = {};
  url.match(/[?|&]([^&]*)/g).forEach(item => {
    const key = item.replace(/^[?|&]([^&]*)=.*/, '$1');
    const value = item.replace(/.*=([^&]*)$/, '$1');
    query[key] = value;
  })
  return query || {};
}

// 获取url参数
const getUrlParam = (name, url) => {
  const reg = new RegExp(`^.*[\\?|&]${name}=([^&]*)?&?.*`);
  return url.replace(reg, '$1');
}

// 广播方法
const broadcast = (that, msg) => {
  const { clients = [] } = wss;
  const { id } = that;
  clients.forEach(client => {
    const { readyState } = client;
    if (readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({
        type: 'message',
        source: id,
        text: msg,
      }));
    }
  })
}

// 单播方法
const unicast = (tId, that, msg) => {
  const target = user.filter(item => item.id === tId)[0] || {};
  const { ws, id } = that;
  const { id: targetId, ws: targetWs } = target;
  if (targetId && targetWs.readyState === WebSocket.OPEN) {
    targetWs.send(JSON.stringify({
      type: 'message',
      source: id,
      text: msg,
    }));
  } else {
    ws.send(JSON.stringify({
      type: 'toast',
      text: '对方未在线！',
    }));
  }
}

// 建立连接
wss.on('connection', function connection(ws, req) {
  const { url } = req;
  const query = getUrlQuery(url);
  const { id, name } = query;
  const that = { id, name, ws };
  user.push(that);
  online = wss._server._connections;
  ws.send(JSON.stringify({
    type: 'toast',
    text: '连接建立',
  }));
  broadcast(`${name || id}已上线，当前在线人数: ${online}`);
  ws.on('message', incoming = (message) => {
    const { target, text } = JSON.parse(message);
    if (target) {
      unicast(target, that, text);
    } else {
      broadcast(text);
    }
  });
  ws.on('close', () => {
    online = wss._server._connections;
    broadcast(`${name || id}已下线，当前在线人数：${online}`);
  })
});
