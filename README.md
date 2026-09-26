# Pinoy Kusina - Filipino Food Ordering System

A simple and human-friendly food ordering system made with React.js.

## Project idea

This system lets a customer:
1. View Filipino dishes.
2. Search and filter the menu.
3. Add food to the cart.
4. Change quantity or remove items.
5. Enter their name at checkout.
6. Place an order.
7. View order history.

There is NO database and NO backend.

All cart and order information is saved only in the browser's localStorage.

## Required data

### FOOD

```text
id
name
category
price
image
```

### CART

```text
productId
name
price
quantity
subtotal
```

### ORDER

```text
id
customerName
items
total
status
date
```

## localStorage keys

```text
pinoy_kusina_cart
pinoy_kusina_orders
```

## React structure

```text
src/
├── components/
│   ├── Navbar.jsx
│   ├── FoodCard.jsx
│   ├── CartItem.jsx
│   └── OrderCard.jsx
├── data/
│   └── foodData.js
├── pages/
│   ├── Home.jsx
│   ├── Menu.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── Orders.jsx
│   └── NotFound.jsx
├── utils/
│   └── storage.js
├── App.jsx
├── main.jsx
└── index.css
```

## Run the project

Install Node.js, then open a terminal inside the project folder:

```bash
npm install
npm run dev
```

Open the local URL provided by Vite.

## OOP / organization note

The project is kept simple, but it follows object-oriented-style organization by representing Food, Cart items, and Orders as objects. React components also keep each responsibility separate.

The goal is not to make the project unnecessarily complicated. It is designed to be easy for a student to explain and demonstrate.
