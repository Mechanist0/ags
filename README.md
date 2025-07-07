This is our custom AGS enviornment for Hyprland Arch Linux. Any code can be used freely as long as it is not used to train an LLM.

### Current Features

### Planned Features

- Vixpaper
- Vixlock
- Vixsim

#### Vixpaper

Custom wallpaper implementation

- Scroll through a folder of pics
- Custom Duration between switches
- Gif/Video support

#### Vixlock

Custom lockscreen

- Image/Gif background support
- PAM Lock

#### Vixsim

Extremely simple physics simulation for use in backgrounds

- Gravity
- Simple Shapes
- Little Spaceship
  - Top Down View
  - Controlled with Arrow Keys

---

app.ts - Controls which application is running

- src/vixlock.ts
  - Starts the window
  - Stops the window
  - Reloads the window
- src/vixpaper.ts
  - Starts the window
  - Stops the window
  - Reloads the window
