const makeBigger = () => {
    document.querySelector(".contentp").style.fontSize = "larger";
};

const makeSmaller = () => {
    document.querySelector(".contentp").style.fontSize = "smaller";
};


document.querySelector(".a1").onclick = makeBigger;
document.querySelector(".a2").onclick = makeSmaller;
