import React, { Component } from "react";

class ChildComp extends Component{
    constructor(props) {
        super(props);
        this.state={
            X:' '
        }

        }

        
        
    

    render() {
        return (
            <div>
                 <button onClick={() => {this.setState({X:this.state.X+1})
                    console.log(this.state.X)
                 }}>+</button>
                 <button onClick={() => {this.setState({X:this.state.X-1})
                 }}>-</button>
                    <h1>{this.state.X}</h1>
                    
                    <input type="text" onChange={(e)=>this.setState({x:e.target.value})}></input>
                    <input type="text" onChange={(e)=>this.setState({x:e.target.value})}></input>
                    <button onClick={(e) =>{console.log(this.state.x)}}>submiit</button>
                    {this.state.x}
                    
                    
                    
               
               
            </div>

        );
    }

}
export default ChildComp;