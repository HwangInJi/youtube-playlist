(self.webpackChunkyoutube_playlist=self.webpackChunkyoutube_playlist||[]).push([[340],{4045:(e,t,a)=>{var n,l=Object.create,o=Object.defineProperty,s=Object.getOwnPropertyDescriptor,i=Object.getOwnPropertyNames,r=Object.getPrototypeOf,u=Object.prototype.hasOwnProperty,p=(e,t,a,n)=>{if(t&&"object"===typeof t||"function"===typeof t)for(let l of i(t))u.call(e,l)||l===a||o(e,l,{get:()=>t[l],enumerable:!(n=s(t,l))||n.enumerable});return e},y=(e,t,a)=>(((e,t,a)=>{t in e?o(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a})(e,"symbol"!==typeof t?t+"":t,a),a),h={};((e,t)=>{for(var a in t)o(e,a,{get:t[a],enumerable:!0})})(h,{default:()=>P}),e.exports=(n=h,p(o({},"__esModule",{value:!0}),n));var c=((e,t,a)=>(a=null!=e?l(r(e)):{},p(!t&&e&&e.__esModule?a:o(a,"default",{value:e,enumerable:!0}),e)))(a(5043)),d=a(2206),b=a(1520);class P extends c.Component{constructor(){var e;super(...arguments),e=this,y(this,"callPlayer",d.callPlayer),y(this,"playerID",this.props.config.playerId||"".concat("wistia-player-").concat((0,d.randomString)())),y(this,"onPlay",(function(){return e.props.onPlay(...arguments)})),y(this,"onPause",(function(){return e.props.onPause(...arguments)})),y(this,"onSeek",(function(){return e.props.onSeek(...arguments)})),y(this,"onEnded",(function(){return e.props.onEnded(...arguments)})),y(this,"onPlaybackRateChange",(function(){return e.props.onPlaybackRateChange(...arguments)})),y(this,"mute",(()=>{this.callPlayer("mute")})),y(this,"unmute",(()=>{this.callPlayer("unmute")}))}componentDidMount(){this.props.onMount&&this.props.onMount(this)}load(e){const{playing:t,muted:a,controls:n,onReady:l,config:o,onError:s}=this.props;(0,d.getSDK)("https://fast.wistia.com/assets/external/E-v1.js","Wistia").then((e=>{o.customControls&&o.customControls.forEach((t=>e.defineControl(t))),window._wq=window._wq||[],window._wq.push({id:this.playerID,options:{autoPlay:t,silentAutoPlay:"allow",muted:a,controlsVisibleOnLoad:n,fullscreenButton:n,playbar:n,playbackRateControl:n,qualityControl:n,volumeControl:n,settingsControl:n,smallPlayButton:n,...o.options},onReady:e=>{this.player=e,this.unbind(),this.player.bind("play",this.onPlay),this.player.bind("pause",this.onPause),this.player.bind("seek",this.onSeek),this.player.bind("end",this.onEnded),this.player.bind("playbackratechange",this.onPlaybackRateChange),l()}})}),s)}unbind(){this.player.unbind("play",this.onPlay),this.player.unbind("pause",this.onPause),this.player.unbind("seek",this.onSeek),this.player.unbind("end",this.onEnded),this.player.unbind("playbackratechange",this.onPlaybackRateChange)}play(){this.callPlayer("play")}pause(){this.callPlayer("pause")}stop(){this.unbind(),this.callPlayer("remove")}seekTo(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];this.callPlayer("time",e),t||this.pause()}setVolume(e){this.callPlayer("volume",e)}setPlaybackRate(e){this.callPlayer("playbackRate",e)}getDuration(){return this.callPlayer("duration")}getCurrentTime(){return this.callPlayer("time")}getSecondsLoaded(){return null}render(){const{url:e}=this.props,t=e&&e.match(b.MATCH_URL_WISTIA)[1],a="wistia_embed wistia_async_".concat(t);return c.default.createElement("div",{id:this.playerID,key:t,className:a,style:{width:"100%",height:"100%"}})}}y(P,"displayName","Wistia"),y(P,"canPlay",b.canPlay.wistia),y(P,"loopOnEnded",!0)}}]);
//# sourceMappingURL=reactPlayerWistia.8884c0b0.chunk.js.map