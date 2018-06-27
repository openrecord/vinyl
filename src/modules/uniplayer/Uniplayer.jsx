import './uniplayer.scss';

import React from 'react';
import ReactPlayer from 'react-player';
import Duration from './Duration.jsx';

export default class Uniplayer extends React.Component {

  constructor(props) {
   super(props);

   this.state = {

     //Player State
     playing: true,
     volume: 1,
     muted: false,
     played: 0,
     loaded: 0,
     duration: 0,
     playbackRate: 1.0,
     loop: false,
     seeking: false,
   };

   //React Player Functions
   this.stop = this.stop.bind(this);
   this.toggleLoop = this.toggleLoop.bind(this);
   this.setVolume = this.setVolume.bind(this);
   this.toggleMuted = this.toggleMuted.bind(this);
   this.setPlaybackRate = this.setPlaybackRate.bind(this);
   this.onPlay = this.onPlay.bind(this);
   this.onPause = this.onPause.bind(this);
   this.onSeekMouseDown = this.onSeekMouseDown.bind(this);
   this.onSeekChange = this.onSeekChange.bind(this);
   this.onSeekMouseUp = this.onSeekMouseUp.bind(this);
   this.onProgress = this.onProgress.bind(this);
   this.onEnded = this.onEnded.bind(this);
   this.onDuration = this.onDuration.bind(this);

   //OpenRecord Player Addon Functions
   this.playToggle = this.playToggle.bind(this);
 }

 //React Player Functions
 stop(){
   this.setState({ url: null, playing: false })
 }
 toggleLoop(){
   this.setState({ loop: !this.state.loop })
 }
 setVolume(e){
   this.setState({ volume: parseFloat(e.target.value) })
 }
 toggleMuted(){
   this.setState({ muted: !this.state.muted })
 }
 setPlaybackRate(e){
   this.setState({ playbackRate: parseFloat(e.target.value) })
 }
 onPlay(){
   this.setState({ playing: true })
 }
 onPause(){
   this.setState({ playing: false })
 }
 onEnded(){
   if(this.state.repeat){
     if(this.state.isYouTube){
       this.YTPlayer.seekTo(0);
     } else {
       this.SCPlayer.seekTo(0);
     }
   } else{
     this.autoplayNext();
   }
 }
 onSeekMouseDown(e){
   this.setState({ seeking: true })
 }
 onSeekChange(e){
   this.setState({ played: parseFloat(e.target.value) })
 }
 onSeekMouseUp(e){
   this.setState({ seeking: false });
   this.YTPlayer.seekTo(parseFloat(e.target.value));
 }
 onProgress(state){
   // We only want to update time slider if we are not currently seeking
   if (!this.state.seeking) {
     this.setState(state)
   }
 }
 onDuration(duration){
   this.setState({ duration })
 }

 //OpenRecord Player Addon Functions
 playToggle(){
   if(this.state.playing){
     this.setState({playing: false});
   } else{
     this.setState({playing: true});
   }
 }

 setYTPlayer = player => {
   this.YTPlayer = player
 }

 renderYT(){
   var player = {};
   player.id = 'https://www.youtube.com/watch?v=' + '2H5R0bdblEE';
   return(
     <div className="player-holder">
       <ReactPlayer
         ref={this.setYTPlayer}
         className='react-player'
         width='100%'
         height='100%'
         url={player.id}
         playing={this.state.playing}
         loop={this.state.loop}
         playbackRate={this.state.playbackRate}
         volume={this.state.volume}
         muted={this.state.muted}
         onReady={() => console.log('onReady')}
         onStart={() => console.log('onStart')}
         onPlay={this.onPlay}
         onPause={this.onPause}
         onBuffer={() => console.log('onBuffer')}
         onSeek={e => console.log('onSeek', e)}
         onEnded={this.onEnded}
         onError={e => console.log('onError', e)}
         onProgress={this.onProgress}
         onDuration={this.onDuration}
       />
     </div>
   )
 }

 render(){
   var player = {};
   if(this.state.playing){
     player.status = "playing";
   } else{
     player.status = "paused";
   }
   return(
   <div className="uniplayer-container">
     <div className="uniplayer-holder">
       <div className="uniplayer">
         <div className="user-box">
           <div className="user-image-holder">
             <div className="user-image"/>
           </div>
           <div className="user-id">
             <h5>Added by</h5>
             <h5>Superluckyland</h5>
           </div>
         </div>
         <div className="controls-box">
           <div className="arrow previous"/>
           <div className={"play-pause " + player.status} onClick={this.playToggle}/>
           <div className="arrow next"/>
         </div>
         <div className="playback-box">
           <input className="player-bar"
             type='range' min={0} max={1} step='any'
             value={this.state.played}
             onMouseDown={this.onSeekMouseDown}
             onChange={this.onSeekChange}
             onMouseUp={this.onSeekMouseUp}
           />
           <h4 className="song-title">Diplo - Stay Open (feat. MØ) [Official Lyric Video]</h4>
           <div className="time-box">
             <Duration seconds={this.state.duration * this.state.played} />
             <h4 className="time-divider">-</h4>
             <Duration seconds={this.state.duration} />
           </div>
         </div>
       </div>
     </div>
     {this.renderYT()}
   </div>

   )
 }
}
