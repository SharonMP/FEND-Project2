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

const activeClass = 'active__class';
const menuLink = '.menu__link';
const sectionString = 'section';
const sectionNamePrefix = 'Section ';

function addNewSection() {
  const currentSections = document.getElementsByTagName(sectionString);
  const numSections = currentSections.length;

  const pNode = document.createElement('p');
  const pTextNode = document.createTextNode('Some new content.');
  pNode.appendChild(pTextNode);

  const h2Node = document.createElement('h2');
  const h2TextNode = document.createTextNode(sectionNamePrefix + (numSections + 1));
  h2Node.appendChild(h2TextNode);

  const divNode = document.createElement('div');
  divNode.appendChild(h2Node);
  divNode.appendChild(pNode);
  divNode.classList.add("landing__container")

  const sectionNode = document.createElement(sectionString);
  sectionNode.appendChild(divNode);
  sectionNode.id = sectionString + (numSections + 1);
  sectionNode.dataset.nav = sectionNamePrefix + (numSections + 1);

  const mainNodes = document.getElementsByTagName('main');
  const mainNode = mainNodes[0];
  mainNode.appendChild(sectionNode);
}

function createNavigation() {
  const sections = document.getElementsByTagName(sectionString);

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
    a.className = menuLink;

    const li = document.createElement('li');
    li.id = 'li-' + idValue;
    li.appendChild(a);
    navUl.appendChild(li);
  }
}

function addScrolling() {
  const navLinks = document.getElementsByClassName(menuLink);
  for (const navLink of navLinks) {
    navLink.addEventListener('click', function (event) {
      const sectionId = this.getAttribute('href').substring(1);
      const sectionElement = document.getElementById(sectionId);

      // Scroll into view
      sectionElement.scrollIntoView({behavior: 'smooth'});

      event.preventDefault();
    });
  }
}

/**
In order to make the sections active, we start with the Udacity Answer from a mentor at
https://knowledge.udacity.com/questions/85408

Rather than hardcode the value `150`, we use the window.innerHeight and document.documentElement.clientHeight as
suggested in another mentor answer at https://knowledge.udacity.com/questions/124306

Since the footer is quite long, there is an edge case to handle for the last section. We add the top value of the
footer to box.bottom to ensure that section 4 is highlighted as long as it is visible in the viewport.
*/
function makeActive() {
  const sections = document.getElementsByTagName(sectionString);
  for (const section of sections) {
    const box = section.getBoundingClientRect();

    const footerElement = document.getElementsByClassName('page__footer')[0];
    const footerBox = footerElement.getBoundingClientRect();

    let bottomValue = box.bottom;
    if (section.id == 'section4') {
      bottomValue = box.bottom + footerBox.top;
    }

    if ((box.top <= window.innerHeight || box.top <= document.documentElement.clientHeight)
    && (bottomValue >= window.innerHeight || bottomValue >= document.documentElement.clientHeight)) {
          // Apply active state on the current section and the corresponding Nav link.
          section.classList.add(activeClass);
          const navLiElement = document.getElementById('li-' + section.id);
          navLiElement.classList.add(activeClass);
    } else {
          // Remove active state from other section and corresponding Nav link.
          section.classList.remove(activeClass);
          const navLiElement = document.getElementById('li-' + section.id);
          navLiElement.classList.remove(activeClass);
    }
  }
}

function changeNavbarMenuState(state) {
  const navBarElement = document.getElementsByClassName('navbar__menu')[0];
  navBarElement.style.display = state;
}

function hideNavigationAfterScroll() {
  let timeoutValue = null;
  document.addEventListener('scroll', function () {
    // Once scroll resumes, show the navbar menu and clear the timeout value
    if (timeoutValue != null) {
      changeNavbarMenuState('block');
      clearTimeout(timeoutValue);
    }
    // Set timeout to 1 second and hide navbar menu
    timeoutValue = setTimeout(function() {
      changeNavbarMenuState('none');
    }, 1000);

    makeActive();
  });
}

document.addEventListener('DOMContentLoaded', function () {
  addNewSection();
  createNavigation();
  addScrolling();
  hideNavigationAfterScroll();
});
