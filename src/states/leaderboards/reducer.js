import { ActionType } from './action';

const initialState = {
  leaderboards: [],
  loading: true,
};
function leaderboardsReducer(leaderboards = initialState, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_LEADERBOARDS:
      return {
        ...leaderboards,
        leaderboards: action.payload.leaderboards,
      };
    case ActionType.LOADING:
      return {
        ...leaderboards,
        loading: action.payload,
      };
    default:
      return leaderboards;
  }
}

export default leaderboardsReducer;
