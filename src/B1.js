import React, { Component, PureComponent } from 'react'

export class B1 extends PureComponent {
  render() {
    console.log("B1 called")
    return (
      <div>
        {this.props.color}
      </div>
    )
  }
}

export default B1
