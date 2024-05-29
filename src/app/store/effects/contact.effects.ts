import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { loadContacts, loadContactsSuccess, loadContactsFailure } from '../actions/contact.actions';
import { Contact } from '../../models/contact.model';

/**
 * @Injectable decorator marks this class as one that participates in the dependency injection system.
 * This class defines the side effects related to loading contacts.
 */
@Injectable()
export class ContactEffects {
    /**
     * Effect to handle loading contacts.
     * Listens for the 'loadContacts' action, makes an HTTP GET request to load contacts,
     * and dispatches either 'loadContactsSuccess' or 'loadContactsFailure' based on the outcome.
     */
    loadContacts$ = createEffect(() =>
        this.actions$.pipe(
            // Listens for the 'loadContacts' action
            ofType(loadContacts),
            mergeMap(() => {
                console.log('Load contacts effect triggered');
                // Makes an HTTP GET request to load contacts
                return this.http.get<Contact[]>('https://jsonplaceholder.typicode.com/users').pipe(
                    // Maps the response to the 'loadContactsSuccess' action
                    map(contacts => {
                        console.log('Contacts loaded:', contacts);
                        return loadContactsSuccess({ contacts });
                    }),
                    // Catches any errors and maps them to the 'loadContactsFailure' action
                    catchError(error => {
                        console.error('Error loading contacts:', error);
                        return of(loadContactsFailure({ error }));
                    })
                );
            })
        )
    );

    /**
     * Constructor function to initialize the effect
     * @param actions$ - Stream of actions dispatched in the application
     * @param http - HttpClient to make HTTP requests
     */
    constructor(private actions$: Actions, private http: HttpClient) {
        console.log('ContactEffects initialized');
    }
}
