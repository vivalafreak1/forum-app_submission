import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoEarthOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
    navigate('/');
  };

  return (
    <section className="login-page">
      <header className="login-page__hero">
        <h1><IoEarthOutline /></h1>
      </header>
      <article className="login-page__main">
        <h2>
          See
          {' '}
          <strong>The World</strong>
          ,
          {' '}
          <br />
          Through Open Space.
        </h2>

        <LoginInput login={onLogin} />
        <p>
          Belum punya akun?
          {' '}
          <Link to="/register">Daftar disini</Link>
        </p>
      </article>
    </section>
  );
}

export default LoginPage;
