import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  asyncReceiveThreadDetail,
  asyncUpVoteThreadDetail,
  asyncDownVoteThreadDetail,
  asyncNeutralizeVoteThreadDetail,
  asyncAddComment,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralizeVoteComment,
} from '../states/threadDetail/action';
import ThreadDetail from '../components/ThreadDetail';
import CommentsList from '../components/CommentsList';
import CommentInput from '../components/CommentInput';
import Loading from '../components/Loading';

function DetailPage() {
  const { threadId } = useParams();
  const {
    threadDetail: thread,
    authUser,
  } = useSelector((states) => states);
  const { threadDetail = {}, loading = true } = thread;
  const dispatch = useDispatch();
  const { threadDetail: detail } = threadDetail;
  console.log(threadDetail);
  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(threadId));
  }, [threadId, dispatch]);

  const onUpVoteThreadDetail = () => {
    dispatch(asyncUpVoteThreadDetail());
  };

  const onDownVoteThreadDetail = () => {
    dispatch(asyncDownVoteThreadDetail());
  };

  const onNeutralizeVoteThreadDetail = () => {
    dispatch(asyncNeutralizeVoteThreadDetail());
  };

  const onCommentSubmit = (content, idThread) => {
    dispatch(asyncAddComment({ content, idThread }));
  };

  const onUpVoteComment = (id) => {
    dispatch(asyncUpVoteComment(id));
  };

  const onDownVoteComment = (id) => {
    dispatch(asyncDownVoteComment(id));
  };

  const onNeutralizeVoteComment = (id) => {
    dispatch(asyncNeutralizeVoteComment(id));
  };

  console.log(loading);

  return (
    <section className="detail-page">
      <div className="detail-page__card">
        {loading ? <Loading /> : (
          <>
            <ThreadDetail
              {...detail}
              authUser={authUser.id}
              upVoteThreadDetail={onUpVoteThreadDetail}
              downVoteThreadDetail={onDownVoteThreadDetail}
              neutralizeVoteThreadDetail={onNeutralizeVoteThreadDetail}
            />
            <CommentInput addComment={onCommentSubmit} />
            <p className="detail-page__comment-count">
              Komentar(
              {detail?.comments?.length}
              )
            </p>
            <CommentsList
              authUser={authUser.id}
              comments={detail?.comments}
              upVoteComment={onUpVoteComment}
              downVoteComment={onDownVoteComment}
              neutralizeVoteComment={onNeutralizeVoteComment}
            />
          </>
        ) }
      </div>
    </section>
  );
}

export default DetailPage;
