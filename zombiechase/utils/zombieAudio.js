import { Audio } from "expo-av";

export default function zombieAudio() {
  async function playZombieAudio() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/zombieClip.mp3")
    );
    await sound.playAsync();
  }
  playZombieAudio();
}
