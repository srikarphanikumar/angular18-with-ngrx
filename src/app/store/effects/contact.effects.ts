import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { loadContacts, loadContactsSuccess, loadContactsFailure } from '../actions/contact.actions';
import { Contact } from '../../models/contact.model';

@Injectable()
export class ContactEffects {
    loadContacts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadContacts),
            mergeMap(() => {
                console.log('Load contacts effect triggered');
                return this.http.get<Contact[]>('https://jsonplaceholder.typicode.com/users').pipe(
                    map(contacts => {
                        console.log('Contacts loaded:', contacts);
                        return loadContactsSuccess({ contacts });
                    }),
                    catchError(error => {
                        console.error('Error loading contacts:', error);
                        return of(loadContactsFailure({ error }));
                    })
                );
            })
        )
    );

    constructor(private actions$: Actions, private http: HttpClient) {
        console.log('ContactEffects initialized');
    }
}
