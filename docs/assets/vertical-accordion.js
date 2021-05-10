const inActivateAll = (current) => {
    const accordionNode = current.parentNode.parentNode;
    accordionNode.querySelectorAll(":scope > .accordion-item").forEach(item => {
        item.classList.remove("active");

    });
};

const accordionButtons = document.getElementsByClassName("accordion-item--button");
Array.from(accordionButtons).forEach(accordionButton => {
    accordionButton.addEventListener("click", evt => {
        inActivateAll(evt.currentTarget);
        const parentNode = evt.currentTarget.parentNode;
        parentNode.classList.toggle("active");

    });
});