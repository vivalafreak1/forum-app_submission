import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeaderboardItem from '../components/LeaderboardItem';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';

function LeaderboardsPage() {
  const dispatch = useDispatch();
  const { leaderboards = [], loading = true } = useSelector((states) => states.leaderboards);

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  console.log(loading);

  return (
    <section className="leaderboards-page">
      <div className="leaderboards-page__card">
        <title className="leaderboards-page__title">Leaderboards</title>
        <div className="leaderboards-page__grid-container">
          <div className="leaderboards-page__grid-item">
            <h5 className="leaderboards-page__subtitle">Pengguna Teratas</h5>
          </div>
          <div className="leaderboards-page_grid-item">
            <h5 className="leaderboards-page__subtitle">Skor</h5>
          </div>
        </div>
        {leaderboards.map(({ user, score }) => (
          <LeaderboardItem key={user.id} user={user} score={score} />
        ))}
      </div>
    </section>
  );
}

export default LeaderboardsPage;
