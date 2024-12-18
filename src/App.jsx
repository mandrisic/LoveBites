import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import CategoryPage from './components/CategoryPage';
import RecipeDetailPage from './components/RecipeDetailPage';
import AddRecipeForm from './components/AddRecipeForm';
import EditRecipeForm from './components/EditRecipeForm';


function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='/category/:categoryName' element={<CategoryPage />} />
        <Route path="/category/:categoryName/recipe/:id" element={<RecipeDetailPage />} />
        <Route path="/add-recipe" element={<AddRecipeForm />} />
        <Route path="/category/:categoryName/recipe/:id/edit-recipe" element={<EditRecipeForm />} />
      </Routes>
    </Router>
  )
}

export default App
