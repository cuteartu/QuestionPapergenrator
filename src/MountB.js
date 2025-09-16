import React from "react";

class MountB extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "React",
      count: 0,
    };
    console.log("constructor called");
  }

  static getDerivedStateFromProps() {
    console.log("getDerivedStateFromProps called");
  }

  componentDidMount() {
    console.log("componentDidMount called");
  }
  render() {
    console.log("render called");
    return <div>B component called</div>;
  }
}
export default MountB;