import { monitorFile, readFile } from "ags/file";
import { Config } from "./config";
import { Accessor, createState } from "ags";

const [configPath, setConfigPath] = createState("");
export const [configOptions, setConfigOptions] = createState({
  wallpaperPath: "",
});

export const configStateChanged = (): Accessor<Config> => {
  try {
    const configJSONString = readFile(configPath.get());
    var configJSONObject: Config = JSON.parse(configJSONString);
    setConfigOptions(configJSONObject);
    return configOptions;
  } catch (error) {
    print(error);
    return configOptions;
  }
};

export const initConfig = (configPath: string) => {
  const configMonitor = monitorFile(configPath, configStateChanged);
  setConfigPath(configPath);
  return configStateChanged();
};
