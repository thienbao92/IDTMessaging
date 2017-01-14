import React, {Component} from 'react';
import axios from 'axios';
class MessageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "messages": []
    };
  }

  componentDidMount() {}

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

        <div key={msg._id}>

          {msg.name}
          : {msg.content}
          - {index}

        </div>

      )
    })

  }

  render() {
    return (
      <div className="MessageContainer">
        {this.showMsg()}
        MessageContainer
      </div>
    );
  }
}

export default MessageContainer;
