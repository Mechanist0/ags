import { App } from "astal/gtk4";
import Astal from "gi://Astal?version=4.0";
import Gdk from "gi://Gdk?version=4.0";
import Gio from "gi://Gio?version=2.0";
import Gtk from "gi://Gtk?version=4.0";

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
  return (
    <window
      visible
      name={"vixpaper"}
      gdkmonitor={monitor}
      exclusivity={Astal.Exclusivity.IGNORE}
      anchor={TOP | LEFT | RIGHT}
      application={App}
    >
      <box valign={Gtk.Align.CENTER} halign={Gtk.Align.CENTER}>
        <label label="Sup" />
        <button onClicked={stopVixPaper} />
      </box>
    </window>
  );
};

// const webmHandler = () => {
//   const mediaFile: Gstrea;
//   snapshot.
// }
