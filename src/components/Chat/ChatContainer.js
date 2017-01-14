import React, {Component} from 'react';
import MessageInput from './MessageInput';
import MessageContainer from './MessageContainer';
import axios from 'axios';

class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "messages": []
    };
  }

  componentDidMount() {}

  componentDidMount() {
    this.props.socket.on("newMsg", (newMsgObj) => {
      console.log("new message came");
      this.state.messages.push(newMsgObj)
      // console.log(newMsgObj);
      this.setState(this.state);
    })
    this.getMsg()
  }

  getMsg() {
    axios.get("http://localhost:3000/message").then((response) => {
      this.setState({"messages": response.data})
    }).catch((error) => {
      console.log(error);
    })
  }

  render() {
    return (
      <div className="ChatContainer">
        <MessageContainer member={this.props.member} socket={this.props.socket} messages={this.state.messages}/>
        <MessageInput/>
      </div>
    );
  }
}

export default ChatContainer;
