import { foodData } from "../data/foodData";

class LocalStore {
  constructor(key) {
    this.key = key;
  }

  read(fallback) {
    try {
      return JSON.parse(localStorage.getItem(this.key)) || fallback;
    } catch {
      return fallback;
    }
  }

  write(value) {
    try {
      localStorage.setItem(this.key, JSON.stringify(value));
    } catch {
    }
  }
}

class FoodStore extends LocalStore {
  constructor() {
    super("pinoy_kusina_foods");
    this.seedStore = new LocalStore("pinoy_kusina_foods_seed");
  }

  getAll() {
    const seed = JSON.stringify(foodData);

    if (this.seedStore.read("") !== seed) {
      this.write(foodData);
      this.seedStore.write(seed);
    }

    return this.read(foodData)
      .filter((food) => {
        const hasId = food.id !== undefined && food.id !== null && food.id !== "";
        if (!hasId) {
          console.warn("FoodStore: skipped a food item with a missing id.", food);
        }
        return hasId;
      })
      .map((food) => ({
        id: food.id,
        name: food.name,
        category: food.category,
        price: Number(food.price),
        image: food.image,
      }));
  }
}

class CartStore extends LocalStore {
  constructor() {
    super("pinoy_kusina_cart");
  }

  getAll() {
    return this.read([]);
  }

  save(cart) {
    this.write(cart);
  }

  addFood(cart, food) {
    if (food.id === undefined || food.id === null || food.id === "") {
      console.warn("CartStore: cannot add a food item with a missing id.", food);
      return cart;
    }

    const existingItem = cart.find((item) => item.productId === food.id);

    if (existingItem) {
      return cart.map((item) => {
        if (item.productId !== food.id) return item;

        const quantity = item.quantity + 1;

        return {
          ...item,
          quantity,
          subtotal: quantity * item.price,
        };
      });
    }

    return [
      ...cart,
      {
        productId: food.id,
        name: food.name,
        price: food.price,
        quantity: 1,
        subtotal: food.price,
      },
    ];
  }

  changeQuantity(cart, productId, change) {
    return cart
      .map((item) => {
        if (item.productId !== productId) return item;

        const quantity = item.quantity + change;

        if (quantity <= 0) return null;

        return {
          ...item,
          quantity,
          subtotal: quantity * item.price,
        };
      })
      .filter(Boolean);
  }

  remove(cart, productId) {
    return cart.filter((item) => item.productId !== productId);
  }
}

class OrderStore extends LocalStore {
  constructor() {
    super("pinoy_kusina_orders");
    this.counterStore = new LocalStore("pinoy_kusina_order_counter");
    this.statuses = ["Pending", "Preparing", "Completed", "Cancelled"];
  }

  getAll() {
    return this.read([]);
  }

  saveAll(orders) {
    this.write(orders);
  }

  nextOrderId() {
    const current = this.counterStore.read(0);
    const next = current + 1;

    this.counterStore.write(next);

    return String(next).padStart(2, "0");
  }

  create(customerName, cart) {
    const items = cart.filter((item) => {
      const hasProductId =
        item.productId !== undefined && item.productId !== null && item.productId !== "";
      if (!hasProductId) {
        console.warn("OrderStore: dropped a cart item with a missing productId.", item);
      }
      return hasProductId;
    });

    const total = items.reduce((sum, item) => sum + Number(item.subtotal), 0);

    const order = {
      id: `ORD-${this.nextOrderId()}`,
      customerName,
      items,
      total,
      status: "Pending",
      date: new Date().toISOString(),
    };

    this.saveAll([order, ...this.getAll()]);

    return order;
  }

  updateStatus(orderId, status) {
    const orders = this.getAll().map((order) =>
      order.id === orderId ? { ...order, status } : order
    );

    this.saveAll(orders);
    return orders;
  }

  delete(orderId) {
    const orders = this.getAll().filter((order) => order.id !== orderId);

    this.saveAll(orders);
    return orders;
  }
}

export const foodStore = new FoodStore();
export const cartStore = new CartStore();
export const orderStore = new OrderStore();

export function formatDate(date) {
  return new Intl.DateTimeFormat("en-PH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}