import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Styles from './Modal.module.css'

export default class Modal extends Component {

    state = {
        collapsed: this.props.collapsed
    }

    _onCollapsed = (open, event) => {
        if(open){
            this.setState({ collapsed: !this.state.collapsed }) 
        }else{
            if (event.target.className === Styles.modalComponent) { 
                this.setState({ collapsed: !this.state.collapsed }) 
            }
        }
        
    }

    collapsedModal = (title) => {
        return (
            <button 
            onClick={(event)=>{this._onCollapsed(true,event)}}
            className={this.props.className}
            style = {this.props.style}
            >
                {title}
            </button>
        )
    }

    displayModal = (info) => {
        return (
            <div className={Styles.modalComponent} onClick={(event)=>{this._onCollapsed(false,event)}}>
                <div dangerouslySetInnerHTML={{ __html: info }} className={Styles.modalComponentContent} onClick={(event)=>{this._onCollapsed(false,event)}}>
                </div>
            </div>
        )
    }

    render() {
        const {
            //buttons,
            info,
            //getValue,
            title,
        } = this.props
        const {
            collapsed
        } = this.state
        return (
            <React.Fragment>
                {this.collapsedModal(title)}
                {
                    
                    collapsed
                        ? null
                        : this.displayModal(info)
                }
            </React.Fragment>
        )

    }
}


function noAction() {

}

Modal.proTypes = {
    collapsed: PropTypes.bool,
    info: PropTypes.string,
    getValue: PropTypes.func,
    showTitle: PropTypes.bool,
    title: PropTypes.string,
    className: PropTypes.string
}

Modal.defaultProps = {
    className: Styles.modalButton,
    collapsed: true,
    info: "info",
    getValue: noAction,
    showTitle: false,
    title: ""
}