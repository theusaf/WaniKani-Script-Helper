export function preventAudioClipping() {
  new (window.AudioContext || window.webkitAudioContext)();
}
