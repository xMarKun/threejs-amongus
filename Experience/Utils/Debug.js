import * as THREE from 'three';
import GUI from 'lil-gui';

import Experience from '../Experience';

export default class Debug {
  constructor() {
    this.experience = new Experience();
    this.renderer = this.experience.renderer;
    this.gui = new GUI();

    this.params = {};

    this.setToneMappingDebug();
    this.setExposureDebug();
  }

  setToneMappingDebug() {
    const toneMappingOptions = {
      None: THREE.NoToneMapping,
      Linear: THREE.LinearToneMapping,
      Reinhard: THREE.ReinhardToneMapping,
      Cineon: THREE.CineonToneMapping,
      ACESFilmic: THREE.ACESFilmicToneMapping,
      Custom: THREE.CustomToneMapping,
    };
    this.gui.add(this.renderer.renderer, 'toneMapping', toneMappingOptions);
  }

  setExposureDebug() {
    this.gui.add(this.renderer.renderer, 'toneMappingExposure', 0, 2);
  }
}
