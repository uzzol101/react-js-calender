import React, { Component } from 'react'
import './switch.css'
const noop = () => {}
export default class Switch extends Component {
  render() {
      const {
          on,
          className = '',
          'aria-label': ariaLabel,
          onClick,
          ...props
      }  = this.props
      const btnClassName = [
          className,
          'toggle-btn',
          on  ?  'toggle-btn-on' : 'toggle-btn-off',
      ].filter(Boolean).join(' ')
    return (
        <>
        <label
            aria-label={ariaLabel || 'Toggle'}
            style={{display:  'block'}}
        >
            <input 
                className="toggle-input"
                type="checkbox"
                checked={on}
                onChange={noop}
                onClick={onClick}
                data-testid="toggle-input"
            />
            <span className={btnClassName} {...props}></span>
        </label>
        </>
    )
  }
}

export {Switch}