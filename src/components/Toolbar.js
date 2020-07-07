import React from 'react';
import './Toolbar.scss'

class Toolbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            algorithm: "BFS",   //Defaultvalue in select
        }
        this.handleAlgorithmChange = this.handleAlgorithmChange.bind(this);
        this.handleSquareSizeChange = this.handleSquareSizeChange.bind(this);
        this.handleIntervalChange = this.handleIntervalChange.bind(this);
        this.handleSquareTypeChange = this.handleSquareTypeChange.bind(this);
        this.handleEraserChange = this.handleEraserChange.bind(this);
        this.maxInterval = 1000;
        this.minInterval = 1;
    }

    handleAlgorithmChange(event) {
        this.setState({
            algorithm: event.target.value,
        });
    }

    handleSquareSizeChange(event) {
        this.props.handleSquareResize(parseInt(event.target.value));
    }

    handleIntervalChange(event) {
        this.props.handleIntervalChange(this.maxInterval - parseInt(event.target.value) + this.minInterval);
    }

    handleSquareTypeChange(event) {
        this.props.handleSquareTypeChange(parseInt(event.target.value));
    }

    handleEraserChange(event) {
        this.props.handleEraserChange(parseInt(event.target.checked === true ? 1 : 0));
        console.log(event.target.checked);
    }

    render() {
        return (
            <div>
                <button onClick={() => this.props.handleSearch(this.state.algorithm)}>Search</button>
                <select defaultValue={this.state.algorithm} onChange={this.handleAlgorithmChange}>
                    <option value="DFS">DFS</option>
                    <option value="BFS">BFS</option>
                </select>
                <label>Square Size:</label>
                <input type="range" min="20" max="200" defaultValue="50" onChange={this.handleSquareSizeChange}></input>
                <label>Speed:</label>
                <input type="range" min={this.minInterval.toString()} max={this.maxInterval.toString()} defaultValue={this.maxInterval.toString()} onChange={this.handleIntervalChange}></input>
                <label>Add Squares:</label>
                <select onChange={this.handleSquareTypeChange}>
                    <option value="1">Wall</option>
                    <option value="2">Start</option>
                    <option value="3">End</option>
                </select>
                <label>Eraser:</label>
                <input type="checkbox" onChange={this.handleEraserChange}></input>
            </div>
        );
    }
}

export default Toolbar