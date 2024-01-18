const persons = document.querySelectorAll('.person');
const rectangles = document.querySelectorAll('.rectangle');

persons.forEach(person => {
  person.addEventListener('dragstart', dragStart);
  person.addEventListener('dragend', dragEnd);
});

rectangles.forEach(rectangle => {
  rectangle.addEventListener('dragover', dragOver);
  rectangle.addEventListener('dragenter', dragEnter);
  rectangle.addEventListener('dragleave', dragLeave);
  rectangle.addEventListener('drop', drop);
});

let draggedPerson = null;

function dragStart() {
  draggedPerson = this;
  setTimeout(() => (this.style.display = 'none'), 0);
}

function dragEnd() {
  draggedPerson.style.display = 'block';
  draggedPerson = null;
}

function dragOver(e) {                    //e oder event = Event-Handler Funktionen 
  e.preventDefault();
  this.style.border = '2px dashed black';
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {
  this.style.border = '1px solid black';
}

function drop() {
  this.style.border = '1px solid black';
  this.appendChild(draggedPerson);


  //sotierung der Flächen bei mehreren Personen + anpassung der Größe 
  const personsInRectangle = this.querySelectorAll('.person');
  const rows = Math.ceil(personsInRectangle.length / 3);
  const newHeight = 350 + (rows - 1) * 50;
  cash = 0;
  this.style.height = `${newHeight}px`;

  const maxPersonsPerRow = 3;         // Festlengen, max Anzahl an Personen in einer Zeile s
  let currentRow = document.createElement('div');
  currentRow.style.display = 'flex';

  personsInRectangle.forEach((person, index) => {
    if (index > 0 &&  cash >= 50) {
      this.appendChild(currentRow);
      currentRow = document.createElement('div');
      currentRow.style.display = 'flex';
      cash = 0;
    } 
    currentRow.appendChild(person);
    cash = cash + person.textContent.length;
    
  });

  if (currentRow.children.length > 0) {
    this.appendChild(currentRow);
  }
  
}


//Person hinzufügen 
let personIdCounter = 11; // Start der Personen ID Vergabe der "Added Peronen"

function addNewPerson() {
  const newPersonNameInput = document.getElementById('newPersonName');
  const newPersonName = newPersonNameInput.value.trim();

  if (newPersonName !== '') {
    const newPerson = document.createElement('div');
    const personId = `person${personIdCounter}`; // Generate person ID
    newPerson.setAttribute('id', personId); // Set the ID attribute
    personIdCounter++; // Increment the counter for the next person

    newPerson.classList.add('person');
    newPerson.draggable = true;
    newPerson.textContent = newPersonName;

    const resetButton = document.createElement('button');
    resetButton.classList.add('reset-btn');
    resetButton.textContent = 'Reset';
    resetButton.setAttribute('onclick', 'resetPosition(this)');
    // Setting onclick attribute to call resetPosition with newPerson
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.textContent = 'X';
    deleteButton.setAttribute('onclick', 'deletePerson(this)');



    newPerson.appendChild(resetButton);
    newPerson.appendChild(deleteButton);

    newPerson.addEventListener('dragstart', dragStart);
    newPerson.addEventListener('dragend', dragEnd);

    document.querySelector('.persons').appendChild(newPerson);

    newPersonNameInput.value = '';
  }
}



// functions for resetting position
            
      function resetPosition(button) {
        const person = button.parentNode;
        const originalPerson = document.getElementById(person.id);
        const personsContainer = document.querySelector('.persons');
      
        originalPerson.style.display = 'block';
        originalPerson.style.order = '';
      
        const originalPersonIndex = Array.from(personsContainer.children).indexOf(originalPerson);
        personsContainer.insertBefore(originalPerson, personsContainer.children[originalPersonIndex]);
      }

      function deletePerson(button) {
        const person = button.parentNode;
        person.remove();
      }