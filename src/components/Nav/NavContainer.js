import React, {Component} from 'react';
import Profile from './Profile/Profile';
import MemberList from './MemberList';
import axios from 'axios';
import cookie from 'react-cookie';

class NavContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "user": {
        "name": ""
      },
      "member": []
    }
  }

  componentDidMount() {
    //socket : change name, user online, user offline
    console.log("navigation mounted");
    this.checkUserId();
  }
  checkUserId() {
    let userId = cookie.load('userId');
    console.log("get user ID", userId);
    if (userId) {
      axios.get('http://localhost:3000/user/single/' + userId).then(response => {
        this.setState({"user": response.data})
      }).catch(error => {
        this._createRandomUser()
      })
    } else {
      this._createRandomUser()
    }
  }

  _createRandomUser() {
    console.log("create ramdom user");
    var randomName = "user-" + new Date().getTime();

    axios.post("http://localhost:3000/user", {
      "name": randomName,
      "isOnline": true,
      "socketId": this.props.socket.id
    }).then(response => {
      this.setState({"user": response.data})
      cookie.save('userId', response.data._id)
      console.log("check cookie");
    }).catch(error => {
      console.log(error.response);
    })
  }

  handleChange(e) {
    this.setState({
      "user": {
        "name": e.target.value
      }
    })
  }

  submitChange(e) {
    e.preventDefault();
    axios.post("http://localhost:3000/user/update", {
      "_id": cookie.load("userId"),
      "name": this.state.user.name
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
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
        <MemberList list={this.props.member}/>
      </div>
    );
  }
}

export default NavContainer;
