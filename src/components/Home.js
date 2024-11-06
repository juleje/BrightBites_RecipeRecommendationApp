import logo from '../img/logo.svg';
import { Box, Typography, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';

function Home() {
	const navigate = useNavigate();


	return (
		<Box display="flex" height="100vh">
			{/* Sidebar */}
			<Box class="sidebar">
				<Typography variant="h6">Lorem ipsum</Typography>
			</Box>

			{/* Main Content Area */}
			<Box class="main">
				{/* Logo in top right */}
				<img
					class="logo"
					src={logo}
					alt="Logo"
					style={{ width: '50px', height: '50px' }} // Adjust size as needed
				/>
				{/* Search Area */}
				<Box class="searcharea">
					<Button variant="contained" endIcon={<SearchIcon />}
						onClick={() => navigate("/recipes-with-explanation")}
					>
						Send Recipes (expl)
					</Button>
					<Button variant="contained" endIcon={<SearchIcon />}
						onClick={() => navigate("/recipes-without-explanation")}
					>
						Send Recipes (noexpl)
					</Button>
				</Box>
			</Box>
		</Box>
	);
}

export default Home;
