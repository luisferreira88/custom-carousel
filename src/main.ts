import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CustomCarouselComponent } from './custom-carousel/custom-carousel.component';
import { Slide } from './custom-carousel/slide.model';

import 'zone.js';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <app-custom-carousel [slides]="slides" [slidesPerView]="4"></app-custom-carousel>
  `,
  imports: [CustomCarouselComponent],
})
export class App {
  name = 'Angular';
  slides: Slide[] = [
    {
      id: 1,
      title: 'hello',
      image: 'https://picsum.photos/600/600'
    },
    {
      id: 2,
      title: 'hello',
      image: 'https://picsum.photos/599/599'

    },
    {
      id: 3,
      title: 'hello',
      image: 'https://picsum.photos/598/598'
    },
    {
      id: 4,
      title: 'hello',
      image: 'https://picsum.photos/597/597'
    },
    {
      id: 5,
      title: 'hello',
      image: 'https://picsum.photos/596/596'
    },
    {
      id: 6,
      title: 'hello',
      image: 'https://picsum.photos/595/595'
    },
    {
      id: 7,
      title: 'hello',
      image: 'https://picsum.photos/594/594'
    },
    {
      id: 8,
      title: 'hello',
      image: 'https://picsum.photos/593/593'
    },
    {
      id: 9,
      title: 'hello',
      image: 'https://picsum.photos/592/592'
    },
    {
      id: 10,
      title: 'hello',
      image: 'https://picsum.photos/591/591'
    },
    {
      id: 11,
      title: 'hello',
      image: 'https://picsum.photos/590/590'
    },
    {
      id: 12,
      title: 'hello',
      image: 'https://picsum.photos/589/589'
    },
    {
      id: 13,
      title: 'hello',
      image: 'https://picsum.photos/588/588'
    },
    {
      id: 14,
      title: 'hello',
      image: 'https://picsum.photos/587/586'
    },
    {
      id: 15,
      title: 'hello',
      image: 'https://picsum.photos/585/585'
    },
    {
      id: 16,
      title: 'hello',
      image: 'https://picsum.photos/584/584'
    },
    {
      id: 17,
      title: 'hello',
      image: 'https://picsum.photos/583/583'
    },
    {
      id: 18,
      title: 'hello',
      image: 'https://picsum.photos/582/582'
    },
  ];
}

bootstrapApplication(App);
