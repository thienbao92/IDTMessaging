import React, { Component } from 'react';
import './index.scss';
import NavContainer from './components/Nav/NavContainer';
import ChatContainer from './components/Chat/ChatContainer';
import io from 'socket.io-client';
import cookie from 'react-cookie';
import axios from 'axios';

let socket = io("http://localhost:3000");

class App extends Component {

  render() {
    return (
      <div className="App">
        <NavContainer socket={socket} />
      <ChatContainer socket={socket}/>
      </div>
    );
  }
};
export default App;
