import React, {Component} from 'react';
import Profile from './Profile/Profile';
import MemberList from './MemberList';
import axios from 'axios';
import cookie from 'react-cookie';

class NavContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      "user" :{
        "name":""
      }
    }
  }

  componentDidMount(){
    //socket : change name, user online, user offline
  this._checkUserId();
  // cookie.save('userId', "testUserID")
  }
  _checkUserId(){
  let userId = cookie.load('userId');
  if (userId) {
    axios.get('http://localhost:3000/user/single/'+userId)
    .then(response =>{
      this.setState({
        "user":response.data
      })
    })
    .catch(error => {
  this._createRandomUser()
    })
  } else {
    this._createRandomUser()
  }
  }

  _createRandomUser(){

    var randomName = "user-"+ new Date().getTime();

  axios.put("http://localhost:3000/user", {
    "name" : randomName,
    "isOnline" : true
  }).then(response => {
    this.setState({
      "user":response.data
    })
     cookie.save('userId', response.data._id)

  })
  }

handleChange(e){
this.setState({"user":{
  "name" : e.target.value
}})
}

submitChange(e){
  e.preventDefault();

  console.log("submitChange", this.state.user.name);

axios.post("http://localhost:3000/user/update", {
  "_id": cookie.load("userId"),
  "name": this.state.user.name
},
 { headers: { 'Content-Type': 'application/json' } }
).then(response =>{
  console.log(response.data);
}).catch(error => {
  console.log(error.response);
})



}

  render() {
    return (
      <div className="NavContainer">
      Navigation Container
      <Profile userProfile={this.state.user} handleChange={this.handleChange.bind(this)} submitChange={this.submitChange.bind(this)}/>
    <MemberList />
    </div>
    );
  }
}

export default NavContainer;
