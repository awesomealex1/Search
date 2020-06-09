import React from 'react';
import {MouseDownContext} from './context.js'

class Square extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            color: "white",
            mousedown: 0,
        };
        this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
        this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
    }

    handleOnMouseEnter() {
        if (this.context.mousedown === 1) {
            this.setState({
                color: this.context.color,
            });
        }
    }

    handleOnMouseDown() {
        this.setState({
            color: this.context.color,
        });
    }

    render() {
        return(
            <div onMouseDown={this.handleOnMouseDown} onMouseEnter={this.handleOnMouseEnter} style={{backgroundColor: this.state.color}} className={this.props.higher === true ? this.props.wider === true ? "higherAndWiderSquare": "higherSquare" : this.props.wider === true ? "widerSquare" : "normalSquare"}></div>
        );
    }
}

Square.contextType = MouseDownContext;

export default Square