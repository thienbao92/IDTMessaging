import React, {Component} from 'react';
import Profile from './Profile';
import MemberList from './MemberList';

class NavContainer extends Component {
  render() {
    return (
      <div className="NavContainer">
      Navigation Container
      <Profile />
    <MemberList />
    </div>
    );
  }
}

export default NavContainer;
