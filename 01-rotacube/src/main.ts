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

const mainGroup = new Group()
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

scene.add(axesHelper).add(mainGroup).add(camera);

const config = {
  baseRotationSpeed: 0.5,
};

axesHelper.visible = false;

gui
  .add(config, "baseRotationSpeed")
  .listen()
  .min(0)
  .max(1)
  .step(0.01)
  .onChange(
    debounce((value: number) => {
      config.baseRotationSpeed = value;
    }, 50),
  )
  .name("Rotation Speed");

gui
  .add(camera, "fov")
  .listen()
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
  .add(mainGroup.position, "x")
  .listen()
  .min(-1000)
  .max(1000)
  .step(1)
  .name("X Axis")
  .onChange(
    debounce((value: number) => {
      mainGroup.position.x = value;
      mainMesh.position.x = value;
    }),
  );

gui
  .add(mainGroup.position, "y")
  .listen()
  .min(-1000)
  .max(1000)
  .step(1)
  .name("Y Axis")
  .onChange(
    debounce((value: number) => {
      mainGroup.position.y = value;
      mainMesh.position.y = value;
    }),
  );

gui
  .add(mainGroup.position, "z")
  .listen()
  .min(-1000)
  .max(1000)
  .step(1)
  .name("Z Axis")
  .onChange(
    debounce((value: number) => {
      mainGroup.position.z = value;
      mainMesh.position.z = value;
    }),
  );

// reset the controls using gui

gui.add(axesHelper, "visible").listen().name("Show Axes Helper");
gui
  .add(controls, "reset")
  .name("Reset Camera Controls")
  .onChange(() => {
    camera.fov = 100;
    config.baseRotationSpeed = 0.5;
    axesHelper.visible = false;
    mainGroup.position.set(0, 0, 0);
    controls.reset();
  });

const animate = () => {
  mainGroup.children[0].children.forEach((child, index) =>
    updateTertiaryGroupChildren({
      child,
      index,
      rotationSpeed: config.baseRotationSpeed,
    }),
  );

  mainGroup.children[1].children.forEach((child, index) =>
    updateTertiaryGroupChildren({
      child,
      index,
      rotationSpeed: config.baseRotationSpeed,
      reverse: true,
    }),
  );

  mainGroup.children[2].children.forEach((child, index) =>
    updateTertiaryGroupChildren({
      child,
      index,
      rotationSpeed: config.baseRotationSpeed,
    }),
  );

  mainGroup.children[3].children.forEach((child, index) =>
    updateTertiaryGroupChildren({
      child,
      index,
      rotationSpeed: config.baseRotationSpeed,
      reverse: true,
    }),
  );
  mainMesh.rotation.y += config.baseRotationSpeed * 0.01;

  renderer.render(scene, camera);
  controls.update();

  window.requestAnimationFrame(animate);
};

animate();
window.addEventListener("resize", onResize);
window.addEventListener("dblclick", onDoubleClick);
