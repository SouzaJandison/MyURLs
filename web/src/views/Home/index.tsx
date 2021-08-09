import React from 'react';
import { FaFolder, FaYoutube } from 'react-icons/fa';

import './styles.css';

import logo from '../../assets/logo.svg';
import user from '../../assets/user.svg';

export function Home(): JSX.Element {
  return (
    <div className="home-container">
      <header>
        <img src={logo} alt="MyURLs" width="150" height="70" />

        <div className="profile">
          <span> Olá, UserTeste</span>
          <img src={user} alt="user" width="46" />
        </div>
      </header>
      <main>
        <section className="folder">
          <ul>
            <li>
              <div className="folder-itens">
                <FaFolder size={24} color="#F2B705" />
                Pasta 01
              </div>
              <ul className="sub-folder">
                <li>
                  <div className="sub-folder-itens">
                    <FaFolder size={24} color="#F2B705" />
                    <li>sub pasta 01</li>
                  </div>
                </li>
                <li>
                  <div className="sub-folder-itens">
                    <FaFolder size={24} color="#F2B705" />
                    <li>sub pasta 01</li>
                  </div>
                  <ul className="sub-folder">
                    <li>
                      <div className="sub-folder-itens">
                        <FaFolder size={24} color="#F2B705" />
                        <li>sub pasta 02</li>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <div className="folder-itens">
                <FaFolder size={24} color="#F2B705" />
                Pasta 01
              </div>
            </li>
            <li>
              <div className="folder-itens">
                <FaFolder size={24} color="#F2B705" />
                Pasta 01
              </div>
            </li>
            <li>
              <div className="folder-itens">
                <FaFolder size={24} color="#F2B705" />
                Pasta 04
              </div>
              <ul className="sub-folder">
                <li>
                  <div className="sub-folder-itens">
                    <FaFolder size={24} color="#F2B705" />
                    <li>sub pasta 05</li>
                  </div>
                  <ul className="sub-folder">
                    <li>
                      <div className="sub-folder-itens">
                        <FaFolder size={24} color="#F2B705" />
                        <li>sub pasta 02</li>
                      </div>
                      <ul className="sub-folder">
                        <li>
                          <div className="sub-folder-itens">
                            <FaFolder size={24} color="#F2B705" />
                            <li>sub pasta 02</li>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </section>

        <section className="home-content">
          <ul>
            <li className="url-itens">
              <FaYoutube size={24} color="red" />
              <a href="https://www.youtube.com/">YouTube</a>
            </li>
            <li className="url-itens">
              <FaFolder size={24} color="#F2B705" />
              Pasta 01
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
