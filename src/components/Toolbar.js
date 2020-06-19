import React from 'react';
import './Toolbar.scss'

class Toolbar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <button>Start</button>
                <select>
                    <option>DFS</option>
                    <option>BFS</option>
                </select>
                <label>Square Size:</label>
                <input type="range" min="1" max="10" value="2"></input>
            </div>
        );
    }
}

export default Toolbar