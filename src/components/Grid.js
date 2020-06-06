import React from 'react';
import './Grid.scss'

class Grid extends React.Component {
    render() {
        return(
            <div>
                <div className="column">
                    <div className="square">
                        1
                    </div>
                    <div className="square">
                        2
                    </div>
                    <div className="square">
                        1
                    </div>
                    <div className="square">
                        2
                    </div>
                </div>
                <div className="column">
                    <div className="square">
                        2
                    </div>
                    <div className="square">
                        1
                    </div>
                    <div className="square">
                        2
                    </div>
                    <div className="square">
                        1
                    </div>
                </div>
                <div className="column">
                    <div className="square">
                        1
                    </div>
                    <div className="square">
                        2
                    </div>
                    <div className="square">
                        1
                    </div>
                    <div className="square">
                        2
                    </div>
                </div>
                <div className="column">
                    <div className="square">
                        2
                    </div>
                    <div className="square">
                        1
                    </div>
                    <div className="square">
                        2
                    </div>
                    <div className="square">
                        1
                    </div>
                </div>
            </div>
        );
    }
}

export default Grid