import React, { useState } from 'react';
import { IconButton, InputAdornment, TextField, Box, Button, Typography, Select, MenuItem } from '@mui/material';
import { Visibility, VisibilityOff, UploadFile } from '@mui/icons-material';
import './Form.css';  // Importamos el archivo CSS

export default function SalesForm() {
    const [showMargin, setShowMargin] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [formData, setFormData] = useState({
        orderNumber: '',
        productType: '',
        productName: '',
        features: '',
        sku: '',
        price: '',
        margin: '',
        invoiceImage: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'invoiceImage') {
            const file = files[0];
            setImagePreview(URL.createObjectURL(file));
            setFormData((prev) => ({ ...prev, invoiceImage: file }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Acá podrías hacer fetch/axios al backend
    };

    return (
        <Box className="form-container">
            <div className="top-bar">
                <Button variant="outlined">Dashboard</Button>
            </div>
            <Typography variant="h5" gutterBottom textAlign="center" color='black'>
                Registro de Venta
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    label="Orden N°"
                    name="orderNumber"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                    className="input-field"
                />
                <Select
                    name="productType"
                    fullWidth
                    displayEmpty
                    value={formData.productType}
                    onChange={handleChange}
                    className="input-field"
                >
                    <MenuItem value="" disabled>
                        Tipo de Producto
                    </MenuItem>
                    <MenuItem value="Laptop">Laptop</MenuItem>
                    <MenuItem value="Tablet">Tablet</MenuItem>
                </Select>
                <TextField
                    label="Nombre del Producto"
                    name="productName"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                    className="input-field"
                />
                <TextField
                    label="Características"
                    name="features"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                    className="input-field"
                />
                <TextField
                    label="SKU"
                    name="sku"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                    className="input-field"
                />
                <TextField
                    label="Precio"
                    name="price"
                    type="number"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                    className="input-field"
                />

                <TextField
                    label="Margen"
                    name="margin"
                    type={showMargin ? 'text' : 'password'}
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                    className="input-field"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowMargin((prev) => !prev)}>
                                    {showMargin ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <Box className="image-upload-section">
                    <Button variant="outlined" component="label" startIcon={<UploadFile />}>
                        Subir Imagen Factura
                        <input
                            type="file"
                            name="invoiceImage"
                            hidden
                            accept="image/*"
                            onChange={handleChange}
                        />
                    </Button>
                    {imagePreview && (
                        <Box mt={2}>
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="image-preview"
                            />
                        </Box>
                    )}
                </Box>


                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className="submit-button"
                >
                    Guardar Registro
                </Button>
            </form>
        </Box>
    );
}
