import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { theme } from './theme';
import { routes } from './route';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';

function App() {
  const router = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
        <Navbar />
        <div style={{ display: 'flex', flexGrow: 1 }}>
          <Sidebar />
          <Box sx={{ flexGrow: 1, marginLeft: '4rem' }}>
            {router}
          </Box>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
