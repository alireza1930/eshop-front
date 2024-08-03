import { Component, Input, OnInit } from '@angular/core';
import {NgForOf, NgIf, NgStyle} from "@angular/common";

@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgStyle
  ],
  styles: []
})
export class GalleryComponent implements OnInit {
  selectedImageUrl?: string;

  @Input() images!: string[];

  ngOnInit(): void {
    if (this.hasImages) {
      this.selectedImageUrl = this.images![0];
    }
  }

  changeSelectedImage(imageUrl: string) {
    this.selectedImageUrl = imageUrl;
  }

  get hasImages() {
    return this.images!.length > 0;
  }
}
