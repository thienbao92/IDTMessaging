import React, {Component} from 'react';

class Member extends Component {
  render() {
    return (
      <div className="Member">
        Member : {this.props.name}
      </div>
    );
  }
}

export default Member;
