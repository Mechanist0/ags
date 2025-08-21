import Astal from "gi://Astal?version=4.0";
import Gdk from "gi://Gdk?version=4.0";
import Gio from "gi://Gio?version=2.0";
import Gtk from "gi://Gtk?version=4.0";
import app from "ags/gtk4/app";
import GLib from "gi://GLib?version=2.0";
import { configOptions } from "../utils/configUtils";

var wallpaperPath = "";
const wallpaperPaths = [
  "Flower0.jpg",
  "Flower1.jpg",
  "Flower2.jpg",
  "crankshaft.mp4",
];

// Monitor config file for changes to wallpaper path
// If Config
export const stopVixPaper = () => {
  app.get_window("vixpaper")?.destroy();
  if (globalThis.debug) log("Destroyed VixPaper");
};

export const vixpaper = (monitor: Gdk.Monitor) => {
  const { TOP, LEFT, RIGHT, BOTTOM } = Astal.WindowAnchor;

  // Setup config opts
  wallpaperPath = configOptions.get().wallpaperPath;

  return (
    <window
      name={"vixpaper"}
      gdkmonitor={monitor}
      layer={Astal.Layer.BACKGROUND}
      anchor={TOP | LEFT | RIGHT | BOTTOM}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      application={app}
      visible // This needs to happen after we set the layer for reasons beyond our comprehension, the widget ignores the layer settings otherwise
    >
      <button
        valign={Gtk.Align.END}
        halign={Gtk.Align.END}
        onClicked={stopVixPaper}
      />

      {animatedWallpaperHandler()}
    </window>
  );
};

const animatedWallpaperHandler = () => {
  const testMedia = GLib.filename_from_utf8(
    wallpaperPath + wallpaperPaths[3],
    (wallpaperPath + wallpaperPaths[3]).length,
  );
  log(testMedia);
  const video = Gtk.MediaFile.new_for_file(Gio.file_new_for_path(testMedia[0]));
  const image = Gtk.Picture.new_for_paintable(video);
  video.play();
  video.set_loop(true);
  image.set_size_request(100, 100);

  return image;
};
