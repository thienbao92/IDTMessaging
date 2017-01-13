import React, {Component} from 'react';
import MessageInput from './MessageInput';
import MessageContainer from './MessageContainer';

class ChatContainer extends Component {
  componentDidMount() {
    this.props.socket.on('connect', ()=> {
this.props.socket.on("welcome", data =>{
  console.log(data);

})
  })
}
  render() {
    return (
      <div className="ChatContainer">
        <MessageContainer socket={this.props.socket}/>
        <MessageInput />
    </div>
    );
  }
}

export default ChatContainer;
