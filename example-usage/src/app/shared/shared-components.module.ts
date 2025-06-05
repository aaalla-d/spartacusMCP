/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule, ConfigModule } from '@spartacus/core';
import { HeroBannerComponent } from './components/hero-banner/hero-banner.component';
import { ProductGridComponent } from './components/product-grid/product-grid.component';
import { RecommendationsComponent } from './components/recommendations/recommendations.component';
import { HeroBannerService } from './components/hero-banner/hero-banner.service';
import { ProductGridService } from './components/product-grid/product-grid.service';
import { RecommendationsService } from './components/recommendations/recommendations.service';

@NgModule({
  declarations: [
    HeroBannerComponent,
    ProductGridComponent,
    RecommendationsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    I18nModule,
    ConfigModule,
    RouterModule
  ],
  exports: [
    HeroBannerComponent,
    ProductGridComponent,
    RecommendationsComponent
  ],
  providers: [
    HeroBannerService,
    ProductGridService,
    RecommendationsService
  ],
})
export class SharedComponentsModule {} 