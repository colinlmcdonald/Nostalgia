import React from 'react';

const DEFAULT_LISTEN_INTERVAL = 10000;

class ReactAudioPlayer extends React.Component {
  componentDidMount() {
    const audio = this.audioEl;


    // this.props.play ? audio.trigger('play')
    audio.addEventListener('error', (e) => {
      this.props.onError && this.props.onError(e);
    });

    // When enough of the file has downloaded to start playing
    audio.addEventListener('canplay', (e) => {
      this.props.onCanPlay && this.props.onCanPlay(e);
    });

    // When enough of the file has downloaded to play the entire file
    audio.addEventListener('canplaythrough', (e) => {
      this.props.onCanPlayThrough && this.props.onCanPlayThrough(e);
    });

    // When audio play starts
    audio.addEventListener('play', (e) => {
      this.setListenTrack();
      this.props.onPlay && this.props.onPlay(e);
    });

    // When unloading the audio player (switching to another src)
    audio.addEventListener('abort', (e) => {
      this.clearListenTrack();
      this.props.onAbort && this.props.onAbort(e);
    });

    // When the file has finished playing to the end
    audio.addEventListener('ended', (e) => {
      this.clearListenTrack();
      this.props.onEnded && this.props.onEnded(e);
    });

    // When the user pauses playback
    audio.addEventListener('pause', (e) => {
      this.clearListenTrack();
      this.props.onPause && this.props.onPause(e);
    });

    // When the user drags the time indicator to a new time
    audio.addEventListener('seeked', (e) => {
      this.clearListenTrack();
      this.props.onSeeked && this.props.onSeeked(e);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedPlayerEvent) {
      const audio = this.audioEl;

      audio.currentTime = nextProps.selectedPlayerEvent.playTime;
      audio.play();
    }
  }

  /**
   * Set an interval to call props.onListen every props.listenInterval time period
   */
  setListenTrack() {
    if (!this.listenTracker) {
      const listenInterval = this.props.listenInterval || DEFAULT_LISTEN_INTERVAL;
      this.listenTracker = setInterval(() => {
        this.props.onListen && this.props.onListen(this.audioEl.currentTime);
      }, listenInterval);
    }
  }

  /**
   * Clear the onListen interval
   */
  clearListenTrack() {
    if (this.listenTracker) {
      clearInterval(this.listenTracker);
      this.listenTracker = null;
    }
  }

  render() {
    const incompatibilityMessage = this.props.children || (
      <p>Your browser does not support the <code>audio</code> element.</p>
    );
    if (this.props.pause) {
      const audio = document.getElementsByClassName('react-audio-player')
      audio[0].pause();
    } 
    if (this.props.play) {
      const audio = document.getElementsByClassName('react-audio-player')
      audio[0].play();
    }
    return (
      <audio
        className="react-audio-player"
        src={this.props.src}
        autoPlay={this.props.autoPlay}
        preload={this.props.preload}
        controls
        ref={(ref) => this.audioEl = ref}
        onPlay={this.onPlay}
      >
        {incompatibilityMessage}
      </audio>
    );
  }
}

ReactAudioPlayer.propTypes = {
  autoPlay: React.PropTypes.string,
  children: React.PropTypes.array,
  listenInterval: React.PropTypes.number,
  onAbort: React.PropTypes.func,
  onCanPlay: React.PropTypes.func,
  onCanPlayThrough: React.PropTypes.func,
  onEnded: React.PropTypes.func,
  onError: React.PropTypes.func,
  onListen: React.PropTypes.func,
  onPause: React.PropTypes.func,
  onPlay: React.PropTypes.func,
  onSeeked: React.PropTypes.func,
  preload: React.PropTypes.string,
  src: React.PropTypes.string,
};

export default ReactAudioPlayer;
