import React, { useState } from 'react';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import classnames from 'classnames';

import { openai, logo } from './assets';
import { Home, CreatePost } from './pages';

import i18n from './i18n';
import { withNamespaces } from 'react-i18next';
import detector from "i18next-browser-languagedetector";

const App = (props) => {
  const { t } = props;
  const [language, setLanguage] = useState(`${i18n.use(detector).language}`);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-[#292929] sm:px-8 px-4 py-4 border-b border-b-[#403f41]">
        <Link to="/" className="flex flex-row">
          <h1 className="text-white font-bold uppercase text-2xl mr-2">Dallify</h1>
          <img src={logo} img="logo" className="w-[32px] h-[32px]"/>
        </Link>

        <div>
          <Link to="create-post" className="font-bold bg-[#ffa31a] text-[#1b1b1b] px-4 py-2 rounded-md">
            {t('create')}
          </Link>
        </div>
      </header>

      <main className="sm:p-8 px-4 py-8 w-full bg-[#1b1b1b] min-h-[calc(100vh-126px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>

      <footer className="w-full flex items-center justify-between bg-[#292929] sm:px-8 px-4 py-4 border-t border-t-[#403f41]">
        <Link to="/">
            <img src={openai} alt="openai-logo" className="invert w-28 object-contain"/>
        </Link>
        <a
          href="https://mondevyat.com"
          rel="noreferrer noopener"
          target="_blank"
          className="text-[#ffa31a] underline"
        >
          mondevyat
        </a>
        <div className="flex flex-row items-center text-white">
          <button
            className={classnames({"font-bold text-[#ffa31a]": language === 'ru'})}
            onClick={() => {
              changeLanguage('ru');
              setLanguage('ru');
            }}
            >
              RU
          </button>
          <span className="px-1 font-bold">/</span>
          <button
            className={classnames({"font-bold text-[#ffa31a]": language === 'en'})}
            onClick={() => {
              changeLanguage('en');
              setLanguage('en')
            }}
          >
            EN
          </button>
        </div>
      </footer>
    </BrowserRouter>
  )
}

export default withNamespaces()(App);
