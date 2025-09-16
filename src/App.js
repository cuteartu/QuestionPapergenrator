import React, { Component } from "react";

// import Info from "./Info";
// import Skill from "./Skill";
// import Acadamic from "./Acadamic";
// import Quiz from "./Quiz";
// import Quize2 from "./Quize2";
import Api from "./Api ";
// import MountA from "./MountA";
// import ChildComp2 from "./ChildComp2";
// import A1 from "./A1";
// import B1 from "./B1";
// import QuizApp from "./QuizApp";
import Expense from "./Expense";
import Questionpaper from "./Questionpaper";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: false,
      skill: false,
      acadamic: false,
      ChildComp2: false,
      data: [],
    color: "red",
      
    };
  }
  render(){
    return(
      
      <div>
        {/* <QuizApp/> */}

        {/* <button
          onClick={() => {
            this.setState({ info: !this.state.info });
          }}
        >
          Info
        </button>
        <button
          onClick={() => {
            this.setState({ skill: !this.state.skill });
          }}
        >
          Skill
        </button>
        <button onClick={() => {
          this.setState({ acadamic: !this.state.acadamic });
        }}>
          Acadamic
        </button>
        {this.state.info && <div>Info Component</div>}
        {this.state.skill && <div>Skill Component</div>}
        {this.state.acadamic && <div>Acadamic Component</div>}



        
        // <Api/> */}
        {/* // <Expense/> */}
        <Questionpaper/>
      </div>
    )
  }
}


 



    
    // );
 



export default App;
