import { c, all } from "./Utils/globalSelector.ts";

// First, add the necessary types
type ChapterData = {
  chapterTitle: string;
  chapterDescription: string;
  chapterImage: string;
  url: string;
  shortName: string;
};

let images = all(".prePages") as NodeListOf<HTMLImageElement>;
const textElement = c("#chaptersTitle") as HTMLHeadingElement;
const backgroundTextElement = c("#bcChapters") as HTMLParagraphElement;
const container = c("#chaptersContainer") as HTMLDivElement;
const futureSection = c(".futureSection") as HTMLDivElement;

const bodyWidth: number = document.body.offsetWidth;
const htmlWidth: number = document.documentElement.offsetWidth;

class Information implements ChapterData {
  constructor(
    public chapterTitle: string,
    public chapterDescription: string,
    public chapterImage: string,
    public url: string,
    public shortName: string
  ) {}

  setInformationDesktop(
    textElement: HTMLElement,
    backgroundTextElement: HTMLElement
  ): void {
    textElement.textContent = this.chapterTitle;
    backgroundTextElement.textContent = this.chapterTitle;
  }

  static setInformationMobile(): void {
    container.innerHTML = `<img
        src="public/ChapterSection/prePages/Rithual pré pagina cap 0.png"
        alt="Imagem do capítulo zero"
        class="prePages"
        />
        <img
        src="public/ChapterSection/prePages/Rithual pré pagina cap 1.png"
        alt="Imagem do capítulo zero"
        class="prePages"
        />
        <img
        src="public/ChapterSection/prePages/Rithual pré pagina cap 2.png"
        alt="Imagem do capítulo zero"
        class="prePages"
        />
        <img
        src="public/ChapterSection/prePages/Rithual pré pagina cap 3.png"
        alt="Imagem do capítulo zero"
        class="prePages"
        />
        <img
        src="public/ChapterSection/prePages/Rithual pré pagina cap 4.png"
        alt="Imagem do capítulo zero"
        class="prePages"
      />`;
  }
}

const chaptersData: ChapterData[] = [
  new Information(
    "Cap - 0: Invasão",
    "A carnificina assola o vilarejo enquanto um demônio mata impiedosamente. Um garoto se confronta com o assassino e uma lança revela seu verdadeiro poder.",
    "public/ChapterSection/toolTipPages/random1.png",
    "https://tapas.io/episode/2307820",
    "Invasão"
  ),
  new Information(
    "Cap - 1: Padaria",
    "Singer sai de casa e vai à padaria em Belgadina. Novidades sobre sua matrícula escolar deixam-no ansioso. O que o futuro reserva para ele após essa compra significativa?",
    "public/ChapterSection/toolTipPages/random2.png",
    "https://tapas.io/episode/2478257",
    "Padaria"
  ),
  new Information(
    "Cap - 2: Pai e irmão",
    "Singer reflete sobre a matrícula escolar e suas expectativas de liberdade. Em casa, encontra seus familiares e descansa. O que o aguarda no tão esperado primeiro dia de aula?",
    "public/ChapterSection/toolTipPages/random3.png",
    "https://tapas.io/episode/2571907",
    "Pai e irmão"
  ),
  new Information(
    "Cap - 3: Paisagem",
    "Singer está ansioso para o primeiro dia de aula. Seu irmão o acompanha e novas experiências o cercam. Chegando à escola, Singer está repleto de expectativas. O que o aguarda nesse novo ambiente?",
    "public/ChapterSection/toolTipPages/random4.png",
    "https://tapas.io/episode/2689791",
    "Paisagem"
  ),
  new Information(
    "Cap - 4: Escola",
    "Singer maravilhado com a escola, adentra seus corredores. Enquanto isso, seu irmão deixa a escola, encontra seus parceiros e seguem em frente. A pergunta paira: estão realmente prontos? Armas são preparadas.",
    "public/ChapterSection/toolTipPages/random5.png",
    "https://tapas.io/episode/2846137",
    "Escola"
  ),
];

if (bodyWidth >= 1279 || htmlWidth >= 1279) {
  let currentTooltip: HTMLElement | null = null;

  Array.from(images).forEach((image: Element, i: number) => {
    image.addEventListener("mouseover", function () {
      const chapter = chaptersData[i];
      (chapter as Information).setInformationDesktop(
        textElement,
        backgroundTextElement
      );
      currentTooltip = changeToolTip(
        chapter.chapterImage,
        chapter.chapterTitle,
        chapter.chapterDescription
      );
    });

    image.addEventListener("mouseout", function () {
      if (currentTooltip) {
        currentTooltip.remove();
        currentTooltip = null;
      }
      textElement.textContent = "Capítulos";
      backgroundTextElement.textContent = "Capítulos";
    });
  });

  function createTooltip(): HTMLElement {
    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip");

    document.body.appendChild(tooltip);

    return tooltip;
  }

  const section = c("#chapters") as HTMLDivElement;
  let sectionPosition: number = 0;

  function calculateSectionPosition(): void {
    const rect: DOMRect = section.getBoundingClientRect();
    sectionPosition = rect.top;
  }

  calculateSectionPosition();

  window.addEventListener("scroll", () => {
    calculateSectionPosition();
  });

  function changeToolTip(
    imageSrc: string,
    title: string,
    description: string
  ): HTMLElement {
    const tooltip = createTooltip();

    const image = document.createElement("img");
    image.src = imageSrc;
    tooltip.appendChild(image);

    const textContainer = document.createElement("div");
    textContainer.classList.add("tooltipInformation");
    tooltip.appendChild(textContainer);

    const titleElement = document.createElement("h3");
    titleElement.textContent = title;
    titleElement.style.color = "pink";
    textContainer.appendChild(titleElement);

    const descElement = document.createElement("p");
    descElement.innerHTML += `<hr>${description}`;
    descElement.style.maxWidth = "300px";

    textContainer.appendChild(descElement);

    document.body.appendChild(tooltip);

    document.addEventListener("mouseover", function () {
      tooltip.style.opacity = "0";
      setTimeout(() => {
        tooltip.style.opacity = "1";
      }, 500);
    });

    [...images].forEach((element) => {
      element.addEventListener("mousemove", function (event) {
        const tooltipWidth = tooltip.offsetWidth;
        const tooltipHeight = tooltip.offsetHeight;

        let tooltipX = event.clientX + 100;

        if (tooltipX + tooltipWidth > window.innerWidth - 200) {
          tooltipX = event.clientX - tooltipWidth - 100;
        }

        tooltip.style.left = tooltipX + "px";
        tooltip.style.top =
          event.clientY + tooltipHeight * 5.8 + -sectionPosition + "px";
      });
    });

    return tooltip;
  }
} else {
  Information.setInformationMobile(); // this is also executing!

  let lastClickTime: number = 0;
  let lastClickedImageIndex: number = -1;
  const doubleClickDelay: number = 300;

  let checkTime: number = 0;
  const normalHr = c(".normalHr") as HTMLHRElement;

  images = all(".prePages") as NodeListOf<HTMLImageElement>;

  Array.from(images).forEach((element: Element, index: number) => {
    element.addEventListener("click", () => {
      if (checkTime === 0) {
        const currentTime = new Date().getTime();
        const timeSinceLastClick = currentTime - lastClickTime;

        // setting the floating text to the title
        textElement.innerHTML = chaptersData[index].chapterTitle;
        backgroundTextElement.innerHTML = chaptersData[index].shortName;

        if (
          timeSinceLastClick <= doubleClickDelay &&
          lastClickedImageIndex === index
        ) {
          // Double-click action (redirect to the Tapas.io URL)
          const tapasURL = chaptersData[index].url;
          window.location.href = tapasURL;
        } else {
          // Single-click action (toggle tooltip)
          if (mobileTemplate.classList.contains("triggered")) {
            changeMobileTooltip(index);
            mobileTemplate.style.opacity = "1";
          } else {
            gsap.fromTo(
              futureSection,
              { y: 0 },
              {
                y: "75vw",
                duration: 0.8,
                onComplete: () => {
                  gsap.set(futureSection, { y: 0 });
                  // Move this function call here to ensure the tooltip appears after the animation is completed
                  changeMobileTooltip(index);
                },
              }
            );
          }
        }

        lastClickTime = currentTime;
        lastClickedImageIndex = index;
      }
    });
  });

  let mobileTemplate = c("#toolTipMobileTemplate") as HTMLDivElement;
  let mobileChapterImage = c(".ToolTipMobileChapterImage") as HTMLImageElement;
  let toolTipTitle = c(".toolTipTitle") as HTMLHeadingElement;
  let toolTipDescription = c(".toolTipDescription") as HTMLParagraphElement;
  let dblClickInformation = c(".dblclickInformation") as HTMLSpanElement;

  function changeMobileTooltip(index: number): void {
    normalHr.style.display = "block";

    xMark.style.display = "block";

    const chapter = chaptersData[index];
    toolTipTitle.innerHTML = chapter.chapterTitle;
    toolTipDescription.innerHTML = chapter.chapterDescription;
    mobileChapterImage.src = chapter.chapterImage;
    dblClickInformation.innerHTML = "clique duas vezes pra acessar o capítulo";

    // Set the initial opacity of the tooltip to 0
    mobileTemplate.style.opacity = "0";

    mobileTemplate.classList.add("triggered");

    // Animate the opacity of the tooltip to 1 (fade-in effect)
    gsap.to(mobileTemplate, {
      opacity: 1,
      duration: 0.3, // Adjust the duration as needed
    });
  }

  let xMark = c(".xMark") as HTMLSpanElement;
  xMark.addEventListener("click", () => {
    checkTime = 1;

    // setting the floating text to normal
    textElement.innerHTML = "Capítulos";
    backgroundTextElement.innerHTML = "Capítulos";

    gsap.to(mobileTemplate, {
      opacity: 0,
      duration: 0.5,
      ease: "back.out(1.7)",
      onComplete: () => {
        toolTipTitle.innerHTML = "";
        toolTipDescription.innerHTML = "";
        mobileChapterImage.src = "";
        dblClickInformation.innerHTML = "";

        normalHr.style.display = "none";

        xMark.style.display = "none";

        gsap.set(mobileTemplate, { opacity: 1 }); // Reset the opacity back to 1

        gsap.to(futureSection, {
          y: "-75vw",
          duration: 1,
          onComplete: () => {
            gsap.set(futureSection, { y: 0 });
            mobileTemplate.classList.remove("triggered");

            checkTime = 0;
          },
        }); // Reset characterSection to its initial position
      },
    });
  });
}
