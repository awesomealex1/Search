import React from 'react';
import {MouseDownContext} from './context.js'
import {colors} from './../colors.js'

class Square extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            color: colors.empty,
            mousedown: 0,
            squareType: 0,  //0 = Empty, 1 = Wall, 2 = Start, 3 = End
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

    resetColor() {
        var normalColor;
        if (this.state.squareType === 0) {
            normalColor = colors.empty;
        } else if (this.state.squareType === 1) {
            normalColor = colors.wall;
        } else if (this.state.squareType === 2) {
            normalColor = colors.start;
        } else if (this.state.squareType === 3) {
            normalColor = colors.end;
        }
        this.setState({
            color: normalColor,
        });
        this.unhighlightedColor = normalColor;
    }

    colorSquare(color=this.context.color,squareType=0) {
        this.setState({
            color: color,
            squareType: squareType,
        });
    }

    setAsVisited() {
        this.setState({
            visited: 1,
        });
    }

    setAsUnvisited() {
        this.setState({
            visited: 0,
        });
    }

    highlight() {
        this.unhighlightedColor = this.state.color;
        this.setState({
            color: colors.highlighted,
        });
    }

    unhighlight() {
        this.setState({
            color: this.unhighlightedColor,
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