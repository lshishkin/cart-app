import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import { Router } from './Router';
import { Providers } from './providers/Providers';

export const App = () => (
  <Providers>
    <AppBar position="static" sx={{ marginBottom: 3 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Управление корзинами
        </Typography>
      </Toolbar>
    </AppBar>
    <Container >
      <Router />
    </Container>
  </Providers>
);

export default App;
