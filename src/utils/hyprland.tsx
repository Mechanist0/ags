import Hyprland from "gi://AstalHyprland";
export const hyprland = Hyprland.get_default();

export const init = () => {
  const clients: Hyprland.Client[] = hyprland
    .get_focused_workspace()
    .get_clients();
};
