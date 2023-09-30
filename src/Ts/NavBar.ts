import { c } from "./Utils/globalSelector.ts";
import Swal from "sweetalert2";

const hamburguerIcon = c("#menuIcon") as HTMLImageElement;
const navElements = document.createElement("div") as HTMLDivElement;

function toggleHamburguerMenu(): void {
  hamburguerIcon.classList.toggle("hamburguerToggled");

  if (hamburguerIcon.classList.contains("hamburguerToggled")) {
    hamburguerIcon.src = "public/icons/closedEye.png";

    navElements.classList.add("navMediaQuery");
    navElements.innerHTML = `
      <ul class="navList2">
        <li><a href="#header">Home</a></li>
        <li><a href="#characters">Personagens</a></li>
        <li><a href="#chapters">Capítulos</a></li>
        <li class='readyes'>Ler agora</li>
        <li><hr></li> 
      </ul>`;
    document.body.appendChild(navElements);

    setTimeout(() => {
      navElements.style.right = "0";
    }, 0);
  } else {
    hamburguerIcon.src = "public/icons/openedEye.png";
    navElements.style.right = `calc(-${navElements.offsetWidth}px - 1.5rem)`;
  }
}

function handleResize(): void {
  if (document.body.clientWidth > 1279) {
    navElements.remove();
  }
}

const triggerAlert = () => {
  return Swal.fire({
    title: '<strong style="color: pink">(૨¡Ƭષαℓ Reader</strong> em produção!',
    text: "Estamos desenvolvendo o leitor do Rithual para que você possa ter a melhor experiência lendo esse mangá, enquanto ele não está pronto, você pode ler no Tapas.io",
    imageUrl:
      "https://cdn.discordapp.com/attachments/421344962303623189/1146492460294475907/image.png",
    background: "rgb(31, 31, 31)",
    color: "white",
    imageWidth: "60%",
    imageHeight: "auto",
    imageAlt: "san pensativo",
    showCancelButton: true,
    cancelButtonText: "Ok",
    confirmButtonText:
      '<strong style="color: lightblue"><a href="https://tapas.io/series/Rithual_manga/info">Tapas.io</a></strong>',
    confirmButtonColor: "#ff009d",
  });
};

function initNavBarHandler(): void {
  if (hamburguerIcon) {
    hamburguerIcon.addEventListener("click", toggleHamburguerMenu);
  }

  const navReadDesktop = c(".readNow");
  if (navReadDesktop) {
    navReadDesktop.addEventListener("click", triggerAlert);
  }

  document.addEventListener("click", (event) => {
    if (
      event.target &&
      (event.target as HTMLElement).matches(".navList2 li.readyes")
    ) {
      triggerAlert();
    }
  });

  window.addEventListener("resize", handleResize);
}

// Initialize all navbar event handlers
initNavBarHandler();
