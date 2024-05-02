/**
* test scenario for threadDetailReducer
*
* - threadDetailReducers function
*  - should return the initial state
     when given by unknown action
*  - should return the threadDetail
     when given by RECEIVE_THREAD_DETAIL action
*  - should return the threadDetail with the toggled UpVote threadDetail
     when given by UP_VOTE_THREAD_DETAIL action
*  - should return the threadDetail with the toggled DownVote threadDetail
     when given by DOWN_VOTE_THREAD_DETAIL action
*  - should return the threadDetail without the toggled UpVote and DownVote threadDetail
     when given by NEUTRALIZE_VOTE_THREAD_DETAIL action
*  - should return the threadDetail with the new comment
     when given by ADD_COMMENT action
*  - should return the threadDetail with the toggled UpVote comment
     when given by UP_VOTE_COMMENT action
*  - should return the threadDetail with the toggled DownVote comment
     when given by DOWN_VOTE_COMMENT action
*  - should return the threadDetail without the toggled UpVote and DownVote comment
     when given by NEUTRALIZE_VOTE_COMMENT action
*/

import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer';

describe('threadDetailReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // Arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threadDetail when given by RECEIVE_THREAD_DETAIL action', () => {
    // Arrange
    const initialState = [];
    const action = {
      type: 'RECEIVE_THREAD_DETAIL',
      payload: {
        threadDetail: {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'Testing',
          createdAt: '2022-09-22T10:06:55.588Z',
          owner: {},
          upVotesBy: [],
          downVotesBy: [],
          comments: [],
        },
      },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(action.payload.threadDetail);
  });

  it('should return the threadDetail with the toggled UpVote threadDetail when given by UP_VOTE_THREAD_DETAIL action', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'Testing',
      createdAt: '2022-09-22T10:06:55.588Z',
      owner: {},
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };

    const action = {
      type: 'UP_VOTE_THREAD_DETAIL',
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [action.payload.userId],
      downVotesBy: [],
    });
  });

  it('should return the threadDetail with the toggled DownVote threadDetail when given by DOWN_VOTE_THREAD_DETAIL action', () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'Testing',
      createdAt: '2022-09-22T10:06:55.588Z',
      owner: {},
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };

    const action = {
      type: 'DOWN_VOTE_THREAD_DETAIL',
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [],
      downVotesBy: [action.payload.userId],
    });
  });

  it('should return the threadDetail without the toggled UpVote and DownVote threadDetail when given by NEUTRALIZE_VOTE_THREAD_DETAIL action', () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'Testing',
      createdAt: '2022-09-22T10:06:55.588Z',
      owner: {},
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };

    const action = {
      type: 'NEUTRALIZE_VOTE_THREAD_DETAIL',
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [],
      downVotesBy: [],
    });
  });

  it('should return the threadDetail with new comment when given by ADD_COMMENT action', () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'Testing',
      createdAt: '2022-09-22T10:06:55.588Z',
      owner: {},
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };

    const action = {
      type: 'ADD_COMMENT',
      payload: {
        comment: {
          id: 'comment-1',
          content: 'Ini adalah comment pertama',
          createdAt: '2022-09-22T10:06:55.588Z',
          upVotesBy: [],
          downVotesBy: [],
          owner: {},
        },
      },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [action.payload.comment, ...initialState.comments],
    });
  });

  it('should return the threadDetail with UpVote toggled comment when given by UP_VOTE_COMMENT action', () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'Testing',
      createdAt: '2022-09-22T10:06:55.588Z',
      owner: {},
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah comment pertama',
          createdAt: '2022-09-22T10:06:55.588Z',
          upVotesBy: [],
          downVotesBy: [],
          owner: { id: 'user-1', name: 'John Doe', email: 'johndoe@dicoding.com' },
        },
      ],
    };

    const action = {
      type: 'UP_VOTE_COMMENT',
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
      },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [action.payload.userId],
          downVotesBy: [],
        },
      ],
    });
  });

  it('should return the threadDetail with DownVote toggled comment when given by DOWN_VOTE_COMMENT action', () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'Testing',
      createdAt: '2022-09-22T10:06:55.588Z',
      owner: {},
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah comment pertama',
          createdAt: '2022-09-22T10:06:55.588Z',
          upVotesBy: [],
          downVotesBy: [],
          owner: { id: 'user-1', name: 'John Doe', email: 'johndoe@dicoding.com' },
        },
      ],
    };

    const action = {
      type: 'DOWN_VOTE_COMMENT',
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
      },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [],
          downVotesBy: [action.payload.userId],
        },
      ],
    });
  });

  it('should return the threadDetail without the toggled UpVote and DownVote comment when given by NEUTRALIZE_VOTE_COMMENT action', () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'Testing',
      createdAt: '2022-09-22T10:06:55.588Z',
      owner: {},
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah comment pertama',
          createdAt: '2022-09-22T10:06:55.588Z',
          upVotesBy: [],
          downVotesBy: [],
          owner: { id: 'user-1', name: 'John Doe', email: 'johndoe@dicoding.com' },
        },
      ],
    };

    const action = {
      type: 'NEUTRALIZE_VOTE_COMMENT',
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
      },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    });
  });
});
