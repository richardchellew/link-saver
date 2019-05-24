const linkCategory = document.querySelector("#linkCategory");
const submitButton = document.querySelector("#submitButton");
const addBtn = document.querySelector('#addBtn');
const cancelBtn = document.querySelector('#cancelButton');
// const addLinkPanel = document.querySelector('#addLinkPanel');
const addedCategories = document.querySelector('#addedCategories');
const addLinkContainer = document.querySelector('#addLinkContainer');

const linksList = document.querySelector('#linksList');

let editIndex = -1;
let linkCategories = [];
let links = [
	{
		title: 'Wes Bos Courses',
		url: 'http://wesbos.com/courses/',
		categories: ['Node', 'ES6', 'Flexbox', 'React'],
		date: new Date()
	},
	{
		title: 'Traversy Media',
		url: 'https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA',
		categories: ['Node', 'CSS', 'Javscript', 'Angular'],
		date: new Date()
	},
	{
		title: 'Colt Steele',
		url: 'https://www.udemy.com/user/coltsteele/',
		categories: ['Node', 'Javascript', 'React', 'MEAN', 'Mongo'],
		date: new Date()
	},

];

displayLinks();

// show formPanel on click '+'
addBtn.addEventListener('click', () => {
  showFormPanel();
});

// hide formPanel on 'cancel'
cancelBtn.addEventListener('click', (event) => {
  event.preventDefault();
  hideFormPanel();
});

// showFormPanel = remove 'hidden' class from full screen container
function showFormPanel() {
  addLinkContainer.classList.remove('hidden');
  displayLinkCategories();
}

// hideFormPanel = add 'hidden' class to full screen container
function hideFormPanel() {
  addLinkContainer.classList.add('hidden');
  clearLinkForm();
}

// linkCategory event listener ',' push to array
linkCategory.addEventListener('keydown', function(event) {
  
  if(event.keyCode === 188) {
    event.preventDefault();
    linkCategories.push(linkCategory.value);
    linkCategory.value = '';
    displayLinkCategories(); // display the updated categories
  }

});

// displayLinkCategories
// add <span> for each category in array, add to DOM
function displayLinkCategories() {
  
  addedCategories.innerHTML = '';
  for(let category of linkCategories) {
    var categoryHTMLString = `<span class="category">${category}</span>`;
    addedCategories.innerHTML += categoryHTMLString;
  }
  
};

// clearLinkForm - reset the form values
function clearLinkForm() {
  linkTitle.value = '';
  linkUrl.value = '';
  linkCategory.value = '';
  linkCategories = [];
}

// submitButton eventListener
submitButton.addEventListener('click', (event) => {
  
  // assign form values to variables
  event.preventDefault();
  const title = linkTitle.value;
  const url = linkUrl.value;
  const categories = linkCategories;

  // create new object
  const newLink = {
    title,
    url,
    categories,
    date: new Date()
  }
  
  // push new link to start of array
  if(editIndex === -1) {
    links.unshift(newLink);
  
  // push modified link to editIndex
  } else {
    links[editIndex] = newLink;
  }

  clearLinkForm(); // clear form
  displayLinkCategories(); // add category spans to DOM
  hideFormPanel(); // hide the addLinkPanel form
  displayLinks(); // display html block

});

// displayLinks - 
function displayLinks() {
  linksList.innerHTML = '';

  // index for blocks
  let index = 0;

  // iterate over objects in array
  for(let link of links) {

    // ES6 string literals to create block
    let linkHTMLString = `
    <div class="flex-item">
      <div class="link panel">
        <div class="link-options">
          <button class="btn-sm" onclick="deleteLink(${index})">Delete</button>
          <button class="btn-sm" onclick="editLink(${index})">Edit</button>
        </div>
        <a href="${link.url}">
          <h1 class="header">${link.title}</h1>
        </a>
        <p class="link-date">${formatDate(link.date)}</p>
        <div class="categories">
          Categories:`;

          // iterate over categories sub-array, add <span>
          for(let category of link.categories) {
            linkHTMLString += `<span class="category">${category}</span>`;
          }

          linkHTMLString += `
            </div>
          </div>     
        </div>     
        `;

    // <div id="linksList"> - insert HTML to DOM element
    linksList.innerHTML += linkHTMLString;
    index++;
  }

};

// deleteLink - given the index, splice out the links array
function deleteLink(index) {
  links.splice(index, 1);
  displayLinks();
};

// editLink - given the index
// set form values to that of array index, show form
function editLink(index) {
  editIndex = index;
  linkTitle.value = links[index].title;
  linkUrl.value = links[index].url;
  linkCategories = links[index].categories;
  showFormPanel();
};

function formatDate(date) {
  return `${("0" + date.getDay()).slice(-2)}/${("0" + (date.getMonth() + 1))}/${date.getFullYear()}`;
}