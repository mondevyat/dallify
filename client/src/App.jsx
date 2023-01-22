import React, { useState } from 'react';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import classnames from 'classnames';

import { logo } from './assets';
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
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain"/>
        </Link>

        <div>
          <Link to="create-post" className="font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">
            {t('create')}
          </Link>
        </div>
      </header>

      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-118px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>

      <footer className="w-full flex justify-center bg-white sm:px-8 px-4 py-4 border-t border-t-[#e6ebf4]">
        <div className="flex flex-row">
          <button
            className={classnames({"font-bold": language === 'ru'})}
            onClick={() => {
              changeLanguage('ru');
              setLanguage('ru');
            }}
            >
              RU
          </button>
          <span className="px-1 font-bold">/</span>
          <button
            className={classnames({"font-bold": language === 'en'})}
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
