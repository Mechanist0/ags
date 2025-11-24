import { Accessor, createState, Setter, With } from "ags";
import { Gdk, Gtk } from "ags/gtk4";
import { timeout } from "ags/time";
import GLib from "gi://GLib?version=2.0";
import { Config } from "../utils/config";
import Gio from "gi://Gio?version=2.0";

export const PlaylistAutoSwitcher = (props: {
  config: Accessor<Config>;
  monitor: Gdk.Monitor;
}) => {
  const [index, setIndex] = createState(0);
  const [mediaCache, setMediaCache] = createState(
    new Map<string, Gtk.Picture>(),
  );

  const nextImg = () => {
    setIndex((index.get() + 1) % props.config.get().wallpaperFiles.length);
    timeout(props.config.get().wallpaperDurations[index.get()] * 1000, nextImg);
  };

  timeout(props.config.get().wallpaperDurations[index.get()], nextImg);

  return (
    <With value={index}>
      {(index) => {
        const file = props.config.get().wallpaperFiles[index];
        const path = props.config.get().wallpaperPath + file;

        if (/\.(png|jpg)$/.test(file)) {
          return staticWallpaperHandler(
            path,
            mediaCache.get(),
            setMediaCache,
            props.monitor,
          );
        } else if (/\.(mp4|gif)$/.test(file)) {
          return animatedWallpaperHandler(
            path,
            mediaCache.get(),
            setMediaCache,
            props.monitor,
          );
        } else {
          return <Gtk.Label label={`Invalid type: ${file}`} />;
        }
      }}
    </With>
  );
};

export const staticWallpaperHandler = (
  path: string,
  cache: Map<string, Gtk.Picture>,
  setMediaCache: Setter<Map<string, Gtk.Picture>>,
  monitor: Gdk.Monitor,
) => {
  if (cache.has(path)) return cache.get(path);
  const image = Gtk.Picture.new_for_filename(
    GLib.filename_from_utf8(path, path.length)[0],
  );
  image.set_size_request(monitor.geometry.width, monitor.geometry.height);
  cache.set(path, image);
  setMediaCache(cache);
  return image;
};

export const animatedWallpaperHandler = (
  path: string,
  cache: Map<string, Gtk.Picture>,
  setMediaCache: Setter<Map<string, Gtk.Picture>>,
  monitor: Gdk.Monitor,
) => {
  if (cache.has(path)) return cache.get(path);
  const video = Gtk.MediaFile.new_for_file(Gio.file_new_for_path(path));
  const image = Gtk.Picture.new_for_paintable(video);
  video.play();
  video.set_loop(true);
  image.set_size_request(monitor.geometry.width, monitor.geometry.height);
  cache.set(path, image);
  return image;
};
