import { readFile } from "ags/file";
import { Gtk } from "ags/gtk4";
import { timeout } from "ags/time";
import GLib from "gi://GLib?version=2.0";
import Gio from "gi://Gio?version=2.0";
import { readdir } from "node:fs";

const wallpaperPaths = [
  "Flower0.jpg",
  "Flower1.jpg",
  "Flower2.jpg",
  "crankshaft.mp4",
];

export const PlaylistAutoSwitcher = (
  wallPath: string,
  wallFileList: string[],
  index: number,
  durationOverride?: number,
  durationConfig?: number[],
) => {
  if (index >= wallFileList.length) index = 0;
  if (wallFileList[index].search(".jpg"))
    timeout(durationOverride ? )
    return staticWallpaperHandler(wallPath + wallFileList[index]);
  else if (wallFileList[index].search(".mp4"))
    return animatedWallpaperHandler(wallPath + wallFileList[index]);
};

export const staticWallpaperHandler = (path: string) => {
  const image = Gtk.Picture.new_for_filename(
    GLib.filename_from_utf8(path, path.length)[0],
  );
  return image;
};

export const animatedWallpaperHandler = (path: string) => {
  const testMedia = GLib.filename_from_utf8(
    path + wallpaperPaths[3],
    (path + wallpaperPaths[3]).length,
  );
  log(testMedia);
  const video = Gtk.MediaFile.new_for_file(Gio.file_new_for_path(testMedia[0]));
  const image = Gtk.Picture.new_for_paintable(video);
  video.play();
  video.set_loop(true);
  image.set_size_request(100, 100);

  return image;
};
