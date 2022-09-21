import { Component } from "react";

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
        profile: {},
    }
  }
}

componentDidMount() {
  const { id } = this.props.match.params

  fetch(`http://localhost:8000/freelance?id=${id}`)
  .then((response) => response.json())
  .then((jsonResponse) => {
      this.setState({ profileData: jsonResponse?.freelanceData})
  })
}

export default Profile
