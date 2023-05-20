import * as THREE from 'three';

import Experience from '../Experience';

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setSunLight();
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight('#ffffff', 3);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.set(2048, 2048);
    this.sunLight.shadow.normalBias = 0.05;

    this.sunLight.position.set(1.5, 7, 3); //影の位置を調整
    this.scene.add(this.sunLight);

    this.ambientLight = new THREE.AmbientLight('#ffffff', 1);
    this.scene.add(this.ambientLight);
  }

  resize() {}

  update() {}
}
