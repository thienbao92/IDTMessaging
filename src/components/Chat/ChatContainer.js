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
    //listen to when new message created

    this.props.socket.on("newMsg", (newMsgObj) => {
      //push to messages array in state and re-render
      this.state.messages.push(newMsgObj)
      this.setState(this.state);
    })
    this.getMsg()
  }

  getMsg() {

    //Initial, get messages from API
    axios.get(process.env.API_URL + "/message").then((response) => {
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
