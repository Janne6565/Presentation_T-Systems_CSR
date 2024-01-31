import { makeProject } from "@motion-canvas/core";

import introduction from "./scenes/presentation?scene";

import "./global.css";

export default makeProject({
  scenes: [introduction],
});
