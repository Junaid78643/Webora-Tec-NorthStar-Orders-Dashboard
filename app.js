const orders = [
  { id: "ORD-2847", customer: "Olivia Rhye", email: "olivia.rhye@example.com", initials: "OR", avatar: "", date: "2025-06-24T10:42:00", amount: 248.00, status: "Processing", items: [{ name: "Everyday Tote", quantity: 2, price: 64 }, { name: "Classic Leather Wallet", quantity: 1, price: 120 }], payment: "Visa ending in 4242", address: "128 Westbourne Grove, London W11 2RR" },
  { id: "ORD-2846", customer: "Phoenix Baker", email: "phoenix.baker@example.com", initials: "PB", avatar: "avatar-lilac", date: "2025-06-24T09:18:00", amount: 86.50, status: "Pending", items: [{ name: "Ceramic Pour-over Set", quantity: 1, price: 86.5 }], payment: "Mastercard ending in 8210", address: "42 Bridge Street, Cambridge CB2 1UA" },
  { id: "ORD-2845", customer: "Lana Steiner", email: "lana.steiner@example.com", initials: "LS", avatar: "avatar-blue", date: "2025-06-23T16:05:00", amount: 132.00, status: "Completed", items: [{ name: "Linen Table Runner", quantity: 2, price: 46 }, { name: "Stoneware Vase", quantity: 1, price: 40 }], payment: "Visa ending in 1019", address: "8 New Street, Bristol BS2 9AA" },
  { id: "ORD-2844", customer: "Demi Wilkinson", email: "demi.wilkinson@example.com", initials: "DW", avatar: "avatar-green", date: "2025-06-23T13:32:00", amount: 54.00, status: "Processing", items: [{ name: "Botanical Candle Set", quantity: 2, price: 27 }], payment: "Amex ending in 3005", address: "17 Deansgate, Manchester M3 1AZ" },
  { id: "ORD-2843", customer: "Candice Wu", email: "candice.wu@example.com", initials: "CW", avatar: "avatar-yellow", date: "2025-06-22T11:21:00", amount: 319.99, status: "Pending", items: [{ name: "Weekend Travel Bag", quantity: 1, price: 219.99 }, { name: "Leather Luggage Tag", quantity: 2, price: 50 }], payment: "Visa ending in 7553", address: "65 Queens Road, Edinburgh EH4 2BY" },
  { id: "ORD-2842", customer: "Natali Craig", email: "natali.craig@example.com", initials: "NC", avatar: "avatar-pink", date: "2025-06-21T15:47:00", amount: 175.00, status: "Completed", items: [{ name: "Wool Throw Blanket", quantity: 1, price: 145 }, { name: "Gift wrapping", quantity: 1, price: 30 }], payment: "Mastercard ending in 6043", address: "3 Park Lane, Oxford OX1 2JD" },
  { id: "ORD-2841", customer: "Drew Cano", email: "drew.cano@example.com", initials: "DC", avatar: "avatar-teal", date: "2025-06-21T08:13:00", amount: 42.00, status: "Cancelled", items: [{ name: "Minimalist Desk Tray", quantity: 1, price: 42 }], payment: "Visa ending in 8812", address: "91 Mill Road, Cambridge CB1 2AW" },
  { id: "ORD-2840", customer: "Orlando Diggs", email: "orlando.diggs@example.com", initials: "OD", avatar: "", date: "2025-06-20T14:26:00", amount: 98.00, status: "Completed", items: [{ name: "Hand-thrown Mug Set", quantity: 2, price: 49 }], payment: "Visa ending in 2910", address: "27 Bold Street, Liverpool L1 4DH" },
  { id: "ORD-2839", customer: "Andi Lane", email: "andi.lane@example.com", initials: "AL", avatar: "avatar-lilac", date: "2025-06-19T12:09:00", amount: 210.00, status: "Processing", items: [{ name: "Oak Wall Shelf", quantity: 1, price: 165 }, { name: "Brass Hook Set", quantity: 1, price: 45 }], payment: "Amex ending in 0874", address: "14 Church Street, Bath BA1 1NL" },
  { id: "ORD-2838", customer: "Kate Morrison", email: "kate.morrison@example.com", initials: "KM", avatar: "avatar-blue", date: "2025-06-18T17:54:00", amount: 67.50, status: "Completed", items: [{ name: "Scented Soy Candle", quantity: 3, price: 22.5 }], payment: "Mastercard ending in 3309", address: "6 High Street, York YO1 8BB" },
  { id: "ORD-2837", customer: "Eleanor Pena", email: "eleanor.pena@example.com", initials: "EP", avatar: "avatar-yellow", date: "2025-06-17T09:44:00", amount: 154.00, status: "Pending", items: [{ name: "Cotton Bedspread", quantity: 1, price: 154 }], payment: "Visa ending in 7451", address: "39 Church Road, Cardiff CF10 1BG" },
  { id: "ORD-2836", customer: "Jane Cooper", email: "jane.cooper@example.com", initials: "JC", avatar: "avatar-green", date: "2025-06-16T11:30:00", amount: 119.00, status: "Processing", items: [{ name: "Recycled Glass Carafe", quantity: 1, price: 69 }, { name: "Glass Tumbler Set", quantity: 1, price: 50 }], payment: "Visa ending in 6711", address: "22 George Street, Glasgow G1 1AA" }
];

const elements = {
  body: document.querySelector("#orders-body"),
  search: document.querySelector("#search-input"),
  filter: document.querySelector("#status-filter"),
  sort: document.querySelector("#sort-select"),
  empty: document.querySelector("#empty-state"),
  error: document.querySelector("#error-state"),
  dialog: document.querySelector("#detail-dialog"),
  detail: document.querySelector("#detail-content"),
  toast: document.querySelector("#toast")
};

const statusClass = {
  Pending: "status-pending",
  Processing: "status-processing",
  Completed: "status-completed",
  Cancelled: "status-cancelled"
};
const avatarClasses = ["", "avatar-lilac", "avatar-blue", "avatar-green", "avatar-yellow", "avatar-pink", "avatar-teal"];
let activeOrderId = null;
let toastTimeout;

function formatCurrency(value) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(value);
}

function formatDate(value) {
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
}

function statusMarkup(status) {
  return `<span class="status-pill ${statusClass[status]}">${status}</span>`;
}

function updateSummary() {
  const counts = orders.reduce((result, order) => {
    result[order.status] = (result[order.status] || 0) + 1;
    return result;
  }, {});
  document.querySelector("#total-count").textContent = orders.length;
  document.querySelector("#pending-count").textContent = counts.Pending || 0;
  document.querySelector("#processing-count").textContent = counts.Processing || 0;
  document.querySelector("#completed-count").textContent = counts.Completed || 0;
  document.querySelector("#nav-order-count").textContent = orders.length;
}

function getVisibleOrders() {
  const searchTerm = elements.search.value.trim().toLowerCase();
  const selectedStatus = elements.filter.value;
  const matching = orders.filter((order) => {
    const matchesText = [order.id, order.customer, order.email].some((value) => value.toLowerCase().includes(searchTerm));
    return matchesText && (selectedStatus === "all" || order.status === selectedStatus);
  });

  const [sortKey, direction] = elements.sort.value.split("-");
  const multiplier = direction === "asc" ? 1 : -1;
  matching.sort((first, second) => {
    if (sortKey === "date") return (new Date(first.date) - new Date(second.date)) * multiplier;
    if (sortKey === "amount") return (first.amount - second.amount) * multiplier;
    return first.customer.localeCompare(second.customer) * multiplier;
  });
  return matching;
}

function renderOrders() {
  const visibleOrders = getVisibleOrders();
  elements.body.replaceChildren();
  elements.empty.hidden = visibleOrders.length > 0;
  elements.body.hidden = visibleOrders.length === 0;
  document.querySelector("#result-count").textContent = `(${visibleOrders.length})`;
  document.querySelector("#table-range").textContent = visibleOrders.length
    ? `Showing 1–${visibleOrders.length} of ${orders.length} orders`
    : "Showing 0 orders";

  visibleOrders.forEach((order) => {
    const row = document.createElement("tr");
    const avatarClass = avatarClasses.find((className) => className && order.avatar === className) || "";
    row.innerHTML = `
      <td><span class="order-number">${order.id}</span></td>
      <td><div class="customer-cell"><span class="customer-avatar ${avatarClass}">${order.initials}</span><span><span class="customer-name">${order.customer}</span><span class="customer-email">${order.email}</span></span></div></td>
      <td>${formatDate(order.date)}</td>
      <td><strong class="order-number">${formatCurrency(order.amount)}</strong></td>
      <td>${statusMarkup(order.status)}</td>
      <td><button class="row-action" type="button" aria-label="View order ${order.id} details">···</button></td>`;
    row.querySelector(".row-action").addEventListener("click", () => openOrderDetails(order.id));
    row.addEventListener("dblclick", () => openOrderDetails(order.id));
    elements.body.append(row);
  });
}

function openOrderDetails(orderId) {
  const order = orders.find((item) => item.id === orderId);
  if (!order) return;
  activeOrderId = order.id;
  document.querySelector("#detail-title").textContent = order.id;
  elements.detail.innerHTML = `
    <div class="detail-order-line"><strong>${order.customer}</strong>${statusMarkup(order.status)}</div>
    <div class="detail-grid">
      <div class="detail-field"><label>Order date</label><p>${formatDate(order.date)}</p></div>
      <div class="detail-field"><label>Customer email</label><p>${order.email}</p></div>
      <div class="detail-field"><label>Payment method</label><p>${order.payment}</p></div>
      <div class="detail-field"><label>Shipping address</label><p>${order.address}</p></div>
    </div>
    <div class="detail-items"><h3>Order items</h3>
      ${order.items.map((item) => `<div class="detail-product"><span>${item.name} × ${item.quantity}</span><span>${formatCurrency(item.price * item.quantity)}</span></div>`).join("")}
      <div class="detail-total"><span>Total</span><span>${formatCurrency(order.amount)}</span></div>
    </div>
    <div class="status-editor"><label for="detail-status">Update order status</label>
      <select id="detail-status">${Object.keys(statusClass).map((status) => `<option value="${status}" ${status === order.status ? "selected" : ""}>${status}</option>`).join("")}</select>
      <button class="primary-button save-status" id="save-status" type="button">Save status</button>
    </div>`;
  document.querySelector("#save-status").addEventListener("click", saveOrderStatus);
  elements.dialog.showModal();
}

function saveOrderStatus() {
  const order = orders.find((item) => item.id === activeOrderId);
  const nextStatus = document.querySelector("#detail-status").value;
  if (!order || !statusClass[nextStatus]) return;
  order.status = nextStatus;
  updateSummary();
  renderOrders();
  elements.dialog.close();
  showToast(`${order.id} updated to ${nextStatus.toLowerCase()}.`);
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => elements.toast.classList.remove("visible"), 2600);
}

function loadOrders() {
  elements.error.hidden = true;
  elements.empty.hidden = true;
  elements.body.hidden = false;
  elements.body.innerHTML = '<tr><td class="loading-cell" colspan="6"><span class="spinner" aria-hidden="true"></span>Loading orders...</td></tr>';
  window.setTimeout(() => {
    try {
      if (!Array.isArray(orders)) throw new Error("Order data is unavailable.");
      updateSummary();
      renderOrders();
    } catch (error) {
      console.error("Unable to load orders:", error);
      elements.body.hidden = true;
      elements.error.hidden = false;
      document.querySelector("#result-count").textContent = "";
      document.querySelector("#table-range").textContent = "Orders unavailable";
    }
  }, 300);
}

elements.search.addEventListener("input", renderOrders);
elements.filter.addEventListener("change", renderOrders);
elements.sort.addEventListener("change", renderOrders);
document.querySelector("#clear-filters").addEventListener("click", () => {
  elements.search.value = "";
  elements.filter.value = "all";
  renderOrders();
});
document.querySelector("#refresh-button").addEventListener("click", loadOrders);
document.querySelector("#retry-button").addEventListener("click", loadOrders);
document.querySelector("#close-dialog").addEventListener("click", () => elements.dialog.close());
elements.dialog.addEventListener("click", (event) => {
  if (event.target === elements.dialog) elements.dialog.close();
});
document.querySelector("#export-button").addEventListener("click", () => {
  const headings = ["Order", "Customer", "Email", "Date", "Amount (GBP)", "Status"];
  const rows = orders.map((order) => [order.id, order.customer, order.email, formatDate(order.date), order.amount.toFixed(2), order.status]);
  const csv = [headings, ...rows].map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\r\n");
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  link.download = "northstar-orders.csv";
  link.click();
  URL.revokeObjectURL(link.href);
  showToast("Orders exported as CSV.");
});
document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    elements.search.focus();
  }
});
document.querySelector("#current-date").textContent = new Intl.DateTimeFormat("en-GB", {
  weekday: "short", day: "numeric", month: "short", year: "numeric"
}).format(new Date());

loadOrders();
