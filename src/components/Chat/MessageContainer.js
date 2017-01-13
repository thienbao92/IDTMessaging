import React, {
  Component
} from 'react';
import axios from 'axios';
class MessageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "messages": []
    };
  }


  componentDidMount() {
    this.props.socket.on("newMsg",(newMsgObj)=>{
      console.log("new message came");
      this.state.messages.push(newMsgObj)
      // console.log(newMsgObj);
      this.setState(this.state);
    })
    this.getMsg()
  }

  log() {
    console.log(this.state);
  }

  getMsg() {
    axios.get("http://localhost:3000/message").then((response) => {
      this.setState({
        "messages": response.data
      })
    }).catch((error) => {
      console.log(error);
    })
  }

showMsg(){
  return this.state.messages.map(msg =>{
    return(

<div key={msg._id}>

{msg.sender} : {msg.content}

</div>



    )
  })
}



  render() {
    return (
      <div className = "MessageContainer">
      {this.showMsg()}
        MessageContainer
      </div>
    );
  }
}

export default MessageContainer;
