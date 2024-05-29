import { createReducer, on } from '@ngrx/store';
import { loadContacts, loadContactsSuccess, loadContactsFailure } from '../actions/contact.actions';
import { Contact } from '../../models/contact.model';

export interface ContactState {
    contacts: Contact[];
    error: any;
}

export const initialState: ContactState = {
    contacts: [],
    error: null
};

export const contactReducer = createReducer(
    initialState,
    on(loadContacts, state => {
        console.log('Load contacts action');
        return { ...state };
    }),
    on(loadContactsSuccess, (state, { contacts }) => {
        console.log('Load contacts success action', contacts);
        return { ...state, contacts };
    }),
    on(loadContactsFailure, (state, { error }) => {
        console.error('Load contacts failure action', error);
        return { ...state, error };
    })
);
