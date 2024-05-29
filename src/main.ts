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

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserModule, HttpClientModule),
    importProvidersFrom(StoreModule.forRoot({ contact: contactReducer })),
    importProvidersFrom(EffectsModule.forRoot([ContactEffects])),
    importProvidersFrom(
      StoreDevtoolsModule.instrument({
        maxAge: 25, // Retains last 25 states
        logOnly: environment.production // Restrict extension to log-only mode
      })
    ),
  ]
}).catch(err => console.error(err));
