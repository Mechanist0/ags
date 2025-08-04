import { App } from "astal/gtk4";
import { vixpaper } from "./src/vixpaper/VixPaper";

App.start({
  main() {
    return vixpaper(App.get_monitors()[0]);
  },
});
