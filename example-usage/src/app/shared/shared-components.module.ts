/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NOTE: This module contains shared form elements and utilities
 * Main application components should be placed in app/components/
 * 
 * To use this module, ensure you have the following dependencies installed:
 * - @angular/core
 * - @angular/common  
 * - @angular/forms
 * - @angular/router
 * - @spartacus/core (optional, uncomment imports when available)
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Spartacus imports (uncomment when Spartacus is installed)
// import { I18nModule, ConfigModule } from '@spartacus/core';

// Shared form components (create these for reusable form elements)
// import { CustomInputComponent } from './form-elements/custom-input/custom-input.component';
// import { CustomSelectComponent } from './form-elements/custom-select/custom-select.component';
// import { CustomCheckboxComponent } from './form-elements/custom-checkbox/custom-checkbox.component';
// import { CustomRadioComponent } from './form-elements/custom-radio/custom-radio.component';
// import { FormValidationComponent } from './form-elements/form-validation/form-validation.component';

// Shared utility components
// import { LoadingSpinnerComponent } from './utilities/loading-spinner/loading-spinner.component';
// import { ConfirmDialogComponent } from './utilities/confirm-dialog/confirm-dialog.component';
// import { ToastNotificationComponent } from './utilities/toast-notification/toast-notification.component';

@NgModule({
  declarations: [
    // Shared form elements (uncomment as you create them)
    // CustomInputComponent,
    // CustomSelectComponent,
    // CustomCheckboxComponent,
    // CustomRadioComponent,
    // FormValidationComponent,
    
    // Shared utility components (uncomment as you create them)
    // LoadingSpinnerComponent,
    // ConfirmDialogComponent,
    // ToastNotificationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Uncomment these when Spartacus is installed:
    // I18nModule,
    // ConfigModule,
    RouterModule
  ],
  exports: [
    // Export shared components for use in other modules
    // CustomInputComponent,
    // CustomSelectComponent,
    // CustomCheckboxComponent,
    // CustomRadioComponent,
    // FormValidationComponent,
    // LoadingSpinnerComponent,
    // ConfirmDialogComponent,
    // ToastNotificationComponent,
    
    // Re-export common modules for convenience
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    // Shared services (uncomment as you create them)
    // FormValidationService,
    // NotificationService,
    // UtilityService,
  ],
})
export class SharedComponentsModule {} 