import Astal from "gi://Astal?version=4.0";
import Gio from "gi://Gio?version=2.0";
import GObject from "gi://GObject?version=2.0";
import Gtk from "gi://Gtk?version=4.0";
import { programInvocationName, programArgs } from "system";
import { startVixPaper, vixpaper } from "./src/vixpaper/VixPaper";
import { App } from "astal/gtk4";

App.start({
  main() {
    return vixpaper(App.get_monitors()[0]);
  },
});
