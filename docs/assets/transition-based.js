const inActivateAll = () => {
    const accordions = document.getElementsByClassName("accordion-fixed-item");
    Array.from(accordions).forEach(accordion => {
        accordion.classList.remove("active");
    });
};

const header = document.getElementsByClassName("accordion-fixed-item--button");
for (let i = 0; i < header.length; i++) {
    header[i].addEventListener("click", (event) => {
        inActivateAll();
        event.currentTarget.parentNode.classList.toggle("active");
    });
}