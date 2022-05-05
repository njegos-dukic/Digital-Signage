import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainScreen from './components/main-screen';
import Login from './components/login';
import Register from './components/register';
import Statistic from './components/statistic';
import History from './components/history';
import Feedback from './components/feedback'

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="main" element={<MainScreen />} />
      <Route path="register" element={<Register />} />
      <Route path="statistic" element={<Statistic />} />
      <Route path="history" element={<History />} />
      <Route path="feedback" element={<Feedback />} />

    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

