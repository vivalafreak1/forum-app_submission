import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Fab } from '@mui/material';
import { IoMdAdd } from 'react-icons/io';
import ThreadsList from '../components/ThreadsList';
import asyncPopulateUsersAndThreads from '../states/shared/action';
import {
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralizeVoteThread,
} from '../states/threads/action';

function HomePage() {
  const [filter, setFilter] = useState('');
  const {
    users = [],
    authUser,
  } = useSelector((states) => states);
  const { threads, loading } = useSelector((states) => states.threads);
  const dispatch = useDispatch();

  const categories = new Set(threads.map((thread) => thread.category));

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onUpVoteThread = (id) => {
    dispatch(asyncUpVoteThread(id));
  };

  const onDownVoteThread = (id) => {
    dispatch(asyncDownVoteThread(id));
  };

  const onNeutralizeVoteThread = (id) => {
    dispatch(asyncNeutralizeVoteThread(id));
  };

  const threadList = threads.map((thread) => ({
    ...thread,
    threadOwner: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  if (loading) {
    return <div>Loading..</div>;
  }

  return (
    <section className="home-page">
      {Array.from(categories).map((category) => {
        if (filter === category) {
          return (
            <button
              className="home-page__category-contained"
              key={category}
              onClick={() => setFilter('')}
              type="submit"
            >
              {`#${category}`}
            </button>
          );
        }
        return (
          <button
            className="home-page__category-outlined"
            key={category}
            type="submit"
            onClick={() => setFilter(category)}
          >
            {`#${category}`}
          </button>
        );
      })}

      <ThreadsList
        threads={
          filter
            ? threadList.filter((thread) => thread.category === filter)
            : threadList
        }
        upVote={onUpVoteThread}
        downVote={onDownVoteThread}
        neutralizeVote={onNeutralizeVoteThread}
      />
      <Link to="/new">
        <Fab
          color="primary"
          aria-label="add"
          sx={{ bottom: 40, right: 40, position: 'fixed' }}
        >
          <IoMdAdd />
        </Fab>
      </Link>
    </section>
  );
}

export default HomePage;
