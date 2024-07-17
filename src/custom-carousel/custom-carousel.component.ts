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

  modalVisible: boolean = false;
  modalPosition: { top: number; left: number } = { top: 0, left: 0 };
  selectedSlide: Slide | null = null;

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

  showModal(event: MouseEvent, slide: Slide) {
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();

    this.modalVisible = true;
    this.modalPosition = {
      top: rect.top + rect.height / 2,
      left: rect.left + rect.width / 2,
    };
    this.selectedSlide = slide;
  }

  hideModalIfNotHovering(event: MouseEvent) {
    const target = event.relatedTarget as HTMLElement;
    if (!target || !target.closest('.modal-wrapper')) {
      this.modalPosition = {
        top: 0,
        left: 0
      };
      this.modalVisible = false;
      this.selectedSlide = null;
    }
  }

  stayVisible() {
    this.modalVisible = true;
  }
}
