import React from 'react'
import './musiclistitem.less'
import Pubsub from 'pubsub-js'
let MusicListItem = React.createClass({
     playMusic(musicItem){
         Pubsub.publish('PLAY_MUSIC',musicItem);
     },
    deleteMusic(musicItem,e){
        e.stopPropagation();
        Pubsub.publish('DELETE_MUSIC',musicItem);
    },
    render(){
        let musicItem=this.props.musicItem;
       
        return(
            
                <li onClick={this.playMusic.bind(this,musicItem)} className={`row components-musiclistitem ${this.props.focus ? 'focus' : ''}`}>
                <p><strong>{musicItem.title}</strong> - {musicItem.artist}</p>
                
                <i className="glyphicon glyphicon-remove-circle -col-auto" onClick={this.deleteMusic.bind(this,musicItem)} style={{color:'#FFD39B'}}>删除</i>
                {/*<p className="-col-auto delete" onClick={this.deleteMusic.bind(this,musicItem)}></p>*/}
            </li>
        );
    }
});

export default MusicListItem;