import React, {Component} from 'react';
import Member from './Member';
import cookie from 'react-cookie';
class MemberList extends Component {
  generateList() {
    return this.props.list.map(member => {
      if (member._id !== cookie.load("userId") && member.isOnline !== false) {
        return (
          <div key={member._id}>
            <Member name={member.name}/>
          </div>
        )
      }
    })
  }

  render() {

    return (
      <div className="Member">
        Member list {this.generateList()}

      </div>
    );
  }
}

export default MemberList;
