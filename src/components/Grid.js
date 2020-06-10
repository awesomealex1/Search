import React from 'react';
import './Grid.scss'
import Column from './Column.js'
import {MouseDownContext} from './context.js'

class Grid extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            mousedown: 0,
            color: "green",
        }
        this.grid = new Map();
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.setSquareInGrid = this.setSquareInGrid.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowResize);
        document.addEventListener('mousedown', this.handleMouseDown);
        document.addEventListener('mouseup', this.handleMouseUp);
        this.handleWindowResize();
    }

    handleWindowResize = () => {
        this.setState({ 
            width: window.innerWidth - 4,
            height: window.innerHeight - 4,
         });
    }

    handleMouseDown() {
        this.setState({
            mousedown: 1,
        });
    }

    handleMouseUp() {
        this.setState({
            mousedown: 0,
        });
    }

    setSquareInGrid(x,y,val) {
        this.grid.set(x.toString() + "-" + y.toString(),val);
        if(x === 0 && y === 0) {
            console.log(this.grid);
        }
    }


    render() {
        const squareSize = 19;  //Square height and width [px]

        var nColumns = Math.floor(this.state.width/squareSize);
        var nSquares = Math.floor(this.state.height/squareSize);

        var nWiderCols = this.state.width % squareSize
        var nHigherSquares = this.state.height % squareSize;

        var columns = [];
        var column;
        for (var i = 0; i < nWiderCols; i++) {
            column = <Column key={i} x={i} nSquares={nSquares} nHigherSquares={nHigherSquares} squareSize={squareSize} wider={true} setSquareInGrid={this.setSquareInGrid}/>;
            columns.push(column);
        }
        for (i = 0; i < nColumns - nWiderCols; i++) {
            column = <Column key={i+nWiderCols} x={i+nWiderCols} nSquares={nSquares} nHigherSquares={nHigherSquares} squareSize={squareSize} wider={false} setSquareInGrid={this.setSquareInGrid}/>;
            columns.push(column);
        }

        var context_value = {
            mousedown: this.state.mousedown,
            color: this.state.color,
        }

        return( 
            <MouseDownContext.Provider value={context_value}>
            <div className="grid">
                {columns}
            </div>
            </MouseDownContext.Provider>
        );
    }
}

export default Grid