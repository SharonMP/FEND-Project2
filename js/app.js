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

function addNewSection() {
  const currentSections = document.getElementsByTagName('section');
  const numSections = currentSections.length;

  const pNode = document.createElement('p');
  const pTextNode = document.createTextNode("Some new content.");
  pNode.appendChild(pTextNode);

  const h2Node = document.createElement('h2');
  const h2TextNode = document.createTextNode("Section " + (numSections + 1));
  h2Node.appendChild(h2TextNode);

  const divNode = document.createElement('div');
  divNode.appendChild(h2Node);
  divNode.appendChild(pNode);
  divNode.classList.add("landing__container")

  const sectionNode = document.createElement('section');
  sectionNode.appendChild(divNode);
  sectionNode.id = "section" + (numSections + 1);
  sectionNode.dataset.nav = "Section " + (numSections + 1);

  const mainNodes = document.getElementsByTagName('main');
  const mainNode = mainNodes[0];
  mainNode.appendChild(sectionNode);
}

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
    a.className = ".menu__link";

    const li = document.createElement('li');
    li.appendChild(a);
    navUl.appendChild(li);
  }
}

function addScrolling() {
  const navLinks = document.getElementsByClassName('.menu__link');
  for (const navLink of navLinks) {
    navLink.addEventListener('click', function (event) {
      const sectionId = this.getAttribute('href').substring(1);
      const sectionElement = document.getElementById(sectionId);

      // Remove and add the CSS class
      const elementsWithActiveClass = document.getElementsByClassName('active__class');
      for (const element of elementsWithActiveClass) {
        element.classList.remove('active__class');
      }
      sectionElement.classList.add('active__class');

      // Scroll into view
      sectionElement.scrollIntoView({behavior: 'smooth'});

      event.preventDefault();
    });
  }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
document.addEventListener('DOMContentLoaded', function () {
  addNewSection();
  createNavigation();
  addScrolling();
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


