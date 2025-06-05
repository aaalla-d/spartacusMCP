/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from './models/product-grid.model';
import { ProductGridService } from './product-grid.service';

@Component({
  selector: 'cx-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductGridComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  @Input() products: Product[] = [];
  @Input() columns: number = 4;
  @Input() showPrices: boolean = true;
  @Input() showRatings: boolean = true;
  @Input() showAddToCart: boolean = true;
  @Input() title: string = 'Featured Products';
  @Input() maxItems: number = 12;
  @Input() responsive: boolean = true;
  @Input() accessibility: boolean = true;

  products$: Observable<Product[]>;
  loading$ = new Subject<boolean>();

  constructor(private productGridService: ProductGridService) {
    this.products$ = this.productGridService.getProducts();
  }

  ngOnInit(): void {
    this.loadProducts();
    if (this.accessibility) {
      this.setupAccessibilityFeatures();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadProducts(): void {
    this.loading$.next(true);
    this.productGridService.loadProducts(this.maxItems)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (products) => {
          this.products = products;
          this.loading$.next(false);
        },
        error: (error) => {
          console.error('Error loading products:', error);
          this.loading$.next(false);
        }
      });
  }

  private setupAccessibilityFeatures(): void {
    // TODO: Setup accessibility features like keyboard navigation
  }

  onAddToCart(product: Product): void {
    this.productGridService.addToCart(product);
  }

  onProductClick(product: Product): void {
    this.productGridService.navigateToProduct(product.id);
  }

  trackByProductId(index: number, product: Product): string {
    return product.id;
  }

  getGridClasses(): string {
    const classes = ['product-grid'];
    if (this.responsive) {
      classes.push('responsive');
    }
    classes.push(`columns-${this.columns}`);
    return classes.join(' ');
  }
} 