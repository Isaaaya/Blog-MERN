import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Footer } from './components/index';
import { ArticleDetailsPage, AuthPage, MyProfilePage, MyArticlesPage, ManageArticlePage, ArticlesPage } from './pages/index';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from './store';
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-loading-skeleton/dist/skeleton.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/articles/:articleId' element={<ArticleDetailsPage />} />
          <Route path='/articles/:articleId/edit' element={<ManageArticlePage />} />
          <Route path='/auth/register' element={<AuthPage />} />
          <Route path='/auth/login' element={<AuthPage />} />
          <Route path='/profile' element={<MyProfilePage />} />
          <Route path='/profile/articles' element={<MyArticlesPage />} />
          <Route path='/articles/create' element={<ManageArticlePage />} />
          <Route path='/articles' element={<ArticlesPage />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

