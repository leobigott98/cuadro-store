import { VideoView, useVideoPlayer } from "expo-video";
import { StyleSheet } from "react-native";

const videoSource = require("@/assets/video/ANIMACION_HUELLAS.mp4");

export default function Video() {
      const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
    player.muted = true;
  }); 

    return(
        <VideoView
                player={player}
                style={styles.backgroundVideo}
                fullscreenOptions={
                  {enable: false}
                }
                nativeControls={false} // Hide native controls
              />
    )
}

const styles = StyleSheet.create({
backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flex: 1,
    resizeMode: 'cover'
  },
})