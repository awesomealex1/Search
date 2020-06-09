import React from 'react';
import Square from './Square.js'

class Column extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var squares = [];
        for (var i = 0; i < this.props.nHigherSquares; i++) {
            squares.push(<Square key={this.props.keyCopy.toString() + i.toString()} higher={true} wider={this.props.wider}/>);
        }
        for (i = 0; i < this.props.nSquares - this.props.nHigherSquares; i++) {
            squares.push(<Square key={this.props.keyCopy.toString() + (i + this.props.nHigherSquares).toString()} higher={false} wider={this.props.wider}/>);
        }
        return(
            <div className="column">
            {squares}
            </div>
        );
    }
}

export default Column