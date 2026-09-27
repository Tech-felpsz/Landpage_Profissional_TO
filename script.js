/* =========================================================
   SITE OTÁVIO MIRANDA DE LIMA
========================================================= */

const header = document.querySelector("header");
const botaoMenu = document.querySelector(".menu-mobile");
const menu = document.querySelector(".navegacao");

/* =========================================================
   MENU MOBILE
========================================================= */

function fecharMenu() {
    if (!botaoMenu || !menu) {
        return;
    }

    menu.classList.remove("aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.setAttribute("aria-label", "Abrir menu");

    const icone = botaoMenu.querySelector("[aria-hidden='true']");

    if (icone) {
        icone.textContent = "☰";
    } else {
        botaoMenu.textContent = "☰";
    }
}

function abrirOuFecharMenu() {
    if (!botaoMenu || !menu) {
        return;
    }

    const aberto = menu.classList.toggle("aberto");

    botaoMenu.setAttribute(
        "aria-expanded",
        String(aberto)
    );

    botaoMenu.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
    );

    const icone = botaoMenu.querySelector("[aria-hidden='true']");

    if (icone) {
        icone.textContent = aberto ? "✕" : "☰";
    } else {
        botaoMenu.textContent = aberto ? "✕" : "☰";
    }
}

if (botaoMenu && menu) {

    botaoMenu.addEventListener(
        "click",
        abrirOuFecharMenu
    );

    document.addEventListener(
        "keydown",
        function (evento) {

            if (evento.key === "Escape") {
                fecharMenu();
            }

        }
    );
}

/* =========================================================
   ROLAGEM SUAVE DOS LINKS INTERNOS
========================================================= */

const linksInternos =
    document.querySelectorAll('a[href^="#"]');

linksInternos.forEach(function (link) {

    link.addEventListener(
        "click",
        function (evento) {

            const destinoId =
                link.getAttribute("href");

            if (!destinoId || destinoId === "#") {
                return;
            }

            const destino =
                document.querySelector(destinoId);

            if (!destino) {
                return;
            }

            evento.preventDefault();

            fecharMenu();

            const alturaHeader = header
                ? header.offsetHeight
                : 0;

            const posicao =
                destino.getBoundingClientRect().top +
                window.scrollY -
                alturaHeader -
                20;

            window.scrollTo({
                top: Math.max(0, posicao),
                behavior: "smooth"
            });

        }
    );

});

/* =========================================================
   FECHAR MENU AO CLICAR FORA
========================================================= */

document.addEventListener(
    "click",
    function (evento) {

        if (!botaoMenu || !menu) {
            return;
        }

        if (!menu.classList.contains("aberto")) {
            return;
        }

        const clicouDentroDoMenu =
            menu.contains(evento.target);

        const clicouNoBotao =
            botaoMenu.contains(evento.target);

        if (
            !clicouDentroDoMenu &&
            !clicouNoBotao
        ) {
            fecharMenu();
        }

    }
);

/* =========================================================
   HEADER AO ROLAR
========================================================= */

function atualizarHeader() {

    if (!header) {
        return;
    }

    header.classList.toggle(
        "header-scrolled",
        window.scrollY > 20
    );
}

window.addEventListener(
    "scroll",
    atualizarHeader,
    { passive: true }
);

atualizarHeader();

/* =========================================================
   REVEAL DAS SEÇÕES
========================================================= */

const elementosReveal =
    document.querySelectorAll(
        "#sobre, #atuacao, #brincar, #como-funciona, #trajetoria, #clinica, #contato"
    );

if ("IntersectionObserver" in window) {

    const observadorReveal =
        new IntersectionObserver(

            function (entradas, observer) {

                entradas.forEach(
                    function (entrada) {

                        if (!entrada.isIntersecting) {
                            return;
                        }

                        entrada.target.classList.add(
                            "visivel"
                        );

                        observer.unobserve(
                            entrada.target
                        );

                    }
                );

            },

            {
                threshold: 0.15
            }

        );

    elementosReveal.forEach(
        function (elemento) {

            elemento.classList.add(
                "reveal"
            );

            observadorReveal.observe(
                elemento
            );

        }
    );

} else {

    elementosReveal.forEach(
        function (elemento) {

            elemento.classList.add(
                "reveal",
                "visivel"
            );

        }
    );

}

/* =========================================================
   ANIMAÇÃO DA TRAJETÓRIA
========================================================= */

const itensTrajetoria =
    document.querySelectorAll(
        ".trajetoria-item"
    );

if ("IntersectionObserver" in window) {

    const observadorTrajetoria =
        new IntersectionObserver(

            function (entradas, observer) {

                entradas.forEach(
                    function (entrada) {

                        if (!entrada.isIntersecting) {
                            return;
                        }

                        const item =
                            entrada.target;

                        const indice =
                            Number(
                                item.dataset.trajetoriaIndex || 0
                            );

                        item.style.transitionDelay =
                            `${indice * 0.15}s`;

                        item.classList.add(
                            "trajetoria-reveal",
                            "trajetoria-visivel"
                        );

                        observer.unobserve(
                            item
                        );

                    }
                );

            },

            {
                threshold: 0.20
            }

        );

    itensTrajetoria.forEach(
        function (item, indice) {

            item.dataset.trajetoriaIndex =
                String(indice);

            item.classList.add(
                "trajetoria-reveal"
            );

            observadorTrajetoria.observe(
                item
            );

        }
    );

} else {

    itensTrajetoria.forEach(
        function (item) {

            item.classList.add(
                "trajetoria-reveal",
                "trajetoria-visivel"
            );

        }
    );

}

/* =========================================================
   ANIMAÇÃO DO "COMO FUNCIONA"
========================================================= */

const etapas =
    document.querySelectorAll(
        ".processo-etapas .etapa"
    );

if ("IntersectionObserver" in window) {

    const observadorEtapas =
        new IntersectionObserver(

            function (entradas, observer) {

                entradas.forEach(
                    function (entrada) {

                        if (!entrada.isIntersecting) {
                            return;
                        }

                        const etapa =
                            entrada.target;

                        const indice =
                            Number(
                                etapa.dataset.etapaIndex || 0
                            );

                        etapa.style.transitionDelay =
                            `${indice * 0.12}s`;

                        etapa.classList.add(
                            "etapa-reveal",
                            "etapa-visivel"
                        );

                        observer.unobserve(
                            etapa
                        );

                    }
                );

            },

            {
                threshold: 0.20
            }

        );

    etapas.forEach(
        function (etapa, indice) {

            etapa.dataset.etapaIndex =
                String(indice);

            etapa.classList.add(
                "etapa-reveal"
            );

            observadorEtapas.observe(
                etapa
            );

        }
    );

} else {

    etapas.forEach(
        function (etapa) {

            etapa.classList.add(
                "etapa-reveal",
                "etapa-visivel"
            );

        }
    );

}