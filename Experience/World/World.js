import Experience from '../Experience';
import Crew from './Crew';
import Floor from './Floor';
import Environment from './Environment';
import Controls from './Controls';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources;

    this.resources.on('ready', () => {
      this.environment = new Environment();
      this.floor = new Floor();
      this.crew = new Crew();
      this.controls = new Controls();
    });
  }

  resize() {}

  update() {
    if (this.crew) {
      this.crew.update();
    }
    if (this.controls) {
      this.controls.update();
    }
  }
}
