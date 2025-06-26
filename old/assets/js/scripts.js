const header = document.querySelector("#header");

document.addEventListener("DOMContentLoaded",
    window.onscroll = () => {       
        if (window.scrollY <= 80) { 
            header.classList.remove("blurry");
        } else { 
            header.classList.add("blurry");
        }
    }
);

const year = document.querySelector("#year");

year.innerText = new Date().getFullYear();