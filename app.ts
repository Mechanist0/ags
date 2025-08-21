import app from "ags/gtk4/app";
import { vixpaper } from "./src/vixpaper/VixPaper";
import { Accessor, createState } from "ags";
import { initConfig } from "./src/utils/configUtils";
import { Config } from "./src/utils/config";
export const [configPath, setConfigPath] = createState("");

app.start({
  main(...args) {
    var configOpt: Accessor<Config> = initConfig(args[0]);
    configOpt.subscribe(() => {
      print("sup");
    });
    return vixpaper(app.get_monitors()[0], configOpt);
  },
});
