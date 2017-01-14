import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
class MessageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "messages": []
    };
  }

  componentDidUpdate() {
    //MessageContainer scrolls to bottom when entering chat
    const objDiv = document.getElementById('msgContainer');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  selfStyle(senderId) {
    //set style for bubble chat if user match userId
    if (senderId === cookie.load("userId")) {
      return "selfMsg"
    } else {
      return "otherMsg"
    }
  }

  showMsg() {
    //render and shows message

    //generate memberArray to member object
    let memberObj = {};

    for (var i = 0; i < this.props.member.length; i++) {
      memberObj[this.props.member[i]['_id']] = this.props.member[i].name;
    }

    //set name of message sender - This can be done by server.
    let testArray = this.props.messages.map(msg => {
      msg.name = memberObj[msg.sender];
      return msg;
    })

    let msgArray = testArray.filter(msg => {
      if (msg.name !== undefined) {
        return msg;
      }
    })

    //render message
    return msgArray.map((msg, index) => {
      return (

        <div className="msgCover" key={msg._id}>

          <div className={this.selfStyle(msg.sender)}>
            <div className="sender">

              {msg.name}
            </div>
            {msg.content}

          </div>

        </div>

      )
    })

  }

  render() {
    return (
      <div id="msgContainer" className="MessageContainer">
        {this.showMsg()}
      </div>
    );
  }
}

export default MessageContainer;
