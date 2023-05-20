import * as THREE from 'three';
import { gsap } from 'gsap';

import Experience from '../Experience';

export default class Crew {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.crew = this.resources.items.crew;
    this.actualCrew = this.crew.scene;

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.setModel();
    this.setAnimation();
    this.onMouseMove();
  }

  setModel() {
    this.actualCrew.children.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;

      if (child.name === '平面001') {
        child.material = new THREE.MeshBasicMaterial({
          map: this.resources.items.screen,
        });
      }

      // グループ化している場合
      if (child instanceof THREE.Object3D) {
        child.children.forEach((groupChild) => {
          groupChild.castShadow = true;
          groupChild.receiveShadow = true;
        });
      }
    });

    this.scene.add(this.actualCrew);
    this.actualCrew.rotation.y = Math.PI;
  }

  setAnimation() {
    this.mixer = new THREE.AnimationMixer(this.actualCrew);
    this.walk = this.mixer.clipAction(this.crew.animations[1]);
    this.walk.timeScale = 1.3;
    this.walk.play();
  }

  onMouseMove() {
    window.addEventListener('mousemove', (e) => {
      this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      this.lerp.target = this.rotation * 0.1;
    });
  }

  resize() {}

  update() {
    this.lerp.current = gsap.utils.interpolate(this.lerp.current, this.lerp.target, this.lerp.ease);

    this.actualCrew.rotation.y = this.lerp.current;

    this.mixer.update(this.time.delta * 0.0009); //this.time.deltaはミリ秒単位だから0.0009をかけて秒単位に直す
  }
}
