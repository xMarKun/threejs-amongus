import * as THREE from 'three';
import GUI from 'lil-gui';

import Experience from '../Experience';

export default class Debug {
  constructor() {
    this.experience = new Experience();
    this.renderer = this.experience.renderer;
    this.gui = new GUI();
    this.guiExposure = null;

    this.params = { toneMapping: 'Cineon', exposure: 1.75 };

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
    this.gui.add(this.params, 'toneMapping', Object.keys(toneMappingOptions)).onChange(() => {
      this.renderer.renderer.toneMapping = toneMappingOptions[this.params.toneMapping];
      this.setExposureDebug();
    });
  }

  setExposureDebug() {
    if (this.guiExposure !== null) {
      this.guiExposure.destroy();
      this.guiExposure = null;
    }
    if (this.params.toneMapping !== 'None') {
      this.guiExposure = this.gui.add(this.params, 'exposure', 0, 2).onChange(() => {
        this.renderer.renderer.toneMappingExposure = this.params.exposure;
      });
    }
  }
}
