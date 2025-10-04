# Inventory Management System API

A robust backend API for tracking products in a warehouse, built with Node.js, Express.js, and MongoDB. This system provides comprehensive inventory management features including full CRUD operations, stock adjustment tracking, and low-stock alerts.

## Features

- **Full CRUD Operations**: Create, read, update, and delete products
- **Stock Management**: Increase and decrease inventory with validation
- **Low Stock Alerts**: Track products below their threshold
- **Input Validation**: Server-side validation for all operations
- **Error Handling**: Comprehensive error responses with appropriate HTTP status codes
- **Unit Testing**: Complete test coverage with Jest
- **RESTful Design**: Clean, intuitive API endpoints

## Tech Stack

- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **Jest**: Testing framework
- **Supertest**: HTTP assertion library
- **MongoDB Memory Server**: In-memory database for testing
- **dotenv**: Environment variable management
- **Nodemon**: Development server auto-reload

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd inventory-management-api
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the root directory with the following:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/inventory_management
```

4. Start MongoDB:
```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Linux with systemd
sudo systemctl start mongod

# Or run MongoDB in Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## Running the Application

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## Running Tests

Run all unit tests with coverage:
```bash
npm test
```

The test suite includes:
- Product CRUD operations
- Stock increase/decrease validation
- Low stock detection
- Error handling scenarios

## API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Product Management

#### 1. Create Product
```http
POST /api/products
Content-Type: application/json

{
  "name": "Laptop",
  "description": "Dell XPS 15",
  "stock_quantity": 50,
  "low_stock_threshold": 10
}
```

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Laptop",
  "description": "Dell XPS 15",
  "stock_quantity": 50,
  "low_stock_threshold": 10,
  "createdAt": "2025-10-04T10:30:00.000Z",
  "updatedAt": "2025-10-04T10:30:00.000Z"
}
```

#### 2. Get All Products
```http
GET /api/products
```

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Laptop",
    "description": "Dell XPS 15",
    "stock_quantity": 50,
    "low_stock_threshold": 10,
    "createdAt": "2025-10-04T10:30:00.000Z",
    "updatedAt": "2025-10-04T10:30:00.000Z"
  }
]
```

#### 3. Get Product by ID
```http
GET /api/products/:id
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Laptop",
  "description": "Dell XPS 15",
  "stock_quantity": 50,
  "low_stock_threshold": 10,
  "createdAt": "2025-10-04T10:30:00.000Z",
  "updatedAt": "2025-10-04T10:30:00.000Z"
}
```

#### 4. Update Product
```http
PUT /api/products/:id
Content-Type: application/json

{
  "name": "Laptop Pro",
  "stock_quantity": 75
}
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Laptop Pro",
  "description": "Dell XPS 15",
  "stock_quantity": 75,
  "low_stock_threshold": 10,
  "createdAt": "2025-10-04T10:30:00.000Z",
  "updatedAt": "2025-10-04T11:00:00.000Z"
}
```

#### 5. Delete Product
```http
DELETE /api/products/:id
```

**Response (200 OK):**
```json
{
  "message": "Product deleted successfully",
  "product": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Laptop Pro",
    "description": "Dell XPS 15",
    "stock_quantity": 75,
    "low_stock_threshold": 10
  }
}
```

### Inventory Management

#### 6. Increase Stock
```http
PATCH /api/products/:id/increase
Content-Type: application/json

{
  "amount": 25
}
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Laptop",
  "stock_quantity": 75,
  "low_stock_threshold": 10
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Amount must be a positive number"
}
```

#### 7. Decrease Stock
```http
PATCH /api/products/:id/decrease
Content-Type: application/json

{
  "amount": 10
}
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Laptop",
  "stock_quantity": 40,
  "low_stock_threshold": 10
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Insufficient stock"
}
```

#### 8. Get Low Stock Products
```http
GET /api/products/low-stock
```

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Mouse",
    "stock_quantity": 5,
    "low_stock_threshold": 10
  },
  {
    "_id": "507f1f77bcf86cd799439013",
    "name": "Keyboard",
    "stock_quantity": 8,
    "low_stock_threshold": 15
  }
]
```

## Example API Usage with curl

### Create a Product
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Wireless Mouse",
    "description": "Logitech MX Master 3",
    "stock_quantity": 100,
    "low_stock_threshold": 20
  }'
```

### Get All Products
```bash
curl http://localhost:5000/api/products
```

### Increase Stock
```bash
curl -X PATCH http://localhost:5000/api/products/507f1f77bcf86cd799439011/increase \
  -H "Content-Type: application/json" \
  -d '{"amount": 50}'
```

### Decrease Stock
```bash
curl -X PATCH http://localhost:5000/api/products/507f1f77bcf86cd799439011/decrease \
  -H "Content-Type: application/json" \
  -d '{"amount": 30}'
```

### Get Low Stock Products
```bash
curl http://localhost:5000/api/products/low-stock
```

## Sample Test Data

Use these commands to populate the database with test data:

```bash
# Product 1
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Laptop", "description": "Dell XPS 15", "stock_quantity": 50, "low_stock_threshold": 10}'

# Product 2
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Mouse", "description": "Logitech MX Master", "stock_quantity": 5, "low_stock_threshold": 10}'

# Product 3
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Keyboard", "description": "Mechanical RGB", "stock_quantity": 75, "low_stock_threshold": 15}'
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 404 | Not Found |
| 500 | Internal Server Error |

### Common Error Responses

**Product Not Found (404):**
```json
{
  "error": "Product not found"
}
```

**Validation Error (400):**
```json
{
  "error": "Product name is required"
}
```

**Insufficient Stock (400):**
```json
{
  "error": "Insufficient stock"
}
```

## Project Structure

```
inventory-management-api/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   └── productController.js # Business logic
│   ├── middleware/
│   │   └── errorHandler.js      # Global error handler
│   ├── models/
│   │   └── Product.js            # Mongoose schema
│   ├── routes/
│   │   └── productRoutes.js      # API routes
│   └── app.js                    # Express app setup
├── tests/
│   └── product.test.js           # Unit tests
├── .env                          # Environment variables
├── .gitignore                    # Git ignore rules
├── jest.config.js                # Jest configuration
├── package.json                  # Dependencies
├── server.js                     # Entry point
└── README.md                     # Documentation
```

## Validation Rules

### Product Model
- `name`: Required, string
- `description`: Optional, string
- `stock_quantity`: Integer, default 0, cannot be negative
- `low_stock_threshold`: Integer, default 10, cannot be negative

### Stock Operations
- Amount must be a positive integer
- Decreasing stock cannot result in negative values
- Stock quantity must always be >= 0

## Development Best Practices

- **Clean Code**: Modular architecture with separation of concerns
- **Error Handling**: Try-catch blocks with meaningful error messages
- **Validation**: Server-side input validation on all endpoints
- **Testing**: Comprehensive unit tests with high coverage
- **RESTful Design**: Follows REST API conventions
- **Documentation**: Clear inline comments and API documentation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT

## Support

For issues or questions, please open an issue on the repository.

---

Built with ❤️ using Node.js, Express, and MongoDB
