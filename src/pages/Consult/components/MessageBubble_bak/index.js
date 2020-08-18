import React, { Component } from 'react';
import styles from './index.less';
import TextBubble from '../TextBubble';
import ImageBubble from '../ImageBubble';
import PoupBubble from '../PoupBubble';
import FileBubble from '../FileBubble';


class MessageBubble extends Component {
  constructor(props) {
    super(props)
    this.state = { }
  }

  render() { 
    return ( 
      <div>
        <TextBubble/>  
        <TextBubble/>
        <ImageBubble />
        <PoupBubble />
        <FileBubble />
      </div>
     );
  }
}
 
export default MessageBubble;