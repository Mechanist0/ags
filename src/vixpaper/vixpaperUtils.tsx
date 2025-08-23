import { createState, With } from "ags";
import { Gtk } from "ags/gtk4";
import { timeout } from "ags/time";
import GLib from "gi://GLib?version=2.0";
import { Config } from "../utils/config";
import Gio from "gi://Gio?version=2.0";

const wallpaperPaths = [
  "Flower0.jpg",
  "Flower1.jpg",
  "Flower2.jpg",
  "crankshaft.mp4",
];

export const PlaylistAutoSwitcher = (props: { config: Accessor<Config> }) => {
  const [index, setIndex] = createState(0);

  const nextImg = () => {
    setIndex((index.get() + 1) % props.config.get().wallpaperFiles.length);
    timeout(props.config.get().wallpaperDurations[index.get()], nextImg);
  };

  timeout(props.config.get().wallpaperDurations[index.get()], nextImg);

  return (
    <With value={index}>
      {(index) => {
        const file = props.config.get().wallpaperFiles[index];
        const path = props.config.get().wallpaperPath + file;
        if (/\.(png|jpg)$/.test(file)) {
          return staticWallpaperHandler(path);
        } else if (/\.(mp4)$/.test(file)) {
          return animatedWallpaperHandler(path);
        } else {
          return <Gtk.Label label={`Invalid type: ${file}`} />;
        }
      }}
    </With>
  );
};

export const staticWallpaperHandler = (path: string) => {
  const image = Gtk.Picture.new_for_filename(
    GLib.filename_from_utf8(path, path.length)[0],
  );
  return image;
};

export const animatedWallpaperHandler = (path: string) => {
  const video = Gtk.MediaFile.new_for_file(Gio.file_new_for_path(path));
  const image = Gtk.Picture.new_for_paintable(video);
  video.play();
  video.set_loop(true);
  image.set_size_request(100, 100);

  return image;
};
