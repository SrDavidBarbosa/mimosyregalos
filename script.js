// Telefones autorizados
const allowedPhones = ["640645343", "627945426", "610712400", "640645370"];

// Idioma atual
let currentLang = localStorage.getItem("mimosyregalos_lang") || "es";

// Cestas com textos em ES/VA
let cestas = [
    {
        id: "dulce-detalle",
        categoria: "general",
        imagem: "img/cesta-dulce.jpg",
        nombre: {
            es: "Cesta Dulce Detalle",
            va: "Cistella Dolç Detall"
        },
        precio: {
            es: "€22–€28",
            va: "22–28 €"
        },
        items: {
            es: [
                "Chocolate simple",
                "Galletas",
                "Caramelos",
                "Zumo pequeño",
                "Mini Nutella",
                "Tarjeta personalizada"
            ],
            va: [
                "Xocolata simple",
                "Galetes",
                "Caramels",
                "Suc xicotet",
                "Mini Nutella",
                "Targeta personalitzada"
            ]
        }
    },
    {
        id: "felicidad",
        categoria: "general",
        imagem: "img/cesta-felicidad.jpg",
        nombre: {
            es: "Cesta Felicidad",
            va: "Cistella Felicitat"
        },
        precio: {
            es: "€26–€32",
            va: "26–32 €"
        },
        items: {
            es: [
                "Chocolates variados",
                "Cookies artesanales",
                "Caramelos",
                "Mini pastel",
                "Zumo",
                "Tarjeta"
            ],
            va: [
                "Xocolates variats",
                "Galetes artesanals",
                "Caramels",
                "Mini pastís",
                "Suc",
                "Targeta"
            ]
        }
    },
    {
        id: "cumpleanos",
        categoria: "general",
        imagem: "img/cesta-cumple.jpg",
        nombre: {
            es: "Cesta Cumpleaños",
            va: "Cistella Aniversari"
        },
        precio: {
            es: "€28–€35",
            va: "28–35 €"
        },
        items: {
            es: [
                "Mini pastel",
                "Velas",
                "Globo",
                "Chocolates",
                "Dulces",
                "Zumo",
                "Confeti",
                "Tarjeta"
            ],
            va: [
                "Mini pastís",
                "Espelmes",
                "Globus",
                "Xocolates",
                "Dolços",
                "Suc",
                "Confeti",
                "Targeta"
            ]
        }
    },
    {
        id: "romance",
        categoria: "general",
        imagem: "img/cesta-romance.jpg",
        nombre: {
            es: "Cesta Romance",
            va: "Cistella Romàntica"
        },
        precio: {
            es: "€38–€55",
            va: "38–55 €"
        },
        items: {
            es: [
                "Ferrero Rocher",
                "Raffaello",
                "Peluche premium",
                "Rosa decorativa",
                "Vela aromática",
                "Chocolate gourmet",
                "Tarjeta"
            ],
            va: [
                "Ferrero Rocher",
                "Raffaello",
                "Peluix premium",
                "Rosa decorativa",
                "Espelma aromàtica",
                "Xocolata gourmet",
                "Targeta"
            ]
        }
    },
    {
        id: "dulce-tierna",
        categoria: "general",
        imagem: "img/cesta-dulce-tierna.jpg",
        nombre: {
            es: "Cesta Dulce & Tierna",
            va: "Cistella Dolça & Tendra"
        },
        precio: {
            es: "€40–€55",
            va: "40–55 €"
        },
        items: {
            es: [
                "Ferrero Rocher",
                "Raffaello",
                "Mini Nutella",
                "Peluche",
                "Dulces variados",
                "Chocolate",
                "Caja decorada",
                "Tarjeta",
                "Mini pastel"
            ],
            va: [
                "Ferrero Rocher",
                "Raffaello",
                "Mini Nutella",
                "Peluix",
                "Dolços variats",
                "Xocolata",
                "Caixa decorada",
                "Targeta",
                "Mini pastís"
            ]
        }
    },
    {
        id: "desayuno",
        categoria: "general",
        imagem: "img/cesta-desayuno.jpg",
        nombre: {
            es: "Cesta Desayuno",
            va: "Cistella Esmorzar"
        },
        precio: {
            es: "€40–€55",
            va: "40–55 €"
        },
        items: {
            es: [
                "Café",
                "Té",
                "Croissants",
                "Mermeladas mini",
                "Mini Nutella",
                "Zumo",
                "Frutas",
                "Galletas",
                "Yogur o granola"
            ],
            va: [
                "Cafè",
                "Te",
                "Croissants",
                "Melmelades mini",
                "Mini Nutella",
                "Suc",
                "Fruita",
                "Galetes",
                "Iogurt o granola"
            ]
        }
    },
    {
        id: "chocolate",
        categoria: "general",
        imagem: "img/cesta-chocolate.jpg",
        nombre: {
            es: "Cesta Amantes del Chocolate",
            va: "Cistella Amants de la Xocolata"
        },
        precio: {
            es: "€45–€60",
            va: "45–60 €"
        },
        items: {
            es: [
                "Ferrero Rocher",
                "Raffaello",
                "Kinder",
                "Milka",
                "Mini Nutella",
                "Galletas",
                "Brownie o mini pastel",
                "Chocolate caliente",
                "Marshmallows"
            ],
            va: [
                "Ferrero Rocher",
                "Raffaello",
                "Kinder",
                "Milka",
                "Mini Nutella",
                "Galetes",
                "Brownie o mini pastís",
                "Xocolata calenta",
                "Núvols de sucre"
            ]
        }
    },
    {
        id: "iberica",
        categoria: "general",
        imagem: "img/cesta-iberica.jpg",
        nombre: {
            es: "Cesta Gourmet Ibérica",
            va: "Cistella Gourmet Ibèrica"
        },
        precio: {
            es: "€60–€85",
            va: "60–85 €"
        },
        items: {
            es: [
                "Jamón ibérico",
                "Queso curado",
                "Tostadas",
                "Aceitunas",
                "Aceite de oliva virgen extra",
                "Vino tinto",
                "Chocolate premium",
                "Frutos secos"
            ],
            va: [
                "Pernil ibèric",
                "Formatge curat",
                "Torrades",
                "Olives",
                "Oli d'oliva verge extra",
                "Vi negre",
                "Xocolata premium",
                "Fruits secs"
            ]
        }
    },
    {
        id: "madre-valenciana",
        categoria: "madre",
        imagem: "img/cesta-madre.jpg",
        nombre: {
            es: "Cesta Especial Día de la Madre – Edición Valenciana",
            va: "Cistella Especial Dia de la Mare – Edició Valenciana"
        },
        precio: {
            es: "€55–€85",
            va: "55–85 €"
        },
        items: {
            es: [
                "Horchata artesanal valenciana",
                "Fartons tradicionales",
                "Mermelada de naranja valenciana",
                "Vela aromática de azahar",
                "Chocolate con almendra marcona",
                "Mini ramo de flores secas",
                "Tarjeta especial “Feliz Día de la Madre”"
            ],
            va: [
                "Orxata artesanal valenciana",
                "Fartons tradicionals",
                "Melmelada de taronja valenciana",
                "Espelma aromàtica de flor de taronger",
                "Xocolata amb ametla marcona",
                "Mini ram de flors seques",
                "Targeta especial “Feliç Dia de la Mare”"
            ]
        }
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

// Traduções de interface
const uiTexts = {
    es: {
        nav_catalogo: "Catálogo",
        nav_madre: "Día de la Madre",
        btn_login: "Login",
        hero_subtitle: "Cestas de regalo premium en Valencia, pensadas para sorprender con detalles dulces, románticos y gourmet.",
        hero_cta: "Ver cestas disponibles",
        sec_catalogo_title: "Cestas de regalo",
        sec_catalogo_subtitle: "Elige la cesta ideal para cumpleaños, aniversarios, sorpresas románticas o un detalle dulce inesperado.",
        sec_madre_title: "Cesta Especial Día de la Madre",
        sec_madre_subtitle: "Edición especial con productos típicos valencianos y una presentación elegante para celebrar a lo grande.",
        sec_admin_title: "Panel interno",
        sec_admin_subtitle: "Acceso exclusivo para gestionar el catálogo de cestas.",
        login_country_label: "Selecciona país",
        login_phone_label: "Número de teléfono",
        btn_login_enter: "Entrar",
        editor_title: "Editar cestas",
        btn_logout: "Cerrar sesión",
        editor_select_label: "Seleccionar cesta",
        editor_name_es: "Nombre (Castellano)",
        editor_name_va: "Nom (Valencià)",
        editor_price_es: "Precio (Castellano)",
        editor_price_va: "Preu (Valencià)",
        editor_image: "URL de la imagen",
        editor_items_es: "Ítems (Castellano, uno por línea)",
        editor_items_va: "Ítems (Valencià, un per línia)",
        btn_save: "Guardar",
        btn_new: "Nueva cesta",
        editor_note: "Los cambios se guardan en este navegador (localStorage). Para actualizar el código en GitHub, copia el JSON si lo necesitas.",
        cart_title: "Tu selección",
        cart_whatsapp: "Enviar pedido por WhatsApp",
        login_unauthorized: "Número no autorizado.",
        cart_empty: "No hay productos en el carrito.",
        card_whatsapp: "WhatsApp directo",
        card_cart: "Añadir al carrito"
    },
    va: {
        nav_catalogo: "Catàleg",
        nav_madre: "Dia de la Mare",
        btn_login: "Login",
        hero_subtitle: "Cistelles de regal premium a València, pensades per a sorprendre amb detalls dolços, romàntics i gourmet.",
        hero_cta: "Veure cistelles disponibles",
        sec_catalogo_title: "Cistelles de regal",
        sec_catalogo_subtitle: "Tria la cistella ideal per a aniversaris, sorpreses romàntiques o un detall dolç inesperat.",
        sec_madre_title: "Cistella Especial Dia de la Mare",
        sec_madre_subtitle: "Edició especial amb productes típics valencians i una presentació elegant per a celebrar a lo gran.",
        sec_admin_title: "Panell intern",
        sec_admin_subtitle: "Accés exclusiu per a gestionar el catàleg de cistelles.",
        login_country_label: "Selecciona país",
        login_phone_label: "Número de telèfon",
        btn_login_enter: "Entrar",
        editor_title: "Editar cistelles",
        btn_logout: "Tancar sessió",
        editor_select_label: "Seleccionar cistella",
        editor_name_es: "Nom (Castellà)",
        editor_name_va: "Nom (Valencià)",
        editor_price_es: "Preu (Castellà)",
        editor_price_va: "Preu (Valencià)",
        editor_image: "URL de la imatge",
        editor_items_es: "Ítems (Castellà, un per línia)",
        editor_items_va: "Ítems (Valencià, un per línia)",
        btn_save: "Guardar",
        btn_new: "Nova cistella",
        editor_note: "Els canvis es guarden en aquest navegador (localStorage). Per a actualitzar el codi en GitHub, copia el JSON si ho necessites.",
        cart_title: "La teua selecció",
        cart_whatsapp: "Enviar comanda per WhatsApp",
        login_unauthorized: "Número no autoritzat.",
        cart_empty: "No hi ha productes al carret.",
        card_whatsapp: "WhatsApp directe",
        card_cart: "Afegir al carret"
    }
};

// Carrinho
let cart = [];

// Render catálogo
function renderCatalog() {
    const container = document.getElementById("cards");
    const madreContainer = document.getElementById("cards-madre");
    container.innerHTML = "";
    madreContainer.innerHTML = "";

    cestas.forEach((c, index) => {
        const card = document.createElement("div");
        card.className = "card";
        card.style.animationDelay = `${index * 0.05}s`;

        const lang = currentLang;
        const nome = c.nombre[lang] || c.nombre.es;
        const preco = c.precio[lang] || c.precio.es;
        const itens = c.items[lang] || c.items.es;

        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${c.imagem || 'img/default.jpg'}" class="card-img" alt="${nome}">
            </div>
            <div class="card-title">${nome}</div>
            <div class="card-price">${preco}</div>
            <ul class="card-items">
                ${itens.map(i => `<li>${i}</li>`).join("")}
            </ul>
            <div class="card-actions">
                <button class="primary-btn btn-whatsapp" onclick="pedirWhatsApp('${encodeURIComponent(nome)}')">
                    ${uiTexts[lang].card_whatsapp}
                </button>
                <button class="secondary-btn btn-cart" onclick="addToCart('${c.id}')">
                    ${uiTexts[lang].card_cart}
                </button>
            </div>
        `;

        if (c.categoria === "madre") {
            madreContainer.appendChild(card);
        } else {
            container.appendChild(card);
        }
    });
}

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
    const lang = currentLang;
    if (cart.length === 0) {
        const li = document.createElement("li");
        li.textContent = uiTexts[lang].cart_empty;
        cartList.appendChild(li);
        return;
    }
    cart.forEach((c, idx) => {
        const nome = c.nombre[lang] || c.nombre.es;
        const preco = c.precio[lang] || c.precio.es;
        const li = document.createElement("li");
        li.textContent = `${idx + 1}. ${nome} (${preco})`;
        cartList.appendChild(li);
    });
}

cartWhatsApp.onclick = () => {
    if (cart.length === 0) return;
    const lang = currentLang;
    const lines = cart.map((c, i) => {
        const nome = c.nombre[lang] || c.nombre.es;
        const preco = c.precio[lang] || c.precio.es;
        return `${i + 1}. ${nome} (${preco})`;
    });
    const msg = `Hola, me gustaría pedir estas cestas:\n\n${lines.join("\n")}\n\n¿Están disponibles para entrega hoy?`;
    window.open(`https://wa.me/34640645343?text=${encodeURIComponent(msg)}`, "_blank");
};

// Scroll helper
function scrollToCatalog() {
    document.getElementById("catalogo").scrollIntoView({ behavior: "smooth" });
}
window.scrollToCatalog = scrollToCatalog;

// Login: botão no header abre/fecha box
const loginOpenBtn = document.getElementById("login-open");
const loginBox = document.getElementById("login-box");
const editorBox = document.getElementById("editor");

loginOpenBtn.onclick = () => {
    document.getElementById("admin").scrollIntoView({ behavior: "smooth" });
    loginBox.style.display = "block";
};

// Login
document.getElementById("login-btn").onclick = () => {
    const phone = document.getElementById("phone").value.trim();
    const msg = document.getElementById("login-msg");
    const lang = currentLang;

    if (allowedPhones.includes(phone)) {
        msg.textContent = "";
        loginBox.style.display = "none";
        editorBox.style.display = "block";
        initEditor();
    } else {
        msg.textContent = uiTexts[lang].login_unauthorized;
    }
};

document.getElementById("logout-btn").onclick = () => {
    editorBox.style.display = "none";
    loginBox.style.display = "block";
};

// Editor
const selectCesta = document.getElementById("select-cesta");
const nombreEsInput = document.getElementById("cesta-nombre-es");
const nombreVaInput = document.getElementById("cesta-nombre-va");
const precioEsInput = document.getElementById("cesta-precio-es");
const precioVaInput = document.getElementById("cesta-precio-va");
const imagemInput = document.getElementById("cesta-imagem");
const itemsEsTextarea = document.getElementById("cesta-items-es");
const itemsVaTextarea = document.getElementById("cesta-items-va");
const saveBtn = document.getElementById("save-btn");
const newBtn = document.getElementById("new-btn");

let currentId = null;

function initEditor() {
    selectCesta.innerHTML = "";
    cestas.forEach(c => {
        const opt = document.createElement("option");
        opt.value = c.id;
        opt.textContent = c.nombre.es;
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
    nombreEsInput.value = c.nombre.es || "";
    nombreVaInput.value = c.nombre.va || "";
    precioEsInput.value = c.precio.es || "";
    precioVaInput.value = c.precio.va || "";
    imagemInput.value = c.imagem || "";
    itemsEsTextarea.value = (c.items.es || []).join("\n");
    itemsVaTextarea.value = (c.items.va || []).join("\n");
}

function saveCesta() {
    if (!currentId) return;
    const idx = cestas.findIndex(x => x.id === currentId);
    if (idx === -1) return;

    cestas[idx].nombre.es = nombreEsInput.value.trim() || cestas[idx].nombre.es;
    cestas[idx].nombre.va = nombreVaInput.value.trim() || cestas[idx].nombre.va;
    cestas[idx].precio.es = precioEsInput.value.trim() || cestas[idx].precio.es;
    cestas[idx].precio.va = precioVaInput.value.trim() || cestas[idx].precio.va;
    cestas[idx].imagem = imagemInput.value.trim() || cestas[idx].imagem;
    cestas[idx].items.es = itemsEsTextarea.value
        .split("\n")
        .map(x => x.trim())
        .filter(x => x.length > 0);
    cestas[idx].items.va = itemsVaTextarea.value
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
        categoria: "general",
        imagem: "img/default.jpg",
        nombre: {
            es: "Nueva cesta",
            va: "Nova cistella"
        },
        precio: {
            es: "€0",
            va: "0 €"
        },
        items: {
            es: ["Producto 1"],
            va: ["Producte 1"]
        }
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
    currentLang = lang;
    localStorage.setItem("mimosyregalos_lang", lang);

    const dict = uiTexts[lang];

    document.querySelectorAll("[data-key]").forEach(el => {
        const key = el.getAttribute("data-key");
        if (dict[key]) el.textContent = dict[key];
    });

    renderCatalog();
}

langButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const lang = btn.getAttribute("data-lang");
        applyLanguage(lang);
    });
});

// Dark mode
const darkToggle = document.getElementById("dark-toggle");
if (localStorage.getItem("mimosyregalos_dark") === "true") {
    document.body.classList.add("dark");
}

darkToggle.onclick = () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("mimosyregalos_dark", document.body.classList.contains("dark"));
};

// Inicialização
applyLanguage(currentLang);
renderCatalog();
updateCartCount();