import React from 'react';
import './Grid.scss'
import Column from './Column.js'

class Grid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
        }
    }

    handleWindowResize = () => {
        this.setState({ 
            width: window.innerWidth - 4,
            height: window.innerHeight - 4,
         });
      }
    
    componentDidMount() {
        window.addEventListener('resize', this.handleWindowResize);
        this.handleWindowResize();
    }

    render() {
        const squareSize = 20;  //Square height and width [px]
        const biggerSquareSize = 21;
        var nColumns = Math.floor(this.state.width/squareSize);
        var nSquares = Math.floor(this.state.height/squareSize);

        var nBiggerCols = this.state.width % squareSize - 1

        var columns = [];
        for (var i = 0; i < nBiggerCols; i++) {
            columns.push(<Column key={i} nSquares={nSquares} squareSize={squareSize} wider={true} gridHeight={this.state.height}/>);
            console.debug("TEST",i);
        }

        for (i = 0; i < nColumns - nBiggerCols; i++) {
            columns.push(<Column key={i} nSquares={nSquares} squareSize={squareSize} wider={false} gridHeight={this.state.height}/>);
        }

        return(
            <div className="grid">
                {columns}
            </div>
        );
    }
}

export default Grid