import React from 'react';



import ShoppingListPage from './pages/ShoppingListPage';
import OrderSummaryPage from './pages/OrderSummaryPage';
import { Button, ButtonGroup, Box, Fade, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
const theme = createTheme({ direction: 'rtl' });
import ListAltIcon from '@mui/icons-material/ListAlt';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

function App() {
  // ניתן להחליף ל-router בהמשך
  const [page, setPage] = React.useState<'shopping' | 'summary'>('shopping');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ direction: 'rtl', maxWidth: 600, mx: 'auto', mt: 4, minHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
      <header>
        <Box sx={{ display: 'flex', gap: 2, mb: 3, borderRadius: 3, boxShadow: 2 }}>
          <Button
            onClick={() => setPage('shopping')}
            startIcon={<ListAltIcon />}
            sx={{
              fontWeight: 700,
              fontSize: 17,
              borderRadius: 2,
              bgcolor: page === 'shopping' ? 'primary.dark' : 'primary.main',
              color: '#fff',
              flex: 1,
              transition: 'background 0.2s',
              boxShadow: page === 'shopping' ? 4 : 1
            }}
            disableElevation
          >
            רשימת קניות
          </Button>
        </Box>
      </header>
      <main style={{ flex: 1 }}>
        <Fade in={page === 'shopping'} timeout={400} unmountOnExit>
          <div>{page === 'shopping' && <ShoppingListPage />}</div>
        </Fade>
        <Fade in={page === 'summary'} timeout={400} unmountOnExit>
          <div>{page === 'summary' && <OrderSummaryPage />}</div>
        </Fade>
      </main>
      {page === 'shopping' && (
        <Box sx={{ mt: 4, mb: 2, display: 'flex', justifyContent: 'center' }}>
          <Button
            onClick={() => setPage('summary')}
            variant="contained"
            color="secondary"
            size="large"
            sx={{ fontWeight: 700, fontSize: 18, borderRadius: 3, px: 6, py: 1.5, boxShadow: 3 }}
            endIcon={<ReceiptLongIcon />}
          >
            המשך להזמנה
          </Button>
        </Box>
      )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
