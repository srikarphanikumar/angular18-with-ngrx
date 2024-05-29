import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { ContactState } from '../store/reducers/contact.reducer';
import { Contact } from '../models/contact.model';

/**
 * @Component decorator defines metadata for the ContactDetailComponent
 */
@Component({
  selector: 'app-contact-detail', // HTML tag to use this component
  standalone: true, // Indicates this component does not belong to any module
  imports: [CommonModule, RouterModule], // Modules to import for this component
  templateUrl: './contact-detail.component.html', // Path to the template file
  styleUrls: ['./contact-detail.component.scss'] // Path to the stylesheet file
})
export class ContactDetailComponent implements OnInit {
  // Observable to hold the details of a single contact, initialized as an empty Contact object
  contact$: Observable<Contact | any> = of({} as Contact);

  /**
   * Constructor function to initialize the component
   * @param route - ActivatedRoute to access route parameters
   * @param store - NgRx store to manage state
   */
  constructor(private route: ActivatedRoute, private store: Store<{ contact: ContactState }>) { }

  /**
   * Lifecycle hook called after the component's view has been fully initialized
   */
  ngOnInit(): void {
    // Retrieves the contact ID from the route parameters
    const id = +this.route.snapshot.paramMap.get('id')!;
    // Selects the contact with the given ID from the store and assigns it to contact$
    this.contact$ = this.store.select(state =>
      state.contact.contacts.find(contact => contact.id === id)
    );
  }
}
