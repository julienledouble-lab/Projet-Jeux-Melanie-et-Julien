document.addEventListener("DOMContentLoaded", () => {
  
  let playerScore = 0;
  const basicGainPerClick = 1;
  let bonusGainPerClick = 0;
  let totalClickperSecond = 0;

  const countDisplay = document.querySelector(".total_output");
  const perSecondDisplay = document.querySelector(".unity_per_second");
  const clickZone = document.querySelector(".clic_zone");
  const addCoffeeFx = document.querySelector(".add_coffee");
  
  // variable musique
  const soundButton = document.querySelector(".home:nth-child(2)");
  const soundIcon = document.querySelector(".picturesound");
  let isMusicPlaying = false;
  
  // pour la musique de fond
  const backgroundMusic = new Audio('sounds/Kevin MacLeod Monkeys Spinning Monkeys.mp3');
  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.3;

  // bloc niveau 2
  const nextLevelDiv = document.querySelector(".next_level");
  const nextLevelText = document.querySelector(".inside_next_level");

  /* Classe Upgrade */
  class Upgrades {
    constructor(
      name,
      basicPrice,
      output,
      isClick,
      unlockUpgradeMinimum,
      owned = 0,
      src_blackImage,
      src_grayImage,
      src_coloredImage,
      lockedTitle,
      greyTitle,
      information,
      textblocked,
      unlocked = false,
      
    ) {
      this.name = name;
      this.basicPrice = basicPrice;
      this.output = output;
      this.isClick = isClick;
      this.unlockUpgradeMinimum = unlockUpgradeMinimum;
      this.owned = owned;
      this.src_blackImage = src_blackImage;
      this.src_grayImage = src_grayImage;
      this.src_coloredImage = src_coloredImage;
      this.lockedTitle = lockedTitle;
      this.greyTitle = greyTitle;
      this.information = information;  
      this.textblocked = textblocked;
      this.unlocked = unlocked;   
    }
    get updatedPriceAfterPurchase() {
      return Math.floor(this.basicPrice * Math.pow(1.08, this.owned));
    }
  }

  /* Liste des upgrades */

const ListOfUpgrades = [
    new Upgrades(
      "Café corsé",
      10,
      1,
      true,
      5,
      0,
      "images/Améliorations/niveau 1/upgrade 1 black.png",
      "images/Améliorations/niveau 1/upgrade 1 grey.png",
      "images/Améliorations/niveau 1/upgrade 1.png",
      "???",
      "Le café corsé :\nCoût : $updatedPriceAfterPurchase cafés",
      "Le café corsé :\nPlus corsé, plus rentable :\n+1 café par clic !\nCoût : $updatedPriceAfterPurchase cafés",
      "",
      false
      
    ),
    new Upgrades(
      "Tasse isotherme",
      40,
      3,
      true,
      30,
      0,
      "images/Améliorations/niveau 1/upgrade 2 black.png",
      "images/Améliorations/niveau 1/upgrade 2 grey.png",
      "images/Améliorations/niveau 1/upgrade 2.png",
      "???",
      "Mug Isotherme :\nCoût : $updatedPriceAfterPurchase cafés",
      "Mug Isotherne :\nNouvelle tasse, nouveau rendement :\n+3 cafés par clic !\nCoût : $updatedPriceAfterPurchase cafés",
      "",
      false
      

    ),
    new Upgrades(
      "Machine à café réglée",
      200,
      1,
      false,
      150,
      0,
      "images/Améliorations/niveau 1/amelioration 1 black.png",
      "images/Améliorations/niveau 1/amelioration 1 grey.png",
      "images/Améliorations/niveau 1/amelioration 1.png",
      "???",
      "Machine réglée :\nCoût : $updatedPriceAfterPurchase cafés",
      "Machine réglée :\nLa machine ronronne \n+1 café par seconde !",
      "???",
      false
    ),
    new Upgrades("Filtre neuf", 
        500, 
        5, 
        false, 
        250,
        0,
        "images/Améliorations/niveau 1/amelioration_2 black.png",
        "images/Améliorations/niveau 1/amelioration 2 grey.png",
        "images/Améliorations/niveau 1/amelioration 2.png",
        "???",
        "Filtre neuf :\nCoût : $updatedPriceAfterPurchase cafés",
        "Filtre neuf :\nTon filtre neuf te respecte\n+5 cafés par seconde !",
        "???",
        false
    ),
    new Upgrades("Mug XXL", 
        1200, 
        10, 
        true, 
        700,
        0,
        "images/Améliorations/niveau 1/upgrade 3 black.png",
        "images/Améliorations/niveau 1/upgrade 3 grey.png",
        "images/Améliorations/niveau 1/upgrade 3.png",
        "???",
        "Tasse Isotherme :\nCoût : $updatedPriceAfterPurchase cafés",
        "Tasse Isotherme :\nFormat XXL : gros gains !\nCoût : $updatedPriceAfterPurchase cafés",
        "???",
        false
    ),
    new Upgrades("Bec verseur turbo", 
        3000, 
        10, 
        false, 
        2200,
        0,
        "images/Améliorations/niveau 1/amelioration 3 black.png",
        "images/Améliorations/niveau 1/amelioration 3 grey.png",
        "images/Améliorations/niveau 1/amelioration 3.png",
        "???",
        "Bec verseur turbo:\nCoût : $updatedPriceAfterPurchase cafés",
        "Bec verseur turbo:\nProduction sous stéroïdes :\n+ 10 cafés par seconde !"
    ),
    new Upgrades("Mélange Premium", 
        10000, 
        20, 
        true, 
        6000,
        0,
        "images/Améliorations/niveau 1/upgrade 4 black.png",
        "images/Améliorations/niveau 1/upgrade 4 grey.png",
        "images/Améliorations/niveau 1/upgrade 4.png",
        "???",
        "Mélange premium\nCoût: $updatedPriceAfterPurchase cafés",     
        "Mélange premium\nPure folie aromatique :\n+20 cafés par clic !\nCoût : $updatedPriceAfterPurchase cafés"
    ),
    new Upgrades("Machine à café 2.0", 
        33000, 
        25, 
        false, 
        15000,
        0,
        "images/Améliorations/niveau 1/amelioration 4 black.png",
        "images/Améliorations/niveau 1/amelioration 4 grey.png",
        "images/Améliorations/niveau 1/amelioration.png",
        "???",
        "Cafetière 2.0:\nCoût : $updatedPriceAfterPurchase cafés",
        "Cafetière 2.0\nVersion 2.0\n+ 25 cafés par seconde !"
    ),
    new Upgrades("Robot-Barista", 
        80000, 
        50, 
        false, 
        55000,
        0,
        "images/Améliorations/niveau 1/amelioration 5 black.png",
        "images/Améliorations/niveau 1/amelioration 5 grey.png",
        "images/Améliorations/niveau 1/amelioration 5.png",
        "???",
        "Robot-Barista\nCoût : $updatedPriceAfterPurchase cafés",
        "Robot-Barista\nLe robot prend le relais !\n+50 cafés par seconde !"
    ),
  ];

  /* fonction son avec bouton */
  soundButton.addEventListener("click", () => {
    if (isMusicPlaying) {
      backgroundMusic.pause();
      soundIcon.src = "images/sound off.png";
      isMusicPlaying = false;
    } else {
      backgroundMusic.play();
      soundIcon.src = "images/sound on.png";
      isMusicPlaying = true;
    }
  });

  /* bloc niveau 2 */
  function updateNextLevel() {
    if (playerScore >= 120000) {
      nextLevelDiv.style.filter = "none";
      nextLevelDiv.style.cursor = "pointer";
      nextLevelDiv.style.opacity = "1";
      nextLevelText.textContent = "Passer au niveau 2";
      
      // ajouter clic seulement une fois
      if (!nextLevelDiv.classList.contains("clickable")) {
        nextLevelDiv.classList.add("clickable");
        nextLevelDiv.addEventListener("click", () => {
          alert("Passage au niveau 2 !");
          
        });
      }
    } else if (playerScore >= 100000) {
      
      nextLevelDiv.style.filter = "grayscale(100%)";
      nextLevelDiv.style.cursor = "not-allowed";
      nextLevelDiv.style.opacity = "0.7";
      nextLevelText.textContent = "Bientôt disponible...";
    } else {
      nextLevelDiv.style.filter = "grayscale(100%)";
      nextLevelDiv.style.cursor = "default";
      nextLevelDiv.style.opacity = "0.3";
      nextLevelText.textContent = "???";
    }
  }

  /* etats upgrade gauche) */
  function renderUpgrades() {
    const clickContainer = document.querySelector(".upgrade_by_clic");
    const generatorContainer = document.querySelector(".upgrade_generator");
    

    if (!clickContainer || !generatorContainer) {
      console.error("Conteneurs d'upgrades (gauche) introuvables.");
      return;
    }
    
    

    ListOfUpgrades.forEach((upgrade) => {
      /* débloqué si palier atteint */
      if (playerScore >= upgrade.unlockUpgradeMinimum) {
        upgrade.unlocked = true;
      }
      
      /* Ne pas afficher si débloqué */
      if (!upgrade.unlocked) {
        return;
      }

      let wrapper = document.querySelector(`.upgrade-wrapper[data-name="${upgrade.name}"]`);
      if (wrapper) return; 

      const container = upgrade.isClick ? clickContainer : generatorContainer;

      wrapper = document.createElement("div");
      wrapper.className = "upgrade-wrapper";
      wrapper.setAttribute("data-name", upgrade.name);

      if (!upgrade.isClick) {
        wrapper.classList.add("generator-wrapper"); 
      }



      if (container.classList.contains("upgrade_generator")) {
        wrapper.classList.add("one_generator_upgrade");
      }

      const label = document.createElement("div");
      label.className = "upgrade-label";
      label.textContent = `${upgrade.name} – prix: ${upgrade.updatedPriceAfterPurchase}`;

      const lockedDiv = document.createElement("div");
      lockedDiv.className = "upgrade locked";
      lockedDiv.setAttribute("data-name", upgrade.name);
      lockedDiv.style.display = "block";
      lockedDiv.title = upgrade.lockedTitle;
      lockedDiv.style.backgroundImage = "url('images/Améliorations/panneau fond.png')";

      if (upgrade.isClick) {
        /*Pour les upgrades de clic : juste l'image */
        lockedDiv.innerHTML = `<img src="${upgrade.src_blackImage}" alt="${upgrade.name} locked" style="width:80px;height:auto;">`;
      } else {
        /*  Pour les upgrades générateurs */
        lockedDiv.style.display = "flex";
        lockedDiv.style.alignItems = "center";
        lockedDiv.style.justifyContent = "space-between";
        lockedDiv.style.gap = "10px";
        lockedDiv.style.padding = "0 20px";
        
        const imgLocked = document.createElement("img");
        imgLocked.src = upgrade.src_blackImage;
        imgLocked.alt = upgrade.name + " locked";
        imgLocked.style.width = "90px";
        imgLocked.style.height = "auto";
        
        const textBlock = document.createElement("div");
        textBlock.style.display = "flex";
        textBlock.style.flexDirection = "column";
        textBlock.style.justifyContent = "center";
        textBlock.style.alignItems = "center";
        textBlock.style.flex = "1";
        
        const nameDiv = document.createElement("div");
        nameDiv.className = "textblocked";
        nameDiv.textContent = upgrade.name;
        
        const costDiv = document.createElement("p");
        costDiv.className = "cost_one_generator_upgrade";
        costDiv.textContent = `Coût : ${upgrade.updatedPriceAfterPurchase} cafés`;
        
        textBlock.appendChild(nameDiv);
        textBlock.appendChild(costDiv);
        lockedDiv.appendChild(imgLocked);
        lockedDiv.appendChild(textBlock);
      }

      const greyDiv = document.createElement("div");
      greyDiv.className = "upgrade grey";
      greyDiv.setAttribute("data-name", upgrade.name);
      greyDiv.style.display = "none";
      greyDiv.title = upgrade.greyTitle;

      if (upgrade.isClick) {
        /* Pour upgrades par clic*/
        greyDiv.innerHTML = `<img src="${upgrade.src_grayImage}" alt="${upgrade.name} grey" style="width:80px;height:auto;">`;
      } else {
        /*Pour les générateurs*/
        greyDiv.style.display = "none";
        greyDiv.style.alignItems = "center";
        greyDiv.style.justifyContent = "space-between";
        greyDiv.style.gap = "10px";
        greyDiv.style.filter = "grayscale(100%)";
        greyDiv.style.padding = "0 20px";
        
        const imgGrey = document.createElement("img");
        imgGrey.src = upgrade.src_grayImage;
        imgGrey.alt = upgrade.name + " grey";
        imgGrey.style.width = "90px"; 
        imgGrey.style.height = "auto";
        
        const textBlock = document.createElement("div");
        textBlock.style.display = "flex";
        textBlock.style.flexDirection = "column";
        textBlock.style.justifyContent = "center";
        textBlock.style.alignItems = "center";
        textBlock.style.flex = "1";
        
        const nameDiv = document.createElement("div");
        nameDiv.className = "textblocked";
        nameDiv.textContent = upgrade.name;
        
        const costDiv = document.createElement("p");
        costDiv.className = "cost_one_generator_upgrade";
        costDiv.textContent = `Coût : ${upgrade.updatedPriceAfterPurchase} cafés`;
        
        textBlock.appendChild(nameDiv);
        textBlock.appendChild(costDiv);
        greyDiv.appendChild(imgGrey);
        greyDiv.appendChild(textBlock);
      }

      const coloredDiv = document.createElement("div");
      coloredDiv.className = "upgrade colored";
      coloredDiv.setAttribute("data-name", upgrade.name);
      coloredDiv.style.display = "none";
      coloredDiv.style.cursor = "pointer";
      coloredDiv.title = upgrade.information.replace("$updatedPriceAfterPurchase", upgrade.updatedPriceAfterPurchase);

      if (upgrade.isClick) {
        /* Pour les upgrades au clic */
        coloredDiv.innerHTML = `<img src="${upgrade.src_coloredImage}" alt="${upgrade.name} colored" style="width:80px;height:auto;">`;
      } else {
        /* Pour les générateurs */
        coloredDiv.style.display = "none";
        coloredDiv.style.alignItems = "center";
        coloredDiv.style.justifyContent = "space-between";
        coloredDiv.style.gap = "10px";
        coloredDiv.style.padding = "0 20px";
        
        const imgColored = document.createElement("img");
        imgColored.src = upgrade.src_coloredImage;
        imgColored.alt = upgrade.name + " colored";
        imgColored.style.width = "90px"; // ENCORE PLUS GRANDE
        imgColored.style.height = "auto";
        
        const textBlock = document.createElement("div");
        textBlock.style.display = "flex";
        textBlock.style.flexDirection = "column";
        textBlock.style.justifyContent = "center";
        textBlock.style.alignItems = "center";
        textBlock.style.flex = "1";
        
        const nameDiv = document.createElement("div");
        nameDiv.className = "textblocked";
        nameDiv.textContent = upgrade.name;
        
        const costDiv = document.createElement("p");
        costDiv.className = "cost_one_generator_upgrade";
        costDiv.textContent = `Coût : ${upgrade.updatedPriceAfterPurchase} cafés`;
        
        textBlock.appendChild(nameDiv);
        textBlock.appendChild(costDiv);
        coloredDiv.appendChild(imgColored);
        coloredDiv.appendChild(textBlock);
      }

      if (container.classList.contains("upgrade_by_clic")) {
        lockedDiv.style.backgroundImage = "none";
      
      } else {
        lockedDiv.style.backgroundImage = "url('images/Améliorations/panneau_generator.png')";
        }

      coloredDiv.addEventListener("click", () => {
        buyUpgrades(upgrade.name);
      });

      wrapper.appendChild(label);
      wrapper.appendChild(lockedDiv);
      wrapper.appendChild(greyDiv);
      wrapper.appendChild(coloredDiv);
      container.appendChild(wrapper);
      
    });

    deblockUpgrade();
  }

  /* Achat d'upgrade */
  function buyUpgrades(name) {
    const upgrade = ListOfUpgrades.find((u) => u.name === name);
    if (!upgrade) return;

    const cost = upgrade.updatedPriceAfterPurchase;
    if (playerScore < cost) return;

    playerScore -= cost;
    upgrade.owned += 1;

    if (upgrade.isClick) {
      bonusGainPerClick += upgrade.output;
    } else {
      totalClickperSecond += upgrade.output;
    }

    updateScoreUI();
    updatePerSecondUI();
    updateUpgradeLabel(upgrade);
    deblockUpgrade();
    updateNextLevel();

    cloneToInventory(upgrade);
  }

  /* Clone vers inventaire */
  function cloneToInventory(upgrade) {
    const inventoryPanel = document.querySelector(".three_blocs > .upgradeandinventory:nth-child(3)");
    if (!inventoryPanel) {
      console.error("Panneau inventaire introuvable");
      return;
    }

    const blocUpgrade = inventoryPanel.querySelector(".bloc_upgrade");
    const targetContainer = upgrade.isClick
      ? blocUpgrade.querySelector(".upgrade_by_clic_inventory")
      : blocUpgrade.querySelector(".upgrade_generator_inventory");

    if (!targetContainer) {
      console.error("Conteneur inventaire introuvable pour", upgrade.name);
      return;
    }

    /* Regrouper par upgrade: mettre à jour compteur si déjà présent */
    let existing = targetContainer.querySelector(`.inventory-item[data-name="${upgrade.name}"]`);
    if (existing) {
      const countLabel = existing.querySelector(".inventory-count");
      if (countLabel) {
        if (upgrade.isClick) {
          countLabel.textContent = `x${upgrade.owned}`;
        } else {
          countLabel.textContent = `Quantité : ${upgrade.owned}`;
        }
      }
      return;
    }

    // Sinon créer un nouvel item
    if (upgrade.isClick) {
      /* Pour les upgrades de clic */
      const item = document.createElement("div");
      item.className = "inventory-item";
      item.setAttribute("data-name", upgrade.name);
      item.style.position = "relative";

      const img = document.createElement("img");
      img.src = upgrade.src_coloredImage;
      img.alt = upgrade.name;
      img.style.width = "80px";
      img.style.height = "auto";

      const countLabel = document.createElement("div");
      countLabel.className = "inventory-count";
      countLabel.textContent = `x${upgrade.owned}`;
      countLabel.style.position = "absolute";
      countLabel.style.bottom = "-5px";
      countLabel.style.right = "-5px";
      countLabel.style.background = "#4a2706";
      countLabel.style.color = "white";
      countLabel.style.padding = "2px 6px";
      countLabel.style.borderRadius = "10px";
      countLabel.style.fontSize = "14px";
      countLabel.style.fontFamily = "Bangers";
      countLabel.style.border = "2px solid black";

      item.appendChild(img);
      item.appendChild(countLabel);
      targetContainer.appendChild(item);
    } else {
      /* Pour les générateurs */
      const wrapper = document.createElement("div");
      wrapper.className = "inventory-item generator-wrapper";
      wrapper.setAttribute("data-name", upgrade.name);
      wrapper.style.width = "100%";
      wrapper.style.height = "23%";
      wrapper.style.display = "flex";
      wrapper.style.alignItems = "center";
      wrapper.style.justifyContent = "space-between";
      wrapper.style.backgroundImage = "url('images/Améliorations/panneau fond.png')";
      wrapper.style.backgroundSize = "100% 100%";
      wrapper.style.backgroundPosition = "center";
      wrapper.style.backgroundRepeat = "no-repeat";
      wrapper.style.borderRadius = "20px";

      const img = document.createElement("img");
      img.src = upgrade.src_coloredImage;
      img.alt = upgrade.name;
      img.style.width = "90px";
      img.style.height = "auto";

      const textBlock = document.createElement("div");
      textBlock.style.display = "flex";
      textBlock.style.flexDirection = "column";
      textBlock.style.justifyContent = "center";
      textBlock.style.alignItems = "center";
      textBlock.style.flex = "1";

      const nameLabel = document.createElement("p");
      nameLabel.className = "textblocked";
      nameLabel.textContent = upgrade.name;

      const countLabel = document.createElement("p");
      countLabel.className = "inventory-count cost_one_generator_upgrade";
      countLabel.textContent = `Quantité : ${upgrade.owned}`;

      textBlock.appendChild(nameLabel);
      textBlock.appendChild(countLabel);
      wrapper.appendChild(img);
      wrapper.appendChild(textBlock);
      targetContainer.appendChild(wrapper);
    }
  }

  /* Mise à jour prix (après achat) */
  function updateUpgradeLabel(upgrade) {
    const wrapper = document.querySelector(`.upgrade-wrapper[data-name="${upgrade.name}"]`);
    const label = wrapper?.querySelector(".upgrade-label");
    if (label) {
      label.textContent = `${upgrade.name} – prix: ${upgrade.updatedPriceAfterPurchase}`;
    }

    /*Mise à jour prix dans générateurs*/
    if (!upgrade.isClick) {
      const updateCostInDiv = (div) => {
        if (!div) return;
        const costDiv = div.querySelector(".cost_one_generator_upgrade");
        if (costDiv) {
          costDiv.textContent = `Coût : ${upgrade.updatedPriceAfterPurchase} cafés`;
        }
      };
      
      const locked = wrapper?.querySelector(".upgrade.locked");
      const grey = wrapper?.querySelector(".upgrade.grey");
      const colored = wrapper?.querySelector(".upgrade.colored");
      
      updateCostInDiv(locked);
      updateCostInDiv(grey);
      updateCostInDiv(colored);
    }

    /* mise à jour colored après achat */
    const colored = wrapper?.querySelector(".upgrade.colored");
    if (colored) {
      colored.title = upgrade.information.replace(
        "$updatedPriceAfterPurchase",
        upgrade.updatedPriceAfterPurchase
      );
    }

    /* mise à jour grey */
    const grey = wrapper?.querySelector(".upgrade.grey");
    if (grey) {
      grey.title = upgrade.greyTitle.replace(
        "$updatedPriceAfterPurchase",
        upgrade.updatedPriceAfterPurchase
      );
    }

    /* mise à jour locked */
    const locked = wrapper?.querySelector(".upgrade.locked");
    if (locked) {
      locked.title = upgrade.lockedTitle.replace(
        "$updatedPriceAfterPurchase",
        upgrade.updatedPriceAfterPurchase
      );
    }
  }


  /* Condition état upgrades (locked/grey/colored) */
  function deblockUpgrade() {
  ListOfUpgrades.forEach((upgrade) => {
    const locked = document.querySelector(`.upgrade[data-name="${upgrade.name}"].locked`);
    const grey = document.querySelector(`.upgrade[data-name="${upgrade.name}"].grey`);
    const colored = document.querySelector(`.upgrade[data-name="${upgrade.name}"].colored`);

    if (!locked || !grey || !colored) return;

    const price = upgrade.updatedPriceAfterPurchase;


    if (upgrade.lockedTitle) {
      locked.title = upgrade.lockedTitle.replace("$updatedPriceAfterPurchase", price);
    }
    if (upgrade.greyTitle) {
      grey.title = upgrade.greyTitle.replace("$updatedPriceAfterPurchase", price);
    }
    if (upgrade.information) {
      colored.title = upgrade.information.replace("$updatedPriceAfterPurchase", price);
    }

    /* avant le palier : rien */
    if (!upgrade.unlocked) {
      
      locked.style.display = "none";
      grey.style.display = "none";
      colored.style.display = "none";

      /* jamais acheté et pas assez d'argent = noir */
    } else if (upgrade.owned === 0 && playerScore < price) {

      locked.style.display = upgrade.isClick ? "block" : "flex";
      grey.style.display = "none";
      colored.style.display = "none";


      /* jamais acheté et assez d'argent = couleur */
    } else if (upgrade.owned === 0 && playerScore >= price) {
      locked.style.display = "none";
      grey.style.display = "none";
      colored.style.display = upgrade.isClick ? "block" : "flex";

      
      /* déjà acheté mais pas assez pour racheter = gris */
    } else if (upgrade.owned > 0 && playerScore < price) {
      locked.style.display = "none";
      grey.style.display = upgrade.isClick ? "block" : "flex";
      colored.style.display = "none";

      
      /* déjà acheté et assez pour racheter = couleur */
    } else if (upgrade.owned > 0 && playerScore >= price) {
      locked.style.display = "none";
      grey.style.display = "none";
      colored.style.display = upgrade.isClick ? "block" : "flex";
    }

  });
}

  /* mise a jour score utilisateur */
  function updateScoreUI() {
    countDisplay.textContent = `${playerScore} cafés`;
    updateNextLevel();
  }
  function updatePerSecondUI() {
    perSecondDisplay.textContent = `${totalClickperSecond} café par seconde`;
  }

  setInterval(() => {
    playerScore += totalClickperSecond;
    updateScoreUI();
    deblockUpgrade();
    renderUpgrades();
  }, 1000);

  /* Animation clic (+1 café) */
  clickZone.addEventListener("click", (e) => {
    playerScore += basicGainPerClick + bonusGainPerClick;
    updateScoreUI();
    deblockUpgrade();
    renderUpgrades();

    if (!addCoffeeFx) return;
    const rect = clickZone.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    addCoffeeFx.style.left = x + "px";
    addCoffeeFx.style.top = y + "px";
    addCoffeeFx.style.display = "flex";
    addCoffeeFx.style.transform = "translateY(0)";
    addCoffeeFx.style.opacity = "1";
    addCoffeeFx.style.transition = "none";

    requestAnimationFrame(() => {
      addCoffeeFx.style.transition = "all 0.8s ease-out";
      addCoffeeFx.style.transform = "translateY(-50px)";
      addCoffeeFx.style.opacity = "0";
    });

    setTimeout(() => {
      addCoffeeFx.style.display = "none";
    }, 700);
  });

  

  /* Fonctions démarrage */
  updateScoreUI();
  updatePerSecondUI();
  renderUpgrades();
  deblockUpgrade();
});