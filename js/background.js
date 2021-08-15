const imageList = ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg"];

const choosenImage = imageList[Math.floor(Math.random() * imageList.length)]

const element = document.createElement("img")
element.src = `img/${choosenImage}`;

element.classList.add("bg-image");

document.body.appendChild(element);