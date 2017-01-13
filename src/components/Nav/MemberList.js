import React, {Component} from 'react';
import Member from './Member';

class MemberList extends Component {
  render() {
    return (
      <div className="Member">
        Member list
        <Member />

    </div>
    );
  }
}

export default MemberList;
