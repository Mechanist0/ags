import app from "astal/gtk3/app";
import "./src/vixpaper";
import { startVixpaper, stopVixpaper } from "./src/vixpaper/vixpaperUtils";

export const debug = true;
var path = "./res/vixpaper/";

startVixpaper(path);
