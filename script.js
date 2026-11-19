const NewsContainer = document.getElementById('news-container');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('site-header');
const sectionTitle = document.getElementById('section-title');

const categoryBtns = document.querySelectorAll('.cat-btn');
const menuBtn = document.getElementById('menu-btn');
const categoryMenu = document.getElementById('category-menu');

const API_KEY = '6ae9b71e78af7d330b3d1f98899e1d28';
const API_URL = 'https://gnews.io/api/v4/top-headlines';

async function getNews(category = 'general') {
    NewsContainer.innerHTML = '<p>Laddar nyheter...</p>';

    try {
        const response = await fetch (
            `${API_URL}?
            category=${category}&lang=sv&country=se&max=10&apikey=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error ('Kunde inte hämta nyheter');
        }

        const data = await response.json();

        displayNews(data.articles);

    } catch (error) {
        NewsContainer.textContent = 'Kunde inte ladda nyheter.';
        console.log(error);
    }
}