import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { userShape } from './ThreadItem';

function Navigation({ authUser, signOut }) {
  const { id, photo, name } = authUser;

  return (
    <div className="navigation">
      <img src={photo} alt={id} title={name} />
      <nav>
        <Link to="/">Home</Link>
        <Link to="/leaderboards">Leaderboard</Link>
      </nav>
      <Button variant="contained" color="error" onClick={signOut}>Logout</Button>
    </div>
  );
}

Navigation.propTypes = {
  authUser: PropTypes.shape(userShape).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Navigation;
