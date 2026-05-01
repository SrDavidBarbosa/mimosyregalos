let currentLang = localStorage.getItem("mimos_lang") || "es";
let currentView = "all";
let cart = [];

// Textos UI
const uiTexts = {
  es: {
    sec_catalogo_title: "Cestas de regalo",
    sec_catalogo_subtitle: "Elige la cesta ideal para cumpleaños, aniversarios, sorpresas románticas o un detalle dulce inesperado.",
    madre_headline: "Una sorpresa inolvidable para el Día de la Madre",
    madre_text_1: "Presentación cuidada, productos seleccionados con cariño y una experiencia pensada para emocionar.",
    madre_text_2: "Ideal para entregar en casa, sorprender en el trabajo o acompañar un almuerzo especial.",
    madre_bullet_1: "Edición limitada con detalles exclusivos",
    madre_bullet_2: "Productos valencianos seleccionados",
    madre_bullet_3: "Presentación fotogénica para redes sociales",
    madre_bullet_4: "Mensaje personalizado para la mamá homenajeada",
    cart_title: "Tu selección",
    cart_whatsapp: "Enviar pedido por WhatsApp",
    card_details: "Ver detalles",
    card_cart: "Añadir al carrito",
    allergy_text_prefix: "Esta cesta puede contener:",
    cart_empty: "No hay productos en el carrito.",
    details_whatsapp: "Hacer pedido por WhatsApp"
  },
  pt: {
    sec_catalogo_title: "Cestas de presente",
    sec_catalogo_subtitle: "Escolha a cesta ideal para aniversários, surpresas românticas ou um mimo doce inesperado.",
    madre_headline: "Uma surpresa inesquecível para o Dia das Mães",
    madre_text_1: "Apresentação cuidadosa, produtos selecionados com carinho e uma experiência pensada para emocionar.",
    madre_text_2: "Ideal para entregar em casa, surpreender no trabalho ou acompanhar um almoço especial.",
    madre_bullet_1: "Edição limitada com detalhes exclusivos",
    madre_bullet_2: "Produtos valencianos selecionados",
    madre_bullet_3: "Apresentação fotogênica para redes sociais",
    madre_bullet_4: "Mensagem personalizada para a mãe homenageada",
    cart_title: "Sua seleção",
    cart_whatsapp: "Enviar pedido pelo WhatsApp",
    card_details: "Ver detalhes",
    card_cart: "Adicionar ao carrinho",
    allergy_text_prefix: "Esta cesta pode conter:",
    cart_empty: "Não há produtos no carrinho.",
    details_whatsapp: "Fazer pedido pelo WhatsApp"
  }
};

// 10 CESTAS
const cestas = [
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
      es: ["Chocolate simple", "Galletas", "Caramelos", "Zumo pequeño", "Mini Nutella", "Tarjeta personalizada"],
      pt: ["Chocolate simples", "Biscoitos", "Balas", "Suco pequeno", "Mini Nutella", "Cartão personalizado"]
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
      es: ["Chocolates variados", "Cookies artesanales", "Caramelos", "Mini pastel", "Zumo", "Tarjeta"],
      pt: ["Chocolates variados", "Cookies artesanais", "Balas", "Mini bolo", "Suco", "Cartão"]
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
      es: ["Ferrero Rocher", "Raffaello", "Peluche premium", "Rosa decorativa", "Vela aromática", "Chocolate gourmet", "Tarjeta"],
      pt: ["Ferrero Rocher", "Raffaello", "Pelúcia premium", "Rosa decorativa", "Vela aromática", "Chocolate gourmet", "Cartão"]
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
      es: ["Café", "Té", "Croissants", "Mermeladas mini", "Mini Nutella", "Zumo", "Frutas", "Galletas"],
      pt: ["Café", "Chá", "Croissants", "Geleias mini", "Mini Nutella", "Suco", "Frutas", "Biscoitos"]
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
      es: ["Tabletas de chocolate", "Bombones surtidos", "Chocolate caliente", "Galletas de cacao", "Barritas rellenas"],
      pt: ["Tabletes de chocolate", "Bombons sortidos", "Chocolate quente", "Biscoitos de cacau", "Barrinhas recheadas"]
    }
  },
  {
    id: "gourmet",
    categoria: "general",
    imagem: "img/cesta-gourmet.jpg",
    premium: true,
    alergias: ["gluten", "frutos secos"],
    nombre: { es: "Cesta Gourmet Mediterránea", pt: "Cesta Gourmet Mediterrânea" },
    precio: { es: "€55–€80", pt: "€55–€80" },
    frase: {
      es: "Sabores mediterráneos para paladares exigentes.",
      pt: "Sabores mediterrâneos para paladares exigentes."
    },
    items: {
      es: ["Aceite de oliva virgen extra", "Queso curado", "Embutidos selectos", "Panecillos gourmet", "Aceitunas", "Paté"],
      pt: ["Azeite de oliva extra virgem", "Queijo curado", "Embutidos selecionados", "Pãezinhos gourmet", "Azeitonas", "Patê"]
    }
  },
  {
    id: "relax",
    categoria: "general",
    imagem: "img/cesta-relax.jpg",
    premium: false,
    alergias: [],
    nombre: { es: "Cesta Relax & Spa", pt: "Cesta Relax & Spa" },
    precio: { es: "€35–€50", pt: "€35–€50" },
    frase: {
      es: "Un momento de calma en forma de regalo.",
      pt: "Um momento de calma em forma de presente."
    },
    items: {
      es: ["Vela aromática", "Sales de baño", "Mascarilla facial", "Infusiones relajantes", "Esponja suave"],
      pt: ["Vela aromática", "Sais de banho", "Máscara facial", "Infusões relaxantes", "Esponja macia"]
    }
  },
  {
    id: "cumple",
    categoria: "general",
    imagem: "img/cesta-cumple.jpg",
    premium: false,
    alergias: ["gluten", "lactosa"],
    nombre: { es: "Cesta Cumpleaños Feliz", pt: "Cesta Aniversário Feliz" },
    precio: { es: "€30–€45", pt: "€30–€45" },
    frase: {
      es: "Todo lo necesario para celebrar con dulzura.",
      pt: "Tudo o que precisa para celebrar com doçura."
    },
    items: {
      es: ["Mini tarta", "Velas de cumpleaños", "Chocolates", "Caramelos", "Confeti", "Tarjeta de felicitación"],
      pt: ["Mini bolo", "Velas de aniversário", "Chocolates", "Balas", "Confete", "Cartão de felicitações"]
    }
  },
  {
    id: "pareja",
    categoria: "general",
    imagem: "img/cesta-pareja.jpg",
    premium: true,
    alergias: ["lactosa"],
    nombre: { es: "Cesta Pareja & Brindis", pt: "Cesta Casal & Brinde" },
    precio: { es: "€48–€70", pt: "€48–€70" },
    frase: {
      es: "Para brindar juntos en una ocasión especial.",
      pt: "Para brindar juntos em uma ocasião especial."
    },
    items: {
      es: ["Botella de cava o vino", "Chocolates finos", "Snacks salados", "Copas decorativas", "Tarjeta romántica"],
      pt: ["Garrafa de espumante ou vinho", "Chocolates finos", "Snacks salgados", "Taças decorativas", "Cartão romântico"]
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

// Aplica textos de interface
function applyTexts() {
  const dict = uiTexts[currentLang];
  document.querySelectorAll("[data-key]").forEach(el => {
    const key = el.getAttribute("data-key");
    if (dict[key]) el.textContent = dict[key];
  });

  // Botão de detalhes do modal também precisa seguir o idioma
  const detailsBtn = document.getElementById("details-whatsapp");
  if (detailsBtn) {
    detailsBtn.textContent = uiTexts[currentLang].details_whatsapp;
  }
}

// Render catálogo
function renderCatalog() {
  const container = document.getElementById("cards");
  const madreExtra = document.getElementById("madre-extra");
  if (!container) return;

  applyTexts();
  container.innerHTML = "";

  let list;
  if (currentView === "madre") {
    list = cestas.filter(c => c.categoria === "madre");
    if (madreExtra) madreExtra.style.display = "block";
  } else {
    list = cestas.filter(c => c.categoria === "general");
    if (madreExtra) madreExtra.style.display = "none";
  }

  const dict = uiTexts[currentLang];

  list.forEach(c => {
    const nome = c.nombre[currentLang];
    const frase = c.frase[currentLang];
    const preco = c.precio[currentLang];

    const card = document.createElement("div");
    card.className = "card";
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

// Detalhes
function openDetails(id) {
  const cesta = cestas.find(c => c.id === id);
  if (!cesta) return;

  const lang = currentLang;
  const dict = uiTexts[lang];

  const modal = document.getElementById("details-modal");
  const title = document.getElementById("details-title");
  const price = document.getElementById("details-price");
  const phrase = document.getElementById("details-phrase");
  const itemsList = document.getElementById("details-items");
  const allergyText = document.getElementById("details-allergy-text");
  const allergiesWrap = document.getElementById("details-allergies");
  const detailsBtn = document.getElementById("details-whatsapp");

  title.textContent = cesta.nombre[lang];
  price.textContent = cesta.precio[lang];
  phrase.textContent = cesta.frase[lang];

  itemsList.innerHTML = "";
  cesta.items[lang].forEach(i => {
    const li = document.createElement("li");
    li.textContent = cesta.premium ? `✨ ${i}` : i;
    itemsList.appendChild(li);
  });

  allergyText.textContent = dict.allergy_text_prefix;
  allergiesWrap.innerHTML = "";
  cesta.alergias.forEach(a => {
    const span = document.createElement("span");
    span.className = "allergy-badge";
    span.textContent = a;
    allergiesWrap.appendChild(span);
  });

  detailsBtn.textContent = dict.details_whatsapp;

  modal.style.display = "flex";

  document.getElementById("details-close").onclick = () => {
    modal.style.display = "none";
  };
  modal.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
  };

  detailsBtn.onclick = () => {
    const baseMsg =
      lang === "es"
        ? `Hola! Me gustaría saber más sobre la cesta: ${cesta.nombre[lang]}.`
        : `Olá! Gostaria de saber mais sobre a cesta: ${cesta.nombre[lang]}.`;
    const msg = encodeURIComponent(baseMsg);
    window.open(`https://wa.me/34640645343?text=${msg}`, "_blank");
  };
}

// Carrinho
function addToCart(id) {
  cart.push(id);
  document.getElementById("cart-count").textContent = cart.length;
}

function setupCartModal() {
  const cartBtn = document.getElementById("cart-button");
  const cartModal = document.getElementById("cart-modal");
  const cartClose = document.getElementById("cart-close");
  const cartList = document.getElementById("cart-list");

  cartBtn.onclick = () => {
    const dict = uiTexts[currentLang];
    cartList.innerHTML = "";
    if (cart.length === 0) {
      const li = document.createElement("li");
      li.textContent = dict.cart_empty;
      cartList.appendChild(li);
    } else {
      cart.forEach(id => {
        const cesta = cestas.find(c => c.id === id);
        const li = document.createElement("li");
        li.textContent = cesta ? cesta.nombre[currentLang] : id;
        cartList.appendChild(li);
      });
    }
    applyTexts();
    cartModal.style.display = "flex";
  };

  cartClose.onclick = () => cartModal.style.display = "none";
  cartModal.onclick = (e) => {
    if (e.target === cartModal) cartModal.style.display = "none";
  };

  document.getElementById("cart-whatsapp").onclick = () => {
    if (cart.length === 0) return;
    const dict = uiTexts[currentLang];
    const nomes = cart.map(id => {
      const c = cestas.find(x => x.id === id);
      return c ? c.nombre[currentLang] : id;
    });
    const baseMsg =
      currentLang === "es"
        ? `Hola! Me gustaría hacer un pedido de las siguientes cestas:\n- ${nomes.join("\n- ")}`
        : `Olá! Gostaria de fazer um pedido das seguintes cestas:\n- ${nomes.join("\n- ")}`;
    const msg = encodeURIComponent(baseMsg);
    window.open(`https://wa.me/34640645343?text=${msg}`, "_blank");
  };
}

// Navegação
function setupNav() {
  const navAll = document.getElementById("nav-all");
  const navMadre = document.getElementById("nav-madre");

  navAll.onclick = () => {
    currentView = "all";
    navAll.classList.add("active");
    navMadre.classList.remove("active");
    renderCatalog();
  };

  navMadre.onclick = () => {
    currentView = "madre";
    navMadre.classList.add("active");
    navAll.classList.remove("active");
    renderCatalog();
  };
}

// Idioma
function setupLang() {
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      currentLang = btn.dataset.lang;
      localStorage.setItem("mimos_lang", currentLang);
      renderCatalog();
    });
  });
}

// Dark mode
function setupDarkMode() {
  const toggle = document.getElementById("dark-toggle");
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  setupNav();
  setupLang();
  setupCartModal();
  setupDarkMode();
  renderCatalog();
});