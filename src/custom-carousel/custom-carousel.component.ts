import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import 'zone.js';
import { Slide } from './slide.model';

@Component({
  selector: 'app-custom-carousel',
  standalone: true,
  templateUrl: './custom-carousel.component.html',
  styleUrls: ['./custom-carousel.component.css'],
  imports: [CommonModule],
})
export class CustomCarouselComponent implements OnInit {
  @Input() slidesPerView: number = 5;
  @Input() slides!: Slide[];

  totalSlides: number = 0;
  totalSections: number = 0;
  sections: Slide[][] = [];
  currentSection: number = 0;

  ngOnInit() {
    this.totalSlides = this.slides.length;
    this.totalSections = Math.ceil(this.slides.length / this.slidesPerView);
    for (let i = 0; i < this.totalSections; i++) {
      this.sections.push(
        this.slides.slice(i * this.slidesPerView, (i + 1) * this.slidesPerView)
      );
    }
  }

  scrollToSection(index: number) {
    if (index < 0) {
      this.currentSection = this.totalSections - 1;
    } else if (index >= this.totalSections) {
      this.currentSection = 0;
    } else {
      this.currentSection = index;
    }
    document.getElementById(`section-${this.currentSection}`)?.scrollIntoView({
      behavior: 'smooth',
    });
  }
}
