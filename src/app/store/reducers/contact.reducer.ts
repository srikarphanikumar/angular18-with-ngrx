import { createReducer, on } from '@ngrx/store';
import { loadContacts, loadContactsSuccess, loadContactsFailure } from '../actions/contact.actions';
import { Contact } from '../../models/contact.model';

/**
 * Interface representing the state of contacts.
 * @property {Contact[]} contacts - Array of contact objects.
 * @property {any} error - Error object for handling errors.
 */
export interface ContactState {
    contacts: Contact[];
    error: any;
}

/**
 * Initial state of the contacts.
 * @property {Contact[]} contacts - Initial empty array of contacts.
 * @property {any} error - Initial value for error is null.
 */
export const initialState: ContactState = {
    contacts: [],
    error: null
};

/**
 * Reducer function to handle actions related to contacts.
 * @param {ContactState} state - The current state of the contacts.
 * @param {Action} action - The action being handled.
 * @returns {ContactState} The new state of the contacts.
 */
export const contactReducer = createReducer(
    initialState,
    /**
     * Handles the 'loadContacts' action.
     * Logs the action and returns the current state.
     */
    on(loadContacts, state => {
        console.log('Load contacts action');
        return { ...state };
    }),
    /**
     * Handles the 'loadContactsSuccess' action.
     * Updates the state with the loaded contacts.
     * @param {ContactState} state - The current state of the contacts.
     * @param {Contact[]} contacts - The array of contacts loaded successfully.
     * @returns {ContactState} The new state with the updated contacts.
     */
    on(loadContactsSuccess, (state, { contacts }) => {
        console.log('Load contacts success action', contacts);
        return { ...state, contacts };
    }),
    /**
     * Handles the 'loadContactsFailure' action.
     * Updates the state with the error.
     * @param {ContactState} state - The current state of the contacts.
     * @param {any} error - The error that occurred during loading.
     * @returns {ContactState} The new state with the error.
     */
    on(loadContactsFailure, (state, { error }) => {
        console.error('Load contacts failure action', error);
        return { ...state, error };
    })
);
