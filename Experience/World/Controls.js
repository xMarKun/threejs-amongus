import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Experience from '../Experience';

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.crew = this.experience.world.crew.actualCrew;
    this.circleFirst = this.experience.world.floor.circleFirst;
    this.circleSecond = this.experience.world.floor.circleSecond;
    this.circleThird = this.experience.world.floor.circleThird;
    gsap.registerPlugin(ScrollTrigger);

    this.setScrollTrigger();
  }

  setScrollTrigger() {
    // first section
    this.firstMoveTimeline = gsap
      .timeline({
        scrollTrigger: {
          trigger: '.first-move',
          scrub: 0.6,
          start: 'top top',
          end: 'bottom bottom',
          invalidateOnRefresh: true,
        },
      })
      .to(this.crew.position, {
        x: () => this.sizes.width * 0.003,
      });
    // second section
    this.secondMoveTimeline = gsap
      .timeline({
        scrollTrigger: {
          trigger: '.second-move',
          scrub: 0.6,
          start: 'top top',
          end: 'bottom bottom',
          invalidateOnRefresh: true,
        },
      })
      .to(this.crew.position, {
        x: () => -this.sizes.width * 0.0026,
      });
    // third section
    this.thirdMoveTimeline = gsap
      .timeline({
        scrollTrigger: {
          trigger: '.third-move',
          scrub: 0.6,
          start: 'top top',
          end: 'bottom bottom',
          invalidateOnRefresh: true,
        },
      })
      .to(this.crew.position, {
        x: 0,
      });
    // section
    this.sections = document.querySelectorAll('.section');
    this.sections.forEach((section) => {
      if (section.classList.contains('right')) {
        gsap.to(section, {
          borderTopLeftRadius: 0,
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'top top',
            scrub: 0.6,
          },
        });
        gsap.to(section, {
          borderBottomLeftRadius: 700,
          scrollTrigger: {
            trigger: section,
            start: 'bottom bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
      } else {
        gsap.to(section, {
          borderTopRightRadius: 0,
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'top top',
            scrub: 0.6,
          },
        });
        gsap.to(section, {
          borderBottomRightRadius: 700,
          scrollTrigger: {
            trigger: section,
            start: 'bottom bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
      }
    });
    // first circle
    this.firstCircleTimeline = gsap
      .timeline({
        scrollTrigger: {
          trigger: '.first-move',
          scrub: 0.6,
          start: 'top top',
          end: 'bottom bottom',
          invalidateOnRefresh: true,
        },
      })
      .to(this.circleFirst.scale, {
        x: 3,
        y: 3,
        z: 3,
      });
    // second circle
    this.secondCircleTimeline = gsap
      .timeline({
        scrollTrigger: {
          trigger: '.second-move',
          scrub: 0.6,
          start: 'top top',
          end: 'bottom bottom',
          invalidateOnRefresh: true,
        },
      })
      .to(this.circleSecond.scale, {
        x: 3,
        y: 3,
        z: 3,
      });
    // third circle
    this.thirdCircleTimeline = gsap
      .timeline({
        scrollTrigger: {
          trigger: '.third-move',
          scrub: 0.6,
          start: 'top top',
          end: 'bottom bottom',
          invalidateOnRefresh: true,
        },
      })
      .to(this.circleThird.scale, {
        x: 3,
        y: 3,
        z: 3,
      });
  }

  resize() {}

  update() {}
}
