import React from 'react';
import Square from './Square.js'

class Column extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var squares = [];
        for (var i = 0; i < this.props.nNormalSquares; i++) {
            squares.push(<Square key={this.props.x.toString() + "-" + i.toString()} x={this.props.x} y={i} addSquareToGrid={this.props.addSquareToGrid} removeSquareFromGrid={this.props.removeSquareFromGrid} height={this.props.squareSize+this.props.extraHeightValue} width={this.props.width}/>);
        }
        for (i = 0; i < this.props.nHigherSquares; i++) {
            squares.push(<Square key={this.props.x.toString() + "-" + (i + this.props.nNormalSquares).toString()} x={this.props.x} y={i+this.props.nNormalSquares} addSquareToGrid={this.props.addSquareToGrid} removeSquareFromGrid={this.props.removeSquareFromGrid} height={this.props.squareSize+this.props.extraHeightValue+1} width={this.props.width}/>);
        }
        return(
            <div className="column">
            {squares}
            </div>
        );
    }
}

export default Column