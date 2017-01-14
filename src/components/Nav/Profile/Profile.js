import React, {Component} from 'react';
import EditProfile from './EditProfile';
class Profile extends Component {

  state = {
    "edit": false
  };

  handleCancel() {
    this.setState({"edit": false})
  }

  submitChange(e) {
    this.props.submitChange(e);
    this.handleCancel();
  }

  canEdit() {
    if (this.state.edit) {
      return (
        <div>
          <EditProfile handleChange={this.props.handleChange} userProfile={this.props.userProfile} handleCancel={this.handleCancel.bind(this)} submitChange={this.submitChange.bind(this)}/>
        </div>
      )
    } else {
      return (
        <div>
          Profile - {this.props.userProfile.name}
          <button onClick={this.openEdit.bind(this)}>Edit</button>
        </div>
      )
    }
  }

  openEdit() {
    this.setState({"edit": true})
  }

  render() {
    return (
      <div className="NavContainer">
        {this.canEdit()}
      </div>
    );
  }
}

export default Profile;
