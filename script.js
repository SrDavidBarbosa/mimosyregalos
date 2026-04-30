// Telefones autorizados
const allowedPhones = ["640645343", "627945426", "610712400", "640645370"];

// Cestas (com imagem)
let cestas = [
    {
        id: "dulce",
        nombre: "Cesta Dulce Detalle",
        precio: "€22–€28",
        imagem: "img/cesta1.jpg",
        items: ["Chocolate", "Galletas", "Caramelos"]
    },
    {
        id: "romantica",
        nombre: "Cesta Romántica",
        precio: "€38–€55",
        imagem: "img/cesta2.jpg",
        items: ["Ferrero Rocher", "Peluche", "Rosa decorativa", "Vela aromática"]
    }
];

// Carregar de localStorage se existir
const saved = localStorage.getItem("mimosyregalos_cestas");
if (saved) {
    try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) cestas = parsed;
    } catch (e) {}
}

// Carrinho
let cart = [];

// Render catálogo
function renderCatalog() {
    const container = document.getElementById("cards");
    container.innerHTML = "";

    cestas.forEach((c, index) => {
        const card = document.createElement("div");
        card.className = "card";
        card.style.animationDelay = `${index * 0.05}s`;

        card.innerHTML = `
            <img src="${c.imagem || 'img/default.jpg'}" class="card-img" alt="${c.nombre}">
            <h3>${c.nombre}</h3>
            <p>${c.precio}</p>
            <ul>${(c.items || []).map(i => `<li>${i}</li>`).join("")}</ul>
            <button class="btn-whatsapp" onclick="pedirWhatsApp('${encodeURIComponent(c.nombre)}')">
                WhatsApp directo
            </button>
            <button class="btn-cart" onclick="addToCart('${c.id}')">
                Añadir al carrito
            </button>
        `;

        container.appendChild(card);
    });
}

renderCatalog();

// WhatsApp individual
function pedirWhatsApp(nombreEncoded) {
    const nombre = decodeURIComponent(nombreEncoded);
    const msg = `Hola, me gustaría pedir la cesta “${nombre}”. ¿Está disponible para entrega hoy?`;
    window.open(`https://wa.me/34640645343?text=${encodeURIComponent(msg)}`, "_blank");
}

// Carrinho
function addToCart(id) {
    const cesta = cestas.find(c => c.id === id);
    if (!cesta) return;
    cart.push(cesta);
    updateCartCount();
}

function updateCartCount() {
    document.getElementById("cart-count").textContent = cart.length;
}

const cartButton = document.getElementById("cart-button");
const cartModal = document.getElementById("cart-modal");
const cartClose = document.getElementById("cart-close");
const cartList = document.getElementById("cart-list");
const cartWhatsApp = document.getElementById("cart-whatsapp");

cartButton.onclick = () => {
    renderCartModal();
    cartModal.style.display = "flex";
};

cartClose.onclick = () => {
    cartModal.style.display = "none";
};

cartModal.addEventListener("click", (e) => {
    if (e.target === cartModal) cartModal.style.display = "none";
});

function renderCartModal() {
    cartList.innerHTML = "";
    if (cart.length === 0) {
        const li = document.createElement("li");
        li.textContent = "No hay productos en el carrito.";
        cartList.appendChild(li);
        return;
    }
    cart.forEach((c, idx) => {
        const li = document.createElement("li");
        li.textContent = `${idx + 1}. ${c.nombre} (${c.precio})`;
        cartList.appendChild(li);
    });
}

cartWhatsApp.onclick = () => {
    if (cart.length === 0) return;
    const lines = cart.map((c, i) => `${i + 1}. ${c.nombre} (${c.precio})`);
    const msg = `Hola, me gustaría pedir estas cestas:\n\n${lines.join("\n")}\n\n¿Están disponibles para entrega hoy?`;
    window.open(`https://wa.me/34640645343?text=${encodeURIComponent(msg)}`, "_blank");
};

// Login
document.getElementById("login-btn").onclick = () => {
    const phone = document.getElementById("phone").value.trim();
    const msg = document.getElementById("login-msg");

    if (allowedPhones.includes(phone)) {
        msg.textContent = "";
        document.getElementById("login-box").style.display = "none";
        document.getElementById("editor").style.display = "block";
        initEditor();
    } else {
        msg.textContent = "Número no autorizado.";
    }
};

document.getElementById("logout-btn").onclick = () => {
    document.getElementById("editor").style.display = "none";
    document.getElementById("login-box").style.display = "block";
};

// Editor
const selectCesta = document.getElementById("select-cesta");
const nombreInput = document.getElementById("cesta-nombre");
const precioInput = document.getElementById("cesta-precio");
const imagemInput = document.getElementById("cesta-imagem");
const itemsTextarea = document.getElementById("cesta-items");
const saveBtn = document.getElementById("save-btn");
const newBtn = document.getElementById("new-btn");

let currentId = null;

function initEditor() {
    selectCesta.innerHTML = "";
    cestas.forEach(c => {
        const opt = document.createElement("option");
        opt.value = c.id;
        opt.textContent = c.nombre;
        selectCesta.appendChild(opt);
    });
    if (cestas.length > 0) {
        currentId = cestas[0].id;
        loadCesta(currentId);
    }

    selectCesta.onchange = () => {
        currentId = selectCesta.value;
        loadCesta(currentId);
    };

    saveBtn.onclick = saveCesta;
    newBtn.onclick = newCesta;
}

function loadCesta(id) {
    const c = cestas.find(x => x.id === id);
    if (!c) return;
    nombreInput.value = c.nombre || "";
    precioInput.value = c.precio || "";
    imagemInput.value = c.imagem || "";
    itemsTextarea.value = (c.items || []).join("\n");
}

function saveCesta() {
    if (!currentId) return;
    const idx = cestas.findIndex(x => x.id === currentId);
    if (idx === -1) return;

    cestas[idx].nombre = nombreInput.value.trim() || cestas[idx].nombre;
    cestas[idx].precio = precioInput.value.trim() || cestas[idx].precio;
    cestas[idx].imagem = imagemInput.value.trim() || cestas[idx].imagem;
    cestas[idx].items = itemsTextarea.value
        .split("\n")
        .map(x => x.trim())
        .filter(x => x.length > 0);

    localStorage.setItem("mimosyregalos_cestas", JSON.stringify(cestas));
    renderCatalog();
    initEditor();
    alert("Cesta actualizada.");
}

function newCesta() {
    const id = "c" + Date.now();
    const nueva = {
        id,
        nombre: "Nueva cesta",
        precio: "€0",
        imagem: "img/default.jpg",
        items: ["Producto 1"]
    };
    cestas.push(nueva);
    localStorage.setItem("mimosyregalos_cestas", JSON.stringify(cestas));
    renderCatalog();
    initEditor();
    selectCesta.value = id;
    currentId = id;
    loadCesta(id);
}

// Idioma
const langButtons = document.querySelectorAll(".lang-btn");

function applyLanguage(lang) {
    document.querySelectorAll("[data-es]").forEach(el => {
        const es = el.getAttribute("data-es");
        const va = el.getAttribute("data-va");
        el.textContent = lang === "va" && va ? va : es;
    });
    localStorage.setItem("mimosyregalos_lang", lang);
}

langButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const lang = btn.getAttribute("data-lang");
        applyLanguage(lang);
    });
});

const savedLang = localStorage.getItem("mimosyregalos_lang") || "es";
applyLanguage(savedLang);

// Dark mode
const darkToggle = document.getElementById("dark-toggle");
if (localStorage.getItem("mimosyregalos_dark") === "true") {
    document.body.classList.add("dark");
}

darkToggle.onclick = () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("mimosyregalos_dark", document.body.classList.contains("dark"));
};