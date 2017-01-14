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
    const objDiv = document.getElementById('msgContainer');
    objDiv.scrollTop = objDiv.scrollHeight;

  }
  componentDidMount() {}

  selfStyle(senderId) {
    if (senderId === cookie.load("userId")) {
      return "selfMsg"
    } else {
      return "otherMsg"
    }
  }

  showMsg() {

    //
    // console.log(this.props.messages);
    // console.log(this.props.member);

    let memberObj = {};

    for (var i = 0; i < this.props.member.length; i++) {
      memberObj[this.props.member[i]['_id']] = this.props.member[i].name;
    }

    let testArray = this.props.messages.map(msg => {
      msg.name = memberObj[msg.sender];
      return msg;
    })

    let msgArray = testArray.filter(msg => {
      if (msg.name !== undefined) {
        return msg;
      }
    })

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
