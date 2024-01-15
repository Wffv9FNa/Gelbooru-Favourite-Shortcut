// ==UserScript==
// @name        Press F to favorite - Gelbooru
// @namespace   Violentmonkey Scripts
// @description This script provides keyboard shortcuts for Gelbooru. Press 'F' to add the current post or the post of the last hovered link to your favorites. Press 'G' to navigate to the next page unless the search bar is focused. Works on all pages of Gelbooru.
// @match       https://gelbooru.com/*
// @grant       none
// @version     1.0
// @author      https://github.com/Wffv9FNa
// @license     MIT
// ==/UserScript==
var isKeyPressed = {
    f: false, // ASCII code for 'a'
    g: false, // ASCII code for 'g'
    // ... Other keys to check for custom key combinations
};

document.body.addEventListener(
    "mousemove",
    ({ target }) => {
        if (target.parentNode.nodeName !== "A") return;
        window.lastHoveredLink = target.parentNode.href;
    },
    false
);

function getid(u) {
    const urlParams = new URLSearchParams(u);
    const postid = urlParams.get("id");
    return postid;
}

document.onkeydown = (keyDownEvent) => {
    isKeyPressed[keyDownEvent.key] = true;

    // Handle the 'f' key press
    if (isKeyPressed["f"]) {
        const queryString = window.location.search;
        let postid = getid(queryString);
        if (postid == null) {
            postid = getid(window.lastHoveredLink);
        }
        addFav(postid);
        isKeyPressed["f"] = false;  // Reset the state for 'f' key
    }

    // Handle the 'g' key press
    if (keyDownEvent.key === 'g' || keyDownEvent.keyCode === 71) {
        // Check if the search bar is focused
        const searchBar = document.getElementById("tags-search");
        if (document.activeElement !== searchBar) {
            // If search bar is not focused, find the button/link with alt="next"
            const nextButton = document.querySelector('[alt="next"]');

            // If found, simulate a click on it
            if (nextButton) {
                nextButton.click();
            }
        }
        isKeyPressed["g"] = false;  // Reset the state for 'g' key
    }
};