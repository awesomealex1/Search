import React from 'react';
import './Grid.scss'
import Column from './Column.js'

class Grid extends React.Component {
    render() {
        const nColumns = 30;

        var columns = [];
        for (var i = 0; i < nColumns; i++) {
            columns.push(<Column key={i}/>);
        }

        return(
            <div>
                {columns}
            </div>
        );
    }
}

export default Grid