import React from 'react';
import Square from './Square.js'

class Column extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var squares = [];
        for (var i = 0; i < this.props.nHigherSquares; i++) {
            squares.push(<Square key={this.props.x.toString() + "-" + i.toString()} x={this.props.x} y={i} higher={true} wider={this.props.wider} setSquareInGrid={this.props.setSquareInGrid} size={this.props.squareSize}/>);
        }
        for (i = 0; i < this.props.nSquares - this.props.nHigherSquares; i++) {
            squares.push(<Square key={this.props.x.toString() + "-" + (i + this.props.nHigherSquares).toString()} x={this.props.x} y={i+this.props.nHigherSquares} higher={false} wider={this.props.wider} setSquareInGrid={this.props.setSquareInGrid} size={this.props.squareSize}/>);
        }
        return(
            <div className="column">
            {squares}
            </div>
        );
    }
}

export default Column