/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function createNavigation() {
  const sections = document.getElementsByTagName('section');

  const navs = document.getElementsByTagName('nav');
  const navUls = navs[0].getElementsByTagName('ul');
  const navUl = navUls[0];

  for (const section of sections) {
    // Reference: https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
    const navContent = section.dataset.nav;
    const idValue = navContent.toLowerCase().split(' ').join('');

    const a = document.createElement('a');
    const aTextNode = document.createTextNode(navContent);
    a.appendChild(aTextNode);
    a.href = "#" + idValue;

    const li = document.createElement('li');
    li.appendChild(a);
    navUl.appendChild(li);
  }
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
document.addEventListener('DOMContentLoaded', function () {
  createNavigation();
});



// build the nav


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


