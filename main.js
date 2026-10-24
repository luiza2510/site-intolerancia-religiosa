// Imagens do carrossel
const imagens = [
  "https://i.postimg.cc/Fz4rDM37/Whats-App-Image-2026-05-05-at-21-31-28.jpg",
  "https://i.postimg.cc/3RMYxsLj/Whats-App-Image-2026-05-05-at-21-31-28-(1).jpg",
  "https://i.postimg.cc/k4Z8Ggr7/Whats-App-Image-2026-05-05-at-21-31-29.jpg"
];

let imagemAtual = 0;
const imagemCarrossel = document.getElementById("imagem-carrossel");

function atualizarCarrossel() {
  imagemCarrossel.src = imagens[imagemAtual];
}

function proximo() {
  imagemAtual = (imagemAtual + 1) % imagens.length;
  atualizarCarrossel();
}

function voltar() {
  imagemAtual = (imagemAtual - 1 + imagens.length) % imagens.length;
  atualizarCarrossel();
}

// Popup: fecha ao clicar no botão ou fora do conteúdo.
const popup = document.getElementById("popup");
const fecharPopup = document.getElementById("fechar-popup");

fecharPopup.addEventListener("click", () => {
  popup.classList.add("oculto");
});

popup.addEventListener("click", (evento) => {
  if (evento.target === popup) popup.classList.add("oculto");
});

// Frases automáticas do rodapé
const frasesFooter = [
  "Respeitar religiões diferentes é defender a liberdade.",
  "A fé deve unir, nunca dividir.",
  "Toda crença merece dignidade e respeito.",
  "A intolerância religiosa destrói vidas.",
  "O respeito é o primeiro passo para a paz.",
  "Nenhuma religião deve justificar violência.",
  "Diversidade religiosa é riqueza cultural."
];

let indiceFooter = 0;
const fraseFooter = document.getElementById("frase-footer");

function trocarFraseFooter() {
  fraseFooter.textContent = frasesFooter[indiceFooter];
  // Reinicia a animação CSS a cada troca.
  fraseFooter.style.animation = "none";
  void fraseFooter.offsetWidth;
  fraseFooter.style.animation = "";
  indiceFooter = (indiceFooter + 1) % frasesFooter.length;
}

trocarFraseFooter();
setInterval(trocarFraseFooter, 4000);




// Flip cards: clique/toque e retorno automático do terceiro card.


const flipContainers = document.querySelectorAll('.flip-container');
const flipSound = new Audio('freesound_community-flipcard-91468.mp3');

let temporizadorTerceiroCard = null;

function tocarSom() {
    flipSound.currentTime = 0;

    const tentativa = flipSound.play();

    if (tentativa && typeof tentativa.catch === "function") {
        tentativa.catch(() => {});
    }
}

flipContainers.forEach((card, indice) => {
    card.addEventListener('click', () => {
        card.classList.toggle('virado');

        const estaVirado = card.classList.contains('virado');

        card.setAttribute('aria-pressed', estaVirado ? 'true' : 'false');

        tocarSom();

        // Somente o terceiro card controla este temporizador.
        if (indice === 2) {
            clearTimeout(temporizadorTerceiroCard);
            temporizadorTerceiroCard = null;

            if (estaVirado) {
                temporizadorTerceiroCard = setTimeout(() => {
                    card.classList.remove('virado');
                    card.setAttribute('aria-pressed', 'false');
                    temporizadorTerceiroCard = null;
                }, 8000);
            }
        }
    });

    card.addEventListener('mouseenter', tocarSom);
});

// Fecha o menu da navbar depois de selecionar uma seção no celular.
document.querySelectorAll("#menuPrincipal .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const menu = document.getElementById("menuPrincipal");
    if (window.bootstrap && menu.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});

// Zoom com modal Bootstrap para imagem da introdução e do carrossel.
const modalZoomElemento = document.getElementById("modalZoom");
const imagemAmpliada = document.getElementById("imagem-ampliada");
const modalZoom = window.bootstrap
  ? bootstrap.Modal.getOrCreateInstance(modalZoomElemento)
  : null;

function abrirZoom(src, alt) {
  if (!modalZoom) return;
  imagemAmpliada.src = src;
  imagemAmpliada.alt = alt || "Imagem ampliada";
  modalZoom.show();
}

document.querySelectorAll("[data-zoom-src]").forEach((botao) => {
  botao.addEventListener("click", () => {
    const imagem = botao.querySelector("img");
    abrirZoom(botao.dataset.zoomSrc, botao.dataset.zoomAlt || (imagem ? imagem.alt : ""));
  });
});

document.querySelector("[data-zoom-carousel]").addEventListener("click", () => {
  abrirZoom(imagemCarrossel.src, imagemCarrossel.alt);
});


/* Ao recarregar a página, voltar ao banner inicial */
if (performance.getEntriesByType("navigation")[0]?.type === "reload") {
    window.scrollTo(0, 0);
}

