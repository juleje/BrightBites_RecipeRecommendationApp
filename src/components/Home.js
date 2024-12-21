import React, { useContext, useEffect, useState } from "react";
import { PreferenceContext } from "../contexts/PreferenceContext";
import "../css/Home.css";
import background from '../img/background_black_white.png'
import {
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Box,
} from "@mui/material";
//import homebanner from "../img/salad.jpg";
import homebanner from "../img/minimalist-logo-trimmed.jpg"
import { useNavigate } from "react-router-dom";

const Home = () => {
  const state = useContext(PreferenceContext);
  // console.log(state.preference);

  const navigate = useNavigate();

  return (
    <div className="container">
      {/* Header */}
      <h1 className="home-header">Bright Bites</h1>
      {/* image */}
      <div className="home_content">
        <div className="box">
          <img src={homebanner} alt="Healthy person" className="healthy-image" />

          <Box className="home-checkbox-container">
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.preference}
                  onChange={() => state.setPreference(!state.preference)}
                />
              }
              label={
                <Typography variant="body1" style={{ color: 'black', fontWeight: 'bold', textAlign: 'center', fontSize: '4vw' }}>
                  Without healthiness explanations
                </Typography>
              }
            />
          </Box>

          {/* Start Button */}
          <button className="start-button" onClick={() => navigate("/query")}>
            START
          </button>
        </div>
        {/* Description */}
        <p className="description">
          The recipe recommendation app designed to inspire your healthy
          lifestyle!
        </p>
      </div>
    </div>
  );
};

export default Home;
