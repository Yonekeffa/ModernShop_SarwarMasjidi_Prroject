/* 
<!-- 
███████╗ █████╗ ██████╗ ██╗    ██╗ █████╗ ██████╗ 
██╔════╝██╔══██╗██╔══██╗██║    ██║██╔══██╗██╔══██╗
███████╗███████║██████╔╝██║ █╗ ██║███████║██████╔╝
╚════██║██╔══██║██╔══██╗██║███╗██║██╔══██║██╔══██╗
███████║██║  ██║██║  ██║╚███╔███╔╝██║  ██║██║  ██║
╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝
                                                  
███╗   ███╗ █████╗ ███████╗     ██╗██╗██████╗ ██╗
████╗ ████║██╔══██╗██╔════╝     ██║██║██╔══██╗██║
██╔████╔██║███████║███████╗     ██║██║██║  ██║██║
██║╚██╔╝██║██╔══██║╚════██║██   ██║██║██║  ██║██║
██║ ╚═╝ ██║██║  ██║███████║╚█████╔╝██║██████╔╝██║
╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝ ╚════╝ ╚═╝╚═════╝ ╚═╝
                                                 												  
--> */
const products = [
  {
    id: 1,
    name: "Minimalist Chair",
    desc: "A sleek and modern chair, perfect for any room. Built for comfort and style.",
    price: 49.99,
    img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    reviews: 21,
    category: "Furniture",
    badges: ["New"]
  },
  {
    id: 2,
    name: "Wooden Table",
    desc: "Handcrafted from natural wood for a warm, timeless look.",
    price: 129.99,
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviews: 13,
    category: "Furniture",
    badges: ["Sale"]
  },
  {
    id: 3,
    name: "Cozy Sofa",
    desc: "Soft, durable, and inviting – the centerpiece of your living space.",
    price: 299.99,
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    rating: 4.2,
    reviews: 18,
    category: "Furniture",
    badges: []
  },
  {
    id: 4,
    name: "Modern Lamp",
    desc: "Brighten up your room with this elegant, energy-efficient lamp.",
    price: 39.99,
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    reviews: 7,
    category: "Decor",
    badges: ["New"]
  },
  {
    id: 5,
    name: "Wall Art Set",
    desc: "Three-piece set featuring abstract designs for a fresh, modern vibe.",
    price: 59.99,
    img: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=400&q=80",
    rating: 4.3,
    reviews: 11,
    category: "Decor",
    badges: []
  },
  {
    id: 6,
    name: "Planter Pot",
    desc: "Add greenery to your home with this stylish ceramic planter.",
    price: 24.99,
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviews: 34,
    category: "Decor",
    badges: ["Sale"]
  },
  {
    id: 7,
    name: "Bluetooth Headphones",
    desc: "Wireless freedom with high fidelity sound and long battery life.",
    price: 79.99,
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    rating: 4.4,
    reviews: 16,
    category: "Electronics",
    badges: ["New"]
  },
  {
    id: 8,
    name: "Smart Watch",
    desc: "Track your health and notifications with this sleek smart watch.",
    price: 99.99,
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    rating: 4.1,
    reviews: 12,
    category: "Electronics",
    badges: []
  }
];

const testimonials = [
  {
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Amazing store! The checkout was seamless and the products are great quality. Will shop again.",
    author: "Alex Johnson",
    rating: 5
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "Love the modern design and the fast shipping. Customer service was super helpful too.",
    author: "Samantha Lee",
    rating: 5
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/94.jpg",
    text: "Found exactly what I needed for my new apartment. The lamp is even better than expected.",
    author: "Michael Chen",
    rating: 4
  }
];

let cart = JSON.parse(localStorage.getItem("cart") || "[]");

function formatPrice(price) { return "$" + price.toFixed(2); }

// --- Product Rendering and Filters ---
function renderProducts() {
  const grid = document.getElementById("productsGrid");
  grid.innerHTML = "";
  let filter = document.getElementById("categoryFilter").value;
  let search = document.getElementById("searchInput").value.toLowerCase();
  let filtered = products.filter(prod =>
    (filter === "all" || prod.category === filter) &&
    (prod.name.toLowerCase().includes(search) || prod.desc.toLowerCase().includes(search))
  );
  if (filtered.length === 0) {
    grid.innerHTML = `<div class="cart-empty" style="margin:3em 0 4em 0">No products found.</div>`;
    return;
  }
  filtered.forEach(prod => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-badges">
        ${prod.badges.map(b => `<span class="product-badge">${b}</span>`).join('')}
      </div>
      <img src="${prod.img}" alt="${prod.name}" class="product-img" />
      <div class="product-info">
        <div class="product-title">${prod.name}</div>
        <div class="product-rating">${renderStars(prod.rating)}<span>(${prod.reviews})</span></div>
        <div class="product-desc">${prod.desc}</div>
        <div class="product-price">${formatPrice(prod.price)}</div>
        <button class="btn btn-primary add-cart-btn" data-id="${prod.id}">Add to Cart</button>
      </div>
    `;
    card.querySelector(".product-img").addEventListener("click", () => showProductModal(prod.id));
    card.querySelector(".add-cart-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      addToCart(prod.id);
    });
    grid.appendChild(card);
  });
}
function renderStars(rating) {
  let full = Math.floor(rating), half = rating % 1 >= 0.5, stars = '';
  for (let i = 0; i < full; i++) stars += `<span class="star">&#9733;</span>`;
  if (half) stars += `<span class="star">&#189;</span>`;
  for (let i = full + half; i < 5; i++) stars += `<span class="star" style="color:#e5e7eb">&#9733;</span>`;
  return stars;
}
function populateCategories() {
  const select = document.getElementById("categoryFilter");
  const cats = Array.from(new Set(products.map(p => p.category)));
  cats.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    select.appendChild(opt);
  });
}
document.getElementById("categoryFilter").addEventListener("change", renderProducts);
document.getElementById("searchInput").addEventListener("input", renderProducts);

// --- Testimonials Rendering ---
function renderTestimonials() {
  const grid = document.getElementById("testimonialsGrid");
  grid.innerHTML = "";
  testimonials.forEach(t => {
    const card = document.createElement("div");
    card.className = "testimonial-card";
    card.innerHTML = `
      <img src="${t.avatar}" alt="${t.author}" class="testimonial-avatar"/>
      <div class="testimonial-text">"${t.text}"</div>
      <div class="testimonial-author">${t.author}</div>
      <div class="testimonial-rating">${renderStars(t.rating)}</div>
    `;
    grid.appendChild(card);
  });
}

// --- Product Modal with Related Products ---
function showProductModal(id) {
  const prod = products.find(p => p.id === id);
  const modal = document.getElementById("productModal");
  const modalContent = document.getElementById("modalContent");
  // Related products: same category, not itself
  const related = products.filter(p => p.category === prod.category && p.id !== id).slice(0, 4);
  modalContent.innerHTML = `
    <button class="modal-close" onclick="closeProductModal()">&times;</button>
    <img src="${prod.img}" alt="${prod.name}" class="modal-img"/>
    <div class="modal-title">${prod.name}</div>
    <div class="product-rating" style="margin-bottom:1em;">${renderStars(prod.rating)}<span>(${prod.reviews} reviews)</span></div>
    <div class="modal-desc">${prod.desc}</div>
    <div class="modal-price">${formatPrice(prod.price)}</div>
    <button class="btn modal-add-cart" onclick="addToCart(${prod.id}); closeProductModal();">Add to Cart</button>
    ${related.length ? `
      <div class="related-products">
        <div class="related-products-title">Related Products</div>
        <div class="related-carousel">
          ${related.map(r => `
            <div class="related-card" onclick="showProductModal(${r.id})">
              <img src="${r.img}" alt="${r.name}" />
              <div class="related-card-title">${r.name}</div>
              <div class="product-rating">${renderStars(r.rating)}</div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ""}
  `;
  modal.classList.add("show");
}
window.showProductModal = showProductModal;
window.closeProductModal = function() {
  document.getElementById("productModal").classList.remove("show");
};
document.getElementById("productModal").addEventListener("click", e => {
  if (e.target.id === "productModal") closeProductModal();
});

// --- Cart Logic ---
function addToCart(id) {
  let item = cart.find(i => i.id === id);
  if (item) item.qty += 1;
  else cart.push({id, qty: 1});
  saveCart();
  renderCart();
  updateCartCount();
}
function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCart();
  updateCartCount();
}
function updateQty(id, delta) {
  let item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else {
    saveCart();
    renderCart();
    updateCartCount();
  }
}
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
function updateCartCount() {
  document.getElementById("cartCount").textContent = cart.reduce((a,b) => a + b.qty, 0);
}
function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const cartFooter = document.getElementById("cartFooter");
  if (cart.length === 0) {
    cartItems.innerHTML = `<div class="cart-empty">Your cart is empty!</div>`;
    cartFooter.innerHTML = "";
    return;
  }
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    const prod = products.find(p => p.id === item.id);
    total += prod.price * item.qty;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${prod.img}" alt="${prod.name}" class="cart-item-img"/>
      <div class="cart-item-info">
        <div class="cart-item-title">${prod.name}</div>
        <div class="cart-item-qty">
          <button class="cart-item-qty-btn" aria-label="Decrease quantity">-</button>
          <span>${item.qty}</span>
          <button class="cart-item-qty-btn" aria-label="Increase quantity">+</button>
          <span class="cart-item-price">${formatPrice(prod.price * item.qty)}</span>
        </div>
      </div>
      <button class="cart-item-remove" aria-label="Remove from cart">&times;</button>
    `;
    const [minus, plus] = div.querySelectorAll(".cart-item-qty-btn");
    minus.addEventListener("click", () => updateQty(item.id, -1));
    plus.addEventListener("click", () => updateQty(item.id, 1));
    div.querySelector(".cart-item-remove").addEventListener("click", () => removeFromCart(item.id));
    cartItems.appendChild(div);
  });
  cartFooter.innerHTML = `
    <div class="cart-total">Total: ${formatPrice(total)}</div>
    <button class="cart-checkout-btn" ${cart.length === 0 ? "disabled" : ""}>Checkout</button>
  `;
  cartFooter.querySelector(".cart-checkout-btn").addEventListener("click", () => {
    showOrderSummary();
    cart = [];
    saveCart();
    renderCart();
    updateCartCount();
    closeCart();
  });
}

// --- Cart drawer toggle ---
const cartDrawer = document.getElementById("cartDrawer");
const cartBackdrop = document.getElementById("cartBackdrop");
function openCart() {
  cartDrawer.classList.add("open");
  cartBackdrop.classList.add("show");
}
function closeCart() {
  cartDrawer.classList.remove("open");
  cartBackdrop.classList.remove("show");
}
document.getElementById("cartBtn").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
cartBackdrop.addEventListener("click", closeCart);

// --- Responsive Nav Burger ---
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
burger.addEventListener("click", () => {
  nav.classList.toggle("show");
});
window.addEventListener("resize", () => { if(window.innerWidth > 700) nav.classList.remove("show"); });

// --- Light/Dark Mode ---
const modeToggle = document.getElementById("modeToggle");
let darkMode = localStorage.getItem("darkMode") === "true";
function setTheme() {
  document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  document.getElementById("modeIcon").textContent = darkMode ? "☀️" : "🌙";
  localStorage.setItem("darkMode", darkMode);
}
modeToggle.addEventListener("click", () => {
  darkMode = !darkMode;
  setTheme();
});
setTheme();

// --- Newsletter Signup ---
document.getElementById("newsletterForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("newsletterEmail").value.trim();
  const msg = document.getElementById("newsletterMsg");
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    msg.textContent = "Please enter a valid email address.";
    msg.style.color = "#e11d48";
    return;
  }
  msg.textContent = "Thanks for subscribing!";
  msg.style.color = "var(--primary)";
  document.getElementById("newsletterForm").reset();
  setTimeout(() => { msg.textContent = ""; }, 5000);
});

// --- Order Summary Modal ---
function showOrderSummary() {
  const modal = document.getElementById("orderModal");
  const content = document.getElementById("orderContent");
  content.innerHTML = `
    <button class="modal-close" onclick="closeOrderModal()">&times;</button>
    <h2 style="color:var(--primary);margin-bottom:1em;">Order Complete!</h2>
    <div style="font-size:1.13em; text-align:center; margin-bottom:1.7em;">
      Thank you for shopping at ModernShop.<br>Your demo order has been placed.<br>
      (No real products will be shipped.)
    </div>
    <div style="text-align:center;">
      <a href="#products" class="btn btn-primary" onclick="closeOrderModal()">Continue Shopping</a>
    </div>
  `;
  modal.classList.add("show");
}
window.closeOrderModal = function() {
  document.getElementById("orderModal").classList.remove("show");
};
document.getElementById("orderModal").addEventListener("click", e => {
  if (e.target.id === "orderModal") closeOrderModal();
});

// --- Utilities ---
document.getElementById("year").textContent = new Date().getFullYear();

// --- Initial Render ---
populateCategories();
renderProducts();
renderTestimonials();
renderCart();
updateCartCount();