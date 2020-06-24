import React from 'react';
import {MouseDownContext} from './context.js'
import {colors} from './../colors.js'

class Square extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            color: "white",
            mousedown: 0,
            squareType: 0,
            visited: 0,
        };
        this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
        this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
    }

    componentWillUnmount() {
        this.props.removeSquareFromGrid(this.props.x, this.props.y, this);
    }

    handleOnMouseEnter() {
        if (this.context.mousedown === 1) {
            this.colorSquare();
        }
    }

    handleOnMouseDown() {
        this.colorSquare();
    }

    colorSquare(color=this.context.color) {
        this.setState({
            color: color,
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
        this.props.addSquareToGrid(this.props.x, this.props.y, this);
        var width = this.props.width;
        var height = this.props.height;

        return(
            <div onMouseDown={this.handleOnMouseDown} onMouseEnter={this.handleOnMouseEnter} style={{
                backgroundColor: this.state.color,
                height: height,
                width: width,
            }}
            className="normalSquare"></div>
        );
    }
}

Square.contextType = MouseDownContext;

export default Square