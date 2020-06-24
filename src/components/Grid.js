import React from 'react';
import './Grid.scss'
import Column from './Column.js'
import Toolbar from './Toolbar.js'
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
            squareSize: 20,
            interval: 1,
        }
        this.test = 0
        this.grid = new Map();
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.addSquareToGrid = this.addSquareToGrid.bind(this);
        this.removeSquareFromGrid = this.removeSquareFromGrid.bind(this);
        this.startSearch = this.startSearch.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSquareResize = this.handleSquareResize.bind(this);
        this.handleIntervalChange = this.handleIntervalChange.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowResize);
        document.addEventListener('mousedown', this.handleMouseDown);
        document.addEventListener('mouseup', this.handleMouseUp);
        this.handleWindowResize();
        setTimeout(function() {this.prepareGrid(true)}.bind(this),500);
    }

    handleWindowResize = () => {
        this.setState({ 
            width: window.innerWidth - 4,
            height: window.innerHeight - 4 - 34,    //4 : square borders, 35 : taskbar height
         });
    }

    handleSquareResize(size) {
        this.setState({
            squareSize: size,
        });
    }

    handleIntervalChange(interval) {
        this.setState({
            interval: interval,
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

    removeSquareFromGrid(x,y) {
        this.grid.delete(x.toString() + "-" + y.toString());
    }

    addSquareToGrid(x,y,val) {
        this.grid.set(x.toString() + "-" + y.toString(),val);
    }

    colorSquare(x,y,color=this.state.color,squareType=0) {
        var square = this.getSquare(x,y);
        square.colorSquare(color,squareType);
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

    prepareGrid(firstRun) {
        var values = this.grid.values();
        for (var square of values) {
            square.setAsUnvisited();
            square.resetColor();
        }
        this.highlightedSquares = [];

        if (firstRun) {
            var x = Math.floor((this.state.width/(this.state.squareSize+1))/3);
            var y = Math.floor((this.state.height/(this.state.squareSize+1))/2);
            this.setStartSquare(x,y);
            this.setEndSquare(2*x,y);
        }
    }

    handleSearch(algorithm) {
        this.prepareGrid(false);
        setTimeout(function(algorithm) {this.startSearch(algorithm)}.bind(this),this.state.interval,algorithm);
    }

    startSearch(algorithm) {
        var xStart = this.start.props.x;
        var yStart = this.start.props.y;
        console.log("search started");
        if (algorithm === "BFS") {
            this.BFS(xStart,yStart);
        } else if (algorithm === "DFS") {
            this.DFS(xStart,yStart);
        } else {
            console.log("No algorithm selected");
        }
    }

    BFS(x,y) {
        console.log(this.grid);
        var queue = [];
        var start = this.getSquare(x,y);
        queue.push(start);
        start.setAsVisited();
        this.highlightedSquares = [];
        this.highlightedSquares.push(start);
        this.highlightedSquares[0].highlight();
        if(queue.length > 0) {
            this.BFSLoop(queue);
        }
    }

    BFSLoop(queue) {
        var square = queue.shift();
        if(square.props.x === this.xEnd && square.props.y === this.yEnd) {
            return 0;
        }
        var adj = this.AdjacentSquares(square);
        for (var i = 0; i < this.highlightedSquares.length; i++) {
            this.highlightedSquares[i].unhighlight();
        }
        this.highlightedSquares = [];
        for (var i = 0; i < adj.length; i++) {
            if(adj[i].props.x === this.xEnd && adj[i].props.y === this.yEnd) {
                return 0;
            }
            adj[i].setAsVisited();
            queue.push(adj[i]);
            adj[i].colorSquare(colors.visited);
            this.highlightedSquares.push(adj[i]);
            adj[i].highlight();
        }
        setTimeout(function(queue) {this.BFSLoop(queue)}.bind(this),this.state.interval,queue);
    }

/*  Implementation of DFS using recursion (hard to add settimeout to it)
    DFSRecursive(x,y,xEnd,yEnd) {

        if (x === xEnd && y === yEnd) {
            this.getSquare(x,y).colorSquare(colors.end);
            return 1
        }

        var square = this.getSquare(x,y);;

        if (square.props.x !== 10 || square.props.y !== 10) {
            square.colorSquare(colors.visited);
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
                nextSquare.colorSquare(colors.empty);
            }
        }
    }
*/
    DFS(x,y) {
        var stack = [];
        stack.push(this.getSquare(x,y));
        var start = this.getSquare(x,y);
        start.setAsVisited();
        this.highlightedSquares = [];
        this.highlightedSquares.push(start);
        this.highlightedSquares[0].highlight();
        if(x != this.xEnd || y != this.yEnd && this.stack.length > 0) {
            this.DFSLoop(x,y,start,stack);
        }
    }

    DFSLoop(x,y,square,stack) {
        var adj = this.AdjacentSquares(square)
        if (adj.length > 0) {
            square = adj[0];
        } else {
            this.highlightedSquares[0].unhighlight();
            this.highlightedSquares = [];
            var top = stack.pop();
            var tmp = stack.pop();
            this.highlightedSquares.push(tmp);
            this.highlightedSquares[0].highlight();
            top.colorSquare(colors.visited2);
            x = tmp.props.x;
            y = tmp.props.y;
            stack.push(tmp);
            square = tmp;
            if(x != this.xEnd || y != this.yEnd && stack.length > 0) {
                setTimeout(function(x,y,square,stack) {this.DFSLoop(x,y,square,stack)}.bind(this),this.state.interval,x,y,square,stack);
            }
            return 0;
        }

        stack.push(square);
        square.setAsVisited();

        if ((square.props.x !== this.xStart || square.props.y !== this.yStart) && (square.props.x !== this.xEnd || square.props.y !== this.yEnd)) {
            square.colorSquare(colors.visited);
        }

        this.highlightedSquares[0].unhighlight();
        this.highlightedSquares = [];

        x = square.props.x;
        y = square.props.y;

        if(x != this.xEnd || y != this.yEnd && stack.length > 0) {
            this.highlightedSquares.push(square);
            this.highlightedSquares[0].highlight();
            setTimeout(function(x,y,square,stack) {this.DFSLoop(x,y,square,stack)}.bind(this),this.state.interval,x,y,square,stack);
        }
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

    render() {
        console.log("render");
        var nColumns = Math.floor(this.state.width/(this.state.squareSize+1));  //Add 1 to account for borders
        var nRows = Math.floor(this.state.height/(this.state.squareSize+1)); //Squares per column
        
        var extraWidthValue = Math.floor((this.state.width%(this.state.squareSize+1))/nColumns);
        var extraHeightValue = Math.floor((this.state.height%(this.state.squareSize+1))/nRows);

        var nExtraWidth = (this.state.width%(this.state.squareSize+1))%nColumns;
        var nExtraHeight = (this.state.height%(this.state.squareSize+1))%nRows;

        var nNormalWidth = nColumns - nExtraWidth;
        var nNormalHeight = nRows - nExtraHeight;

        var columns = [];
        var column;

        for (var i = 0; i < nExtraWidth; i++) {
            column = <Column key={i} x={i} nNormalSquares={nNormalHeight} nHigherSquares={nExtraHeight} extraHeightValue={extraHeightValue} squareSize={this.state.squareSize} width={this.state.squareSize+extraWidthValue+1} addSquareToGrid={this.addSquareToGrid} removeSquareFromGrid={this.removeSquareFromGrid}/>;
            columns.push(column);
        }
        for (i = 0; i < nNormalWidth; i++) {
            column = <Column key={i+nExtraWidth} x={i+nExtraWidth} nNormalSquares={nNormalHeight} nHigherSquares={nExtraHeight} extraHeightValue={extraHeightValue} squareSize={this.state.squareSize} width={this.state.squareSize+extraWidthValue} addSquareToGrid={this.addSquareToGrid} removeSquareFromGrid={this.removeSquareFromGrid}/>;
            columns.push(column);
        }

        var context_value = {
            mousedown: this.state.mousedown,
            color: this.state.color,
        }

        return (
            <div>
            <Toolbar handleSearch={this.handleSearch} handleSquareResize={this.handleSquareResize} handleIntervalChange={this.handleIntervalChange}></Toolbar>
            <MouseDownContext.Provider value={context_value}>
            <div className="grid">
                {columns}
            </div>
            </MouseDownContext.Provider>
            </div>
        );
    }
}

export default Grid