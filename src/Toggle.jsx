import React, { Component } from "react";
import Switch from "./switch";

 
const ToggleContext = React.createContext({
  on: false,
  toggle: () => {}
}) 
export default class Toggle extends Component {
 static On = ({children}) => (
 <ToggleContext.Consumer>
   {contextValue => (contextValue.on ? children : null)}
 </ToggleContext.Consumer>)
 static Off = ({children})  => (
   <ToggleContext.Consumer>
     {contextValue  => (contextValue.on ? null : children)}
   </ToggleContext.Consumer>
 )
 static Button = (props) => (
   <ToggleContext.Consumer>
     {contextValue => (<Switch on={contextValue.on} onClick={contextValue.toggle} {...props} />)}
   </ToggleContext.Consumer>
 )
  state = { on: false };
  toggle = () => {
    this.setState(
        ({ on }) => ({ on: !on }),
        () => {
          this.props.onToggle(this.state);
        }
      );
  }
 
 
  render() {
   
    return (
      <ToggleContext.Provider value={{on: this.state.on, toggle: this.toggle}}>
        {this.props.children}
      </ToggleContext.Provider>
    )
  }
}
