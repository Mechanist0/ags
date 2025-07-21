import { App, Astal, Gtk, Gdk } from "astal/gtk4";
import { Variable } from "astal";

const time = Variable("").poll(1000, "date");

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

  return (
    <window
      visible
      cssClasses={["Bar"]}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.IGNORE}
      anchor={TOP | LEFT | RIGHT}
      application={App}
    >
      <centerbox cssName="centerbox">
        <button onClicked="echo hello" hexpand halign={Gtk.Align.CENTER}>
          Welcome to AGS!
        </button>
        <box />
        <menubutton hexpand halign={Gtk.Align.CENTER}>
          <popover>
            <Gtk.Calendar />
          </popover>
          <label label={time()} />
          <Gtk.Video file={}></Gtk.Video>
        </menubutton>
      </centerbox>
    </window>
  );
}
