import React from 'react';
import PropTypes from 'prop-types';
import { userShape } from './ThreadItem';

function LeaderboardItem({ user, score }) {
  return (
    <div className="leaderboard_item">
      <img
        className="leaderboard_item-avatar"
        src={user.avatar}
        alt="Avatar Icon"
      />
      <p className="leaderboard_item-name">{user.name}</p>
      <p className="leaderboard_item-score">{score}</p>
    </div>
  );
}

LeaderboardItem.propTypes = {
  user: PropTypes.shape(userShape).isRequired,
  score: PropTypes.number.isRequired,
};

export default LeaderboardItem;
