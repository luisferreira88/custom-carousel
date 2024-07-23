import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Renderer2 } from '@angular/core';
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
  @Input() slidesPerView: number = 6;
  @Input() slides!: Slide[];

  totalSlides: number = 0;
  totalSections: number = 0;
  sections: Slide[][] = [];
  currentSection: number = 0;
  modalHidden: boolean = false;
  modalVisible: boolean = false;
  modalSize: { width: number; height: number } = { width: 0, height: 0 };
  modalPosition: { top: number; left: number } = { top: 0, left: 0 };
  selectedSlide: Slide | null = null;
  hideTimeout: any;

  constructor(private renderer: Renderer2) { }

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
    this.selectedSlide = slide;
    const modalContainer = document.getElementById('modal-container');
    setTimeout(() => {
      console.log("Delayed for 1 second.");
      if (modalContainer) {
        this.renderer.removeClass(modalContainer, 'hide');
        this.renderer.addClass(modalContainer, 'show');
        this.renderer.setStyle(modalContainer, 'display', 'block');
      }
    }, 300);

    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    this.modalSize = {
      width: rect.width * 1.6,
      height: rect.height * 1.5,
    };

    this.modalPosition = {
      top: rect.top,
      left: rect.left
    };
  }

  hideModal(event: MouseEvent) {
    this.selectedSlide = null;
    const modalContainer = document.getElementById('modal-container');
    if (modalContainer) {
      this.renderer.removeClass(modalContainer, 'show');
      this.renderer.addClass(modalContainer, 'hide');
      this.renderer.setStyle(modalContainer, 'display', 'none');
    }
  }

}

/* 

  showModal(event: MouseEvent, slide: Slide) {
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();

    // Clear any existing hide timeout
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }

    this.modalHidden = false;
    this.modalVisible = true;
    this.modalPosition = {
      top: rect.top + rect.height / 2,
      left: rect.left + rect.width / 2,
    };
    this.selectedSlide = slide;

    const modalContainer = document.getElementById('modal-container');
    if (modalContainer) {
      this.renderer.removeClass(modalContainer, 'hide');
      this.renderer.addClass(modalContainer, 'show');
      this.renderer.setStyle(modalContainer, 'display', 'block');
    }
  }

  hideModalIfNotHovering(event: MouseEvent) {
    const modalContainer = document.getElementById('modal-container');
    const relatedTarget = event.relatedTarget as HTMLElement;

    if (modalContainer && (!relatedTarget || !modalContainer.contains(relatedTarget))) {
      this.hideTimeout = setTimeout(() => {
        this.renderer.removeClass(modalContainer, 'show');
        this.renderer.addClass(modalContainer, 'hide');

        modalContainer.addEventListener(
          'animationend',
          () => {
            this.renderer.setStyle(modalContainer, 'display', 'none');
            this.modalHidden = true;
            this.selectedSlide = null;
          },
          { once: true }
        );

        this.modalVisible = false;
      }, 100); // Adjust the delay as needed
    }
  }

*/