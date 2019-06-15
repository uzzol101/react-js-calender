import React from 'react';
import logo from './logo.svg';
import './App.css';
import Switch from './switch'
import Calender from './Calender'
import Toggle from './Toggle'
function App() {
  
  return (
    <div className="App">
     <Calender />
    </div>
  );
}

export default App;

const parentToggle = (state) => {
  console.log('child state ', state)
}

const  On = (props) => props.on ? props.children : null
const  Off = (props)  => props.on ? null : props.children
const  Button = ({on, toggle}) => <Switch on={on} onClick={toggle} />