// gallery.js
 
const goBackBtn = document.createElement('button');

goBackBtn.innerHTML = `
    <svg fill="#000000" version="1.1" id="Layer_1"
         xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
         viewBox="0 0 476.213 476.213" xml:space="preserve">
        <polygon points="476.213,223.107 57.427,223.107 151.82,128.713 
                         130.607,107.5 0,238.106 130.607,368.714 
                         151.82,347.5 57.427,253.107 476.213,253.107"/>
    </svg>
`;

goBackBtn.classList.add('go-back-btn');

goBackBtn.addEventListener('click', () => {
    if (window.history.length > 1) {
        history.back();
    } else {
        window.location.href = "/eng"; // замените на свой путь, если нужно
    }
});

document.querySelector('main').prepend(goBackBtn);




function updateContent(colorName, commonInfo, colorsData) {
    const selectedColor = colorsData.find((item) => item.colorName === colorName);
    
    if (selectedColor) {
        // Обновляем галерею изображений
        new MainMenu(selectedColor.colorName, selectedColor.images).render();
        
        // Обновляем текстовую информацию
        const itemInfo = document.querySelector(".item-info");
        itemInfo.querySelector("h2").textContent = selectedColor.name;
        itemInfo.querySelector(".descr p:nth-child(1)").textContent = "Price:";
        itemInfo.querySelector(".descr ul").innerHTML = `
            <li>Excellent Quality - <span class="total-price">${selectedColor.prices.excellent}</span></li>
            <li>Good Quality - <span class="total-price">${selectedColor.prices.good}</span></li>
            <li>Middle Quality - <span class="total-price">${selectedColor.prices.middle}</span></li>
        `;
        itemInfo.querySelector(".descr p:nth-child(3)").textContent = `Sizes: ${commonInfo.sizes}`;
    }
}

// Функция для смены изображения галереи
class MainMenu {
    constructor(colorName, images) {
        this.colorName = colorName;
        this.images = images;
    }

    render() {
        const parentContainer = document.querySelector(".galary");
        parentContainer.innerHTML = `
            <div>
                <a data-fancybox="gallery" data-src="${this.images[0]}">
                    <img src="${this.images[0]}" alt="" />
                </a>
            </div>
            <div>
                ${this.images
                    .slice(1)
                    .map(
                        (img) => `
                    <a data-fancybox="gallery" data-src="${img}">
                        <img src="${img}" alt="" />
                    </a>
                `)
                    .join("")}
            </div>
        `;
        Fancybox.bind('[data-fancybox="gallery"]', {});
    }
}

// Добавление обработчиков для смены цветов
function setColorButtons(colorsData, commonInfo) {
    const colorButtonsContainer = document.querySelector(".colors");
    colorButtonsContainer.innerHTML = colorsData.map((color) => `
        <button class="${color.colorName}"></button>
    `).join('');

    const colorButtons = document.querySelectorAll(".colors button");

    colorButtons.forEach((button) => {
        button.addEventListener("click", () => {
            colorButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            updateContent(button.classList[0], commonInfo, colorsData);
        });
    });
    
    // По умолчанию активна первая
    if (colorButtons.length > 0) {
        colorButtons[0].classList.add("active");
    }
    
}

// Инициализация при загрузке страницы
function initializePage(colorsData, commonInfo) {
    updateContent("black", commonInfo, colorsData);  // Показываем первую галерею по умолчанию
    setColorButtons(colorsData, commonInfo);
}
