import { startVixpaper, stopVixpaper } from "./vixpaper/vixpaperUtils";

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
  start: (path: string) => startVixpaper(path),
  stop: () => stopVixpaper(),
  reload: (path: string) => {
    stopVixpaper();
    startVixpaper(path);
  },
};
