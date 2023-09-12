import "./style.css";

import { TrackballControls } from "three/addons/controls/TrackballControls.js";

import debounce from "lodash/debounce";
import { AxesHelper, Group } from "three";
import { tertiaryGroup } from "./groups";
import { mainMesh } from "./meshes";
import { camera, canvas, gui, renderer, scene } from "./objects";
import { onDoubleClick, onResize } from "./events";
import { updateTertiaryGroupChildren } from "./util/updateChildren";

document.body.appendChild(canvas);

const controls = new TrackballControls(camera, canvas);
const axesHelper = new AxesHelper(10000);

const group = new Group()
  .add(tertiaryGroup.clone().translateY(800))
  .add(tertiaryGroup.clone().translateY(-800))
  .add(
    tertiaryGroup
      .clone()
      .translateX(2500)
      .rotateZ(Math.PI / 2),
  )
  .add(
    tertiaryGroup
      .clone()
      .translateX(-2500)
      .rotateZ(Math.PI / 2),
  )
  .add(mainMesh);

scene.add(axesHelper).add(group).add(camera);

let baseRotationSpeed = 0.5;

gui
  .add({ baseRotationSpeed }, "baseRotationSpeed")
  .min(0)
  .max(1)
  .step(0.01)
  .onChange(
    debounce((value: number) => {
      baseRotationSpeed = value;
    }, 50),
  )
  .name("Rotation Speed");

gui
  .add(camera, "fov")
  .min(0)
  .max(130)
  .step(1)
  .name("FOV")
  .onChange(
    debounce((value: number) => {
      camera.fov = value;
      camera.updateProjectionMatrix();
    }),
  );

gui
  .add(group.position, "x")
  .listen()
  .min(-1000)
  .max(1000)
  .step(1)
  .name("X Axis")
  .onChange(
    debounce((value: number) => {
      group.position.x = value;
      mainMesh.position.x = value;
    }),
  );

gui
  .add(group.position, "y")
  .min(-1000)
  .max(1000)
  .step(1)
  .name("Y Axis")
  .onChange(
    debounce((value: number) => {
      group.position.y = value;
      mainMesh.position.y = value;
    }),
  );

gui
  .add(group.position, "z")
  .min(-1000)
  .max(1000)
  .step(1)
  .name("Z Axis")
  .onChange(
    debounce((value: number) => {
      group.position.z = value;
      mainMesh.position.z = value;
    }),
  );

// reset the controls using gui

gui.add(axesHelper, "visible").name("Show axes");
gui.add(controls, "reset").name("Reset camera");

const animate = () => {
  group.children[0].children.forEach((child, index) =>
    updateTertiaryGroupChildren({
      child,
      index,
      rotationSpeed: baseRotationSpeed,
    }),
  );

  group.children[1].children.forEach((child, index) =>
    updateTertiaryGroupChildren({
      child,
      index,
      rotationSpeed: baseRotationSpeed,
      reverse: true,
    }),
  );

  group.children[2].children.forEach((child, index) =>
    updateTertiaryGroupChildren({
      child,
      index,
      rotationSpeed: baseRotationSpeed,
    }),
  );

  group.children[3].children.forEach((child, index) =>
    updateTertiaryGroupChildren({
      child,
      index,
      rotationSpeed: baseRotationSpeed,
      reverse: true,
    }),
  );
  mainMesh.rotation.y += baseRotationSpeed * 0.01;

  renderer.render(scene, camera);
  controls.update();

  window.requestAnimationFrame(animate);
};

animate();
window.addEventListener("resize", onResize);
window.addEventListener("dblclick", onDoubleClick);
