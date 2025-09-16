import React from "react";
import MountB from "./MountB";

class lifecycle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
      color: 'Blue',
    };
    console.log("constructor called");
  }

  static getDerivedStateFromProps(preProps, preState) {
    console.log("getDerivedStateFromProps called");
   // return preProps
    
  }
  shouldComponentUpdate(){
    console.log("shouldComponentUpdate called");
    return true;
  }
  

  componentDidMount() {
    console.log("componentDidMount called");
  }
  getSnapshotBeforeUpdate(preProps, preState) {
    console.log("getSnapshotBeforeUpdate called",preProps,preState);
  }
  componentDidUpdate() {
    console.log("componentDidUpdate called");
  }
  render(){
    console.log("render called");
    return(
        <div>
            A component A called
            <MountB/>
            {this.state.color}
            <button onClick={() => this.setState({ color: "black" })}>
              Change Color
            </button>
        </div>
    )
  }
}
export default lifecycle;