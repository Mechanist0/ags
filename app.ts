import app from "astal/gtk3/app";
import "./src/vixpaper";
import { startVix, stopVix } from "./src/vixpaper/vixpaperUtils";
import { interval, timeout, idle } from "astal/time";

export const debug = true;
var path = "./res/vixpaper/";

startVix(path);
