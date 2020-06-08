import React from 'react';
import Square from './Square.js'

class Column extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var nBiggerSquares = this.props.gridHeight % this.props.squareSize;

        var squares = [];
        for (var i = 0; i < this.props.nSquares - nBiggerSquares; i++) {
            squares.push(<Square key={i} higher={false} wider={this.props.wider}/>);
        }
        for (i = 0; i < nBiggerSquares; i++) {
            squares.push(<Square key={i} higher={true} wider={this.props.wider}/>);
        }
        return(
            <div className="column">
            {squares}
            </div>
        );
    }
}

export default Column