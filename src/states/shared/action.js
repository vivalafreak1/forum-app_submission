import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { receiveUsersActionCreator } from '../users/action';
import { receiveThreadsActionCreator, loadingThreadsActionCreator } from '../threads/action';

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    // dispatch(loadingThreadsActionCreator(true));
    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
      dispatch(hideLoading());
    } catch (error) {
      alert(error.message);
    }
    // dispatch(loadingThreadsActionCreator(false));
    dispatch(hideLoading());
  };
}

export default asyncPopulateUsersAndThreads;
