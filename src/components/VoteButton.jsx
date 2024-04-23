import React from 'react';
import PropTypes from 'prop-types';
import {
  AiOutlineLike,
  AiFillLike,
  AiFillDislike,
  AiOutlineDislike,
} from 'react-icons/ai';

function VoteButton({
  id,
  upVote,
  downVote,
  neutralizeVote,
  upVotesBy,
  downVotesBy,
  authUser,
}) {
  const isUpVoted = upVotesBy.includes(authUser);
  const isDownVoted = downVotesBy.includes(authUser);
  console.log(isUpVoted, isDownVoted, authUser);

  const onUpVoteClick = () => {
    upVote(id);
  };

  const onDownVoteClick = () => {
    downVote(id);
  };

  const onNeutralizeVoteClick = () => {
    neutralizeVote(id);
  };

  return (
    <>
      {isUpVoted ? (
        <AiOutlineLike
          onClick={onNeutralizeVoteClick}
        />
      ) : (
        <AiFillLike
          onClick={onUpVoteClick}
        />
      )}
      <p className="vote-button_upvotes">{upVotesBy.length}</p>
      {isDownVoted ? (
        <AiOutlineDislike
          onClick={onNeutralizeVoteClick}
        />
      ) : (
        <AiFillDislike
          onClick={onDownVoteClick}
        />
      )}
      <p className="vote-button_downvotes">{downVotesBy.length}</p>
    </>
  );
}

VoteButton.propTypes = {
  id: PropTypes.string.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string.isRequired,
};

export default VoteButton;
