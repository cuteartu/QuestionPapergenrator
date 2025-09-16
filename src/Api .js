import React, { Component } from "react";
import axios from "axios";

// Material-UI Components
import {
  Container,       // Provides responsive layout container
  Typography,      // Proper text styling
  TextField,       // Form input fields
  Button,          // Action buttons
  Table,           // Data table components
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,           // Surface component
  Dialog,          // Modal dialog
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,      // Clickable icons
  Snackbar,        // Notification system
  Alert,           // Styled alert messages
  Grid,            // Layout system
  LinearProgress,  // Loading indicator
  Select,          // Dropdown selector
  MenuItem,
  InputLabel,
  FormControl      // Form grouping
} from '@mui/material';

// Material-UI Icons
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Cancel as CancelIcon,
  Search as SearchIcon
} from '@mui/icons-material';

class Api extends Component {
  constructor(props) {
    super(props);
    // Initialize component state
    this.state = {
      products: [],          // Array to store product data
      newProduct: {          // Form data for new products
        title: "",
        price: 0,
        description: "",
        category: "",
        image: "https://via.placeholder.com/150"
      },
      editingProduct: null,  // Currently edited product (null when adding)
      isLoading: false,      // Loading state flag
      error: null,           // Error message storage
      successMessage: null,  // Success message storage
      openDialog: false,     // Controls dialog visibility
      searchTerm: "",        // Search filter text
      categories: [],        // Available product categories
      selectedCategory: "all" // Current category filter
    };
  }

  /**
   * Lifecycle method - runs when component mounts
   * Fetches initial product data and categories
   */
  componentDidMount() {
    this.fetchData();
    this.fetchCategories();
  }

  /**
   * Fetches all products from API
   * Manages loading state and error handling
   */
  fetchData = async () => {
    this.setState({ isLoading: true, error: null });
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      this.setState({ products: response.data });
    } catch (error) {
      this.setState({ error: "Failed to fetch products. Please try again later." });
      console.error("API Error:", error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  /**
   * Fetches product categories from API
   */
  fetchCategories = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products/categories");
      this.setState({ categories: response.data });
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  /**
   * Handles form input changes
   * @param {Object} e - The event object
   */
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      newProduct: {
        ...prevState.newProduct,
        // Convert price to number, keep others as strings
        [name]: name === "price" ? Number(value) : value
      }
    }));
  };

  /**
   * Handles product creation
   * POSTs new product to API and updates state
   */
  handleAddProduct = () => {
    this.setState({ isLoading: true });
    const { newProduct } = this.state;
    
    axios.post("https://fakestoreapi.com/products", newProduct)
      .then((response) => {
        this.setState(prevState => ({
          products: [...prevState.products, response.data],
          newProduct: { // Reset form
            title: "",
            price: 0,
            description: "",
            category: "",
            image: "https://via.placeholder.com/150"
          },
          successMessage: "Product added successfully!"
        }));
      })
      .catch((error) => {
        this.setState({ error: "Failed to add product. Please check your data." });
      })
      .finally(() => {
        this.setState({ isLoading: false, openDialog: false });
      });
  };

  /**
   * Prepares edit form with product data
   * @param {Object} product - The product to edit
   */
  handleEditProduct = (product) => {
    this.setState({
      editingProduct: product,
      newProduct: { // Pre-fill form with product data
        title: product.title,
        price: product.price,
        description: product.description || "",
        category: product.category,
        image: product.image
      },
      openDialog: true // Open the edit dialog
    });
  };

  /**
   * Handles product updates
   * PUTs updated product to API
   */
  handleUpdateProduct = () => {
    const { editingProduct, newProduct } = this.state;
    this.setState({ isLoading: true });
    
    axios.put(`https://fakestoreapi.com/products/${editingProduct.id}`, newProduct)
      .then((response) => {
        this.setState(prevState => ({
          products: prevState.products.map(p => 
            p.id === editingProduct.id ? response.data : p
          ),
          editingProduct: null, // Clear edit mode
          newProduct: { // Reset form
            title: "",
            price: 0,
            description: "",
            category: "",
            image: "https://via.placeholder.com/150"
          },
          successMessage: "Product updated successfully!"
        }));
      })
      .catch((error) => {
        this.setState({ error: "Failed to update product. Please try again." });
      })
      .finally(() => {
        this.setState({ isLoading: false, openDialog: false });
      });
  };

  /**
   * Handles product deletion
   * @param {number} id - The ID of product to delete
   */
  handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      this.setState({ isLoading: true });
      axios.delete(`https://fakestoreapi.com/products/${id}`)
        .then(() => {
          this.setState(prevState => ({
            products: prevState.products.filter(p => p.id !== id),
            successMessage: "Product deleted successfully!"
          }));
        })
        .catch((error) => {
          this.setState({ error: "Failed to delete product. Please try again." });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  };

  /**
   * Handles search input changes
   * @param {Object} e - The event object
   */
  handleSearch = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  /**
   * Handles category filter changes
   * @param {Object} e - The event object
   */
  handleCategoryChange = (e) => {
    this.setState({ selectedCategory: e.target.value });
  };

  /**
   * Filters products based on search term and category
   * @returns {Array} Filtered products
   */
  getFilteredProducts = () => {
    const { products, searchTerm, selectedCategory } = this.state;
    
    return products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };

  /**
   * Closes notification snackbars
   */
  handleCloseSnackbar = () => {
    this.setState({ error: null, successMessage: null });
  };

  render() {
    // Destructure state for cleaner code
    const { 
      isLoading, 
      error, 
      newProduct, 
      editingProduct, 
      openDialog,
      successMessage,
      searchTerm,
      categories,
      selectedCategory
    } = this.state;

    // Get filtered product list
    const filteredProducts = this.getFilteredProducts();

    return (
      <Container maxWidth="lg" style={{ marginTop: '20px', marginBottom: '40px' }}>
        {/* Page Header */}
        <Typography variant="h4" component="h1" gutterBottom>
          Product Management System
        </Typography>

        {/* Loading Indicator */}
        {isLoading && <LinearProgress />}

        {/* Search and Filter Section */}
        <Grid container spacing={3} style={{ marginBottom: '20px' }}>
          {/* Search Input */}
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search products..."
              value={searchTerm}
              onChange={this.handleSearch}
              InputProps={{
                startAdornment: <SearchIcon color="action" />
              }}
            />
          </Grid>
          
          {/* Category Filter Dropdown */}
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={this.handleCategoryChange}
                label="Category"
              >
                <MenuItem value="all">All Categories</MenuItem>
                {categories.map(category => (
                  <MenuItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Add Product Button */}
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => this.setState({ 
            openDialog: true, 
            editingProduct: null,
            newProduct: { // Reset form when opening for new product
              title: "",
              price: 0,
              description: "",
              category: "",
              image: "https://via.placeholder.com/150"
            }
          })}
          style={{ marginBottom: '20px' }}
        >
          Add Product
        </Button>

        {/* Products Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map(product => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      style={{ 
                        width: '50px', 
                        height: '50px', 
                        objectFit: 'contain' 
                      }} 
                    />
                  </TableCell>
                  <TableCell>
                    {/* Edit Button */}
                    <IconButton 
                      color="primary"
                      onClick={() => this.handleEditProduct(product)}
                      aria-label="edit"
                    >
                      <EditIcon />
                    </IconButton>
                    
                    {/* Delete Button */}
                    <IconButton 
                      color="error"
                      onClick={() => this.handleDeleteProduct(product.id)}
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add/Edit Product Dialog */}
        <Dialog 
          open={openDialog} 
          onClose={() => this.setState({ openDialog: false })}
          fullWidth
          maxWidth="sm"
          aria-labelledby="product-dialog-title"
        >
          <DialogTitle id="product-dialog-title">
            {editingProduct ? "Edit Product" : "Add New Product"}
          </DialogTitle>
          
          <DialogContent>
            <Grid container spacing={2} style={{ marginTop: '10px' }}>
              {/* Title Input */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={newProduct.title}
                  onChange={this.handleInputChange}
                  margin="normal"
                  required
                />
              </Grid>
              
              {/* Price Input */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  type="number"
                  value={newProduct.price}
                  onChange={this.handleInputChange}
                  margin="normal"
                  required
                  inputProps={{ min: "0", step: "0.01" }}
                />
              </Grid>
              
              {/* Category Input */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Category"
                  name="category"
                  value={newProduct.category}
                  onChange={this.handleInputChange}
                  margin="normal"
                  required
                />
              </Grid>
              
              {/* Description Input */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  multiline
                  rows={3}
                  value={newProduct.description}
                  onChange={this.handleInputChange}
                  margin="normal"
                />
              </Grid>
              
              {/* Image URL Input */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Image URL"
                  name="image"
                  value={newProduct.image}
                  onChange={this.handleInputChange}
                  margin="normal"
                />
              </Grid>
            </Grid>
          </DialogContent>
          
          <DialogActions>
            {/* Cancel Button */}
            <Button 
              onClick={() => this.setState({ openDialog: false })}
              color="secondary"
              startIcon={<CancelIcon />}
            >
              Cancel
            </Button>
            
            {/* Submit Button */}
            <Button
              onClick={editingProduct ? this.handleUpdateProduct : this.handleAddProduct}
              color="primary"
              variant="contained"
              disabled={isLoading}
              startIcon={editingProduct ? <EditIcon /> : <AddIcon />}
            >
              {editingProduct ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Error Notification */}
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            onClose={this.handleCloseSnackbar} 
            severity="error"
            variant="filled"
          >
            {error}
          </Alert>
        </Snackbar>
        
        {/* Success Notification */}
        <Snackbar
          open={!!successMessage}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            onClose={this.handleCloseSnackbar} 
            severity="success"
            variant="filled"
          >
            {successMessage}
          </Alert>
        </Snackbar>
      </Container>
    );
  }
}

export default Api;