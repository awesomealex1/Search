(this["webpackJsonpreact-search"]=this["webpackJsonpreact-search"]||[]).push([[0],[,,,,,,,,,function(e,t,a){e.exports=a(17)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var s=a(0),i=a.n(s),r=a(7),h=a.n(r),n=(a(14),a(2)),o=a(3),u=a(5),l=a(4),d=a(8),g=a(1),c=(a(15),i.a.createContext({mousedown:0,color:"black",squareType:1,dropdownSquareType:1,eraserActive:0,changeContextSquareType:function(){},setStartSquare:function(){},setEndSquare:function(){},addSquareToGrid:function(){},removeSquareFromGrid:function(){},unsetStartOrEnd:function(){}})),S="white",p="black",q="yellow",v="green",y="red",f="grey",m="lightgrey",E=function(e){Object(u.a)(a,e);var t=Object(l.a)(a);function a(e){var s;return Object(n.a)(this,a),(s=t.call(this,e)).state={color:S,mousedown:0,squareType:0,visited:0},s.handleOnMouseDown=s.handleOnMouseDown.bind(Object(g.a)(s)),s.handleOnMouseUp=s.handleOnMouseUp.bind(Object(g.a)(s)),s.handleOnMouseEnter=s.handleOnMouseEnter.bind(Object(g.a)(s)),s.handleOnMouseLeave=s.handleOnMouseLeave.bind(Object(g.a)(s)),s}return Object(o.a)(a,[{key:"componentWillUnmount",value:function(){this.context.removeSquareFromGrid(this.props.x,this.props.y)}},{key:"handleOnMouseLeave",value:function(){1!==this.context.mousedown||2!==this.context.squareType&&3!==this.context.squareType||this.unsetAsStartOrEnd()}},{key:"handleOnMouseEnter",value:function(){1===this.context.mousedown&&(1===this.context.eraserActive?(2!==this.state.squareType&&3!==this.state.squareType||(this.unsetAsStartOrEnd(),2===this.state.squareType?this.context.unsetStartOrEnd(0):this.context.unsetStartOrEnd(1)),this.colorSquare(S,0)):1===this.context.squareType&&0===this.state.squareType?this.colorSquare(this.context.color,this.context.squareType):2===this.context.squareType?(this.setAsStartOrEnd(0),this.context.setStartSquare(this.props.x,this.props.y)):3===this.context.squareType&&(this.setAsStartOrEnd(1),this.context.setEndSquare(this.props.x,this.props.y)))}},{key:"handleOnMouseDown",value:function(){1===this.context.eraserActive?this.colorSquare(S,0):2===this.state.squareType||3===this.state.squareType?this.context.changeContextSquareType(this.state.squareType):2==this.context.squareType?(this.setAsStartOrEnd(0),this.context.setStartSquare(this.props.x,this.props.y)):3==this.context.squareType?(this.setAsStartOrEnd(1),this.context.setEndSquare(this.props.x,this.props.y)):this.colorSquare(this.context.color,this.context.squareType)}},{key:"handleOnMouseUp",value:function(){2!==this.context.squareType&&3!==this.context.squareType||this.context.changeContextSquareType(this.context.dropdownSquareType)}},{key:"resetColor",value:function(){var e;0===this.state.squareType?e=S:1===this.state.squareType?e=p:2===this.state.squareType?e=v:3===this.state.squareType&&(e=y),this.setState({color:e}),this.unhighlightedColor=e}},{key:"colorSquare",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.context.color,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;this.setState({color:e,squareType:t}),this.unhighlightedColor=e}},{key:"setAsVisited",value:function(){this.setState({visited:1})}},{key:"setAsUnvisited",value:function(){this.setState({visited:0})}},{key:"setAsStartOrEnd",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.colorBeforeStartOrEnd=this.state.color,this.squareTypeBeforeStartOrEnd=this.state.squareType,0===e?this.setState({color:v,squareType:2}):1===e&&this.setState({color:y,squareType:3})}},{key:"unsetAsStartOrEnd",value:function(){this.setState({color:this.colorBeforeStartOrEnd,squareType:this.squareTypeBeforeStartOrEnd})}},{key:"highlight",value:function(){this.unhighlightedColor=this.state.color,this.setState({color:q})}},{key:"unhighlight",value:function(){this.setState({color:this.unhighlightedColor})}},{key:"render",value:function(){this.context.addSquareToGrid(this.props.x,this.props.y,this);var e=this.props.width,t=this.props.height;return i.a.createElement("div",{onMouseDown:this.handleOnMouseDown,onMouseUp:this.handleOnMouseUp,onMouseEnter:this.handleOnMouseEnter,onMouseLeave:this.handleOnMouseLeave,style:{backgroundColor:this.state.color,height:t,width:e},className:"normalSquare"})}}]),a}(i.a.Component);E.contextType=c;var x=E,O=function(e){Object(u.a)(a,e);var t=Object(l.a)(a);function a(e){return Object(n.a)(this,a),t.call(this,e)}return Object(o.a)(a,[{key:"render",value:function(){for(var e=[],t=0;t<this.props.nNormalSquares;t++)e.push(i.a.createElement(x,{key:this.props.x.toString()+"-"+t.toString(),x:this.props.x,y:t,removeSquareFromGrid:this.props.removeSquareFromGrid,height:this.props.squareSize+this.props.extraHeightValue,width:this.props.width}));for(t=0;t<this.props.nHigherSquares;t++)e.push(i.a.createElement(x,{key:this.props.x.toString()+"-"+(t+this.props.nNormalSquares).toString(),x:this.props.x,y:t+this.props.nNormalSquares,removeSquareFromGrid:this.props.removeSquareFromGrid,height:this.props.squareSize+this.props.extraHeightValue+1,width:this.props.width}));return i.a.createElement("div",{className:"column"},e)}}]),a}(i.a.Component),b=(a(16),function(e){Object(u.a)(a,e);var t=Object(l.a)(a);function a(e){var s;return Object(n.a)(this,a),(s=t.call(this,e)).state={algorithm:"BFS"},s.handleAlgorithmChange=s.handleAlgorithmChange.bind(Object(g.a)(s)),s.handleSquareSizeChange=s.handleSquareSizeChange.bind(Object(g.a)(s)),s.handleIntervalChange=s.handleIntervalChange.bind(Object(g.a)(s)),s.handleSquareTypeChange=s.handleSquareTypeChange.bind(Object(g.a)(s)),s.handleEraserChange=s.handleEraserChange.bind(Object(g.a)(s)),s.maxInterval=1e3,s.minInterval=1,s}return Object(o.a)(a,[{key:"handleAlgorithmChange",value:function(e){this.setState({algorithm:e.target.value})}},{key:"handleSquareSizeChange",value:function(e){this.props.handleSquareResize(parseInt(e.target.value))}},{key:"handleIntervalChange",value:function(e){this.props.handleIntervalChange(this.maxInterval-parseInt(e.target.value)+this.minInterval)}},{key:"handleSquareTypeChange",value:function(e){this.props.handleSquareTypeChange(parseInt(e.target.value))}},{key:"handleEraserChange",value:function(e){this.props.handleEraserChange(parseInt(!0===e.target.checked?1:0)),console.log(e.target.checked)}},{key:"render",value:function(){var e=this;return i.a.createElement("div",null,i.a.createElement("button",{onClick:function(){return e.props.handleSearch(e.state.algorithm)}},"Search"),i.a.createElement("select",{defaultValue:this.state.algorithm,onChange:this.handleAlgorithmChange},i.a.createElement("option",{value:"BFS"},"BFS"),i.a.createElement("option",{value:"DFS"},"DFS"),i.a.createElement("option",{value:"ASTAR"},"A*")),i.a.createElement("label",null,"Square Size:"),i.a.createElement("input",{type:"range",min:"20",max:"200",defaultValue:"50",onChange:this.handleSquareSizeChange}),i.a.createElement("label",null,"Speed:"),i.a.createElement("input",{type:"range",min:this.minInterval.toString(),max:this.maxInterval.toString(),defaultValue:this.maxInterval.toString(),onChange:this.handleIntervalChange}),i.a.createElement("label",null,"Add Squares:"),i.a.createElement("select",{onChange:this.handleSquareTypeChange},i.a.createElement("option",{value:"1"},"Wall"),i.a.createElement("option",{value:"2"},"Start"),i.a.createElement("option",{value:"3"},"End")),i.a.createElement("label",null,"Eraser:"),i.a.createElement("input",{type:"checkbox",onChange:this.handleEraserChange}))}}]),a}(i.a.Component)),T=function(e){Object(u.a)(a,e);var t=Object(l.a)(a);function a(e){var s;return Object(n.a)(this,a),(s=t.call(this,e)).handleWindowResize=function(){s.setState({width:window.innerWidth-4,height:window.innerHeight-4-34})},s.state={width:0,height:0,mousedown:0,color:p,squareSize:50,interval:1,squareType:1,dropdownSquareType:1,eraserActive:0},s.grid=new Map,s.searchOngoing=!1,s.handleMouseDown=s.handleMouseDown.bind(Object(g.a)(s)),s.handleMouseUp=s.handleMouseUp.bind(Object(g.a)(s)),s.addSquareToGrid=s.addSquareToGrid.bind(Object(g.a)(s)),s.removeSquareFromGrid=s.removeSquareFromGrid.bind(Object(g.a)(s)),s.startSearch=s.startSearch.bind(Object(g.a)(s)),s.handleSearch=s.handleSearch.bind(Object(g.a)(s)),s.handleSquareResize=s.handleSquareResize.bind(Object(g.a)(s)),s.handleIntervalChange=s.handleIntervalChange.bind(Object(g.a)(s)),s.changeContextSquareType=s.changeContextSquareType.bind(Object(g.a)(s)),s.setStartSquare=s.setStartSquare.bind(Object(g.a)(s)),s.setEndSquare=s.setEndSquare.bind(Object(g.a)(s)),s.handleSquareTypeChange=s.handleSquareTypeChange.bind(Object(g.a)(s)),s.handleEraserActiveChange=s.handleEraserActiveChange.bind(Object(g.a)(s)),s}return Object(o.a)(a,[{key:"componentDidMount",value:function(){window.addEventListener("resize",this.handleWindowResize),document.addEventListener("mousedown",this.handleMouseDown),document.addEventListener("mouseup",this.handleMouseUp),this.handleWindowResize(),setTimeout(function(){this.prepareGrid(!0)}.bind(this),200)}},{key:"handleMouseDown",value:function(){this.setState({mousedown:1})}},{key:"handleMouseUp",value:function(){this.setState({mousedown:0})}},{key:"handleSquareResize",value:function(e){this.setState({squareSize:e})}},{key:"handleIntervalChange",value:function(e){this.setState({interval:e})}},{key:"handleSquareTypeChange",value:function(e){this.changeContextSquareType(e),this.setState({dropdownSquareType:e})}},{key:"changeContextSquareType",value:function(e){this.setState({squareType:e})}},{key:"handleEraserActiveChange",value:function(e){console.log(e),this.setState({eraserActive:e})}},{key:"removeSquareFromGrid",value:function(e,t){this.grid.delete(e.toString()+"-"+t.toString())}},{key:"addSquareToGrid",value:function(e,t,a){this.grid.set(e.toString()+"-"+t.toString(),a)}},{key:"colorSquare",value:function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.state.color,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,i=this.getSquare(e,t);i.colorSquare(a,s)}},{key:"setStartSquare",value:function(e,t){void 0!==this.xStart&&void 0!==this.yStart&&this.getSquare(this.xStart,this.yStart)&&this.getSquare(this.xStart,this.yStart).unsetAsStartOrEnd(),this.colorSquare(e,t,v,2),this.start=this.getSquare(e,t),this.xStart=e,this.yStart=t}},{key:"unsetStartOrEnd",value:function(e){0===e?this.start=void 0:1===e&&(this.end=void 0)}},{key:"setEndSquare",value:function(e,t){void 0!==this.xEnd&&void 0!==this.yEnd&&this.getSquare(this.xEnd,this.yEnd)&&this.getSquare(this.xEnd,this.yEnd).unsetAsStartOrEnd(),this.colorSquare(e,t,y,3),this.end=this.getSquare(e,t),this.xEnd=e,this.yEnd=t}},{key:"getSquare",value:function(e,t){return this.grid.get(e.toString()+"-"+t.toString())}},{key:"prepareGrid",value:function(e){var t,a=this.grid.values(),s=Object(d.a)(a);try{for(s.s();!(t=s.n()).done;){var i=t.value;i.setAsUnvisited(),i.resetColor()}}catch(n){s.e(n)}finally{s.f()}if(this.highlightedSquares=[],e){var r=Math.floor(this.state.width/(this.state.squareSize+1)/3),h=Math.floor(this.state.height/(this.state.squareSize+1)/2);this.setStartSquare(r,h),this.setEndSquare(2*r,h)}}},{key:"handleSearch",value:function(e){this.searchOngoing?alert("Wait for the current search to finish"):(this.prepareGrid(!1),setTimeout(function(e){this.startSearch(e)}.bind(this),this.state.interval,e))}},{key:"startSearch",value:function(e){var t=this.start.props.x,a=this.start.props.y,s=this.getSquare(t,a),i=this.end.props.x,r=this.end.props.y,h=this.getSquare(i,r),n=void 0!==s&&s.state.color===v,o=void 0!==h&&h.state.color===y;n||o?n?o?(this.searchOngoing=!0,console.log("search started"),"BFS"===e?this.BFS(t,a):"DFS"===e?this.DFS(t,a):"ASTAR"===e?this.AStar(t,a,i,r):console.log("No algorithm selected")):alert("Please add an end node"):alert("Please add a start node"):alert("Please add an end and a start node")}},{key:"BFS",value:function(e,t){console.log(this.grid);var a=[],s=this.getSquare(e,t);a.push(s),s.setAsVisited(),this.highlightedSquares=[],this.highlightedSquares.push(s),this.highlightedSquares[0].highlight(),a.length>0&&this.BFSLoop(a)}},{key:"BFSLoop",value:function(e){if(e.length<1)return this.searchOngoing=!1,0;var t=e.shift();if(t.props.x===this.xEnd&&t.props.y===this.yEnd)return this.searchOngoing=!1,0;for(var a=this.FreeAdjacentSquares(t),s=0;s<this.highlightedSquares.length;s++)this.highlightedSquares[s].unhighlight();this.highlightedSquares=[];for(s=0;s<a.length;s++){if(a[s].props.x===this.xEnd&&a[s].props.y===this.yEnd)return this.searchOngoing=!1,0;a[s].setAsVisited(),e.push(a[s]),a[s].colorSquare(f),this.highlightedSquares.push(a[s]),a[s].highlight()}setTimeout(function(e){this.BFSLoop(e)}.bind(this),this.state.interval,e)}},{key:"DFS",value:function(e,t){var a=[];a.push(this.getSquare(e,t));var s=this.getSquare(e,t);s.setAsVisited(),this.highlightedSquares=[],this.highlightedSquares.push(s),this.highlightedSquares[0].highlight(),(e!=this.xEnd||t!=this.yEnd&&this.stack.length>0)&&this.DFSLoop(e,t,s,a)}},{key:"DFSLoop",value:function(e,t,a,s){var i=this.FreeAdjacentSquares(a);if(!(i.length>0)){this.highlightedSquares[0].unhighlight(),this.highlightedSquares=[];var r=s.pop();if(s.length<1)return this.searchOngoing=!1,0;var h=s.pop();return this.highlightedSquares.push(h),this.highlightedSquares[0].highlight(),r.colorSquare(m),e=h.props.x,t=h.props.y,s.push(h),a=h,(e!=this.xEnd||t!=this.yEnd&&s.length>0)&&setTimeout(function(e,t,a,s){this.DFSLoop(e,t,a,s)}.bind(this),this.state.interval,e,t,a,s),0}a=i[0],s.push(a),a.setAsVisited(),a!==this.end&&a!==this.start&&a.colorSquare(f),this.highlightedSquares[0].unhighlight(),this.highlightedSquares=[],e=a.props.x,t=a.props.y,e!=this.xEnd||t!=this.yEnd&&s.length>0?(this.highlightedSquares.push(a),this.highlightedSquares[0].highlight(),setTimeout(function(e,t,a,s){this.DFSLoop(e,t,a,s)}.bind(this),this.state.interval,e,t,a,s)):this.searchOngoing=!1}},{key:"AStar",value:function(e,t,a,s){var i=[],r=new Map,h=new Map;i.push(this.start),this.highlightedSquares.push(this.start),this.start.setAsVisited(),this.highlightedSquares[0].highlight(),r.set(this.SquareId(this.start),0),setTimeout(function(e,t,a,s){this.AStarLoop(e,t,a,s)}.bind(this),this.state.interval,i,[],r,h)}},{key:"AStarLoop",value:function(e,t,a,s){for(var i=0;i<this.highlightedSquares.length;i++)this.highlightedSquares[i].unhighlight();this.highlightedSquares=[];var r,h=1e6;for(i=0;i<e.length;i++){var n=e[i],o=a.get(this.SquareId(n)),u=this.DistanceFromEnd(n.props.x,n.props.y);o+u<h&&(r=i,h=o+u),this.highlightedSquares.push(n),n.highlight()}for(i=0;i<this.highlightedSquares.length;i++)this.highlightedSquares[i].unhighlight();this.highlightedSquares=[];var l=e[r];l.setAsVisited(),l!==this.start&&l!==this.end&&l.colorSquare(f),this.highlightedSquares.push(l),l.highlight(),e.splice(r,1);var d=this.FreeAdjacentSquares(l,!0);for(i=0;i<d.length;i++){if(d[i]===this.end){for(i=0;i<this.highlightedSquares.length;i++)this.highlightedSquares[i].unhighlight();return this.highlightedSquares=[],this.searchOngoing=!1,0}this.highlightedSquares.push(d[i]),d[i].highlight();var g=this.SquareId(d[i]),c=this.SquareId(l);a.set(g,a.get(c)+1),this.IsInArr(d[i],e)||this.IsInArr(d[i],t)||e.push(d[i])}t.push(l),e.length>0?setTimeout(function(e,t,a,s){this.AStarLoop(e,t,a,s)}.bind(this),this.state.interval,e,t,a,s):this.searchOngoing=!1}},{key:"IsInArr",value:function(e,t){for(var a=0;a<t.length;a++)if(t[a]===e)return!0;return!1}},{key:"DistanceFromStart",value:function(e,t){return Math.abs(e-this.start.props.x)+Math.abs(t-this.start.props.y)}},{key:"DistanceFromEnd",value:function(e,t){return Math.abs(e-this.end.props.x)+Math.abs(t-this.end.props.y)}},{key:"SquareId",value:function(e){return e.props.x.toString()+"-"+e.props.y.toString()}},{key:"FreeAdjacentSquares",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=e.props.x,s=e.props.y,i=[];return void 0!==this.getSquare(a+1,s)&&0===this.getSquare(a+1,s).state.visited&&1!==this.getSquare(a+1,s).state.squareType&&i.push(this.getSquare(a+1,s)),void 0!==this.getSquare(a-1,s)&&0===this.getSquare(a-1,s).state.visited&&1!==this.getSquare(a-1,s).state.squareType&&i.push(this.getSquare(a-1,s)),void 0!==this.getSquare(a,s+1)&&0===this.getSquare(a,s+1).state.visited&&1!==this.getSquare(a,s+1).state.squareType&&i.push(this.getSquare(a,s+1)),void 0!==this.getSquare(a,s-1)&&0===this.getSquare(a,s-1).state.visited&&1!==this.getSquare(a,s-1).state.squareType&&i.push(this.getSquare(a,s-1)),t&&(void 0!==this.getSquare(a+1,s+1)&&0===this.getSquare(a+1,s+1).state.visited&&1!==this.getSquare(a+1,s+1).state.squareType&&i.push(this.getSquare(a+1,s+1)),void 0!==this.getSquare(a-1,s-1)&&0===this.getSquare(a-1,s-1).state.visited&&1!==this.getSquare(a-1,s-1).state.squareType&&i.push(this.getSquare(a-1,s-1)),void 0!==this.getSquare(a-1,s+1)&&0===this.getSquare(a-1,s+1).state.visited&&1!==this.getSquare(a-1,s+1).state.squareType&&i.push(this.getSquare(a-1,s+1)),void 0!==this.getSquare(a+1,s-1)&&0===this.getSquare(a+1,s-1).state.visited&&1!==this.getSquare(a+1,s-1).state.squareType&&i.push(this.getSquare(a+1,s-1))),i}},{key:"render",value:function(){console.log("render");for(var e,t=Math.floor(this.state.width/(this.state.squareSize+1)),a=Math.floor(this.state.height/(this.state.squareSize+1)),s=Math.floor(this.state.width%(this.state.squareSize+1)/t),r=Math.floor(this.state.height%(this.state.squareSize+1)/a),h=this.state.width%(this.state.squareSize+1)%t,n=this.state.height%(this.state.squareSize+1)%a,o=t-h,u=a-n,l=[],d=0;d<h;d++)e=i.a.createElement(O,{key:d,x:d,nNormalSquares:u,nHigherSquares:n,extraHeightValue:r,squareSize:this.state.squareSize,width:this.state.squareSize+s+1}),l.push(e);for(d=0;d<o;d++)e=i.a.createElement(O,{key:d+h,x:d+h,nNormalSquares:u,nHigherSquares:n,extraHeightValue:r,squareSize:this.state.squareSize,width:this.state.squareSize+s}),l.push(e);var g={mousedown:this.state.mousedown,color:this.state.color,squareType:this.state.squareType,dropdownSquareType:this.state.dropdownSquareType,eraserActive:this.state.eraserActive,changeContextSquareType:this.changeContextSquareType,setStartSquare:this.setStartSquare,setEndSquare:this.setEndSquare,addSquareToGrid:this.addSquareToGrid,removeSquareFromGrid:this.removeSquareFromGrid,unsetStartOrEnd:this.unsetStartOrEnd};return i.a.createElement("div",null,i.a.createElement(b,{handleSearch:this.handleSearch,handleSquareResize:this.handleSquareResize,handleIntervalChange:this.handleIntervalChange,handleSquareTypeChange:this.handleSquareTypeChange,handleEraserChange:this.handleEraserActiveChange}),i.a.createElement(c.Provider,{value:g},i.a.createElement("div",{className:"grid"},l)))}}]),a}(i.a.Component),k=function(e){Object(u.a)(a,e);var t=Object(l.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return i.a.createElement(T,null)}}]),a}(i.a.Component);h.a.render(i.a.createElement(k,null),document.getElementById("root"))}],[[9,1,2]]]);
//# sourceMappingURL=main.e291e748.chunk.js.map