import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {RouterLink} from "@angular/router";
import {NgForOf, NgStyle} from "@angular/common";
import {CategoriesService, Category} from "@isc/products";

@Component({
  selector: 'products-categories-banner',
  templateUrl: './categories-banner.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NgStyle,
    NgForOf
  ],
  styles: []
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  endSubs$: Subject<any> = new Subject();

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService
      .getCategories()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  ngOnDestroy() {
    // @ts-ignore
    this.endSubs$.next();
    this.endSubs$.complete();
  }
}
