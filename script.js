
const primaryColor = '#703eca';
let bookListItems = document.getElementById('book-list-items');
let cardBody = document.getElementById('card-body');
let cardHeader = document.getElementById('card-header');
let bookList = [];

(async function getBooks() {
    const API_URL = "https://raw.githubusercontent.com/rezam/expandingpic-widget/main/bookslists.json";
    try {
        const response = await fetch(API_URL);
        books = await response.json();
        showBook(books);
    } catch(err) {
        console.log(err);
    }
})();

function createBookList(book) {
    book.forEach((item, key) => {
        let nodeLi = document.createElement('li');
        nodeLi.appendChild(document.createTextNode(book[key].name));
        bookListItems.appendChild(nodeLi);
        bookList.push(nodeLi);
    });
}

function showBook(book) {
    createBookList(book);

    cardBody.innerHTML = "Please Select a book";
    cardHeader.textContent = "Book Title";

    bookList.forEach((item, key) => {
        item.addEventListener('click', () => {
            bookList.forEach(item => item.style.color = "black");
            cardHeader.textContent = book[key].name;
            cardBody.innerHTML = book[key].content;
            item.style.color = primaryColor;
            docStats(book[key]);
        });
    });
}

function docStats(bookContent) {
    let wordCount = document.getElementById('wordCount');
    let charCount = document.getElementById('charCount');
    let charChountVar = 0;

    let text = bookContent.content;
    let wordArr = text.match(/\b\S+\b/g);
    let wordDic = { item: [], size: [] };
    let topWord = {};

    wordArr.forEach((word, index) => {
        wordDic.item.push(wordArr[index]);
        wordDic.size.push(wordArr[index].length);
        charChountVar += wordArr[index].length;

        let wordValue = wordArr[index];
        topWord[wordValue] > 0 ? topWord[wordValue]++ : topWord[wordValue] = 1;

    });
    
    topWordfunc(topWord);

    wordCount.innerText = "Word count: " + wordArr.length;
    charCount.innerText = "Char count: " + charChountVar;
}

function topWordfunc(word) {
    let mostUsedList = document.getElementById('most-used-list');
    mostUsedList.innerHTML = "";
    let topWordArr = Object.entries(word);
    topWordArr.sort(function(first, second) {
        return second[1] > first[1];
    });
    topWordArr.slice(0, 4).forEach(element => {
        let nodeLi = document.createElement('li');
        nodeLi.appendChild(document.createTextNode(element[0] + ': ' + element[1]));
        mostUsedList.appendChild(nodeLi);
    });
}