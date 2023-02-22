import { Audio } from "expo-av";

export default function startAudio(call) {
  async function playStartAudio() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/startRace.mp3")
    );
    if (call === 1) {
      await sound.playAsync();
    }
  }
  playStartAudio();
}
