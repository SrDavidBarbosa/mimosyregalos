/* ============================================================
   SISTEMA DE CESTAS – MIMOS Y REGALOS
   Catálogo público + Carrinho + Popups + Idiomas + Dark Mode
   Painel interno /admin com edição e criação de cestas
   Persistência via localStorage
   ============================================================ */

/* ============================================================
   TELEFONES AUTORIZADOS PARA /admin
   ============================================================ */
const allowedPhones = ["640645343", "627945426", "610712400", "640645370"];

/* ============================================================
   ESTADO GLOBAL
   ============================================================ */
let currentLang = localStorage.getItem("mimosyregalos_lang") || "es";
let currentView = "all"; // all | madre
let cart = [];

/* ============================================================
   BASE DE CESTAS (ES + PT-BR)
   ============================================================ */
let cestas = [
    {
        id: "dulce-detalle",
        categoria: "general",
        imagem: "img/cesta-dulce.jpg",
        premium: false,
        alergias: ["gluten", "lactosa"],
        nombre: { es: "Cesta Dulce Detalle", pt: "Cesta Doce Detalhe" },
        precio: { es: "€22–€28", pt: "€22–€28" },
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
        nombre: { es: "Cesta Felicidad", pt: "Cesta Felicidade" },
        precio: { es: "€26–€32", pt: "€26–€32" },
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
        nombre: { es: "Cesta Cumpleaños", pt: "Cesta Aniversário" },
        precio: { es: "€28–€35", pt: "€28–€35" },
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
        nombre: { es: "Cesta Romance", pt: "Cesta Romance" },
        precio: { es: "€38–€55", pt: "€38–€55" },
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
        nombre: { es: "Cesta Dulce & Tierna", pt: "Cesta Doce & Fofa" },
        precio: { es: "€40–€55", pt: "€40–€55" },
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
        nombre: { es: "Cesta Desayuno", pt: "Cesta Café da Manhã" },
        precio: { es: "€40–€55", pt: "€40–€55" },
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
        nombre: { es: "Cesta Amantes del Chocolate", pt: "Cesta Amantes de Chocolate" },
        precio: { es: "€45–€60", pt: "€45–€60" },
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
        nombre: { es: "Cesta Gourmet Ibérica", pt: "Cesta Gourmet Ibérica" },
        precio: { es: "€60–€85", pt: "€60–€85" },
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
        precio: { es: "€55–€85", pt: "€55–€85" },
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

/* ============================================================
   CARREGAR CESTAS DO LOCALSTORAGE
   ============================================================ */
const saved = localStorage.getItem("mimosyregalos_cestas_v1");
if (saved) {
    try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) cestas = parsed;
    } catch (e) {}
}

/* ============================================================
   TRADUÇÕES DE INTERFACE
   ============================================================ */
const uiTexts = {
    es: {
        hero_subtitle: "Cestas de regalo premium en Valencia, pensadas para sorprender con detalles dulces, románticas y gourmet.",
        hero_cta: "Ver cestas disponibles",
        sec_catalogo_title: "Cestas de regalo",
        sec_catalogo_subtitle: "Elige la cesta ideal para cumpleaños, aniversarios, sorpresas románticas o un detalle dulce inesperado.",
        madre_headline: "Una sorpresa inolvidable para el Día de la Madre",
        madre_text_1: "Presentación cuidada, productos seleccionados con cariño...",
        madre_text_2: "Ideal para entregar en casa...",
        madre_bullet_1: "Edición limitada",
        madre_bullet_2: "Productos valencianos",
        madre_bullet_3: "Presentación fotogénica",
        madre_bullet_4: "Mensaje personalizado",
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
        madre_text_1: "Apresentação cuidadosa, produtos selecionados com carinho...",
        madre_text_2: "Ideal para entregar em casa...",
        madre_bullet_1: "Edição limitada",
        madre_bullet_2: "Produtos valencianos",
        madre_bullet_3: "Apresentação fotogênica",
        madre_bullet_4: "Mensagem personalizada",
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

/* ============================================================
   FUNÇÃO PARA EMOJIS EM CESTAS PREMIUM
   ============================================================ */
function decorateItem(cesta, item) {
    if (!cesta.premium) return item;
    const emojis = ["✨", "🎁", "💝", "🍫", "🌸", "🥂"];
    return `${emojis[Math.floor(Math.random() * emojis.length)]} ${item}`;
}

/* ============================================================
   RENDERIZAÇÃO DO CATÁLOGO
   ============================================================ */
function renderCatalog() {
    const container = document.getElementById("cards");
    if (!container) return;

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
        madreExtra.style.display = "block";
    } else {
        list = cestas.filter(c => c.categoria === "general");
        madreExtra.style.display = "none";
    }

    list.forEach((c) => {
        const card = document.createElement("div");
        card.className = "card";

        const nome = c.nombre[lang];
        const frase = c.frase[lang];
        const preco = c.precio[lang];

        card.innerHTML = `
            <div class="card-inner" data-id="${c.id}">
                <div class="card-face card-front">
                    <div class="card-img-wrapper">
                        <img src="${c.imagem}" class="card-img" alt="${nome}">
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

        inner.addEventListener("mouseenter", () => inner.classList.add("flipped"));
        inner.addEventListener("mouseleave", () => inner.classList.remove("flipped"));

        inner.addEventListener("click", (e) => {
            const action = e.target.getAttribute("data-action");
            if (action === "details") return openDetails(c.id);
            if (action === "cart") return addToCart(c.id);
            inner.classList.toggle("flipped");
        });

        container.appendChild(card);
    });
}

/* ============================================================
   POPUP DE DETALHES
   ============================================================ */
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