import React, {Component} from 'react';
import EditProfile from './EditProfile';
class Profile extends Component {

  state = {
    "edit": true
  };

  handleCancel() {

    this.setState({"edit": false})
  }

  submitChange(e, newName) {
    this.props.submitChange(e, newName);
    this.handleCancel();
  }

  canEdit() {
    if (this.state.edit) {
      return (
        <div>
          <EditProfile userProfile={this.props.userProfile} handleCancel={this.handleCancel.bind(this)} submitChange={this.submitChange.bind(this)}/>
        </div>
      )
    } else {
      return (
        <div>
          <h3>
            Hi,
            <br/> {this.props.userProfile.name}</h3>
          <a className="btn-normal" href="" onClick={this.openEdit.bind(this)}>Edit</a>
        </div>
      )
    }
  }

  openEdit(e) {
    e.preventDefault();
    this.setState({"edit": true})
  }

  render() {
    return (
      <div className="Profile">
        {this.canEdit()}
      </div>
    );
  }
}

export default Profile;
