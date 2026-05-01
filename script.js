// Telefones autorizados
const allowedPhones = ["640645343", "627945426", "610712400", "640645370"];

// Idioma atual
let currentLang = localStorage.getItem("mimosyregalos_lang") || "es";

// Modo de visualização: all | madre
let currentView = "all";

// Carinho
let cart = [];

// Cestas base (ES + PT-BR, premium + alergias)
let cestas = [
    {
        id: "dulce-detalle",
        categoria: "general",
        imagem: "img/cesta-dulce.jpg",
        premium: false,
        alergias: ["gluten", "lactosa"],
        nombre: {
            es: "Cesta Dulce Detalle",
            pt: "Cesta Doce Detalhe"
        },
        precio: {
            es: "€22–€28",
            pt: "€22–€28"
        },
        frase: {
            es: "Un detalle dulce para alegrar el día.",
            pt: "Um mimo doce para alegrar o dia."
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
            pt: [
                "Chocolate simples",
                "Biscoitos",
                "Balas",
                "Suco pequeno",
                "Mini Nutella",
                "Cartão personalizado"
            ]
        }
    },
    {
        id: "felicidad",
        categoria: "general",
        imagem: "img/cesta-felicidad.jpg",
        premium: false,
        alergias: ["gluten", "lactosa"],
        nombre: {
            es: "Cesta Felicidad",
            pt: "Cesta Felicidade"
        },
        precio: {
            es: "€26–€32",
            pt: "€26–€32"
        },
        frase: {
            es: "Dulces y sonrisas en una sola cesta.",
            pt: "Doces e sorrisos em uma só cesta."
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
            pt: [
                "Chocolates variados",
                "Cookies artesanais",
                "Balas",
                "Mini bolo",
                "Suco",
                "Cartão"
            ]
        }
    },
    {
        id: "cumpleanos",
        categoria: "general",
        imagem: "img/cesta-cumple.jpg",
        premium: false,
        alergias: ["gluten", "lactosa"],
        nombre: {
            es: "Cesta Cumpleaños",
            pt: "Cesta Aniversário"
        },
        precio: {
            es: "€28–€35",
            pt: "€28–€35"
        },
        frase: {
            es: "Todo listo para cantar cumpleaños feliz.",
            pt: "Tudo pronto para cantar parabéns."
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
            pt: [
                "Mini bolo",
                "Velas",
                "Balão",
                "Chocolates",
                "Doces",
                "Suco",
                "Confete",
                "Cartão"
            ]
        }
    },
    {
        id: "romance",
        categoria: "general",
        imagem: "img/cesta-romance.jpg",
        premium: true,
        alergias: ["lactosa", "frutos secos"],
        nombre: {
            es: "Cesta Romance",
            pt: "Cesta Romance"
        },
        precio: {
            es: "€38–€55",
            pt: "€38–€55"
        },
        frase: {
            es: "Detalles románticos para decir te quiero.",
            pt: "Detalhes românticos para dizer eu te amo."
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
            pt: [
                "Ferrero Rocher",
                "Raffaello",
                "Pelúcia premium",
                "Rosa decorativa",
                "Vela aromática",
                "Chocolate gourmet",
                "Cartão"
            ]
        }
    },
    {
        id: "dulce-tierna",
        categoria: "general",
        imagem: "img/cesta-dulce-tierna.jpg",
        premium: true,
        alergias: ["gluten", "lactosa", "frutos secos"],
        nombre: {
            es: "Cesta Dulce & Tierna",
            pt: "Cesta Doce & Fofa"
        },
        precio: {
            es: "€40–€55",
            pt: "€40–€55"
        },
        frase: {
            es: "Perfecta para sorprender con cariño.",
            pt: "Perfeita para surpreender com carinho."
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
            pt: [
                "Ferrero Rocher",
                "Raffaello",
                "Mini Nutella",
                "Pelúcia",
                "Doces variados",
                "Chocolate",
                "Caixa decorada",
                "Cartão",
                "Mini bolo"
            ]
        }
    },
    {
        id: "desayuno",
        categoria: "general",
        imagem: "img/cesta-desayuno.jpg",
        premium: false,
        alergias: ["gluten", "lactosa"],
        nombre: {
            es: "Cesta Desayuno",
            pt: "Cesta Café da Manhã"
        },
        precio: {
            es: "€40–€55",
            pt: "€40–€55"
        },
        frase: {
            es: "Empieza el día con un desayuno especial.",
            pt: "Comece o dia com um café da manhã especial."
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
            pt: [
                "Café",
                "Chá",
                "Croissants",
                "Geleias mini",
                "Mini Nutella",
                "Suco",
                "Frutas",
                "Biscoitos",
                "Iogurte ou granola"
            ]
        }
    },
    {
        id: "chocolate",
        categoria: "general",
        imagem: "img/cesta-chocolate.jpg",
        premium: true,
        alergias: ["lactosa", "frutos secos"],
        nombre: {
            es: "Cesta Amantes del Chocolate",
            pt: "Cesta Amantes de Chocolate"
        },
        precio: {
            es: "€45–€60",
            pt: "€45–€60"
        },
        frase: {
            es: "Para quien no vive sin chocolate.",
            pt: "Para quem não vive sem chocolate."
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
            pt: [
                "Ferrero Rocher",
                "Raffaello",
                "Kinder",
                "Milka",
                "Mini Nutella",
                "Biscoitos",
                "Brownie ou mini bolo",
                "Chocolate quente",
                "Marshmallows"
            ]
        }
    },
    {
        id: "iberica",
        categoria: "general",
        imagem: "img/cesta-iberica.jpg",
        premium: true,
        alergias: ["gluten", "frutos secos"],
        nombre: {
            es: "Cesta Gourmet Ibérica",
            pt: "Cesta Gourmet Ibérica"
        },
        precio: {
            es: "€60–€85",
            pt: "€60–€85"
        },
        frase: {
            es: "Sabores ibéricos para un momento especial.",
            pt: "Sabores ibéricos para um momento especial."
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
            pt: [
                "Presunto ibérico",
                "Queijo curado",
                "Torradas",
                "Azeitonas",
                "Azeite de oliva extra virgem",
                "Vinho tinto",
                "Chocolate premium",
                "Frutos secos"
            ]
        }
    },
    {
        id: "madre-valenciana",
        categoria: "madre",
        imagem: "img/cesta-madre.jpg",
        premium: true,
        alergias: ["gluten", "lactosa", "frutos secos"],
        nombre: {
            es: "Cesta Especial Día de la Madre – Edición Valenciana",
            pt: "Cesta Especial Dia das Mães – Edição Valenciana"
        },
        precio: {
            es: "€55–€85",
            pt: "€55–€85"
        },
        frase: {
            es: "Un homenaje lleno de sabor y cariño.",
            pt: "Uma homenagem cheia de sabor e carinho."
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
            pt: [
                "Horchata artesanal valenciana",
                "Fartons tradicionais",
                "Geleia de laranja valenciana",
                "Vela aromática de flor de laranjeira",
                "Chocolate com amêndoa marcona",
                "Mini buquê de flores secas",
                "Cartão especial “Feliz Dia das Mães”"
            ]
        }
    }
];

// Carregar de localStorage se existir
const saved = localStorage.getItem("mimosyregalos_cestas_v1");
if (saved) {
    try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) cestas = parsed;
    } catch (e) {}
}

// Traduções de interface
const uiTexts = {
    es: {
        hero_subtitle: "Cestas de regalo premium en Valencia, pensadas para sorprender con detalles dulces, románticas y gourmet.",
        hero_cta: "Ver cestas disponibles",
        sec_catalogo_title: "Cestas de regalo",
        sec_catalogo_subtitle: "Elige la cesta ideal para cumpleaños, aniversarios, sorpresas románticas o un detalle dulce inesperado.",
        madre_headline: "Una sorpresa inolvidable para el Día de la Madre",
        madre_text_1: "Presentación cuidada, productos seleccionados con cariño y un toque muy valenciano para decir “gracias” de una forma especial.",
        madre_text_2: "Ideal para entregar en casa, en el trabajo o como sorpresa en la mañana. Todo listo para emocionar desde el primer vistazo.",
        madre_bullet_1: "Edición limitada para la fecha",
        madre_bullet_2: "Productos típicos valencianos",
        madre_bullet_3: "Presentación fotogénica para redes sociales",
        madre_bullet_4: "Mensaje personalizado para la mamá",
        cart_title: "Tu selección",
        cart_whatsapp: "Enviar pedido por WhatsApp",
        login_unauthorized: "Número no autorizado.",
        cart_empty: "No hay productos en el carrito.",
        card_details: "Ver detalles",
        card_cart: "Añadir al carrito",
        btn_allergies: "Alergias",
        allergy_text_prefix: "Esta cesta puede contener:"
    },
    pt: {
        hero_subtitle: "Cestas de presente premium em Valência, pensadas para surpreender com detalhes doces, românticos e gourmet.",
        hero_cta: "Ver cestas disponíveis",
        sec_catalogo_title: "Cestas de presente",
        sec_catalogo_subtitle: "Escolha a cesta ideal para aniversários, surpresas românticas ou um mimo doce inesperado.",
        madre_headline: "Uma surpresa inesquecível para o Dia das Mães",
        madre_text_1: "Apresentação cuidadosa, produtos selecionados com carinho e um toque bem valenciano para dizer “obrigada” de forma especial.",
        madre_text_2: "Ideal para entregar em casa, no trabalho ou como surpresa pela manhã. Tudo pronto para emocionar no primeiro olhar.",
        madre_bullet_1: "Edição limitada para a data",
        madre_bullet_2: "Produtos típicos valencianos",
        madre_bullet_3: "Apresentação fotogênica para redes sociais",
        madre_bullet_4: "Mensagem personalizada para a mamãe",
        cart_title: "Sua seleção",
        cart_whatsapp: "Enviar pedido pelo WhatsApp",
        login_unauthorized: "Número não autorizado.",
        cart_empty: "Não há produtos no carrinho.",
        card_details: "Ver detalhes",
        card_cart: "Adicionar ao carrinho",
        btn_allergies: "Alergias",
        allergy_text_prefix: "Esta cesta pode conter:"
    }
};

// Emojis para itens premium
function decorateItem(cesta, item) {
    if (!cesta.premium) return item;
    const emojis = ["✨", "🎁", "💝", "🍫", "🌸", "🥂"];
    const e = emojis[Math.floor(Math.random() * emojis.length)];
    return `${e} ${item}`;
}

// Render catálogo (página pública)
function renderCatalog() {
    const container = document.getElementById("cards");
    if (!container) return; // estamos no admin

    const madreExtra = document.getElementById("madre-extra");
    container.innerHTML = "";

    const lang = currentLang;
    const dict = uiTexts[lang];

    document.querySelectorAll("[data-key]").forEach(el => {
        const key = el.getAttribute("data-key");
        if (dict[key]) el.textContent = dict[key];
    });

    let list;
    if (currentView === "madre") {
        list = cestas.filter(c => c.categoria === "madre");
        if (madreExtra) madreExtra.style.display = "block";
    } else {
        list = cestas.filter(c => c.categoria === "general");
        if (madreExtra) madreExtra.style.display = "none";
    }

    list.forEach((c, index) => {
        const card = document.createElement("div");
        card.className = "card";

        const nome = c.nombre[lang] || c.nombre.es;
        const frase = c.frase[lang] || c.frase.es;
        const preco = c.precio[lang] || c.precio.es;

        card.innerHTML = `
            <div class="card-inner" data-id="${c.id}">
                <div class="card-face card-front">
                    <div class="card-img-wrapper">
                        <img src="${c.imagem || 'img/default.jpg'}" class="card-img" alt="${nome}">
                    </div>
                    <div class="card-front-title">${nome}</div>
                </div>
                <div class="card-face card-back">
                    <div class="card-title">${nome}</div>
                    <div class="card-price">${preco}</div>
                    <div class="card-phrase">${frase}</div>
                    <div class="card-actions">
                        <button class="primary-btn" data-action="details">${dict.card_details}</button>
                        <button class="secondary-btn btn-cart" data-action="cart">${dict.card_cart}</button>
                    </div>
                </div>
            </div>
        `;

        const inner = card.querySelector(".card-inner");

        // Hover (desktop)
        inner.addEventListener("mouseenter", () => {
            inner.classList.add("flipped");
        });
        inner.addEventListener("mouseleave", () => {
            inner.classList.remove("flipped");
        });

        // Click (mobile / fallback)
        inner.addEventListener("click", (e) => {
            const action = e.target.getAttribute("data-action");
            if (action === "details") {
                openDetails(c.id);
                return;
            }
            if (action === "cart") {
                addToCart(c.id);
                return;
            }
            // se clicou em área neutra, alterna giro
            if (!action) {
                inner.classList.toggle("flipped");
            }
        });

        container.appendChild(card);
    });
}

// Detalhes popup
const detailsModal = document.getElementById("details-modal");
const detailsClose = document.getElementById("details-close");
const detailsTitle = document.getElementById("details-title");
const detailsPrice = document.getElementById("details-price");
const detailsPhrase = document.getElementById("details-phrase");
const detailsItems = document.getElementById("details-items");
const detailsAllergies = document.getElementById("details-allergies");
const detailsAllergyText = document.getElementById("details-allergy-text");
const detailsWhatsApp = document.getElementById("details-whatsapp");
const detailsAllergyInfo = document.getElementById("details-allergy-info");

function openDetails(id) {
    const c = cestas.find(x => x.id === id);
    if (!c || !detailsModal) return;

    const lang = currentLang;
    const dict = uiTexts[lang];

    const nome = c.nombre[lang] || c.nombre.es;
    const preco = c.precio[lang] || c.precio.es;
    const frase = c.frase[lang] || c.frase.es;
    const itens = c.items[lang] || c.items.es;

    detailsTitle.textContent = nome;
    detailsPrice.textContent = preco;
    detailsPhrase.textContent = frase;

    detailsItems.innerHTML = itens
        .map(i => `<li>${decorateItem(c, i)}</li>`)
        .join("");

    detailsAllergies.innerHTML = "";
    if (c.alergias && c.alergias.length > 0) {
        c.alergias.forEach(a => {
            const badge = document.createElement("span");
            badge.className = "allergy-badge";
            badge.textContent = a;
            detailsAllergies.appendChild(badge);
        });
    }

    detailsAllergyText.style.display = "none";
    detailsAllergyText.textContent = `${dict.allergy_text_prefix} ${c.alergias.join(", ")}.`;

    detailsWhatsApp.onclick = () => {
        const msg = `Hola, me gustaría pedir la cesta “${nome}” (${preco}). ¿Está disponible para entrega?`;
        window.open(`https://wa.me/34640645343?text=${encodeURIComponent(msg)}`, "_blank");
    };

    detailsAllergyInfo.onclick = () => {
        detailsAllergyText.style.display =
            detailsAllergyText.style.display === "none" ? "block" : "none";
    };

    detailsModal.style.display = "flex";
}

if (detailsClose) {
    detailsClose.onclick = () => {
        detailsModal.style.display = "none";
    };
    detailsModal.addEventListener("click", (e) => {
        if (e.target === detailsModal) detailsModal.style.display = "none";
    });
}

// WhatsApp individual (botão direto se quiser usar em outro lugar)
function pedirWhatsApp(nombreEncoded) {
    const nombre = decodeURIComponent(nombreEncoded);
    const msg = `Hola, me gustaría pedir la cesta “${nombre}”. ¿Está disponible para entrega hoy?`;
    window.open(`https://wa.me/34640645343?text=${encodeURIComponent(msg)}`, "_blank");
}
window.pedirWhatsApp = pedirWhatsApp;

// Carrinho
function addToCart(id) {
    const cesta = cestas.find(c => c.id === id);
    if (!c) return;
    cart.push(cesta);
    updateCartCount();
}
window.addToCart = addToCart;

function updateCartCount() {
    const el = document.getElementById("cart-count");
    if (!el) return;
    el.textContent = cart.length;
}

const cartButton = document.getElementById("cart-button");
const cartModal = document.getElementById("cart-modal");
const cartClose = document.getElementById("cart-close");
const cartList = document.getElementById("cart-list");
const cartWhatsApp = document.getElementById("cart-whatsapp");

if (cartButton && cartModal) {
    cartButton.onclick = () => {
        renderCartModal();
        cartModal.style.display = "flex";
    };
}

if (cartClose && cartModal) {
    cartClose.onclick = () => {
        cartModal.style.display = "none";
    };
    cartModal.addEventListener("click", (e) => {
        if (e.target === cartModal) cartModal.style.display = "none";
    });
}

function renderCartModal() {
    if (!cartList) return;
    cartList.innerHTML = "";
    const lang = currentLang;
    const dict = uiTexts[lang];

    if (cart.length === 0) {
        const li = document.createElement("li");
        li.textContent = dict.cart_empty;
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

if (cartWhatsApp) {
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
}

// Scroll helper
function scrollToCatalog() {
    const el = document.getElementById("catalogo");
    if (el) el.scrollIntoView({ behavior: "smooth" });
}
window.scrollToCatalog = scrollToCatalog;

// Navegação Catálogo / Día de la Madre
const navAll = document.getElementById("nav-all");
const navMadre = document.getElementById("nav-madre");

function setView(view) {
    currentView = view;
    if (navAll && navMadre) {
        navAll.classList.toggle("active", view === "all");
        navMadre.classList.toggle("active", view === "madre");
    }
    renderCatalog();
    const el = document.getElementById("catalogo");
    if (el) el.scrollIntoView({ behavior: "smooth" });
}

if (navAll && navMadre) {
    navAll.addEventListener("click", () => setView("all"));
    navMadre.addEventListener("click", () => setView("madre"));
}

// Idioma
const langButtons = document.querySelectorAll(".lang-btn");

function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("mimosyregalos_lang", lang);
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

if (darkToggle) {
    darkToggle.onclick = () => {
        document.body.classList.toggle("dark");
        localStorage.setItem("mimosyregalos_dark", document.body.classList.contains("dark"));
    };
}

/* =========================
   ADMIN
   ========================= */

if (document.body.dataset.page === "admin") {
    const loginBox = document.getElementById("admin-login");
    const panelBox = document.getElementById("admin-panel");
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const loginMsg = document.getElementById("login-msg");

    const selectCesta = document.getElementById("select-cesta");
    const nombreEsInput = document.getElementById("cesta-nombre-es");
    const nombrePtInput = document.getElementById("cesta-nombre-pt");
    const precioEsInput = document.getElementById("cesta-precio-es");
    const precioPtInput = document.getElementById("cesta-precio-pt");
    const fraseEsInput = document.getElementById("cesta-frase-es");
    const frasePtInput = document.getElementById("cesta-frase-pt");
    const imagemInput = document.getElementById("cesta-imagem");
    const fileInput = document.getElementById("cesta-file");
    const itemsEsTextarea = document.getElementById("cesta-items-es");
    const itemsPtTextarea = document.getElementById("cesta-items-pt");
    const alergiasInput = document.getElementById("cesta-alergias");
    const premiumCheckbox = document.getElementById("cesta-premium");
    const categoriaSelect = document.getElementById("cesta-categoria");
    const saveBtn = document.getElementById("save-btn");
    const newBtn = document.getElementById("new-btn");

    let currentId = null;

    if (loginBtn) {
        loginBtn.onclick = () => {
            const phone = document.getElementById("phone").value.trim();
            const dict = uiTexts[currentLang];
            if (allowedPhones.includes(phone)) {
                loginMsg.textContent = "";
                loginBox.style.display = "none";
                panelBox.style.display = "block";
                initEditor();
            } else {
                loginMsg.textContent = dict.login_unauthorized;
            }
        };
    }

    if (logoutBtn) {
        logoutBtn.onclick = () => {
            panelBox.style.display = "none";
            loginBox.style.display = "block";
        };
    }

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

        fileInput.addEventListener("change", () => {
            const file = fileInput.files[0];
            if (!file || !currentId) return;
            const reader = new FileReader();
            reader.onload = e => {
                const idx = cestas.findIndex(x => x.id === currentId);
                if (idx === -1) return;
                cestas[idx].imagem = e.target.result;
                imagemInput.value = "(imagem carregada da galeria)";
                persistCestas();
            };
            reader.readAsDataURL(file);
        });
    }

    function loadCesta(id) {
        const c = cestas.find(x => x.id === id);
        if (!c) return;
        nombreEsInput.value = c.nombre.es || "";
        nombrePtInput.value = c.nombre.pt || "";
        precioEsInput.value = c.precio.es || "";
        precioPtInput.value = c.precio.pt || "";
        fraseEsInput.value = c.frase.es || "";
        frasePtInput.value = c.frase.pt || "";
        imagemInput.value = c.imagem || "";
        itemsEsTextarea.value = (c.items.es || []).join("\n");
        itemsPtTextarea.value = (c.items.pt || []).join("\n");
        alergiasInput.value = (c.alergias || []).join(", ");
        premiumCheckbox.checked = !!c.premium;
        categoriaSelect.value = c.categoria || "general";
        fileInput.value = "";
    }

    function persistCestas() {
        localStorage.setItem("mimosyregalos_cestas_v1", JSON.stringify(cestas));
    }

    function saveCesta() {
        if (!currentId) return;
        const idx = cestas.findIndex(x => x.id === currentId);
        if (idx === -1) return;

        const c = cestas[idx];

        c.nombre.es = nombreEsInput.value.trim() || c.nombre.es;
        c.nombre.pt = nombrePtInput.value.trim() || c.nombre.pt;
        c.precio.es = precioEsInput.value.trim() || c.precio.es;
        c.precio.pt = precioPtInput.value.trim() || c.precio.pt;
        c.frase.es = fraseEsInput.value.trim() || c.frase.es;
        c.frase.pt = frasePtInput.value.trim() || c.frase.pt;

        const url = imagemInput.value.trim();
        if (url && !url.startsWith("(imagem carregada")) {
            c.imagem = url;
        }

        c.items.es = itemsEsTextarea.value
            .split("\n")
            .map(x => x.trim())
            .filter(x => x.length > 0);
        c.items.pt = itemsPtTextarea.value
            .split("\n")
            .map(x => x.trim())
            .filter(x => x.length > 0);

        c.alergias = alergiasInput.value
            .split(",")
            .map(x => x.trim())
            .filter(x => x.length > 0);

        c.premium = premiumCheckbox.checked;
        c.categoria = categoriaSelect.value || "general";

        persistCestas();
        alert("Cesta actualizada. Actualiza la página pública para ver los cambios.");
    }

    function newCesta() {
        const id = "c" + Date.now();
        const nueva = {
            id,
            categoria: "general",
            imagem: "img/default.jpg",
            premium: false,
            alergias: [],
            nombre: {
                es: "Nueva cesta",
                pt: "Nova cesta"
            },
            precio: {
                es: "€0",
                pt: "€0"
            },
            frase: {
                es: "Frase destaque",
                pt: "Frase de destaque"
            },
            items: {
                es: ["Producto 1"],
                pt: ["Produto 1"]
            }
        };
        cestas.push(nueva);
        persistCestas();
        initEditor();
        selectCesta.value = id;
        currentId = id;
        loadCesta(id);
    }
}

/* =========================
   INICIALIZAÇÃO PÚBLICA
   ========================= */

if (document.body.dataset.page === "public") {
    setView("all");
    updateCartCount();
    renderCatalog();
}