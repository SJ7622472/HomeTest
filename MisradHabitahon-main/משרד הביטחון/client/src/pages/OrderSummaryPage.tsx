import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { setForm, setProducts, submitOrder } from '../features/order/orderSlice';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
  Stack
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const OrderSummaryPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart.items);
  const order = useSelector((state: RootState) => state.order);
  const [form, setFormState] = useState(order.form);
  const [errors, setErrors] = useState({ fullName: '', address: '', email: '' });


  const validate = () => {
    let valid = true;
    const newErrors = { fullName: '', address: '', email: '' };
    if (!form.fullName.trim()) {
      newErrors.fullName = 'שדה חובה';
      valid = false;
    }
    if (!form.address.trim()) {
      newErrors.address = 'שדה חובה';
      valid = false;
    }
    if (!form.email.trim()) {
      newErrors.email = 'שדה חובה';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = 'כתובת אימייל לא תקינה';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let error = '';
    if (!value.trim()) {
      error = 'שדה חובה';
    } else if (name === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
      error = 'כתובת אימייל לא תקינה';
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    dispatch(setForm(form));
    dispatch(setProducts(cart));
    dispatch(submitOrder({ form, products: cart }));
  };

  return (
    <Box sx={{ maxWidth: 520, mx: 'auto', mt: 6, p: 0, bgcolor: 'transparent', direction: 'rtl' }}>
      <Paper elevation={4} sx={{ borderRadius: 4, p: 4, bgcolor: '#fff' }}>
        <Stack direction="row" alignItems="center" spacing={1} mb={3}>
          <ShoppingCartIcon color="primary" fontSize="large" />
          <Typography variant="h4" component="h2" fontWeight={700} color="primary.main">סיכום הזמנה</Typography>
        </Stack>
        <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
          <Stack spacing={2}>
            <TextField
              label="שם מלא"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              fullWidth
              margin="normal"
              error={!!errors.fullName}
              helperText={errors.fullName}
            />
            <TextField
              label="כתובת מלאה"
              name="address"
              value={form.address}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              fullWidth
              margin="normal"
              error={!!errors.address}
              helperText={errors.address}
            />
            <TextField
              label="אימייל"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email}
            />
          </Stack>
          <Typography variant="h6" mt={4} mb={1} color="primary">מוצרים בעגלה</Typography>
          <Paper variant="outlined" sx={{ mb: 2, bgcolor: '#f7fafd', borderRadius: 3, boxShadow: 0 }}>
            <List sx={{ direction: 'rtl' }}>
              {cart.length === 0 ? (
                <ListItem>
                  <ListItemText primary="העגלה ריקה" sx={{ textAlign: 'center', color: '#888', direction: 'rtl' }} />
                </ListItem>
              ) : cart.map((item, idx) => (
                <React.Fragment key={item.id}>
                  <ListItem sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, direction: 'rtl' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flex: 1, direction: 'rtl' }}>
                      <Typography fontWeight={600} fontSize={18} align="right">{item.name}</Typography>
                      <Typography fontSize={15} color="text.secondary" align="right">כמות: {item.quantity}</Typography>
                    </Box>
                  </ListItem>
                  {idx < cart.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ mt: 2, fontWeight: 700, borderRadius: 2, fontSize: 18, py: 1.5 }}
            disabled={cart.length === 0}
          >
            אשר הזמנה
          </Button>
        </Box>
        {order.status === 'success' && <Alert severity="success" sx={{ mt: 3, fontSize: 18 }}>ההזמנה נשלחה בהצלחה!</Alert>}
        {order.status === 'error' && <Alert severity="error" sx={{ mt: 3, fontSize: 18 }}>אירעה שגיאה בשליחת ההזמנה.</Alert>}
      </Paper>
    </Box>
  );
};

export default OrderSummaryPage;
