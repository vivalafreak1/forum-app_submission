// import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  UP_VOTE_THREAD_DETAIL: 'UP_VOTE_THREAD_DETAIL',
  DOWN_VOTE_THREAD_DETAIL: 'DOWN_VOTE_THREAD_DETAIL',
  NEUTRALIZE_VOTE_THREAD_DETAIL: 'NEUTRALIZE_VOTE_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
  NEUTRALIZE_VOTE_COMMENT: 'NEUTRALIZE_VOTE_COMMENT',
  SET_LOADING: 'SET_LOADING',
};

function setLoading(value) {
  return {
    type: ActionType.SET_LOADING,
    payload: value,
  };
}

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function upVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.UP_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function downVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.DOWN_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function neutralizeVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function upVoteCommentActionCreator(commentId, userId) {
  return {
    type: ActionType.UP_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function downVoteCommentActionCreator(commentId, userId) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function neutralizeVoteCommentActionCreator(commentId, userId) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(setLoading(false));
    }
    // dispatch(hideLoading());
  };
}

function asyncUpVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { threadDetail, authUser } = getState();
    const { threadDetail: detail } = threadDetail;
    console.log(detail, authUser);
    dispatch(upVoteThreadDetailActionCreator(authUser.id));
    try {
      await api.upVoteThread(detail.id);
      dispatch(setLoading(false));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncDownVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { threadDetail, authUser } = getState();
    dispatch(downVoteThreadDetailActionCreator(authUser.id));
    try {
      await api.downVoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncNeutralizeVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { threadDetail, authUser } = getState();
    const { threadDetail: detail } = threadDetail;
    console.log(detail);
    dispatch(neutralizeVoteThreadDetailActionCreator(authUser.id));
    try {
      await api.neutralizeThreadVote(detail.threadDetail.id);
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncAddComment({ content, idThread }) {
  return async (dispatch, getState) => {
    // dispatch(showLoading());
    // const { threadDetail } = getState();
    try {
      await api.createComment({
        content,
        threadId: idThread,
      });
      // dispatch(addCommentActionCreator(comment));
      dispatch(asyncReceiveThreadDetail(idThread));
    } catch (error) {
      alert(error.message);
    }
    // dispatch(hideLoading());
  };
}

function asyncUpVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { threadDetail, authUser } = getState();
    dispatch(upVoteCommentActionCreator(commentId, authUser.id));
    try {
      await api.upVoteComment(threadDetail.id, commentId);
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncDownVoteComment(commentId) {
  return async (dispatch, getState) => {
    // dispatch(showLoading());
    const { threadDetail, authUser } = getState();
    dispatch(downVoteCommentActionCreator(commentId, authUser.id));
    try {
      await api.downVoteComment(threadDetail.id, commentId);
    } catch (error) {
      alert(error.message);
    }
    // dispatch(hideLoading());
  };
}

function asyncNeutralizeVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { threadDetail, authUser } = getState();
    dispatch(neutralizeVoteCommentActionCreator(commentId, authUser.id));
    try {
      await api.neutralVoteComment(threadDetail.id, commentId);
    } catch (error) {
      alert(error.message);
    }
  };
}

export {
  ActionType,
  asyncReceiveThreadDetail,
  asyncUpVoteThreadDetail,
  asyncDownVoteThreadDetail,
  asyncNeutralizeVoteThreadDetail,
  asyncAddComment,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralizeVoteComment,
};
