import React, { useEffect, useState } from 'react';
import '../css/Home.css';
import homebanner from '../img/homebanner.jpg'
import { useNavigate } from 'react-router-dom';


const Home = () => {
	const navigate = useNavigate();


	return (
		<div className="container">
			{/* Header */}
			<h1 className="header">HEALTHify</h1>

			{/* image */}
			<div className="box">
				<img src={homebanner} alt="Healthy person" className="healthy-image" />


				{/* Start Button */}
				<button className="start-button"
					onClick={()=>navigate("/query")}
				>START</button>
			</div>

			{/* Description */}
			<p className="description">
				The recipe recommendation app designed to inspire your healthy lifestyle.
			</p>
		</div>
	);
};

export default Home;
