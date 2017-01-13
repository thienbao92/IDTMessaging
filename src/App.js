import React, { Component } from 'react';
import './index.scss';
import NavContainer from './components/Nav/NavContainer';
import ChatContainer from './components/Chat/ChatContainer';
import io from 'socket.io-client';
import cookie from 'react-cookie';
import axios from 'axios';

let socket = io("http://localhost:3000");

class App extends Component {
  constructor(){
    super();
    this.state = {
      "user" :{}
    }
  }


componentDidMount(){
// cookie.remove('userId')



this._checkUserId();


// cookie.save('userId', "testUserID")
}

_checkUserId(){
let userId = cookie.load('userId');

if (userId) {
  axios.get('http://localhost:3000/user/single',{
    params : {
      userId : userId
    }
  })
  .then(response =>{
    if (true) {

    }
    console.log(response.data);
  })
  .catch(error => {
    console.log(error.response);
  })
} else {
  console.log("no User");
}
}

_createRandomUser(){

  var randomName = "user-"+ new Date().getTime();
  console.log(randomName);
}

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
