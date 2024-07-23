import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Slide } from './slide.model';
import 'zone.js';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-custom-carousel',
  standalone: true,
  templateUrl: './custom-carousel.component.html',
  styleUrls: ['./custom-carousel.component.css'],
  imports: [CommonModule],
  animations: [
    trigger('modalState', [
      state('hidden', style({
        opacity: 0,
        display: 'none',
      })),
      state('visible', style({
        opacity: 1,
        display: 'block',
      })),
      transition('hidden => visible', [
        style({ display: 'block' }),
        animate('300ms ease-in')
      ]),
      transition('visible => hidden', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CustomCarouselComponent implements OnInit {
  @Input() slidesPerView: number = 6;
  @Input() slides!: Slide[];

  totalSlides: number = 0;
  totalSections: number = 0;
  sections: Slide[][] = [];
  currentSection: number = 0;
  selectedSlide: Slide | null = null;
  modalStyles: { width: string; height: string; top: string; left: string } = {
    width: '0',
    height: '0',
    top: '0',
    left: '0',
  };
  modalState: 'hidden' | 'visible' = 'hidden';

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



    setTimeout(() => {
      this.selectedSlide = slide;
      const target = event.target as HTMLElement;
      const rect = target.getBoundingClientRect();
      const modalWidth = rect.width * 1.6;
      const modalHeight = rect.height * 1.5;
      const top = rect.top + window.scrollY + rect.height / 2 - modalHeight / 2;
      const left = rect.left + window.scrollX + rect.width / 2 - modalWidth / 2;
      
      this.modalStyles = {
        width: `${modalWidth}px`,
        height: `${modalHeight}px`,
        top: `${top}px`,
        left: `${left}px`,
      };
      this.modalState = 'visible';
    }, 300); // Wait for animation to complete
  }

  hideModal() {
    this.modalState = 'hidden';
    setTimeout(() => {
      this.selectedSlide = null;
    }, 300); // Wait for animation to complete
  }
}
