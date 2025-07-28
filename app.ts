import { App } from "astal/gtk4";
import style from "./style.scss";
import Bar from "./widget/Bar";
import { startVixPaper } from "./src/vixpaper/VixPaper";
import GLib from "gi://GLib?version=2.0";

globalThis.resPath = GLib.get_current_dir() + "/res/wallpapers/";
globalThis.debug = true;

startVixPaper(resPath);
