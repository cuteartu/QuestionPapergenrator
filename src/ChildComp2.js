import React from "react";
import axios from "axios";

class ChildComp2 extends React.Component {
  constructor(props) {
    super(props);
   
  }

  componentDidMount() {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        
        console.log(response.data);
        this.props.storeData(response.data);
      })
      .catch((error) => {
      
        console.error("error", error);
      });
  }
  
  componentWillUnmount()  {
    this.props.storeData([]);
  }
  




  
  

    
  
    

 
    



  render() {
    return (
      <div>
        <h2>Child Component 2</h2>
      </div>
    );
  }
}

export default ChildComp2;
