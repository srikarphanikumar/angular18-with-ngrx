import { createAction, props } from '@ngrx/store';
import { Contact } from '../../models/contact.model';

/**
 * Action to initiate loading of contacts.
 * This action is dispatched when the contact loading process starts.
 */
export const loadContacts = createAction('[Contact] Load Contacts');

/**
 * Action dispatched when the contact loading process succeeds.
 * @param contacts - Array of contacts loaded successfully.
 */
export const loadContactsSuccess = createAction(
  '[Contact] Load Contacts Success',
  props<{ contacts: Contact[] }>()
);

/**
 * Action dispatched when the contact loading process fails.
 * @param error - Error object containing details about the failure.
 */
export const loadContactsFailure = createAction(
  '[Contact] Load Contacts Failure',
  props<{ error: any }>()
);
