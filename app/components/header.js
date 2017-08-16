import React from 'react'
import './header.less'



let Header = React.createClass({
    render(){
        return(
            <div className="components-header row">
                {/*<img src="/static/images/logo.png" width="40" alt="" className="-col-auto" />*/}
                <i className="glyphicon glyphicon-music -col-auto" style ={{fontSize:'36px',color:'red'}}></i>
                <h1 className="caption"> 
                音乐播放器
                </h1>
            </div>
        );
    }
});

export default Header;