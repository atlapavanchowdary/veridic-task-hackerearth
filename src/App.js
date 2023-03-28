import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import ArticleDetails from './components/ArticleDetails';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route exact path="/" element={<ArticleList />} />
          <Route path="/articles/:slug" element={<ArticleDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

