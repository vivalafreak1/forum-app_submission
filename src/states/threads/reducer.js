import { ActionType } from './action';

const initialState = {
  threads: [],
  loading: false,
};

function threadsReducer(initial = initialState, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return { ...initial, threads: action.payload.threads };
    case ActionType.LOADING:
      return { ...initial, loading: action.payload };
    case ActionType.ADD_THREAD:
      return [action.payload.thread, ...initial.threads];
    case ActionType.UP_VOTE_THREAD:
      return initial.threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.includes(action.payload.userId)
              ? thread.upVotesBy.filter((id) => id !== action.payload.userId)
              : thread.upVotesBy.concat([action.payload.userId]),
            downVotesBy: thread.downVotesBy.includes(action.payload.userId)
              ? thread.downVotesBy.filter((id) => id !== action.payload.userId)
              : thread.downVotesBy,
          };
        }
        return thread;
      });
    case ActionType.DOWN_VOTE_THREAD:
      return initial.threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.includes(action.payload.userId)
              ? thread.upVotesBy.filter((id) => id !== action.payload.userId)
              : thread.upVotesBy,
            downVotesBy: thread.downVotesBy.includes(action.payload.userId)
              ? thread.downVotesBy.filter((id) => id !== action.payload.userId)
              : thread.downVotesBy.concat([action.payload.userId]),
          };
        }
        return thread;
      });
    case ActionType.NEUTRALIZE_VOTE_THREAD:
      return initial.threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.includes(action.payload.userId)
              ? thread.upVotesBy.filter((id) => id !== action.payload.userId)
              : thread.upVotesBy,
            downVotesBy: thread.downVotesBy.includes(action.payload.userId)
              ? thread.downVotesBy.filter((id) => id !== action.payload.userId)
              : thread.downVotesBy,
          };
        }
        return thread;
      });
    default:
      return initial;
  }
}

export default threadsReducer;
