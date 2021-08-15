const quote = document.querySelector("#quote span:first-child")
const author = document.querySelector("#quote span:last-child")

const quotesList = [
    {
        quote : "나만이 내 인생을 바꿀 수 있다. 아무도 날 대신해 해줄 수 없다.",
        author : "캐롤 버넷" 
    },
    {
        quote : "우리는 우리가 어른이 되는 것에서 도망치고 있다고 생각했다. 허나 이제 우리가 어른이 되어버렸다.",
        author : "마가릿 애트우드"
    },  
    {
        quote : "사람들이 너를 내버려두면 삶은 아름다울 거야",
        author : "찰리 채플린"
    },
    {
        quote : "덕이 어디 멀리 있는 것인가? 내가 도덕적이고자 하면, 덕에 이르느니라.",
        author : "공자"
    }
]

const todaysQuote = quotesList[Math.floor(Math.random() * quotesList.length)]

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;

