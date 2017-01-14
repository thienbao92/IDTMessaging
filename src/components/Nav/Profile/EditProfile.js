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

  submitChange(e) {
    e.preventDefault();
    this.props.submitChange(e, this.contentInput.value)
  }

  render() {
    return (
      <div className="EditProfile">
        <h4>Choose your nickname</h4>

        <form onSubmit={this.submitChange.bind(this)}>
          <input id="editName" type="text" name="content" ref={node => {
            this.contentInput = node
          }}/>
          <br/>
          <a href="#" onClick={this.submitChange.bind(this)} className="btn-normal">Change</a>
          <a href="#" type="button" className="btn-dangerous" value="Cancel" onClick={this.props.handleCancel}>Cancel</a>

        </form>

      </div>
    );
  }
}

export default EditProfile;
