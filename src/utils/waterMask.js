/*
 * @Author: zhangjicheng
 * @Date: 2020-03-23 17:29:18
 * @LastEditTime: 2020-03-26 11:48:36
 * @LastEditors: Please set LastEditors
 * @Description: 图片添加水印
 * @FilePath: \chongqing-taxenterpriseinteraction\src\utils\waterMask.js
 */

// params @file 图片文件 @text 水印文字
const imgMark = (file, text = '') => {
  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);
    u8arr.forEach((_v, idx) => {
      u8arr[idx] = bstr.charCodeAt(idx);
    });
    return new File([u8arr], filename, { type: mime });
  };
  return new Promise((resolve, reject) => {
    const type = file.name.replace(/.*\.(.*)$/, '$1') || '';
    const imgTypes = ['png', 'jpg', 'jpeg'];
    if (!imgTypes.includes(type)) {
      reject(new Error('只接受png, jpg, jpeg图片格式！'));
    }
    const fileReader = new FileReader();
    const markText = text || '版权所有';
    fileReader.readAsDataURL(file);
    const img = new Image();
    fileReader.onload = () => {
      img.src = fileReader.result;
      img.onload = () => {
        // 创建canvas进行绘图
        const canvas = document.createElement('canvas');
        const { width, height } = img;
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        // 设置以中心旋转
        ctx.translate(width/2, height/2);
        ctx.rotate((-15 * Math.PI) / 180);
        // ctx.translate(-width/2, -height/2);
        const fontSize = 20;
        ctx.fillStyle = 'rgba(0, 0, 0, .23)';
        ctx.font = `${fontSize}px Georgia`;
        // 计算属性，循环添加水印
        const textWidth = markText.length * fontSize;
        const textHeight = fontSize;
        const R = parseInt(Math.sqrt(width ** 2 + height ** 2), 10);
        const marginH = R / 6 - textHeight;
        const marginW = textWidth + R / 8;
        const row = Math.ceil(2 * R / (textWidth + marginW));
        const col = Math.ceil(2 * R / (textHeight + marginH));
        for (let i = 0; i <= row; i += 1) {
          for (let j = 0; j <= col; j += 1) {
            ctx.fillText(
              markText,
              (textWidth + marginW) * i - R - (j % 2 ? (textWidth + marginW) / 2 : 0),
              (textHeight + marginH) * j - R,
            );
          }
        }
        // ctx.fillText('888888888', 0, 0)
        // // 设置水印的宽高
        // const markImgH = canvas.height / 5;
        // const markImgW = markImgH * 3;
        // // 首先绘制需要上传至服务器的图
        // ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        // // 将水印绘制上去，位置在右下角
        // ctx.drawImage(markImg, canvas.width - markImgW, canvas.height - markImgH, markImgW, markImgH)
        // 转为base64格式
        const imgData = canvas.toDataURL(file.type);
        const newFile = dataURLtoFile(imgData, file.name);
        // 转为file对象传递出去
        // callback(dataURLtoFile(imgData, file.name))
        resolve({
          file: newFile,
          imgData,
        });
      };
    };
  });
};

export default imgMark;
