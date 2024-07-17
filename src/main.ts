import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CustomCarouselComponent } from './custom-carousel/custom-carousel.component';
import { Slide } from './custom-carousel/slide.model';

import 'zone.js';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <app-custom-carousel [slides]="slides" [slidesPerView]="5"></app-custom-carousel>
  `,
  imports: [CustomCarouselComponent],
})
export class App {
  name = 'Angular';
  slides: Slide[] = [
    {
      id: 1,
      title: 'hello',
    },
    {
      id: 2,
      title: 'hello',
    },
    {
      id: 3,
      title: 'hello',
    },
    {
      id: 4,
      title: 'hello',
    },
    {
      id: 5,
      title: 'hello',
    },
    {
      id: 6,
      title: 'hello',
    },
    {
      id: 7,
      title: 'hello',
    },
    {
      id: 8,
      title: 'hello',
    },
    {
      id: 9,
      title: 'hello',
    },
    {
      id: 10,
      title: 'hello',
    },
    {
      id: 11,
      title: 'hello',
    },
    {
      id: 12,
      title: 'hello',
    },
    {
      id: 13,
      title: 'hello',
    },
    {
      id: 14,
      title: 'hello',
    },
    {
      id: 15,
      title: 'hello',
    },
    {
      id: 16,
      title: 'hello',
    },
    {
      id: 17,
      title: 'hello',
    },
    {
      id: 18,
      title: 'hello',
    },
  ];
}

bootstrapApplication(App);
