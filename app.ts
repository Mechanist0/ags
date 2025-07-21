import { App } from "astal/gtk4";
import style from "./style.scss";
import Bar from "./widget/Bar";
import { startVixPaper } from "./src/vixpaper/VixPaper";

globalThis.resPath = "./res/wallpapers";
globalThis.debug = true;

startVixPaper(resPath);
