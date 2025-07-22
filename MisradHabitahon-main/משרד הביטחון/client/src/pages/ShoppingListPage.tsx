import React, { useEffect, useState, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchCategories } from '../features/categories/categoriesSlice';
import { addToCart } from '../features/cart/cartSlice';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stack,
  Alert,
  Fade
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const ShoppingListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: categoriesRaw, status } = useSelector((state: RootState) => state.categories);
  const categories = Array.isArray(categoriesRaw) ? categoriesRaw : [];
  const [added, setAdded] = useState(false);
  const cart = useSelector((state: RootState) => state.cart.items);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setSelectedProduct('');
  };

  const handleProductChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedProduct(e.target.value);
  };

  const handleAddToCart = () => {
    if (!selectedProduct || !selectedCategory) return;
    const category = categories.find((c) => c.id === selectedCategory);
    const product = category?.products.find((p) => p.id === selectedProduct);
    if (product) {
      dispatch(addToCart({ ...product, quantity }));
      setAdded(true);
      setTimeout(() => setAdded(false), 1200);
    }
  };

  return (
    <Box sx={{ maxWidth: 520, mx: 'auto', mt: 6, p: 0, bgcolor: 'transparent', direction: 'rtl' }}>
      <Paper elevation={4} sx={{ borderRadius: 4, p: 4, bgcolor: '#fff' }}>
        <Stack direction="row" alignItems="center" spacing={1} mb={3}>
          <ShoppingBasketIcon color="primary" fontSize="large" />
          <Typography variant="h4" component="h2" fontWeight={700} color="primary.main">רשימת קניות</Typography>
        </Stack>
        {status === 'loading' && <Alert severity="info" sx={{ mb: 2 }}>טוען קטגוריות...</Alert>}
        <Stack spacing={2}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="category-label">קטגוריה</InputLabel>
            <Select
              labelId="category-label"
              value={selectedCategory}
              label="קטגוריה"
              onChange={handleCategoryChange}
            >
              <MenuItem value=""><em>בחר קטגוריה</em></MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedCategory && (
            <FormControl fullWidth variant="outlined">
              <InputLabel id="product-label">מוצר</InputLabel>
              <Select
                labelId="product-label"
                value={selectedProduct}
                label="מוצר"
                onChange={handleProductChange}
              >
                <MenuItem value=""><em>בחר מוצר</em></MenuItem>
                {categories.find((c) => c.id === selectedCategory)?.products.map((prod) => (
                  <MenuItem key={prod.id} value={prod.id}>{prod.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {selectedProduct && (
            <Stack direction="row" spacing={2} alignItems="center">
              <TextField
                label="כמות"
                type="number"
                inputProps={{ min: 1 }}
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
                sx={{ maxWidth: 120 }}
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddShoppingCartIcon />}
                onClick={handleAddToCart}
                sx={{ fontWeight: 700, borderRadius: 2, fontSize: 16, py: 1.2 }}
              >
                הוסף לסל
              </Button>
              <Fade in={added}><Alert severity="success" sx={{ ml: 2, fontWeight: 600 }}>נוסף!</Alert></Fade>
            </Stack>
          )}
        </Stack>
        <Typography variant="h6" mt={4} mb={1} color="primary">העגלה שלך</Typography>
        <Paper variant="outlined" sx={{ mb: 2, bgcolor: '#f7fafd', borderRadius: 3, boxShadow: 0 }}>
          <List>
            {cart.length === 0 ? (
              <ListItem>
                <ListItemText primary="העגלה ריקה" sx={{ textAlign: 'center', color: '#888' }} />
              </ListItem>
            ) : cart.map((item, idx) => (
              <React.Fragment key={item.id}>
                <ListItem sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flex: 1 }}>
                    <Typography fontWeight={600} fontSize={18}>{item.name}</Typography>
                    <Typography fontSize={15} color="text.secondary">כמות: {item.quantity}</Typography>
                  </Box>
                </ListItem>
                {idx < cart.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Paper>
    </Box>
  );
};

export default ShoppingListPage;
