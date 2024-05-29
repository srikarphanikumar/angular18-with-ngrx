import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ContactState } from '../store/reducers/contact.reducer';
import { loadContacts } from '../store/actions/contact.actions';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contacts$: Observable<Contact[]>;

  constructor(private store: Store<{ contact: ContactState }>) {
    this.contacts$ = this.store.select(state => state.contact.contacts);
  }

  ngOnInit(): void {
    console.log('ContactComponent initialized');
    this.store.dispatch(loadContacts());
  }
}
