// -----------------------------
// VARIABLES DE BASE
// -----------------------------
let bank = 0;                 
let coffeePerClick = 1;       
let coffeePerSecond = 0;      

const bankDisplay = document.querySelector(".bank_user");
const cpsDisplay = document.querySelector(".unity_per_second");

// Sélecteurs des générateurs
const generatorArea = document.querySelector(".upgrade_generator"); // zone principale
const inventoryArea = document.querySelectorAll(".upgrade_generator")[1]; // inventaire

const lockedGenerator = document.querySelector(".one_generator_upgrade_locked");
const greyGenerators = document.querySelectorAll(".one_generator_upgrade_grey");
const activeGenerators = document.querySelectorAll(".one_generator_upgrade");

// -----------------------------
// FONCTION D’AFFICHAGE
// -----------------------------
function updateUI() {
    bankDisplay.textContent = bank + " cafés";
    cpsDisplay.textContent = coffeePerSecond + " café par seconde";

    // Gestion des paliers des générateurs
    handleGenerators();
}

// -----------------------------
// ANIMATION DE CLIC
// -----------------------------
const centralBloc = document.querySelector(".central_blocs");
centralBloc.addEventListener("click", () => {
    bank += coffeePerClick;
    updateUI();

    // Animation de "pop"
    centralBloc.classList.add("clicked");
    setTimeout(() => centralBloc.classList.remove("clicked"), 150);
});

// -----------------------------
// GÉRER LES GENERATEURS SELON LES PALIERS
// -----------------------------
function handleGenerators() {
    // 1️⃣ Passage du bloc locked -> grey au palier 50 cafés
    if (bank >= 50 && lockedGenerator) {
        lockedGenerator.classList.replace("one_generator_upgrade_locked", "one_generator_upgrade_grey");
    }

    // 2️⃣ Activation des grey blocks au palier d’achat
    greyGenerators.forEach(gen => {
        const costText = gen.querySelector(".cost_one_generator_upgrade").textContent;
        const cost = parseInt(costText.replace(/[^\d]/g, ""));

        if (bank >= cost && !gen.classList.contains("purchasable")) {
            gen.classList.add("purchasable");
        }
    });
}

// -----------------------------
// ACHAT DES GENERATEURS
// -----------------------------
function buyGenerator(gen) {
    const costText = gen.querySelector(".cost_one_generator_upgrade").textContent;
    const cost = parseInt(costText.replace(/[^\d]/g, ""));

    if (bank >= cost) {
        bank -= cost;

        // Augmente café par seconde
        const bonus = parseInt(gen.querySelector(".hover_upgrade_info, .hover_upgrade_info_reversed").textContent.replace(/\D+/g, ""));
        coffeePerSecond += bonus || 0;

        // Déplacer dans l’inventaire
        const clone = gen.cloneNode(true);
        inventoryArea.appendChild(clone);
        gen.remove();

        updateUI();

        // Gestion du clic sur le clone dans l’inventaire (pas d’achat supplémentaire)
        clone.addEventListener("click", () => console.log("Déjà acheté !"));
    }
}

// Événement sur tous les générateurs grey
document.addEventListener("click", e => {
    if (e.target.closest(".one_generator_upgrade_grey") && e.target.closest(".purchasable")) {
        buyGenerator(e.target.closest(".one_generator_upgrade_grey"));
    }
});

// -----------------------------
// PRODUCTION AUTOMATIQUE
// -----------------------------
setInterval(() => {
    bank += coffeePerSecond;
    updateUI();
}, 1000);

// -----------------------------
// INITIALISATION
// -----------------------------
updateUI();


function createCoffeeBubble(e) {
    const bubble = document.createElement("img");
    bubble.src = "images/+1.png"; // ton image
    bubble.classList.add("coffee-bubble");

    // Calcul de la position relative au bloc
    const rect = centralBloc.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    bubble.style.left = x + "px";
    bubble.style.top = y + "px";

    centralBloc.appendChild(bubble);

    setTimeout(() => bubble.remove(), 1000);
}

// On remplace l'ancien event listener
centralBloc.addEventListener("click", (e) => {
    bank += coffeePerClick;
    updateUI();

    // Pop animation
    centralBloc.classList.add("clicked");
    setTimeout(() => centralBloc.classList.remove("clicked"), 150);

    // Crée la bulle au clic
    createCoffeeBubble(e);
});
