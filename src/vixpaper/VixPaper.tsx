import Astal from "gi://Astal?version=4.0";
import Gdk from "gi://Gdk?version=4.0";
import Gtk from "gi://Gtk?version=4.0";
import app from "ags/gtk4/app";
import { Accessor } from "ags";
import { Config } from "../utils/config";
import {
  animatedWallpaperHandler,
  PlaylistAutoSwitcher,
} from "./vixpaperUtils";

// Monitor config file for changes to wallpaper path
export const stopVixPaper = () => {
  app.get_window("vixpaper")?.destroy();
};

export const Vixpaper = (props: {
  monitor: Gdk.Monitor;
  config: Accessor<Config>;
}) => {
  const { TOP, LEFT, RIGHT, BOTTOM } = Astal.WindowAnchor;

  return (
    <window
      name={"vixpaper"}
      gdkmonitor={props.monitor}
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
      <PlaylistAutoSwitcher config={props.config} monitor={props.monitor} />
    </window>
  );
};
