import React from 'react';

class Square extends React.Component {
    render() {
        return(
            <div className={this.props.higher === true ? this.props.wider === true ? "higherAndWiderSquare": "higherSquare" : this.props.wider === true ? "widerSquare" : "normalSquare"}></div>
        );
    }
}

export default Square