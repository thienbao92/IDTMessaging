import React, {Component} from 'react';

class Member extends Component {

  onOnline() {
    //set style to member if their status is online or not
    if (this.props.online) {
      return "online"
    } else {
      return "offline"
    }
  }

  render() {
    return (
      <div className="Member">

        <div className={this.onOnline()}>{this.props.name}
        </div>

      </div>
    );
  }
}

export default Member;
