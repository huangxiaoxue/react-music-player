import React from 'react'
import './header.less'
import './progress.less'

let Progress = React.createClass({
    getDefaultProps(){
      return {
          barColor: '#2f9842'
      }
    },
    changeProgress(e){
       let progressBar= this.refs.progressBar;
       /*e.clientX是鼠标点击的长度，
         progressBar.getBoundingClientRect().left是进度条距离左边空白的距离，
         progressBar.clientWidth是进度条的总长度；
       */ 
       let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
      this.props.onProgressChange && this.props.onProgressChange(progress);
    },
    render(){
        return(
            <div className="components-progress" ref="progressBar" onClick={this.changeProgress}>
               <div className="progress" style={{width:`${this.props.progress}%`,background: this.props.barColor}} ></div>
            </div>
        );
    }
});

export default Progress;