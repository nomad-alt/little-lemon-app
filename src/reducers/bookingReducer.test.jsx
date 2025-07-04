import { describe, test, expect } from 'vitest';
import { initializeTimes, updateTimes } from './bookingReducer';

describe('bookingReducer functions', () => {
  test('initializeTimes returns the correct initial times', () => {
    const expectedTimes = ['17:00', '18:00', '19:00', '20:00', '21:00'];
    const result = initializeTimes();
    expect(result).toEqual(expectedTimes);
  });

  test('updateTimes returns the same value provided in state for SET_DATE action', () => {
    const state = ['17:00', '18:00', '19:00', '20:00'];
    const action = { type: 'SET_DATE', date: '2023-12-25' };

    const result = updateTimes(state, action);
    expect(result).toEqual(state);
  });

  test('updateTimes returns the same state for unknown action types', () => {
    const state = ['17:00', '18:00'];
    const action = { type: 'UNKNOWN_ACTION' };

    const result = updateTimes(state, action);
    expect(result).toBe(state);
  });

  test('updateTimes returns new times when SET_TIMES action is dispatched', () => {
    const state = ['17:00', '18:00'];
    const newTimes = ['19:00', '20:00', '21:00'];
    const action = { type: 'SET_TIMES', times: newTimes };

    const result = updateTimes(state, action);
    expect(result).toEqual(newTimes);
  });
});