# QUICK START GUIDE

## Problem Diagnosis

If you're getting an error like `Cannot POST /api/products%0A` or HTML error pages, it means **MongoDB is not running**!

## Solution: Start MongoDB First!

### Option 1: Docker (Easiest)
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Option 2: macOS
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Option 3: Linux
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### Option 4: Use MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account and cluster
3. Get connection string
4. Update `.env` file:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/inventory_management
```

## Start the Server

```bash
npm start
```

You should see:
```
✅ MongoDB Connected: localhost
🚀 Server is running on port 5000
📍 API Base URL: http://localhost:5000/api
📝 Test endpoint: http://localhost:5000/api/products
```

## Test with Postman

### 1. Create Product
- **Method**: POST
- **URL**: `http://localhost:5000/api/products`
- **Headers**:
  - `Content-Type: application/json`
- **Body** (raw JSON):
```json
{
  "name": "Laptop",
  "description": "Dell XPS 15",
  "stock_quantity": 50,
  "low_stock_threshold": 10
}
```

Expected Response (201 Created):
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Laptop",
  "description": "Dell XPS 15",
  "stock_quantity": 50,
  "low_stock_threshold": 10,
  "createdAt": "2025-10-05T...",
  "updatedAt": "2025-10-05T..."
}
```

### 2. Get All Products
- **Method**: GET
- **URL**: `http://localhost:5000/api/products`

### 3. Decrease Stock
- **Method**: PATCH
- **URL**: `http://localhost:5000/api/products/{product_id}/decrease`
- **Body**:
```json
{
  "amount": 10
}
```

## Your Code is CORRECT!

All files are properly configured:
- ✅ `express.json()` middleware is in place
- ✅ Routes are correctly mounted at `/api/products`
- ✅ POST handler exists in controller
- ✅ No typos or extra newlines

The only issue is MongoDB not running. Once you start MongoDB, everything will work!

## Still Having Issues?

Check the server console output. It will tell you exactly what's wrong:
- If MongoDB is down, you'll see connection error messages
- If routes are working, you'll see the server start message
- Any other errors will be clearly logged
