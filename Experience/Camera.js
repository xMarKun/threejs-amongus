import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import Experience from './Experience';

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.createPerspectiveCamera();
    this.createOrthographicCamera();
    this.setOrbitControls();
  }

  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(35, this.sizes.aspect, 0.1, 1000);
    this.scene.add(this.perspectiveCamera);
    // デフォルトのカメラ位置 console.logで.positionを表示させると現在位置がわかる
    this.perspectiveCamera.position.x = -25;
    this.perspectiveCamera.position.y = 13;
    this.perspectiveCamera.position.z = 37;
  }

  createOrthographicCamera() {
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspect * this.sizes.frustum) / 2,
      (this.sizes.aspect * this.sizes.frustum) / 2,
      this.sizes.frustum / 2,
      -this.sizes.frustum / 2,
      -20,
      20
    );

    this.orthographicCamera.position.y = 3;
    this.orthographicCamera.position.z = 5;
    this.orthographicCamera.rotation.x = -Math.PI / 6;

    this.scene.add(this.orthographicCamera);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enableZoom = false;
  }

  resize() {
    // Updating Perspective Camera on Resize
    this.perspectiveCamera.aspect = this.sizes.aspect;
    this.perspectiveCamera.updateProjectionMatrix();

    // Updating Orthographic Camera on Resize
    this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustum) / 2;
    this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustum) / 2;
    this.orthographicCamera.top = this.sizes.frustum / 2;
    this.orthographicCamera.bottom = -this.sizes.frustum / 2;
    this.orthographicCamera.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
