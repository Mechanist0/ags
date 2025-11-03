import app from "ags/gtk4/app";
import { Vixpaper } from "./src/vixpaper/VixPaper";
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

    return (
      Vixpaper({
        monitor: app.get_monitors()[0],
        config: configOpt,
      }),
      Vixpaper({
        monitor: app.get_monitors()[1],
        config: configOpt,
      })
    );
  },
});
