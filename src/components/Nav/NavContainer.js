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
      },
      "member" : []
    }
  }

  componentDidMount(){
    //socket : change name, user online, user offline
  this.checkUserId();
  this.getMembetList();
  // cookie.save('userId', "testUserID")
  }
  checkUserId(){
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

getMembetList(){
  axios.get("http://localhost:3000/user/update")
  .then(response =>{
this.setState({
  "member":response.data
})  }).catch(error => {
    console.log(error.response);
  })
}



  render() {
    return (
      <div className="NavContainer">
      Navigation Container
      <Profile userProfile={this.state.user} handleChange={this.handleChange.bind(this)} submitChange={this.submitChange.bind(this)}/>
    <MemberList list={this.state.member}/>
    </div>
    );
  }
}

export default NavContainer;
