import React, {Component} from 'react';
import './index.scss';
import NavContainer from './components/Nav/NavContainer';
import ChatContainer from './components/Chat/ChatContainer';
import io from 'socket.io-client';
import cookie from 'react-cookie';
import axios from 'axios';

let socket = io(process.env.API_URL);

class App extends Component {
  constructor() {
    super();
    this.state = {
      member: []
    }

  }

  componentDidMount() {
    console.log("api url", process.env.API_URL);
    //NOTE:New member comes ->update state member
    this.getMembetList()
    socket.on('connect', function() {

      socket.emit("userConnect", {
        "socketId": socket.id,
        "userId": cookie.load("userId")
      })
    })
    socket.on("updateList", () => {
      this.getMembetList();
      console.log("update memeber");
    })
  }

  getMembetList() {
    axios.get(process.env.API_URL + "/user").then(response => {
      this.setState({"member": response.data})
    }).catch(error => {
      console.log(error.response);
    })
  }

  render() {
    return (
      <div className="App">
        <NavContainer socket={socket} member={this.state.member}/>
        <ChatContainer socket={socket} member={this.state.member}/>
      </div>
    );
  }
};
export default App;
