# BasicStore - Phone Advertisement Website

A responsive phone advertisement website with full CRUD functionality using HTML, Bootstrap 5, JavaScript, and JSON Server.

## Features

✅ **Responsive Navbar** - Brand logo and navigation links  
✅ **Hero Section** - 70vh minimum height with 50/50 layout  
✅ **Categories Section** - 4 product category cards with images  
✅ **Featured Phones** - 6 phone cards displaying inventory  
✅ **CRUD Dashboard** - Complete phone management system  
✅ **Professional Footer** - 3-column layout with links  

## Technologies

- HTML5
- Bootstrap 5.3
- JavaScript (ES6+)
- JSON Server (REST API)

## Color Scheme

- Light Pink: `#ffc8dd`
- Medium Pink: `#ffafcc`
- Dark: `#2b2d42`
- White: `#ffffff`

## Setup Instructions

### 1. Install JSON Server

```bash
npm install -g json-server
```

### 2. Start JSON Server

```bash
json-server --watch db.json --port 3000
```

### 3. Open the Website

Open `index.html` in your browser or use Live Server extension in VS Code.

## API Endpoint

```
http://localhost:3000/phones
```

## CRUD Operations

### Create (POST)
Add new phone using the form in Admin Dashboard

### Read (GET)
View phones in grid layout and table

### Update (PATCH)
Toggle phone status between "Available" and "Sold Out"

### Delete (DELETE)
Remove phone from inventory with confirmation

## Data Structure

```json
{
  "id": 1,
  "phoneName": "iPhone 15 Pro Max",
  "brand": "Apple",
  "price": 1199,
  "status": "Available"
}
```

## File Structure

```
├── index.html    # Main HTML file (Bootstrap only)
├── app.js        # JavaScript with CRUD functionality
├── db.json       # JSON Server database
└── README.md     # Documentation
```

## Bootstrap Classes Used

- Layout: `container`, `row`, `col-*`
- Components: `navbar`, `card`, `table`, `badge`, `btn`, `form-control`
- Utilities: `shadow`, `rounded`, `text-*`, `bg-*`, `p-*`, `m-*`, `fw-*`
- Responsive: `col-lg-*`, `col-md-*`, `d-*`

## Notes

- No custom CSS file required
- All styling done with Bootstrap 5 classes and inline styles
- Gradient backgrounds for pink theme
- Smooth scroll navigation
- Alert notifications for CRUD operations

## License

MIT License