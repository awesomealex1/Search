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
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
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


    render() {
        const squareSize = 19;  //Square height and width [px]

        var nColumns = Math.floor(this.state.width/squareSize);
        var nSquares = Math.floor(this.state.height/squareSize);

        var nWiderCols = this.state.width % squareSize
        var nHigherSquares = this.state.height % squareSize;

        var columns = [];
        for (var i = 0; i < nWiderCols; i++) {
            columns.push(<Column key={i} keyCopy={i} nSquares={nSquares} nHigherSquares={nHigherSquares} squareSize={squareSize} wider={true}/>);
        }
        for (i = 0; i < nColumns - nWiderCols; i++) {
            columns.push(<Column key={i+nWiderCols} keyCopy={i+nWiderCols} nSquares={nSquares} nHigherSquares={nHigherSquares} squareSize={squareSize} wider={false}/>);
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