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
  const [selectedCategory, setSelectedCategory] = useState('');
  const {
    users = [],
    authUser,
  } = useSelector((states) => states);
  const { threads, loading } = useSelector((states) => states.threads);
  const dispatch = useDispatch();

  const categories = new Set(threads?.map((thread) => thread.category));

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

  const threadList = threads?.map((thread) => ({
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
        const isCategorySelected = selectedCategory === category;
        const categoryClass = isCategorySelected
          ? 'home-page__category-contained home-page__category-selected'
          : 'home-page__category-outlined';

        return (
          <button
            className={categoryClass}
            key={category}
            onClick={() => {
              setFilter(isCategorySelected ? '' : category);
              setSelectedCategory(isCategorySelected ? '' : category);
            }}
            type="button"
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
          aria-label="add"
          sx={{
            bottom: 40, right: 40, position: 'fixed', bgcolor: '#91ff35',
          }}
        >
          <IoMdAdd style={{ fontSize: '30px', color: 'black' }} />
        </Fab>
      </Link>
    </section>
  );
}

export default HomePage;
