/**
 * @author Asik <asikpradhan@gmail.com>
 *
 */
'use strict';
const test = (a) => {
    return Math.random();
}

console.log(test(12));
console.log(test(14));
function inactivateFold(fold) {
    fold.classList.remove("active");
    fold.querySelectorAll(":scope > .horizontal-accordion-fold--content").forEach(function (item) {
        item.setAttribute("aria-expanded", false);
        item.removeAttribute("aria-disabled");
    });
}

function activateFold(fold) {
    fold.classList.add("active");
    fold.querySelectorAll(":scope > .horizontal-accordion-fold--content").forEach(function (item) {
        item.setAttribute("aria-expanded", true);
        item.setAttribute("aria-disabled", true);
    });
}

function inActivateAllFolds(foldButton) {
    var accordionNode = foldButton.parentNode.parentNode;
    accordionNode.querySelectorAll(":scope > .horizontal-accordion-fold").forEach(function (item) {
        inactivateFold(item);
    });
}

var foldColors = ['maroon', 'purple', 'green', 'blue', 'orange'];

function addFoldColor(fold, index) {
    var hasColor = false;
    foldColors.forEach(function (foldColor) {
        if (fold.classList.contains(foldColor))
            hasColor = true;
    });
    if (!hasColor) {
        var foldColor = foldColors[index % foldColors.length];
        fold.classList.add(foldColor);
        fold.querySelectorAll(":scope > .horizontal-accordion-fold--button")
            .forEach(function (button) {
                button.classList.add("button--" + foldColor);
            });
    }
}

function addFoldClickEvent(accordionButton) {
    accordionButton.addEventListener("click", function (evt) {
        inActivateAllFolds(evt.currentTarget);
        var parentNode = evt.currentTarget.parentNode;
        activateFold(parentNode);
    });
}

var accordions = document.getElementsByClassName("horizontal-accordion");
var accordionButtons = document.getElementsByClassName("horizontal-accordion-fold--button");

Array.from(accordionButtons).forEach(function (accordionButton) {
    addFoldClickEvent(accordionButton);
});
Array.from(accordions).forEach(function (accordion) {
    Array.from(accordion.children).forEach(function (fold, index) {
        if (index !== 0) {
            inactivateFold(fold);
        } else {
            activateFold(fold);
        }
        addFoldColor(fold, index);
    });
    var foldButtons = Array.prototype.slice.call(accordion.querySelectorAll('.horizontal-accordion-fold--button'));
    accordion.addEventListener('keydown', function (event) {
        var target = event.target;
        var key = event.which.toString();
        var ctrlModifier = (event.ctrlKey && key.match(/33|34/));
        if (target.classList.contains('horizontal-accordion-fold--button')) {

            if (key.match(/38|40/) || ctrlModifier) {
                var index = foldButtons.indexOf(target);
                var direction = (key.match(/34|40/)) ? 1 : -1;
                var length = foldButtons.length;
                var newIndex = (index + length + direction) % length;

                foldButtons[newIndex].focus();
                inActivateAllFolds(foldButtons[newIndex]);
                activateFold(foldButtons[newIndex].parentNode);
                event.preventDefault();
            } else if (key.match(/35|36/)) {
                // 35 = End, 36 = Home keyboard operations
                switch (key) {
                    // Go to first accordion
                    case '36':
                        foldButtons[0].focus();
                        inActivateAllFolds(foldButtons[0]);
                        activateFold(foldButtons[0].parentNode);
                        break;
                    // Go to last accordion
                    case '35':
                        foldButtons[foldButtons.length - 1].focus();
                        inActivateAllFolds(foldButtons[foldButtons.length - 1]);
                        activateFold(foldButtons[foldButtons.length - 1].parentNode);
                        break;
                }
                event.preventDefault();
            }
        }
    });

});


