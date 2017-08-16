import React from 'react';
import Header from './components/header'
import Player from './page/player'
import MusicList from './page/musiclist'
import {MUSIC_LIST} from './config/musiclist'
import {Router, IndexRoute,Link,Route,hashHistory } from 'react-router'
import Pubsub from 'pubsub-js'

let App = React.createClass({
    /* 
      初始化:musicList歌曲列表；
            currentMusicItem当前播放的歌曲
    */
     getInitialState(){
        return{
            musicList:MUSIC_LIST,
            currentMusicItem: MUSIC_LIST[0]
        }
    },
     /*
         播放歌曲:当前歌曲musicItem信息；
    */
    playMusic(musicItem){
        $('#player').jPlayer('setMedia',{
            mp3: musicItem.file
        }).jPlayer('play');
        this.setState({
            currentMusicItem: musicItem
        })
    },
     /*
         播放下一曲:
    */
    playNext(type ="next"){
          let index =this.findMusicIndex(this.state.currentMusicItem);
          let newIndex =null;
          let musicListLength= this.state.musicList.length;
        
          if(type=== 'next' || type === '顺序播放'){
             newIndex =(index+1) % musicListLength;
          }else{
             if(type === '随机播放' || type === '循环播放'){
                 if(type === '循环播放'){
                     newIndex =index;
                 }else{
                     console.log(Math.floor(Math.random()*6+1));
                     console.log(parseInt(Math.random()*musicListLength));
                    newIndex = (Math.floor(Math.random()*musicListLength+1)) % musicListLength;
                 }
                 
             }else{
                 newIndex =(index-1+ musicListLength) % musicListLength ;
             }
             
          }
          this.playMusic(this.state.musicList[newIndex]);
    },
    findMusicIndex(musicItem){
        return this.state.musicList.indexOf(musicItem);
    },
   componentDidMount(){
        $("#player").jPlayer({
         /* ready: function (){
                $(this).jPlayer('setMedia',{
                    mp3: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3'
                }).jPlayer('play');
            },*/
            supplied: "mp3",
            wmode: "window",
            useStateClassSkin: true
        });
        this.playMusic(this.state.currentMusicItem);
        $('#player').bind($.jPlayer.event.ended,(e)=>{
           
            this.playNext($('#test2').text());
        })
        Pubsub.subscribe('DELETE_MUSIC',(msg,musicItem)=>{
            this.setState({
                musicList:this.state.musicList.filter(item => {
                    return item !== musicItem;
                })
            })
        });
         /*监听player.js中的Pubsub.publish('PLAY_PREV')事件等;*/ 
        Pubsub.subscribe('PLAY_MUSIC',(msg,musicItem)=>{
           this.playMusic(musicItem);
        });
         Pubsub.subscribe('PLAY_PREV',(msg,musicItem)=>{
           this.playNext('prev');
        });
        Pubsub.subscribe('PLAY_NEXT',(msg,musicItem)=>{
           this.playNext();
        });
         
       
    },
    componentWillUnMount(){
        /*解绑组件订阅*/ 
        Pubsub.unsubscribe('DELETE_MUSIC');
        Pubsub.unsubscribe('PLAY_MUSIC');
        Pubsub.unsubscribe('PLAY_PREV');
        Pubsub.unsubscribe('PLAY_ NEXT');
        $('.#player').unbind($.jPlayer.event.ended);
    },
   
    render() {
        return (
            <div>
            <Header />
            {React.cloneElement(this.props.children,this.state)}
        
            </div>
        );
    }
});
let Root=React.createClass({
   render(){
      return (<Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Player}></IndexRoute>
            <Route path="/list" component={MusicList}></Route>
        </Route>
        </Router>
      );
   }
});

export default Root;