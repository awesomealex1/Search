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
        this.handleOnMouseUp = this.handleOnMouseUp.bind(this);
        this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
        this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this);
    }

    componentWillUnmount() {
        this.context.removeSquareFromGrid(this.props.x, this.props.y);
    }

    handleOnMouseLeave() {
        if (this.context.mousedown === 1 && (this.context.squareType === 2 || this.context.squareType === 3)) {
            this.unsetAsStartOrEnd();
        }
    }

    handleOnMouseEnter() {
        if (this.context.mousedown === 1) {
            if (this.context.eraserActive === 1) {
                if(this.state.squareType === 2 || this.state.squareType === 3) {
                    this.unsetAsStartOrEnd();
                    if (this.state.squareType === 2) {
                        this.context.unsetStartOrEnd(0);
                    } else {
                        this.context.unsetStartOrEnd(1);
                    }
                }
                this.colorSquare(colors.empty,0);
            } else if (this.context.squareType === 1 && this.state.squareType === 0) {
                this.colorSquare(this.context.color,this.context.squareType);
            } else if (this.context.squareType === 2) {
                this.setAsStartOrEnd(0);
                this.context.setStartSquare(this.props.x,this.props.y);
            } else if (this.context.squareType === 3) {
                this.setAsStartOrEnd(1);
                this.context.setEndSquare(this.props.x,this.props.y);
            }
        }
    }

    handleOnMouseDown() {
        if(this.context.eraserActive === 1) {
            this.colorSquare(colors.empty,0);
        } else if (this.state.squareType === 2 || this.state.squareType === 3) {
            this.context.changeContextSquareType(this.state.squareType);
        } else {
            if (this.context.squareType == 2) {
                this.setAsStartOrEnd(0);
                this.context.setStartSquare(this.props.x,this.props.y);
            } else if (this.context.squareType == 3) {
                this.setAsStartOrEnd(1);
                this.context.setEndSquare(this.props.x,this.props.y);
            } else {
                this.colorSquare(this.context.color, this.context.squareType);
            }
        }
    }

    handleOnMouseUp() {
        if (this.context.squareType === 2 || this.context.squareType === 3) {
            this.context.changeContextSquareType(this.context.dropdownSquareType);
        }
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
        this.unhighlightedColor = color;
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

    setAsStartOrEnd(x=0) {  //x = 0: Start, x = 1: End
        this.colorBeforeStartOrEnd = this.state.color;
        this.squareTypeBeforeStartOrEnd = this.state.squareType;
        if (x === 0) {
            this.setState({
                color: colors.start,
                squareType: 2,
            });
        } else if (x === 1) {
            this.setState({
                color: colors.end,
                squareType: 3,
            });
        }
    }

    unsetAsStartOrEnd() {
        this.setState({
            color: this.colorBeforeStartOrEnd,
            squareType: this.squareTypeBeforeStartOrEnd,
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
        this.context.addSquareToGrid(this.props.x, this.props.y, this);
        var width = this.props.width;
        var height = this.props.height;

        return(
            <div onMouseDown={this.handleOnMouseDown} onMouseUp={this.handleOnMouseUp} onMouseEnter={this.handleOnMouseEnter} onMouseLeave={this.handleOnMouseLeave} style={{
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