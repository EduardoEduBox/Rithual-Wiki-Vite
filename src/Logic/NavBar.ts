import { c } from "./Utils/globalSelector.ts";

const hamburguerIcon = c("#menuIcon") as HTMLImageElement;
const navElements: HTMLDivElement = document.createElement("div");
let advice: null | HTMLElement = null;

const toggleHamburguerMenu = (): void => {
  if (!hamburguerIcon) return;

  hamburguerIcon.classList.toggle("hamburguerToggled");

  if (hamburguerIcon.classList.contains("hamburguerToggled")) {
    hamburguerIcon.src = "Css/assets/icons/closedEye.png";

    navElements.classList.add("navMediaQuery");
    navElements.innerHTML = `
      <ul class="navList2">
        <li><a href="#header">Home</a></li>
        <li><a href="#characters">Personagens</a></li>
        <li><a href="#chapters">Capítulos</a></li>
        <li><a href="#">Sobre mim</a></li>
        <li><hr></li> 
      </ul>`;
    document.body.appendChild(navElements);

    setTimeout(() => {
      navElements.style.right = "0";
    }, 0);
  } else {
    hamburguerIcon.src = "Css/assets/icons/openedEye.png";
    navElements.style.right = `calc(-${navElements.offsetWidth}px - 1.5rem)`;
  }
};

const handleResize = (): void => {
  const body = document.body;

  if (body.clientWidth > 1279) {
    navElements.remove();
  }

  if (advice) {
    advice.removeEventListener("click", adviceClickHandler);
    advice.addEventListener("click", adviceClickHandler);
  }
};

// Assuming adviceClickHandler is defined somewhere else in your code, make sure to define it.
const adviceClickHandler = (event: Event): void => {
  // Your click handling logic here
};

if (hamburguerIcon) {
  hamburguerIcon.addEventListener("click", toggleHamburguerMenu);
}

window.addEventListener("resize", handleResize);
