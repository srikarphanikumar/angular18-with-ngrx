import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { ContactState } from '../store/reducers/contact.reducer';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {
  contact$: Observable<Contact | any> = of({} as Contact);

  constructor(private route: ActivatedRoute, private store: Store<{ contact: ContactState }>) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.contact$ = this.store.select(state =>
      state.contact.contacts.find(contact => contact.id === id)
    );
  }
}
