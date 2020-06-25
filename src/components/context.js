import React from 'react';

export const MouseDownContext = React.createContext({
    mousedown: 0,
    color: "black",
    squareType: 1,
    changeContextSquareType: () => {},
    setStartSquare: () => {},
    setEndSquare: () => {},
});