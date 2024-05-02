/**
* test scenario for leaderboardsReducer
*
* - leaderboardsReducers function
*  - should return the initial state when given by unknown action
*  - should return the leaderboards when given by RECEIVE_LEADERBOARDS action
*/

import { describe, it, expect } from 'vitest';
import leaderboardsReducer from './reducer';

describe('leaderboardsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // Arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // Action
    const nextState = leaderboardsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the leaderboards when given by RECEIVE_LEADERBOARDS action', () => {
    // Arrange
    const initialState = [];
    const action = {
      type: 'RECEIVE_LEADERBOARDS',
      payload: {
        leaderboards: [
          {
            user: {
              id: 'user-aROWej8yYA1sOfHN',
              name: 'Dicoding',
              email: 'admin@dicoding.com',
              avatar: 'https://ui-avatars.com/api/?name=Dicoding&background=random',
            },
            score: 25,
          },
          {
            user: {
              id: 'user-aROWej8yYA1sOfHN',
              name: 'Arief',
              email: 'admin@dicoding.org',
              avatar: 'https://ui-avatars.com/api/?name=Dicoding&background=random',
            },
            score: [],
          },
        ],
      },
    };
    // Action
    const nextState = leaderboardsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(action.payload.leaderboards);
  });
});
