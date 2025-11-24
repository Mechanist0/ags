import { Gtk } from "ags/gtk4";

export interface Cache {
  items: Map<string, Gtk.Picture>;
}
