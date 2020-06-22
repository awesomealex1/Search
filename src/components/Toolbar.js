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
        this.props.handleIntervalChange(parseInt(event.target.value))
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
                <input type="range" min="1" max="1000" defaultValue="1" onChange={this.handleIntervalChange}></input>
            </div>
        );
    }
}

export default Toolbar