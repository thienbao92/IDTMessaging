import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookie';

// day len + tao socket event
class MessageInput extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //focus on msg input on first load
    this.contentInput.focus();
  }
  sendMsg(e) {
    e.preventDefault();

    //Check if contentInput is valid
    if (!this.contentInput.value) {
      return;
    }
    //Create msgObj
    let msgObj = {
      "sender": cookie.load("userId"),
      "content": this.contentInput.value,
      "time": new Date().getTime(),
      "chatRoom": "main"
    };

    //send msgObj to API
    axios.post(process.env.API_URL + '/message', msgObj).then(function(response) {
      console.log(response);
    }).catch(function(error) {
      console.log(error);
    });
    //Reset contentInput value
    this.contentInput.value = "";
  }

  render() {
    return (

      <div className="MessageInput">
        <form onSubmit={this.sendMsg.bind(this)} autoComplete="off">

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
