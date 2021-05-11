/**
 * @author Asik <asikpradhan@gmail.com>
 *
 */


const inactivate = (node) => {
    node.classList.remove("active");
    node.querySelectorAll(":scope > .horizontal-accordion-fold--content").forEach(item => {
        item.setAttribute("aria-expanded", false);
        item.removeAttribute("aria-disabled");
    });
};
const activate = (node) => {
    node.classList.add("active");
    node.querySelectorAll(":scope > .horizontal-accordion-fold--content").forEach(item => {
        item.setAttribute("aria-expanded", true);
        item.setAttribute("aria-disabled", true);

    });
};

const accordions = document.getElementsByClassName("horizontal-accordion");

Array.from(accordions).forEach(accordion => {
    Array.from(accordion.children).forEach((child, index) => {
        if (index !== 0) {
            inactivate(child);
        } else {
            activate(child);
        }
    });
    const triggers = Array.prototype.slice.call(accordion.querySelectorAll('.horizontal-accordion-fold--button'));
    accordion.addEventListener('keydown', (event) => {
        const target = event.target;
        const key = event.which.toString();
        const ctrlModifier = (event.ctrlKey && key.match(/33|34/));
        if (target.classList.contains('horizontal-accordion-fold--button')) {

            if (key.match(/38|40/) || ctrlModifier) {
                const index = triggers.indexOf(target);
                const direction = (key.match(/34|40/)) ? 1 : -1;
                const length = triggers.length;
                const newIndex = (index + length + direction) % length;

                triggers[newIndex].focus();
                inActivateAll(triggers[newIndex]);
                activate(triggers[newIndex].parentNode);
                event.preventDefault();
            } else if (key.match(/35|36/)) {
                // 35 = End, 36 = Home keyboard operations
                switch (key) {
                    // Go to first accordion
                    case '36':
                        triggers[0].focus();
                        inActivateAll(triggers[0]);
                        activate(triggers[0].parentNode);
                        break;
                    // Go to last accordion
                    case '35':
                        triggers[triggers.length - 1].focus();
                        inActivateAll(triggers[triggers.length - 1]);
                        activate(triggers[triggers.length - 1].parentNode);
                        break;
                }
                event.preventDefault();

            }
        }
    });

});
const inActivateAll = (current) => {
    const accordionNode = current.parentNode.parentNode;
    accordionNode.querySelectorAll(":scope > .horizontal-accordion-fold").forEach(item => {
        inactivate(item);
    });
};

const accordionButtons = document.getElementsByClassName("horizontal-accordion-fold--button");
Array.from(accordionButtons).forEach(accordionButton => {
    accordionButton.addEventListener("click", evt => {
        inActivateAll(evt.currentTarget);
        const parentNode = evt.currentTarget.parentNode;
        activate(parentNode);
    });
});