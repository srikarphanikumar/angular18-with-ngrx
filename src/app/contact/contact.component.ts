import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ContactState } from '../store/reducers/contact.reducer';
import { loadContacts } from '../store/actions/contact.actions';
import { Contact } from '../models/contact.model';

/**
 * @Component decorator defines metadata for the ContactComponent
 */
@Component({
  selector: 'app-contact', // HTML tag to use this component
  standalone: true, // Indicates this component does not belong to any module
  imports: [CommonModule, RouterModule], // Modules to import for this component
  templateUrl: './contact.component.html', // Path to the template file
  styleUrls: ['./contact.component.scss'] // Path to the stylesheet file
})
export class ContactComponent implements OnInit {
  // Observable to hold the list of contacts
  contacts$: Observable<Contact[]>;

  /**
   * Constructor function to initialize the component
   * @param store - NgRx store to manage state
   */
  constructor(private store: Store<{ contact: ContactState }>) {
    // Selects the contacts slice from the state and assigns it to contacts$
    this.contacts$ = this.store.select(state => state.contact.contacts);
  }

  /**
   * Lifecycle hook called after the component's view has been fully initialized
   */
  ngOnInit(): void {
    console.log('ContactComponent initialized'); // Log message indicating component initialization
    // Dispatches the loadContacts action to fetch the list of contacts
    this.store.dispatch(loadContacts());
  }
}
