import React from 'react';
import './Grid.scss'
import Column from './Column.js'
import {MouseDownContext} from './context.js'
import {colors} from './../colors.js'

class Grid extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            mousedown: 0,
            color: colors.filled,
        }
        this.test = 0
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
        this.setStartSquare(10,10);
        this.setEndSquare(4,4);
        this.startSearch(1,1);
    }

    handleMouseUp() {
        this.setState({
            mousedown: 0,
        });
    }

    setSquareInGrid(x,y,val) {
        this.grid.set(x.toString() + "-" + y.toString(),val);
    }

    colorSquare(x,y,color=this.state.color,squareStatus=1) {
        var square = this.getSquare(x,y);
        square.colorSquare(color,squareStatus);
    }

    setStartSquare(x,y) {
        this.colorSquare(x,y,colors.start,2);
        this.start = this.getSquare(x,y);
        this.xStart = x;
        this.yStart = y;
    }

    setEndSquare(x,y) {
        this.colorSquare(x,y,colors.end,3);
        this.end = this.getSquare(x,y);
        this.xEnd = x;
        this.yEnd = y;
    }

    getSquare(x,y) {
        return this.grid.get(x.toString() + "-" + y.toString());
    }

    startSearch(timeInterval,algorithm) {
        var xStart = this.start.props.x;
        var yStart = this.start.props.y;
        var xEnd = this.end.props.x;
        var yEnd = this.end.props.y;
        this.interval = timeInterval;
        console.log("search started");
        this.DFS(xStart,yStart);
    }

    BFS(x,y) {
        this.x = x;
        this.y = y;
        this.queue = [];
        this.queue.push(this.getSquare(x,y));
        this.getSquare(x,y).setAsVisited();

        if(this.queue.length > 0) {
            this.BFSLoop();
        }
    }

    BFSLoop() {
        this.square = this.queue.shift();
        if(this.square.props.x === this.xEnd && this.square.props.y === this.yEnd) {
            return 0;
        }
        var adj = this.AdjacentSquares(this.square);
        for (var i = 0; i < adj.length; i++) {
            if(adj[i].props.x === this.xEnd && adj[i].props.y === this.yEnd) {
                return 0;
            }
            adj[i].setAsVisited();
            this.queue.push(adj[i]);
            adj[i].colorSquare(colors.visited, 4);
        }
        setTimeout(function() {this.BFSLoop()}.bind(this),this.interval);
    }

    AdjacentSquares(square) {
        var x = square.props.x;
        var y = square.props.y;
        var adj = [];
        if (this.getSquare(x+1,y) !== undefined && this.getSquare(x+1,y).state.visited === 0) {
            adj.push(this.getSquare(x+1,y));
        }
        if (this.getSquare(x-1,y) !== undefined && this.getSquare(x-1,y).state.visited === 0) {
                adj.push(this.getSquare(x-1,y));
        }
        if (this.getSquare(x,y+1) !== undefined && this.getSquare(x,y+1).state.visited === 0) {
            adj.push(this.getSquare(x,y+1));
        }
        if (this.getSquare(x,y-1) !== undefined && this.getSquare(x,y-1).state.visited === 0) {
            adj.push(this.getSquare(x,y-1));
        }
        return adj;
    }

/*  Implementation of DFS using recursion (hard to add settimeout to it)
    DFSRecursive(x,y,xEnd,yEnd) {

        if (x === xEnd && y === yEnd) {
            this.getSquare(x,y).colorSquare(colors.end, 3);
            return 1
        }

        var square = this.getSquare(x,y);;

        if (square.props.x !== 10 || square.props.y !== 10) {
            square.colorSquare(colors.visited, 4);
        }

        square.setAsVisited();
        
        for (var i = 0; i < 4; i++) {
        
            var nextSquare;

            if (this.getSquare(x+1,y) !== undefined && this.getSquare(x+1,y).state.visited === 0) {
                nextSquare = this.getSquare(x+1,y);
            } else if (this.getSquare(x-1,y) !== undefined && this.getSquare(x-1,y).state.visited === 0) {
                nextSquare = this.getSquare(x-1,y);
            } else if (this.getSquare(x,y+1) !== undefined && this.getSquare(x,y+1).state.visited === 0) {
                nextSquare = this.getSquare(x,y+1);
            } else if (this.getSquare(x,y-1) !== undefined && this.getSquare(x,y-1).state.visited === 0) {
                nextSquare = this.getSquare(x,y-1);
            }else {
                return 0;
            }

            if (this.DFS(nextSquare.props.x,nextSquare.props.y,xEnd,yEnd) === 1) {
                return 1
            } else {
                nextSquare.colorSquare(colors.empty, 0);
            }
        }
    }
*/
    DFS(x,y) {
        this.x = x;
        this.y = y;
        this.stack = [];
        this.stack.push(this.getSquare(x,y));
        this.getSquare(x,y).setAsVisited();

        if(this.x != this.xEnd || this.y != this.yEnd && this.stack.length > 0) {
            this.DFSLoop();
        }   
    }

    DFSLoop() {
        var x = this.x;
        var y = this.y;
        var nextSquare = this.nextSquare;
        var stack = this.stack;
        var adj = this.AdjacentSquares(this.getSquare(x,y))
        if (adj.length > 0) {
            nextSquare = adj[0];
        } else {
            var top = stack.pop();
            var tmp = stack.pop();
            top.colorSquare(colors.empty, 0);
            x = tmp.props.x;
            y = tmp.props.y;
            stack.push(tmp);

            this.x = x;
            this.y = y;
            this.nextSquare = this.nextSquare;
            this.stack = stack;

            if(this.x != this.xEnd || this.y != this.yEnd && this.stack.length > 0) {
                setTimeout(function() {this.DFSLoop()}.bind(this),this.interval);
            }
            return 0;
        }

        stack.push(nextSquare);
        nextSquare.setAsVisited();

        if ((nextSquare.props.x !== this.xStart || nextSquare.props.y !== this.yStart) && (nextSquare.props.x !== this.xEnd || nextSquare.props.y !== this.yEnd)) {
            nextSquare.colorSquare(colors.visited, 4);
        }

        x = nextSquare.props.x;
        y = nextSquare.props.y;

        this.x = x;
        this.y = y;
        this.nextSquare = this.nextSquare;
        this.stack = stack;

        if(this.x != this.xEnd || this.y != this.yEnd && this.stack.length > 0) {
            setTimeout(function() {this.DFSLoop()}.bind(this),this.interval);
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

        return (
            <MouseDownContext.Provider value={context_value}>
            <div className="grid">
                {columns}
            </div>
            </MouseDownContext.Provider>
        );
    }
}

export default Grid