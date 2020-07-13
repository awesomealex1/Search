import React from 'react';
import './Grid.scss'
import Column from './Column.js'
import Toolbar from './Toolbar.js'
import {MouseDownContext} from './context.js'
import {colors} from './../colors.js'
import Square from './Square';

class Grid extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            width: 0,   //Width of grid
            height: 0,  //Height of grid
            mousedown: 0,   //0 = L Mouse Button not down, 1 = L Mouse Button is down
            color: colors.wall,
            squareSize: 50,
            interval: 1,
            squareType: 1,
            dropdownSquareType: 1,
            eraserActive: 0,
        }

        this.grid = new Map();

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.addSquareToGrid = this.addSquareToGrid.bind(this);
        this.removeSquareFromGrid = this.removeSquareFromGrid.bind(this);
        this.startSearch = this.startSearch.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSquareResize = this.handleSquareResize.bind(this);
        this.handleIntervalChange = this.handleIntervalChange.bind(this);
        this.changeContextSquareType = this.changeContextSquareType.bind(this);
        this.setStartSquare = this.setStartSquare.bind(this);
        this.setEndSquare = this.setEndSquare.bind(this);
        this.handleSquareTypeChange = this.handleSquareTypeChange.bind(this);
        this.handleEraserActiveChange = this.handleEraserActiveChange.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowResize);
        document.addEventListener('mousedown', this.handleMouseDown);
        document.addEventListener('mouseup', this.handleMouseUp);
        this.handleWindowResize();
        setTimeout(function() {this.prepareGrid(true)}.bind(this),200);
    }

    handleWindowResize = () => {
        this.setState({ 
            width: window.innerWidth - 4,
            height: window.innerHeight - 4 - 34,    //4 : square borders, 34 : taskbar height
         });
    }

    //Changes state and context mousedown
    handleMouseDown() {
        this.setState({
            mousedown: 1,
        });
    }
    
    //Changes state and context mousedown
    handleMouseUp() {
        this.setState({
            mousedown: 0,
        });
    }

    handleSquareResize(size) {
        this.setState({
            squareSize: size,
        });
    }

    //Used by Toolbar speed slider
    handleIntervalChange(interval) {
        this.setState({
            interval: interval,
        });
    }

    //Used by Toolbar grid square dropdown
    handleSquareTypeChange(squareType) {
        this.changeContextSquareType(squareType);
        this.setState({
            dropdownSquareType: squareType,
        });
    }

    changeContextSquareType(squareType) {
        this.setState({
            squareType: squareType,
        });
    }

    handleEraserActiveChange(shouldBeActive) {
        console.log(shouldBeActive);
        this.setState({
            eraserActive: shouldBeActive,
        });
    }

    //Used by Square if it gets deleted
    removeSquareFromGrid(x,y) {
        this.grid.delete(x.toString() + "-" + y.toString());
    }

    //Used by Square when it gets created
    addSquareToGrid(x,y,val) {
        this.grid.set(x.toString() + "-" + y.toString(),val);
    }

    colorSquare(x,y,color=this.state.color,squareType=0) {
        var square = this.getSquare(x,y);
        square.colorSquare(color,squareType);
    }

    setStartSquare(x,y) {
        console.log(this.xStart);
        if (this.xStart !== undefined && this.yStart !== undefined && this.getSquare(this.xStart,this.yStart)) {
            this.getSquare(this.xStart,this.yStart).unsetAsStartOrEnd();
        }
        this.colorSquare(x,y,colors.start,2);
        this.start = this.getSquare(x,y);
        this.xStart = x;
        this.yStart = y;
    }

    setEndSquare(x,y) {
        if (this.xEnd !== undefined && this.yEnd !== undefined && this.getSquare(this.xEnd,this.yEnd)) {
            this.getSquare(this.xEnd,this.yEnd).unsetAsStartOrEnd();
        }
        this.colorSquare(x,y,colors.end,3);
        this.end = this.getSquare(x,y);
        this.xEnd = x;
        this.yEnd = y;
    }

    getSquare(x,y) {
        return this.grid.get(x.toString() + "-" + y.toString());
    }

    //Resets values so algorithms will work
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

    //Used by Toolbar Start button
    handleSearch(algorithm) {
        this.prepareGrid(false);    //false = not first run
        setTimeout(function(algorithm) {this.startSearch(algorithm)}.bind(this),this.state.interval,algorithm);
    }

    startSearch(algorithm) {
        var xStart = this.start.props.x;
        var yStart = this.start.props.y;
        var start = this.getSquare(xStart,yStart);
        var xEnd = this.end.props.x;
        var yEnd = this.end.props.y;
        var end = this.getSquare(xEnd,yEnd);
        if(start === undefined && end === undefined) {
            alert("Please add an end and a start node");
        } else if (start === undefined) {
            alert("Please add a start node");
        } else if (end === undefined) {
            alert("Please add an end node");
        } else {
            console.log("search started");
            if (algorithm === "BFS") {
                this.BFS(xStart,yStart);
            } else if (algorithm === "DFS") {
                this.DFS(xStart,yStart);
            } else if (algorithm === "ASTAR") {
                this.AStar(xStart,yStart,xEnd,yEnd);
            } else {
                console.log("No algorithm selected");
            }
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
        if (queue.length < 1) {
            return 0;
        }
        var square = queue.shift();
        if(square.props.x === this.xEnd && square.props.y === this.yEnd) {
            return 0;
        }
        var adj = this.FreeAdjacentSquares(square);
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
        var adj = this.FreeAdjacentSquares(square)
        if (adj.length > 0) {
            square = adj[0];
        } else {
            this.highlightedSquares[0].unhighlight();
            this.highlightedSquares = [];
            var top = stack.pop();
            if (stack.length < 1) {
                return 0;
            }
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

    AStar(xStart,yStart,xEnd,yEnd) {
        var xStart = this.start.props.x;
        var yStart = this.start.props.y;
        var xEnd = this.end.props.x;
        var yEnd = this.end.props.y;
        var open = [];
        var closed = [];
        var g = new Map();
        var h = new Map();
        open.push(this.getSquare(xStart,yStart));
        this.highlightedSquares.push(this.getSquare(xStart,yStart));
        this.getSquare(xStart,yStart).setAsVisited();
        this.getSquare(xStart,yStart).colorSquare(colors.visited);
        this.highlightedSquares[0].highlight();
        g.set(xStart.toString() + "-" + yStart.toString(),0);
        setTimeout(function(open,closed,g,h) {this.AStarLoop(open,closed,g,h)}.bind(this),this.state.interval,open,closed,g,h);
    }

    AStarLoop(open,closed,g,h) {
        for (var i = 0; i < this.highlightedSquares.length; i++) {
            this.highlightedSquares[i].unhighlight();
        }
        this.highlightedSquares = [];
        var leastDistance = 1000000;
        var squareWithLeastDistanceIndex;
        for (var i = 0; i < open.length; i++) {
            var square = open[i];
            if (this.DistanceFromEnd(square.props.x,square.props.y) + g.get(this.SquareId(square)) < leastDistance) {
                squareWithLeastDistanceIndex = i;
                leastDistance = this.DistanceFromEnd(square.props.x,square.props.y) + g.get(this.SquareId(square));
            }

            this.highlightedSquares.push(square);
            square.highlight();
        }
        for (var i = 0; i < this.highlightedSquares.length; i++) {
            this.highlightedSquares[i].unhighlight();
        }
        this.highlightedSquares = [];
        var currentSquare = open[squareWithLeastDistanceIndex];
        this.highlightedSquares.push(currentSquare);
        currentSquare.highlight();
        open.splice(squareWithLeastDistanceIndex,1);
        var adjacentSquares = this.FreeAdjacentSquares(currentSquare);
        for (var i = 0; i < adjacentSquares.length; i++) {
            this.highlightedSquares.push(adjacentSquares[i]);
            adjacentSquares[i].highlight();
            if (adjacentSquares[i] === this.end) {
                return 0;
            }
            var adjacentSquareId = this.SquareId(adjacentSquares[i]);
            var currentSquareId = this.SquareId(currentSquare);
            if (!g.get(adjacentSquareId)) {
                g.set(adjacentSquareId,g.get(currentSquareId) + 1);
            } else if (g.get(adjacentSquareId) > g.get(currentSquareId) + 1) {
                g.set(adjacentSquareId,g.get(currentSquareId) + 1); //Add 1 because distance will always be 1 (no weights)
            }
            var f = g.get(adjacentSquareId) + this.DistanceFromEnd(adjacentSquares[i].props.x,adjacentSquares[i].props.y);
            if (!this.IsInArr(adjacentSquares[i],open) && !this.IsInArr(adjacentSquares[i],closed)) {
                open.push(adjacentSquares[i]);
            }
        }
        closed.push(currentSquare);
        currentSquare.setAsVisited();
        currentSquare.colorSquare(colors.visited);
        if (open.length > 0) {
            setTimeout(function(open,closed,g,h) {this.AStarLoop(open,closed,g,h)}.bind(this),this.state.interval,open,closed,g,h);
        }
    }

    IsInArr(thing,arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === thing) {
                return true;
            }
        }
        return false;
    }

    //Returns Manhattan Distance from Starting Square
    DistanceFromStart(x,y) {
        return Math.abs(x-this.start.props.x) + Math.abs(y-this.start.props.y);
    }
    
    //Returns Manhattan Distance from End Square
    DistanceFromEnd(x,y) {
        return Math.abs(x-this.end.props.x) + Math.abs(y-this.end.props.y);
    }

    //Returns id used in maps
    SquareId(square) {
        return square.props.x.toString() + "-" + square.props.y.toString()
    }

    //Returns all neighbouring squares that are unvisited and not wall
    FreeAdjacentSquares(square) {
        var x = square.props.x;
        var y = square.props.y;
        var adj = [];
        if (this.getSquare(x+1,y) !== undefined && this.getSquare(x+1,y).state.visited === 0 && this.getSquare(x+1,y).state.squareType !== 1) {
            adj.push(this.getSquare(x+1,y));
        }
        if (this.getSquare(x-1,y) !== undefined && this.getSquare(x-1,y).state.visited === 0 && this.getSquare(x-1,y).state.squareType !== 1) {
            adj.push(this.getSquare(x-1,y));
        }
        if (this.getSquare(x,y+1) !== undefined && this.getSquare(x,y+1).state.visited === 0 && this.getSquare(x,y+1).state.squareType !== 1) {
            adj.push(this.getSquare(x,y+1));
        }
        if (this.getSquare(x,y-1) !== undefined && this.getSquare(x,y-1).state.visited === 0 && this.getSquare(x,y-1).state.squareType !== 1) {
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
            column = <Column key={i} x={i} nNormalSquares={nNormalHeight} nHigherSquares={nExtraHeight} extraHeightValue={extraHeightValue} squareSize={this.state.squareSize} width={this.state.squareSize+extraWidthValue+1}/>;
            columns.push(column);
        }
        for (i = 0; i < nNormalWidth; i++) {
            column = <Column key={i+nExtraWidth} x={i+nExtraWidth} nNormalSquares={nNormalHeight} nHigherSquares={nExtraHeight} extraHeightValue={extraHeightValue} squareSize={this.state.squareSize} width={this.state.squareSize+extraWidthValue}/>;
            columns.push(column);
        }

        var context_value = {
            mousedown: this.state.mousedown,
            color: this.state.color,
            squareType: this.state.squareType,
            dropdownSquareType: this.state.dropdownSquareType,
            eraserActive: this.state.eraserActive,
            changeContextSquareType: this.changeContextSquareType,
            setStartSquare: this.setStartSquare,
            setEndSquare: this.setEndSquare,
            addSquareToGrid: this.addSquareToGrid,
            removeSquareFromGrid: this.removeSquareFromGrid,
        }

        return (
            <div>
            <Toolbar handleSearch={this.handleSearch} handleSquareResize={this.handleSquareResize} handleIntervalChange={this.handleIntervalChange} handleSquareTypeChange={this.handleSquareTypeChange} handleEraserChange={this.handleEraserActiveChange}></Toolbar>
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