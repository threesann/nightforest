const AudioTracks = [
  {
    id: "voice_shopkeeper",
    src: "/assets/audio/alt_speak.wav"
  },
  {
    id: "mystery",
    src: "/assets/audio/mystery.mp3" 
  },
];

function playAudioById(id) {
  const audioObj = AudioTracks.find(AudioTracks => AudioTracks.id === id);
  if (audioObj) {
    const audioElement = new Audio(audioObj.src);
    audioElement.currentTime = 0; // reset audio to start
    audioElement.play();
  }
}

export { AudioTracks, playAudioById };