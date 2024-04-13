import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { userShape } from './ThreadItem';

function Navigation({ authUser, signOut }) {
  const { id, avatar, name } = authUser;

  return (
    <div className="navigation">
      <img src={avatar} alt={id} title={name} />
      <nav>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/leaderboards" className="nav-link">Leaderboard</Link>
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
