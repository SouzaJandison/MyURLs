import React from 'react';
import { FaFacebookSquare } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import { SvgGoogle } from '../../components/Icons';

import './styles.css';

export function Register(): JSX.Element {
  return (
    <div className="container">
      <div className="content">
        <Link to="/" className="back-page">
          <FiArrowLeft size={24} />
          Volta para o logon
        </Link>

        <section>
          <img src={logo} alt="MyURLs" />
        </section>

        <form>
          <span className="label">Username</span>
          <input type="text" name="username" id="username" />

          <span className="label">Email</span>
          <input type="email" name="email" id="email" />

          <span className="label">Password</span>
          <input type="password" name="password" id="password" />

          <button type="submit">Cadastra</button>

          <span className="line">OU</span>

          <div className="auth-buttons">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#" className="btn-face">
              <FaFacebookSquare size={32} color="#fff" />
              Facebook
            </a>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#" className="btn-google">
              <SvgGoogle />
              Google
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
