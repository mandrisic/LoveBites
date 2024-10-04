import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import CategoryPage from './components/CategoryPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<HomePage />}></Route>
        <Route path='/category/:categoryName' element={<CategoryPage />}></Route>
      </Routes>
    </Router>
  )
}

export default App
