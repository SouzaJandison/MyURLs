import React from 'react';
import { FaFacebookSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { SvgGoogle } from '../../components/Icons';

import './styles.css';

export function Logon(): JSX.Element {
  return (
    <div className="container">
      <div className="content">
        <form>
          <h1 className="title">Faça seu logon</h1>

          <span className="label">Email</span>
          <input type="email" name="email" id="email" />

          <span className="label">
            Password
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#" className="back-link">
              Esqueceu?
            </a>
          </span>
          <input type="password" name="password" id="password" />

          <button type="submit">Entrar</button>

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

          <span className="register">
            Não é um membro?
            <Link to="/register" className="back-link">
              Inscreva-se agora
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}
