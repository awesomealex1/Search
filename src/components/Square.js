import React from 'react';
import {MouseDownContext} from './context.js'
import {colors} from './../colors.js'

class Square extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            color: "white",
            mousedown: 0,
            squareStatus: 0, //0 = empty, 1 = filled, 2 = start, 3 = end, 4 = visited
            visited: 0, 
        };
        this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
        this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
    }

    handleOnMouseEnter() {
        if (this.context.mousedown === 1) {
            this.colorSquare();
        }
    }

    handleOnMouseDown() {
        this.colorSquare();
    }

    colorSquare(color=this.context.color,squareStatus=1) {
        this.setState({
            color: color,
            colorStatus: squareStatus,
        });
    }

    setAsVisited() {
        this.setState({
            visited: 1,
        });
    }

    highlight() {
        this.normalColor = this.state.color;
        this.setState({
            color: colors.highlighted,
        });
    }

    unhighlight() {
        this.setState({
            color: this.normalColor,
        });
    }

    render() {
        this.props.setSquareInGrid(this.props.x, this.props.y, this);
        return(
            <div onMouseDown={this.handleOnMouseDown} onMouseEnter={this.handleOnMouseEnter} style={{backgroundColor: this.state.color}} className={this.props.higher === true ? this.props.wider === true ? "higherAndWiderSquare": "higherSquare" : this.props.wider === true ? "widerSquare" : "normalSquare"}></div>
        );
    }
}

Square.contextType = MouseDownContext;

export default Square