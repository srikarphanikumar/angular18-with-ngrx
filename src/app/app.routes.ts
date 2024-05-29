import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';

/**
 * Array of route definitions for the application.
 * Each route associates a path with a component to be displayed when the path is accessed.
 */
export const routes: Routes = [
    /**
     * Route for the home page.
     * The empty path '' matches the default route.
     * The HomeComponent is displayed when this route is accessed.
     */
    { path: '', component: HomeComponent },

    /**
     * Route for the about page.
     * The 'about' path matches the route.
     * The AboutComponent is displayed when this route is accessed.
     */
    { path: 'about', component: AboutComponent },

    /**
     * Route for the contact page.
     * The 'contact' path matches the route.
     * The ContactComponent is displayed when this route is accessed.
     */
    { path: 'contact', component: ContactComponent },

    /**
     * Route for the contact detail page.
     * The 'contact/:id' path matches the route with a dynamic parameter 'id'.
     * The ContactDetailComponent is displayed when this route is accessed.
     * The ':id' parameter allows for the display of specific contact details based on the id.
     */
    { path: 'contact/:id', component: ContactDetailComponent }
];
