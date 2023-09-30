// Importing required functions and modules
import { c } from "./Utils/globalSelector.ts";

// Define HTML element types
const headerBackgroundImages: HTMLImageElement = c(
  "#headerBackgroundImages"
) as HTMLImageElement;
const headerCharacterImages: HTMLImageElement = c(
  "#headerCharacterImages"
) as HTMLImageElement;
const headerBall: HTMLDivElement = c(".headerImageBall") as HTMLDivElement;

class Images {
  id: number;
  backgroundImage: string;
  characterImage: string;
  ballColor: string;

  constructor(
    id: number,
    backgroundImage: string,
    characterImage: string,
    ballColor: string
  ) {
    this.id = id;
    this.backgroundImage = backgroundImage;
    this.characterImage = characterImage;
    this.ballColor = ballColor;
  }

  preloadImages(): void {
    const imagesToPreload = [this.backgroundImage, this.characterImage];

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }
}

type ImageConfig = Images[];

const configuration: ImageConfig = [
  new Images(
    1,
    "public/Header/backgroundPics/backgroundHeader.png",
    "public/Header/characters/demonio_cap_0_site_prototipo.png",
    "rgb(255, 0, 0)"
  ),
  new Images(
    2,
    "public/Header/backgroundPics/backgroundHeader2.png",
    "public/Header/characters/málanus_cap_2_site_prototipo.png",
    "#9400d3"
  ),
  new Images(
    3,
    "public/Header/backgroundPics/backgroundHeader3.png",
    "public/Header/characters/singer_cap_3_site_prototipo.png",
    "rgb(90, 206, 255)"
  ),
];

const terror: Images = new Images(
  4,
  "public/Header/backgroundPics/tortura.png",
  "public/Header/characters/iseeyou.png",
  "rgba(255, 0, 0, .7)"
);

configuration.forEach((el) => el.preloadImages());
terror.preloadImages();

headerBackgroundImages.style.backgroundImage = `url('${configuration[0].backgroundImage}')`;
headerCharacterImages.src = configuration[0].characterImage;
headerBall.style.backgroundColor = configuration[0].ballColor;

let randomNumber = (): number => {
  return Math.floor(Math.random() * configuration.length);
};

let i: number = 1;

const headerTitle = c(".headerTitle") as HTMLHeadingElement;
const headerParagraph = c(".headerParagraph") as HTMLParagraphElement;
const headerKnowmore = c(".headerKnowMore") as HTMLHeadingElement;
const headerButton = c(".headerButton") as HTMLButtonElement;

let checker: boolean = false;

setTimeout(() => {
  checker = true;
}, 30000);

setInterval(() => {
  if (configuration[i]) {
    headerBackgroundImages.style.backgroundImage = `url('${configuration[i].backgroundImage}')`;
    headerCharacterImages.src = configuration[i].characterImage;
    headerBall.style.backgroundColor = configuration[i].ballColor;

    if (i === randomNumber() && checker) {
      headerBackgroundImages.style.backgroundImage = `url('${terror.backgroundImage}')`;
      headerCharacterImages.src = terror.characterImage;
      headerBall.style.backgroundColor = terror.ballColor;

      headerBackgroundImages.style.transition = "0ms";
      headerCharacterImages.style.transition = "0ms";
      headerBall.style.transition = "0ms";

      headerTitle.innerHTML = "Eu vejo você";
      headerParagraph.style.fontFamily = "Dialeto Ancestral";
      headerParagraph.innerHTML = `e todos eles ergueram suas cabeças ao céu com um olhar explícito de terror, 
        temendo o que encontrariam em seus futuros. repentinamente, 
        a escuridão da morte os consumiu em seu abraço cruel.`;

      headerKnowmore.innerHTML = "HAHAHAHAHAHAHAHAHAHA";
      headerButton.innerHTML = "Sofra";

      setTimeout(() => {
        i = i - 1;
        headerBackgroundImages.style.backgroundImage = `url('${configuration[i].backgroundImage}')`;
        headerCharacterImages.src = configuration[i].characterImage;
        headerBall.style.backgroundColor = configuration[i].ballColor;

        headerBackgroundImages.style.transition = "500ms";
        headerCharacterImages.style.transition = "500ms";
        headerBall.style.transition = "500ms";

        headerTitle.innerHTML = "Bem vindos ao <br /> (૨¡Ƭષαℓ";
        headerParagraph.style.fontFamily = "Outfit";
        headerParagraph.innerHTML = `(૨¡Ƭષαℓ é um mangá brasileiro sobre um mundo que presencia
          conflitos sangrentos entre humanos e demônios que disputam
          influência sobre a sociedade. Nesta história você irá acompanhar a
          vida de
          <strong>Singer</strong>, um garoto tímido e bastante sorridente
          que está descobrindo o mundo pela primeira vez ao lado de seus
          amigos <strong>Aika</strong>, <strong>San</strong> e
          <strong>Madger</strong>`;

        headerKnowmore.innerHTML = "Conheça mais esse universo!";
        headerButton.innerHTML = "Capítulos";
      }, 200);
    }
    i++;
  } else {
    headerBackgroundImages.style.backgroundImage = `url('${configuration[0].backgroundImage}')`;
    headerCharacterImages.src = configuration[0].characterImage;
    headerBall.style.backgroundColor = configuration[0].ballColor;
    i = 1;
  }
}, 10000);
