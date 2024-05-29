import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { contactReducer } from './app/store/reducers/contact.reducer';
import { ContactEffects } from './app/store/effects/contact.effects';
import { environment } from './environments/environment';  // Adjust the path as necessary

/**
 * Bootstraps the Angular application with the specified root component and providers.
 * @param {Component} AppComponent - The root component to bootstrap.
 * @param {Object} config - Configuration object containing providers for the application.
 */
bootstrapApplication(AppComponent, {
    providers: [
        /**
         * Provides routing configuration for the application.
         * @param {Routes} routes - The routes configuration array.
         */
        provideRouter(routes),

        /**
         * Imports necessary providers for the application.
         * @param {Type} BrowserModule - Provides services that are essential to launch and run a browser app.
         * @param {Type} HttpClientModule - Provides a simplified HTTP client for Angular applications.
         */
        importProvidersFrom(BrowserModule, HttpClientModule),

        /**
         * Configures the NgRx store with the specified reducers.
         * @param {Object} reducers - An object mapping reducer functions to their state slices.
         * @param {Function} contactReducer - Reducer function for managing contact state.
         */
        importProvidersFrom(StoreModule.forRoot({ contact: contactReducer })),

        /**
         * Configures the NgRx effects with the specified effects classes.
         * @param {Array} effects - An array of effects classes to be registered.
         * @param {Type} ContactEffects - Effects class for managing side effects related to contacts.
         */
        importProvidersFrom(EffectsModule.forRoot([ContactEffects])),

        /**
         * Configures the Redux DevTools extension for debugging NgRx store.
         * @param {Object} config - Configuration object for the Redux DevTools extension.
         * @param {number} maxAge - Retains the last 25 states.
         * @param {boolean} logOnly - Restricts the extension to log-only mode in production.
         */
        importProvidersFrom(
            StoreDevtoolsModule.instrument({
                maxAge: 25, // Retains last 25 states
                logOnly: environment.production // Restrict extension to log-only mode
            })
        ),
    ]
}).catch(err => console.error(err));
