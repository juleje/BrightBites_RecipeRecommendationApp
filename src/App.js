// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import RecipesWithExplanation from './components/RecipesWithExplanation';
import RecipesWithoutExplanation from './components/RecipesWithoutExplanation';
import './css/App.css';

function App() {
	return (
		<Router>
			<div className='app'>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/recipes-with-explanation" element={<RecipesWithExplanation />} />
					<Route path="/recipes-without-explanation" element={<RecipesWithoutExplanation />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
