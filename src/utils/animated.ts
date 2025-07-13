import { App, Astal, astalify, ConstructProps } from "astal/gtk3";
import Gtk from "gi://Gtk?version=3.0";
import { Binding, readFile, readFileAsync } from "astal";
import GdkPixbuf from "gi://GdkPixbuf?version=2.0";
import Gdk from "gi://Gdk?version=3.0";

type AnimatedProps = {
  filePath: string;
};

const FrameUpdater = (
  iter: GdkPixbuf.PixbufAnimationIter,
  animatedImage: Gtk.Image,
) => {
  log("Reached");
};

const AnimationHandler = (
  iter: GdkPixbuf.PixbufAnimationIter,
  animatedImage: Gtk.Image,
) => {
  if (iter.get_delay_time() != -1) {
    setTimeout(FrameUpdater, iter.get_delay_time(), animatedImage);
  }
};

const Animated: Gtk.Image = ({ filePath }: AnimatedProps) => {
  var animatedImage: Gtk.Image = new Gtk.Image();
  log(filePath);
  try {
    // const inputFile: string = readFile(filePath);
    const animationFromFile: GdkPixbuf.PixbufAnimation =
      GdkPixbuf.PixbufAnimation.new_from_file(filePath);
    animatedImage.set_from_animation(animationFromFile);
    AnimationHandler(
      animatedImage.pixbufAnimation.get_iter(null),
      animatedImage,
    );
  } catch (err: any) {
    log(`Error!!! ${err}`);
  }

  return animatedImage;
};

export default Animated;
