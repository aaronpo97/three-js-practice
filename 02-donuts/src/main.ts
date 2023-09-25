import { onResize, onDoubleClick } from "./events";
import { canvas, controls, scene } from "./objects";
import { torusGroup } from "./objects/mesh";
import { MAX_DISTANCE } from "./constants";
import { animate } from "./animate";

import "./style.css";

scene.add(torusGroup);
controls.maxDistance = MAX_DISTANCE;
document.body.appendChild(canvas);

window.addEventListener("resize", onResize);
window.addEventListener("dblclick", onDoubleClick);

animate();
