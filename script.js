const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const quoteTwitter = document.getElementById("twitter");
const quoteNewQuote = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}
// Show New Quote
function newQuote(){
    loading();
    // Pick Ramdon quote from ApiQuotes array
    const quote= apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    quoteAuthor.textContent = quote.author ? quote.author : "Naveen";
    if(quote.text.length > 50){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text ? quote.text : "Quote was missing, Try to get new quote";
    complete();
  }
// Get Quote From API
async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        alert(error);
        // Catch Error Here
    }
}
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
quoteNewQuote.addEventListener('click',newQuote);
quoteTwitter.addEventListener('click',tweetQuote);
getQuotes();