import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { debug } from "../../app";
import { Binding } from "astal";

export const startVixpaper = (path: string) => {
  if (debug) log("Starting vixpaper");
  App.start({
    instanceName: "Vixpaper",
    main() {
      App.get_monitors().map(vixpaper);
    },
  });
};

export const stopVixpaper = () => {
  if (debug) log("Stopping vixpaper");
  App.get_window("Vixpaper")?.destroy();
};

// The main rendering method for vixpaper
const vixpaper = (gdkmonitor: Gdk.Monitor) => {
  const { TOP, LEFT, RIGHT, BOTTOM } = Astal.WindowAnchor;

  return (
    //@ts-ignore
    <window
      name="Vixpaper"
      gdkmonitor={gdkmonitor}
      // Put window at the top of the stack
      exclusivity={Astal.Exclusivity.IGNORE}
      anchor={TOP | LEFT | RIGHT | BOTTOM}
      application={App}
    >
      <box
        halign={Gtk.Align.CENTER}
        valign={Gtk.Align.CENTER}
        children={[
          <entry editable={true}></entry>,
          <button onClick={stopVixpaper} />,
        ]}
      />
    </window>
  );
};
