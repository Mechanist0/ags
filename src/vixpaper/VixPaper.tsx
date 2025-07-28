import { App, Widget } from "astal/gtk4";
import { Box, BoxProps, Button, Label } from "astal/gtk4/widget";
import Astal from "gi://Astal?version=4.0";
import Gdk from "gi://Gdk?version=4.0";
import Gio from "gi://Gio?version=2.0";
import Gtk from "gi://Gtk?version=4.0";
import { interval } from "astal/time";
import { GLib, signal } from "astal";

const wallpaperPath = GLib.get_current_dir() + "/res/wallpapers/";

const wallpaperPaths = [
  wallpaperPath + "Flower0.jpg",
  wallpaperPath + "Flower1.jpg",
  wallpaperPath + "Flower2.jpg",
  wallpaperPath + "crankshaft.mp4",
];

export const startVixPaper = (path: string) => {
  App.start({
    main() {
      App.get_monitors().map(vixpaper);
    },
  });

  if (globalThis.debug) log("VixPaper Successfully Started");
};

export const stopVixPaper = () => {
  App.get_window("vixpaper")?.destroy();
  if (globalThis.debug) log("Destroyed VixPaper");
};

export const vixpaper = (monitor: Gdk.Monitor) => {
  const { TOP, LEFT, RIGHT, BOTTOM } = Astal.WindowAnchor;
  if (globalThis.debug) log(globalThis.resPath);

  const boxEl: JSX.IntrinsicElements["box"] = Box({
    valign: Gtk.Align.CENTER,
    halign: Gtk.Align.CENTER,
    children: [
      Label({
        label: "sup",
      }),
      Button({
        onClicked: stopVixPaper,
      }),
      webmHandler(),
    ],
  });

  return (
    <window
      visible
      name={"vixpaper"}
      gdkmonitor={monitor}
      exclusivity={Astal.Exclusivity.IGNORE}
      anchor={TOP | LEFT | RIGHT}
      application={App}
    >
      {boxEl}
    </window>
  );
};

const animationHandle: Gtk.TickCallback = (
  widget: Gtk.Widget,
  clock: Gdk.FrameClock,
): boolean => {
  widget.queue_allocate();
  return true;
};

const webmHandler = () => {
  const testMedia = GLib.filename_from_utf8(
    wallpaperPaths[3],
    wallpaperPaths[3].length,
  );
  log(testMedia);
  const video = Gtk.MediaFile.new_for_file(Gio.file_new_for_path(testMedia[0]));
  const image = Gtk.Picture.new_for_paintable(video);
  video.play();
  video.set_loop(true);
  image.add_tick_callback(animationHandle);

  return image;
};
