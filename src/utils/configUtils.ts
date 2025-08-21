import { monitorFile, readFile } from "ags/file";
import { config } from "./config";
import { createState } from "ags";

const [configPath, setConfigPath] = createState("");
export const [configOptions, setConfigOptions] = createState({
  wallpaperPath: "",
});

export const configStateChanged = () => {
  try {
    const configJSONString = readFile(configPath.get());
    var configJSONObject: config = JSON.parse(configJSONString);
    setConfigOptions(configJSONObject);
  } catch (error) {
    print(error);
  }
};

export const initConfig = (configPath: string) => {
  const configMonitor = monitorFile(configPath, configStateChanged);
  setConfigPath(configPath);
  configStateChanged();

  print(configOptions.get());
};
