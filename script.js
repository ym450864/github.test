const NewsContainer = document.getElementById('news-container');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('site-header');
const sectionTitle = document.getElementById('section-title');

const categoryBtns = document.querySelectorAll('.cat-btn');
const menuBtn = document.getElementById('menu-btn');
const categoryMenu = document.getElementById('category-menu');

const API_KEY = '6ae9b71e78af7d330b3d1f98899e1d28';
const API_URL = 'https://gnews.io/api/v4/top-headlines?lang=sv&country=se&max=10&q=General&apikey=6ae9b71e78af7d330b3d1f98899e1d28';

async function getNews(category = 'general') {
    NewsContainer.innerHTML = '<p>Laddar nyheter...</p>';

    try {
        const response = await fetch (
            `${API_URL}?
            category=${category}&lang=sv&country=se&max=10&apikey=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error ('Kunde inte hämta nyheter' + response.status);
        }

        const data = await response.json();

        displayNews(data.articles);

    } catch (error) {
        NewsContainer.textContent = 'Kunde inte ladda nyheter.';
        console.log(error);
    }
}

function displayNews(articles) {
    NewsContainer.innerHTML = '';

    if (!articles || articles.length === 0 ) 
        {

        NewsContainer.textContent = 'inga nyheter hittades';
        return;

    }

    articles.forEach(article => {
        const card = document.createElement('article');
        card.classList.add('news-card');

        const image = document.createElement('img');
        image.src = article.image || 'https://placehold.co/600x400';
        image.alt = '';

        const content = document.createElement('div');
        content.classList.add('news-content');

        const title = document.createElement('h3');
        title.textContent = article.title;

        const description = document.createElement('p');
        description.textContent = article.description || '';

        const link = document.createElement('a');
        link.href = article.url;
        link.textContent = 'Läs mer'
        link.target = '_blank';
        link.rel = 'noopener noreferrer';

        content.append(title, description, link);
        card.append(image, content);
        NewsContainer.appendChild(card);
    });
}

categoryBtns.forEach(button => {
    button.addEventListener('click', () => {
    const category = button.dataset.category;

    sectionTitle.textContent = button.textContent;

    getNews(category);

    categoryMenu.hidden = true;
    menuBtn.setAttribute('aria-expanded','false');
   });
});

searchForm.addEventListener('submit', async event => {
    event.preventDefault();

    const searchTerm =
    searchInput.value.trim();

    if(!searchTerm) return;

    NewsContainer.innerHTML = '<p>Söker nyheter...</p>';

    try {
        const response = await fetch (
            `https://gnews.io/api/v4/search?q=${encodeURIComponent(searchTerm)}&lang=sv&country=se&max=10&apikey=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error('Sökningen misslyckades');
        }

        const data = await response.json();
        displayNews(data.articles);

        sectionTitle.textContent = 'Sökresultat';

    } catch (error) {
        NewsContainer.textContent = 'Kunde inte söka efter nyheter.';
        console.log(error);
    }
});

menuBtn.addEventListener('click', () => {
    const IsOpen = menuBtn.getAttribute('Aria-expanded') === 'true';
    categoryMenu.hidden = IsOpen;
    menuBtn.setAttribute('aria-expanded', String(!IsOpen));
});

//getNews();