import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Styles from './Modal.module.css'

export default class Modal extends Component {

    state = {
        collapsed: this.props.collapsed
    }

    _onCollapsed = (event) => {
        if (event.target.className !== Styles.modalComponentContent) { 
            this.setState({ collapsed: !this.state.collapsed }) 
        }
    }

    collapsedModal = (title) => {
        return (
            <button 
            onClick={this._onCollapsed}
            style={{
                backgroundColor: "white", 
                color: "black", 
                border: "2px solid #CC9900"
            }}
            >
                {title}
            </button>
        )
    }

    

    noAction = () => {

    }
    displayModal = (info) => {
        return (
            <div className={Styles.modalComponent} onClick={this._onCollapsed}>
                <div dangerouslySetInnerHTML={{ __html: info }} className={Styles.modalComponentContent} onClick={noAction}>
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
                {
                    collapsed
                        ? this.collapsedModal(title)
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
}

Modal.defaultProps = {
    collapsed: true,
    info: "info",
    getValue: noAction,
    showTitle: false,
    title: ""
}