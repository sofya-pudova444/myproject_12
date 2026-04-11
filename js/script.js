
async function fetchData(d) {
    let url = `http://localhost/myserver/post` // адрес куда отправляется запрос
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(d).toString()
    });
    
}

//Функция для формы заявки.POST
function reg_form() {
    const btn_reg = document.querySelector('#btn_reg'); //достаем id кнопки
    
    btn_reg.addEventListener('click', event => {
        // Получаем значения из полей ввода
        const email = document.querySelector('#email').value.trim();
        const passw = document.querySelector('#passw').value;
        const passw_pow = document.querySelector('#passw_pow').value;
        document.getElementById('success-modal').classList.remove('hidden');
        
        // Шаблоны для проверки
        const shablon_email = /^\S+@\S+\.\S+$/;
        const shablon_passw = /^(?=.*[A-Z])(?=.*\d).{8,}$/; // Пароль от 8 символов, минимум 1 цифра и 1 заглавная буква

        // Проверка на пустые поля
        if (!email || !passw || !passw_pow) {
            alert('Все поля должны быть заполнены');
            return;
        }
        
        // Проверка паролей на совпадение и соответствие шаблону
        if (passw !== passw_pow) {
            alert('Пароли не совпадают');
            return;
        }
        
        if (!shablon_passw.test(passw)) {
            alert('Пароль слишком простой. Требуется минимум 8 символов, одна цифра и одна заглавная буква.');
            return;
        }
        
        if (!shablon_email.test(email)) {
            alert('Некорректный адрес электронной почты');
            return;
        }
        
        // Если все проверки пройдены, то отправляем данные
        alert('Успешно');
        const d = { email, passw, passw_pow };
        
        fetchData(d); // Передаем объект в функцию
        
        event.preventDefault(); // Предотвращаем перезагрузку страницы
    });
}

document.addEventListener('DOMContentLoaded', function () {
    reg_form();
});

// Функция для вывода каталога на страницу
// Функция для отображения товаров по категории
async function see_catalog_and_tovar() {
    const catalogMenu = document.querySelector('.catalog_menu');
    const cardsContainer = document.querySelector('.cards');

    try {
        let response = await fetch(`http://localhost/myserver/get.php`);
        let data = await response.json();

        // Очистка контейнера карточек
        cardsContainer.innerHTML = '';

        // Создание категорий
        for (let category of data.categories) {
            const newLi = document.createElement('li');
            newLi.className = 'category-item';
            newLi.dataset.categoryId = category.id;
            newLi.textContent = category.name_catalog;
            catalogMenu.appendChild(newLi);

            // Добавление события клика на категорию
            newLi.addEventListener('click', () => showCategoryTodos(cardsContainer, data, category.id));
        }

        // Показываем все товары по умолчанию
        showCategoryTodos(cardsContainer, data, null);

    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
    }
}

// Функция для отображения товаров по категории
function showCategoryTodos(cardsContainer, data, categoryId) {
    // Очищаем контейнер карточек
    cardsContainer.innerHTML = '';

    // Отображение товаров выбранной категории
    if (categoryId !== null && data.todos.hasOwnProperty(categoryId.toString())) {
        data.todos[categoryId.toString()].forEach(todo => {
            createCard(todo, cardsContainer);
        });
    } else {
        // Показываем все товары, если категория не выбрана
        Object.values(data.todos).flat().forEach(todo => {
            createCard(todo, cardsContainer);
        });
    }
}

// Функция для создания карточки товара
function createCard(todo, cardsContainer) {
    const card = document.createElement('div');
    card.className = 'card';

    // Картинка товара (исправлённый путь!)
    const img = document.createElement('img');
    img.src = `./${todo.picture_tovar}`; 
    img.alt = todo.name_tovar;

    // Название товара
    const title = document.createElement('p');
    title.textContent = todo.name_tovar;

    // Собираем карточку
    card.appendChild(img);
    card.appendChild(title);

    // Вставляем карточку в контейнер
    cardsContainer.appendChild(card);
}

// Загружаем данные при загрузке страницы
document.addEventListener('DOMContentLoaded', see_catalog_and_tovar);

// Слайдеры
document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.slider');

    sliders.forEach(slider => {
        const slides = slider.querySelector('.slides');
        const prevBtn = slider.querySelector('.prev');
        const nextBtn = slider.querySelector('.next');
        
        // Если нет слайдов — выходим (защита от ошибок)
        if (!slides || !prevBtn || !nextBtn) return;

        const totalSlides = slides.children.length;
        let currentSlide = 0;

        // Функция перемещения
        const moveSlide = () => {
            slides.style.transform = `translateX(-${currentSlide * 100}%)`;
        };

        // Кнопка "назад"
        prevBtn.addEventListener('click', () => {
            if (currentSlide > 0) currentSlide--;
            moveSlide();
        });

        // Кнопка "вперёд"
        nextBtn.addEventListener('click', () => {
            if (currentSlide < totalSlides - 1) currentSlide++;
            moveSlide();
        });
    });
});

