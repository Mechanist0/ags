import app from "ags/gtk4/app";
import { vixpaper } from "./src/vixpaper/VixPaper";
import { createState } from "ags";
import { configStateChanged, initConfig } from "./src/utils/configUtils";
export const [configPath, setConfigPath] = createState("");

app.start({
  main(...args) {
    initConfig(args[0]);
    return vixpaper(app.get_monitors()[0]);
  },
});
