import React, {Component} from 'react';
import Member from './Member';
import cookie from 'react-cookie';
class MemberList extends Component {
  generateList() {

    //sort array according to 'isOnline' key. True first
    let sortedArr = this.props.list.sort((a, b) => {
      return b.isOnline - a.isOnline;
    })

    //generate member list
    return sortedArr.map(member => {
      if (member._id !== cookie.load("userId")) {
        return (
          <div key={member._id}>
            <Member name={member.name} online={member.isOnline}/>

          </div>
        )
      }
    })
  }

  render() {

    return (
      <div className="MemberList">
        <h4>Your homies</h4>

        {this.generateList()}

      </div>
    );
  }
}

export default MemberList;
