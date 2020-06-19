import React from 'react';
import './Toolbar.scss'

class Toolbar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <button onClick={() => this.props.handleSearch(1,"BFS")}>Search</button>
                <select>
                    <option value="DFS">DFS</option>
                    <option value="BFS">BFS</option>
                </select>
                <label>Square Size:</label>
                <input type="range" min="1" max="10" value="2"></input>
                <label>Speed:</label>
                <input type="range" min="1" max="10" value="2"></input>
            </div>
        );
    }
}

export default Toolbar