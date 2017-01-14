import React, {Component} from 'react';

class EditProfile extends Component {

  constructor() {
    super();
    this.state = {
      "value": ""
    }

  }
  componentDidMount() {
    this.focusInput()
  }
  inputChange(e) {
    console.log(e.target.value);
    this.setState({"value": e.target.value})
    this.props.handleChange(e);
  }

  focusInput() {
    let input = document.getElementById("editName");
    input.focus()
  }

  render() {
    return (
      <div className="">
        New profile name:

        <form onSubmit={this.props.submitChange}>
          <input id="editName" type="text" value={this.state.value} name="name" onChange={this.inputChange.bind(this)}/>
          <input type="submit" value="Submit"/>
          <input type="button" value="Cancel" onClick={this.props.handleCancel}/>

        </form>

      </div>
    );
  }
}

export default EditProfile;
