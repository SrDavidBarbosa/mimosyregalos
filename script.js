// Telefones autorizados
const allowedPhones = ["640645343", "627945426", "610712400", "640645370"];

// Cestas (pode editar no painel)
let cestas = [
    {
        id: "dulce",
        nombre: "Cesta Dulce Detalle",
        precio: "€22–€28",
        items: ["Chocolate", "Galletas", "Caramelos"]
    }
];

// Renderizar catálogo
function renderCatalog() {
    const container = document.getElementById("cards");
    container.innerHTML = "";

    cestas.forEach(c => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${c.nombre}</h3>
            <p>${c.precio}</p>
            <ul>${c.items.map(i => `<li>${i}</li>`).join("")}</ul>
            <button onclick="pedirWhatsApp('${c.nombre}')">Pedir por WhatsApp</button>
        `;

        container.appendChild(card);
    });
}

renderCatalog();

// WhatsApp
function pedirWhatsApp(nombre) {
    const msg = `Hola, me gustaría pedir la cesta “${nombre}”. ¿Está disponible para entrega hoy?`;
    window.open(`https://wa.me/34640645343?text=${encodeURIComponent(msg)}`);
}

// Login
document.getElementById("login-btn").onclick = () => {
    const phone = document.getElementById("phone").value.trim();

    if (allowedPhones.includes(phone)) {
        document.getElementById("login-box").style.display = "none";
        document.getElementById("editor").style.display = "block";
        loadEditor();
    } else {
        document.getElementById("login-msg").textContent = "Número no autorizado.";
    }
};

// Editor
function loadEditor() {
    const select = document.getElementById("select-cesta");
    select.innerHTML = "";

    cestas.forEach(c => {
        const opt = document.createElement("option");
        opt.value = c.id;
        opt.textContent = c.nombre;
        select.appendChild(opt);
    });

    select.onchange = () => loadFields(select.value);
    loadFields(select.value);

    document.getElementById("save-btn").onclick = saveCesta;
    document.getElementById("new-btn").onclick = newCesta;
}

function loadFields(id) {
    const c = cestas.find(x => x.id === id);
    document.getElementById("cesta-nombre").value = c.nombre;
    document.getElementById("cesta-precio").value = c.precio;
    document.getElementById("cesta-items").value = c.items.join("\n");
}

function saveCesta() {
    const id = document.getElementById("select-cesta").value;
    const c = cestas.find(x => x.id === id);

    c.nombre = document.getElementById("cesta-nombre").value;
    c.precio = document.getElementById("cesta-precio").value;
    c.items = document.getElementById("cesta-items").value.split("\n");

    renderCatalog();
    alert("Cesta actualizada.");
}

function newCesta() {
    const id = "c" + Date.now();
    cestas.push({
        id,
        nombre: "Nueva cesta",
        precio: "€0",
        items: ["Item 1"]
    });

    renderCatalog();
    loadEditor();
}
