import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookie';

// day len + tao socket event
class MessageInput extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.contentInput.focus();
  }
  sendMsg(e) {
    e.preventDefault();
    // cookie.load("userId");
    console.log(cookie.load("userId"));

    let msgObj = {
      "sender": cookie.load("userId"),
      "content": this.contentInput.value,
      "time": new Date().getTime(),
      "chatRoom": "main"
    };

    console.log(msgObj);

    axios.post('http://localhost:3000/message', msgObj).then(function(response) {
      console.log(response);
    }).catch(function(error) {
      console.log(error);
    });
    this.contentInput.value = "";
  }

  render() {
    return (

      <div className="MessageInput">
        <form onSubmit={this.sendMsg.bind(this)}>

          <input className="msgInput" type="text" ref={node => {
            this.contentInput = node
          }} name="content" placeholder="Type a message..."/>

        </form>
        <a href="#" onClick={this.sendMsg.bind(this)} className="btn-normal">Send</a>
      </div>
    );
  }
}

export default MessageInput;
