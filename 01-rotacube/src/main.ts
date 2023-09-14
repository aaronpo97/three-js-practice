import "./style.css";

import { TrackballControls } from "three/addons/controls/TrackballControls.js";

import debounce from "lodash/debounce";
import { AxesHelper } from "three";

import { mainMesh } from "./meshes";
import { camera, canvas, gui, renderer, scene } from "./objects";
import { onDoubleClick, onResize } from "./events";
import { updateTertiaryGroupChildren } from "./util/updateChildren";
import { main } from "./groups";

document.body.appendChild(canvas);

const controls = new TrackballControls(camera, canvas);
controls.maxDistance = 5000;

const axesHelper = new AxesHelper(10000);

controls.enabled = true;

scene.add(axesHelper).add(main).add(camera);

const config = { baseRotationSpeed: 0.5 };

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
  .add(main.position, "x")
  .listen()
  .min(-1000)
  .max(1000)
  .step(1)
  .name("X Axis")
  .onChange(
    debounce((value: number) => {
      main.position.x = value;
      mainMesh.position.x = value;
    }),
  );

gui
  .add(main.position, "y")
  .listen()
  .min(-1000)
  .max(1000)
  .step(1)
  .name("Y Axis")
  .onChange(
    debounce((value: number) => {
      main.position.y = value;
      mainMesh.position.y = value;
    }),
  );

gui
  .add(main.position, "z")
  .listen()
  .min(-1000)
  .max(1000)
  .step(1)
  .name("Z Axis")
  .onChange(
    debounce((value: number) => {
      main.position.z = value;
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
    main.position.set(0, 0, 0);
    controls.reset();
  });

gui.open(true);

const animate = () => {
  main.children.forEach((group, i) => {
    group.children.forEach((child, index) => {
      const reverse = i % 2 === 0;
      updateTertiaryGroupChildren({
        child,
        rotationSpeed: config.baseRotationSpeed,
        reverse,
        index,
      });
    });
  });
  renderer.render(scene, camera);
  controls.update();

  window.requestAnimationFrame(animate);
};

animate();
window.addEventListener("resize", onResize);
window.addEventListener("dblclick", onDoubleClick);
