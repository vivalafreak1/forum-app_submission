/**
 * skenario test
 *
 * - asyncReceiveLeaderboards thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import {
  describe, beforeEach, afterEach, it, vi, expect,
} from 'vitest';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncReceiveLeaderboards, receiveLeaderboardsActionCreator } from './action';

const fakeLeaderboardsResponse = [
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
    score: 0,
  },
];

const fakeErrorResponse = new Error('Ups! Something went wrong');

describe('asyncReceiveLeaderboards thunk', () => {
  beforeEach(() => {
    api._getLeaderboards = api.getLeaderboards;
  });

  afterEach(() => {
    api.getLeaderboards = api._getLeaderboards;

    // Delete Backup Data
    delete api._getLeaderboards;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // Arrange
    // Stub Implementation
    api.getLeaderboards = () => Promise.resolve(fakeLeaderboardsResponse);

    // Mock Dispatch
    const dispatch = vi.fn();

    // Action
    await asyncReceiveLeaderboards()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveLeaderboardsActionCreator(fakeLeaderboardsResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // Arrange
    // Stub Implementation
    api.getLeaderboards = () => Promise.reject(fakeErrorResponse);

    // Mock Dispatch
    const dispatch = vi.fn();

    // Mock Alert
    window.alert = vi.fn();

    // Action
    await asyncReceiveLeaderboards()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
