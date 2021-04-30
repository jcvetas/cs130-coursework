const defaultTheme = () => {
    document.querySelector("body > div").className = "default";
};

const oceanTheme = () => {
    document.querySelector("body > div").className = "ocean";
};

const desertTheme = () => {
    document.querySelector("body > div").className = "desert";
};


document.querySelector("a#default").onclick = defaultTheme;
document.querySelector("a#ocean").onclick = oceanTheme;
document.querySelector("a#desert").onclick = desertTheme;

