import gsap from "gsap";

import { c, all } from "./Utils/globalSelector.ts";

enum FightingStyle {
  Assassin = "Assassino(a)",
  Bruiser = "Bruiser",
  Fighter = "Lutador(a)",
  Mage = "Mago(a)",
  Shooter = "Atirador(a)",
  Support = "Suporte",
  Tank = "Tanque",
}

class Characters {
  id: string;
  name: string;
  age: number;
  information: string;
  profile: string;
  withoutText: string;
  withText: string;
  colorTheme: string;
  appeared: boolean;
  fightingStyle: FightingStyle;

  constructor(
    id: string,
    name: string,
    age: number,
    information: string,
    profile: string,
    withoutText: string,
    withText: string,
    colorTheme: string,
    appeared: boolean,
    fightingStyle: FightingStyle
  ) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.information = information;
    this.profile = profile;
    this.withoutText = withoutText;
    this.withText = withText;
    this.colorTheme = colorTheme;
    this.appeared = appeared;
    this.fightingStyle = fightingStyle;
  }

  preloadImages(): void {
    const imagesToPreload: string[] = [this.profile, this.withoutText];

    imagesToPreload.forEach((src) => {
      const img: HTMLImageElement = new Image();
      img.src = src;
    });
  }
}

const characters: Characters[] = [
  new Characters(
    "characterSinger",
    "Singer Faksumi",
    17,
    "um jovem aventureiro que nasceu no vilarejo Uxclavasa e sonha em conhecer o mundo e as maravilhas do reino de Belgadina e Ázuma!",
    "public/CharacterSection/profile/Singer Profile.png",
    "public/CharacterSection/withoutText/Singer withoutText.png",
    "public/CharacterSection/withText/Singer corpo completo.png",
    "lightblue",
    true,
    FightingStyle.Assassin
  ),
  new Characters(
    "characterAika",
    "Aika'nu Zumiki",
    19,
    `Ainda sem registros...`,
    "public/CharacterSection/profile/Aika Profile.png",
    "public/CharacterSection/withoutText/Aika withoutText.png",
    "public/CharacterSection/withText/Aika corpo completo.png",
    "rgb(255, 223, 239)",
    false,
    FightingStyle.Shooter
  ),
  new Characters(
    "characterMadger",
    "Madger Yasáshi",
    17,
    "Artista marcial nascido na vila Yasáshi, após uma batalha curta e sangrenta, Madger perdeu pessoas preciosas quando ainda era criança, agora, ele busca honrar aqueles que lutaram por ele em sua antiga vila!",
    "public/CharacterSection/profile/Madger Profile.png",
    "public/CharacterSection/withoutText/Madger withoutText.png",
    "public/CharacterSection/withText/Madger corpo completo.png",
    "rgb(186, 235, 186)",
    true,
    FightingStyle.Fighter
  ),
  new Characters(
    "characterSan",
    "San Majutsu-shi",
    19,
    `Ainda sem registros...`,
    "public/CharacterSection/profile/San Profile.png",
    "public/CharacterSection/withoutText/San withoutText.png",
    "public/CharacterSection/withText/San corpo completo.png",
    "rgb(255, 223, 164)",
    false,
    FightingStyle.Mage
  ),
  // Add more characters here...
];

// preloading the images
characters.forEach((el) => el.preloadImages());

const bigContainer = c("#characters") as HTMLDivElement;
const contentRemover = c(".contentRemover") as HTMLDivElement;

let validation: boolean = false;

const body = c("body") as HTMLBodyElement;
const htmlWidth = document.documentElement.clientWidth;

// Generate mobile content
function generateMobileContent(): string {
  return `
    <section id="characters">
      <div class="mobileTitleContainer">
        <h1 id="charactersTitle">Personagens</h1>
        <strong class="backgroundText">Personagens</strong>
      </div>

      <div id="charactersContainer">
        <div class="character-info">
          <img src="" alt="" class="character-image" />
          <div id="informationContainer">
            <h1 id="characterBackgroundText"></h1>
            <div id="informationOrganizator">
              <div id="age">
                <div>
                  <h3 id="characterAge"></h3>
                  <span class="ageColor"></span>
                </div>
              </div>
            </div>
          </div>
          <span id="close-button">
            <img src="public/icons/blackXmark.png" alt="close button image" />
          </span>
        </div>

        <div class="singerContainer character">
          <img
            src="public/CharacterSection/withText/Singer corpo completo.png"
            alt="Imagem do Singer"
            id="characterSinger"
            class="character-image"
          />
        </div>
        <div class="aikaContainer character">
          <img
            src="public/CharacterSection/withText/Aika corpo completo.png"
            alt="Imagem da Aika"
            id="characterAika"
            class="character-image"
          />
        </div>
        <div class="madgerContainer character">
          <img
            src="public/CharacterSection/withText/Madger corpo completo.png"
            alt="Imagem do Madger"
            id="characterMadger"
            class="character-image"
          />
        </div>
        <div class="sanContainer character">
          <img
            src="public/CharacterSection/withText/San corpo completo.png"
            alt="Imagem do San Majutsu-shi"
            id="characterSan"
            class="character-image"
          />
        </div>
      </div>

      <div class="imageAndInformation" style="display: none;">
        <div class="profilePictureDiv">
          <img src="" />
        </div>
        <p id="characterInformation"></p>
      </div>
    </section>
  `;
}

// Update content for mobile layout

if (body.clientWidth <= 1279 && htmlWidth <= 1279) {
  contentRemover.innerHTML = generateMobileContent();

  setTimeout(() => {
    const charactersHeight = c("#characters") as HTMLDivElement;
    const charactersContainerHeight = charactersHeight.clientHeight;
    charactersHeight.style.minHeight = `${charactersContainerHeight}px`;
  }, 1000);
}

class RenderCharacter {
  static charElement: HTMLDivElement;
  static charactersEl: NodeListOf<HTMLImageElement>;

  static styleInformation(el: HTMLDivElement, appeared: boolean) {
    el.style.color = appeared ? "white" : "gray";
    el.style.fontWeight = appeared ? "400" : "1000";
  }

  static mountStructure(charElement: HTMLDivElement, char: Characters) {
    this.charElement = charElement;

    if (!charElement) {
      throw new Error("Invalid classname or not empty");
    }

    const profilePicture = c(".profilePictureDiv img") as HTMLImageElement;
    const mainImage = c(".character-image") as HTMLImageElement;
    const charBgText = c("#characterBackgroundText") as HTMLDivElement;
    const characterInformation = c("#characterInformation") as HTMLDivElement;
    const characterAge = c("#characterAge") as HTMLHeadingElement;
    const imageAndInformation = c(".imageAndInformation") as HTMLDivElement;

    // Update character information
    profilePicture.src = char.profile;
    mainImage.src = char.withoutText;
    charBgText.innerText = char.name;
    characterInformation.innerText = char.information;
    charBgText.style.color = char.colorTheme;
    characterAge.innerHTML += "Idade:";

    // Update character age color
    const ageColor = c(".ageColor") as HTMLSpanElement;
    ageColor.innerHTML = char.appeared ? `${char.age}` : "?";
    ageColor.style.color = char.appeared ? char.colorTheme : "gray";
    // const styleColor = c("#styleColor") as HTMLSpanElement;
    // styleColor.innerHTML = char.appeared ? `${char.fightingStyle}` : "?";

    // Style character information
    this.styleInformation(characterInformation, char.appeared);

    // Animation on mount
    gsap.fromTo(
      charElement,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.4,
        onComplete: () => {
          imageAndInformation.style.display = "flex";

          gsap.fromTo(
            imageAndInformation,
            { opacity: 0 },
            { opacity: 1, duration: 0.3 }
          );
        },
      }
    );
  }

  static renderAnimation(
    charElement: HTMLDivElement,
    charactersEl: NodeListOf<HTMLImageElement>,
    char: Characters
  ) {
    const characterBackgroundText = c(
      "#characterBackgroundText"
    ) as HTMLTitleElement;

    if (!characterBackgroundText) {
      return;
    }

    const characterImage = charElement.querySelector(
      ".character-image"
    ) as HTMLImageElement;

    // Variable to configure element movement
    const xAxis = body.clientWidth <= 1279 && htmlWidth <= 1279 ? 130 : 210;

    // Animation
    const bgTextAnimation = gsap.fromTo(
      characterBackgroundText,
      { opacity: 0, x: -xAxis, duration: 0.5, ease: "power1.out" },
      { opacity: 1, x: 0, duration: 0.5, ease: "power1.out" }
    );

    const charImageAnimation = gsap.fromTo(
      characterImage,
      { opacity: 0, x: xAxis, scale: 0.8, duration: 0.5, ease: "power1.out" },
      { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: "power1.out" }
    );

    // Animation complete
    bgTextAnimation;
    charImageAnimation;

    const imageAndInformation = c(".imageAndInformation") as HTMLDivElement;

    let validationCloseButton = false;

    document.querySelector("#close-button")?.addEventListener("click", () => {
      if (!validationCloseButton) {
        validationCloseButton = true;

        gsap.to([charElement, imageAndInformation], {
          opacity: 0,
          onComplete: () => {
            const profilePicture = c(
              ".profilePictureDiv img"
            ) as HTMLImageElement;
            const mainImage = c(".character-image") as HTMLImageElement;
            const charBgText = c("#characterBackgroundText") as HTMLDivElement;
            const characterInformation = c(
              "#characterInformation"
            ) as HTMLDivElement;
            const characterAge = c("#characterAge") as HTMLHeadingElement;
            const ageColor = c(".ageColor") as HTMLSpanElement;
            const characterInfo = c(".character-info") as HTMLDivElement;

            // Reset main application
            profilePicture!.src = "";
            mainImage!.src = "";
            charBgText!.innerText = "";
            characterInformation!.innerText = "";
            charBgText!.style.color = "";
            characterAge!.textContent = "";
            ageColor.textContent = "";

            bigContainer.style.height = "100vh";
            this.styleInformation(characterInformation, char.appeared);

            if (body.clientWidth <= 1279) {
              characterInfo.style.display = "none";
              imageAndInformation.style.display = "none";
            }

            gsap.to(charactersEl, { display: "flex", opacity: 1 });

            validation = false;
            validationCloseButton = false;
          },
        });
      }
    });
  }
}

const charactersContainer = all(
  ".singerContainer, .aikaContainer, .madgerContainer, .sanContainer"
) as NodeListOf<HTMLDivElement>;

charactersContainer.forEach((el, index) => {
  el.addEventListener("click", () => {
    if (!el.classList.contains("activated") && validation === false) {
      validation = true;
      changeElementsWhenTrue(index);
    }
  });

  function changeElementsWhenTrue(index: number): void {
    gsap.to(charactersContainer, {
      duration: 0.5,
      opacity: 0,
      onComplete: () => {
        const characterInfo = c(".character-info") as HTMLDivElement;

        const isDesktop = body.clientWidth >= 1279 && htmlWidth >= 1279;
        const isMobile = body.clientWidth <= 1279 && htmlWidth <= 1279;

        if (isDesktop) {
          bigContainer.style.height = "110vh";
        } else if (isMobile) {
          characterInfo.style.display = "flex";
        }

        charactersContainer.forEach((div) => {
          div.style.display = "none";
        });

        const charImageEl = charactersContainer[index].firstElementChild;
        const currentChar: string = charImageEl!.id;
        const selectedCharacter = characters.find(
          (el) => el.id === currentChar
        );

        gsap.to(el, {
          onStart: () => {
            const characterInfoElement = c(".character-info") as HTMLDivElement;
            RenderCharacter.mountStructure(
              characterInfoElement,
              selectedCharacter!
            );
            RenderCharacter.renderAnimation(
              document.querySelector(".character-info")!,
              document.querySelectorAll(".character"),
              selectedCharacter!
            );
          },
        });
      },
    });
  }
});
