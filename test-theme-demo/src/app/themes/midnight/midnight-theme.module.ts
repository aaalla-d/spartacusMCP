/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule, ConfigModule, CmsConfig } from '@spartacus/core';
import { MidnightThemeComponent } from './midnight-theme.component';
import { MidnightThemeService } from './midnight-theme.service';

@NgModule({
  declarations: [
    MidnightThemeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    I18nModule,
    ConfigModule.withConfig({
      cmsComponents: {
        MidnightThemeComponent: {
          component: MidnightThemeComponent,
          data: {
            composition: {
              inner: ['MidnightThemeComponent']
            }
          }
        }
      }
    } as CmsConfig)
  ],
  providers: [
    MidnightThemeService
  ],
  exports: [
    MidnightThemeComponent
  ]
})
export class MidnightThemeModule { }

/**
 * Feature module configuration for lazy loading
 */
@NgModule({
  imports: [
    MidnightThemeModule
  ]
})
export class MidnightThemeFeatureModule { } 