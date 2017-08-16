import React from 'react';
import Progress from '../components/progress';
import { Link } from 'react-router';
import Pubsub from 'pubsub-js'
import MusicList from './musiclist'

require('./player.less');

let duration = null;

let Player = React.createClass({
	
    getIntialState(){
        return {
            progress: 0,
            volume: 0,
            isPlay: true,
			leftTime: '',
			
        }
    },
	/* 当点击上一首时触发，即通过{this.playPrev}来触发*/
	playPrev(){
		Pubsub.publish('PLAY_PREV');
	},
	playNext(){
		Pubsub.publish('PLAY_NEXT');
	},
	componentDidMount() {
		$("#player").bind($.jPlayer.event.timeupdate, (e) => {
			duration = e.jPlayer.status.duration;
			this.setState({
				progress: e.jPlayer.status.currentPercentAbsolute,
				volume: e.jPlayer.options.volume * 100,
				/*设置歌词时间格式*/ 
				leftTime: this.formatTime(duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))
			});
		});
	},
	componentWillUnmount() {
		$("#player").unbind($.jPlayer.event.timeupdate);
	},
	formatTime(time) {
		time = Math.floor(time);
		let miniute = Math.floor(time / 60);
		let seconds = Math.floor(time % 60);

		return miniute + ':' + (seconds < 10 ? '0' + seconds : seconds);
	},
	changeProgressHandler(progress) {
		$("#player").jPlayer("play", duration * progress);
		this.setState({
			isPlay: true
		});
	},
	changeVolumeHandler(progress) {
		$("#player").jPlayer("volume", progress);
	},
	/*播放歌曲*/ 
	play() {
		if (this.state.isPlay) {
			$("#player").jPlayer("pause");
		} else {
			$("#player").jPlayer("play");
		}
		this.setState({
			isPlay: !this.state.isPlay
		});
	},
	/*设置歌曲播放下拉回现 */
	playSetting(e){
       var $target = $(e.target);
	   $target.is('li') && $('#test2').text($target.text());

	},
	
	changeRepeat() {
		PubSub.publish('CHANAGE_REPEAT');
	},
	getInitialState() {
		return {
			progress: 0,
			volume: 0,
			isPlay: true,
			leftTime: '',
		  
		}
	},	
    render() {
        return (
			<div className="row pages">
				<div className="player-list -col-auto">
					<MusicList
         currentMusicItem={this.props.currentMusicItem}
         musicList={this.props.musicList}
         
         ></MusicList>
				</div>
            <div className="player-page">
				
                <h1 className="caption" style={{fontSize:'24px',color:'#919191'}}><Link to="/list" style={{fontSize:'24px',textDecoration:'none',color:'#919191'}}>歌曲列表</Link></h1>
                <div className="mt10 row">
                	<div className="controll-wrapper">
                		<h2 className="music-title">{this.props.currentMusicItem.title}</h2>
                		<h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
                		<div className="row mt20">
                			<div className="left-time -col-auto">-{this.state.leftTime}</div>
                			<div className="volume-container">
                				<i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                				<div className="volume-wrapper">
					                <Progress
										progress={this.state.volume}
										onProgressChange={this.changeVolumeHandler}
										barColor='#aaa'
					                >
					                </Progress>
                				</div>
                			</div>
                		</div>
                		<div style={{height: 10, lineHeight: '10px'}}>
			                <Progress
								progress={this.state.progress}
								onProgressChange={this.changeProgressHandler}
			                >
			                </Progress>
                		</div>
                		<div className="mt10 row">
                			<div>
	                			<i className="icon prev" onClick={this.playPrev}></i>
	                			<i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} onClick={this.play}></i>
	                			<i className="icon next ml20" onClick={this.playNext}></i>
                			</div>
                			<div className="-col-auto">
                				
								<i className="" 
								  style={{fontSize:'36px',color:'#glyphicon glyphicon-cog'}}
								  onClick={this.playSetting}
								>
								<div className="btn-group" style={{fontSize:'36px',background:'#969696'}} >
									<button type="button" className="btn btn-success" id="test2">循环播放</button>
									<button type="button" className="btn btn-success "
									 data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" onClick={this.playSetting}>
										<span className="glyphicon glyphicon-cog"  ></span>
										
									</button>
									<ul className="dropdown-menu" style={{padding:'2px 30px'}}>
										<li >循环播放</li>
										<li role="separator" className="divider"></li>
										<li>随机播放</li>
										<li role="separator" className="divider"></li>
										<li>顺序播放</li>
										
									</ul>
                               </div>


								</i>
		
                			</div>
                		</div>
                	</div>
                	<div className="-col-auto cover">
                		<img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
                	</div>
                </div>
            </div>
		</div>	
        );
    }
});

export default Player;
