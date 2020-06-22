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
    }

    handleAlgorithmChange(event) {
        this.setState({
            algorithm: event.target.value,
        });
    }

    handleSquareSizeChange(event) {
        this.props.handleSquareResize(parseInt(event.target.value));
    }

    render() {
        return (
            <div>
                <button onClick={() => this.props.handleSearch(1,this.state.algorithm)}>Search</button>
                <select defaultValue={this.state.algorithm} onChange={this.handleAlgorithmChange}>
                    <option value="DFS">DFS</option>
                    <option value="BFS">BFS</option>
                </select>
                <label>Square Size:</label>
                <input type="range" min="20" max="200" defaultValue="50" onChange={this.handleSquareSizeChange}></input>
                <label>Speed:</label>
                <input type="range" min="1" max="2" defaultValue="1"></input>
            </div>
        );
    }
}

export default Toolbar