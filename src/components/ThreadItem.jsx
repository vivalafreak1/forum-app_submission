import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import CardActions from '@mui/material/CardActions';
import { FaRegComment } from 'react-icons/fa';
import { postedAt } from '../utils';
import VoteButton from './VoteButton';

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  upVote,
  downVote,
  neutralizeVote,
  threadOwner,
  authUser,
}) {
  const navigate = useNavigate();

  const onThreadClick = () => {
    navigate(`/threads/${id}`);
  };

  const onThreadPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      navigate(`/threads/${id}`);
    }
  };

  const truncatedTitle = title.length > 60 ? `${title.substring(0, 60)}...` : parse(title);
  const truncatedBody = body.length > 100 ? `${body.substring(0, 100)}...` : parse(body);

  return (
    <div
      className="thread-item"
    >
      <div className="thread-item__user-photo">
        <img src={threadOwner.avatar} alt={threadOwner.name} />
      </div>
      <div
        className="thread-item__detail"
        role="button"
        tabIndex={0}
        onClick={onThreadClick}
        onKeyDown={onThreadPress}
      >
        <header>
          <div className="thread-item__user-info">
            <p className="thread-item__user-name">{threadOwner.name}</p>
            <p className="thread-item__created-at">{postedAt(createdAt)}</p>
          </div>
        </header>
        <article>
          <p className="thread-item__category">{category}</p>
          <p className="thread-item__title">{truncatedTitle}</p>
          <p className="thread-item__body">{truncatedBody}</p>
        </article>
      </div>
      <CardActions>
        <VoteButton
          id={id}
          authUser={authUser}
          upVote={upVote}
          downVote={downVote}
          neutralizeVote={neutralizeVote}
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
        />
        <FaRegComment />
        <p className="thread-item__total-comments">{totalComments}</p>
      </CardActions>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  threadOwner: PropTypes.shape(userShape).isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
  authUser: PropTypes.string.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
};

export { userShape, threadItemShape };

export default ThreadItem;
