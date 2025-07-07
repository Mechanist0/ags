import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { debug } from "../../app";

export const startVix = (path: string) => {
  if (debug) log("Starting vixpaper");
  App.start({
    instanceName: "Vixpaper",
    main() {
      App.get_monitors().map(vixpaper);
    },
  });
};

export const stopVix = () => {
  if (debug) log("Stopping vixpaper");
  App.get_window("Vixpaper")?.close();
};

const vixpaper = (gdkmonitor: Gdk.Monitor) => {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

  return (
    <window
      name="Vixpaper"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={App}
    >
      <centerbox>
        <box>Hello!</box>
      </centerbox>
    </window>
  );
};
