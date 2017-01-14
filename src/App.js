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
    this.getMembetList()
    //connect to socket
    socket.on('connect', function() {
      //emit socket event with ID
      socket.emit("userConnect", {
        "socketId": socket.id,
        "userId": cookie.load("userId")
      })
    })
    socket.on("updateList", () => {
      //I call this one cheat way. I should get data from socket and push to array. Run out of time. Cry inside
      this.getMembetList();
    })
  }

  getMembetList() {
    //get list of member from Database
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
