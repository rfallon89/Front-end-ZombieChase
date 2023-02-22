import { Audio } from "expo-av";

export default function startAudio() {
  async function playStartAudio() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/startRace.mp3")
    );
    await sound.playAsync();
  }
  playStartAudio();
}
