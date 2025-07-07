import { startVix, stopVix } from "./vixpaper/vixpaperUtils";

const layerName = "vixpaper";

/*
  Vixpaper will scroll through a folder of images/gifs
  Ability to set duration between images
  Experiment with animation

  Start
  Stop
  Reload
*/

globalThis.vixpaper = {
  start: (path: string) => startVix(path),
  stop: () => stopVix(),
  reload: (path: string) => {
    stopVix();
    startVix(path);
  },
};
