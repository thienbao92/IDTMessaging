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

    this.checkUserId();
  }
  checkUserId() {
    //Check if user id in cookie exists

    let userId = cookie.load('userId');

    if (userId) {
      //get user info from DB
      axios.get(process.env.API_URL + '/user/single/' + userId).then(response => {
        this.setState({"user": response.data})
      }).catch(error => {
        this._createRandomUser()
      })
    } else {
      this._createRandomUser()
    }
  }

  _createRandomUser() {
    //Create new user with randome ID basked on UTC time. I like UTC.
    var randomName = "user-" + new Date().getTime();

    axios.post(process.env.API_URL + "/user", {
      "name": randomName,
      "isOnline": true,
      "socketId": this.props.socket.id
    }).then(response => {
      this.setState({"user": response.data})
      cookie.save('userId', response.data._id)
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

  submitChange(e, newName) {
    e.preventDefault();
    this.setState({
      "user": {
        "name": newName
      }
    })
    axios.post(process.env.API_URL + "/user/update", {
      "_id": cookie.load("userId"),
      "name": newName
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

        <Profile userProfile={this.state.user} submitChange={this.submitChange.bind(this)}/>
        <MemberList list={this.props.member}/>
      </div>
    );
  }
}

export default NavContainer;
