const colors = {
  GREEN: 'green',
  BLUE: 'blue',
  RED: 'red',
  YELLOW: 'yellow',
  PURPLE: 'purple',
}

const MOCK_NOTES = [
  {
  id: 1,
  title: 'Работа с формами',
  content: 'К определённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте name',
  color: colors.GREEN,
  isFavorite: false,
},
  {
  id: 2,
  title: 'Просто тестовая заметка',
  content: 'Очень надеюсь, что не потеряю все свои нервные клетки',
  color: colors.BLUE,
  isFavorite: false,
},
]



const model = {
notes: MOCK_NOTES,
addNote(title, content, color){
  const note = {
    id: this.notes.length + 1,
    title,
    content,
    color,
    isFavorite: false,
  };
  this.notes.unshift(note);
  view.renderNotes(this.notes);
  view.renderNotesCount(this.notes.length);
},
deleteNotes(noteId){
  this.notes = this.notes.filter((note) => note.id !== noteId)
    view.renderNotes(this.notes)
    view.renderNotesCount(this.notes.length);
},
addFavouritesNotes(noteId){
  this.notes = this.notes.map((note) => {
      if (note.id === noteId) {
        note.isFavorite = !note.isFavorite
      }
      return note
  })
  view.renderNotes(this.notes);
},
}


const view = {
  init() {
    this.renderNotes(model.notes)
    this.renderNotesCount(model.notes.length)

    const form = document.querySelector(".note-form")
    const input = form.querySelector(".input");
    const textarea = form.querySelector(".text"); 


    form.addEventListener('submit', (event) => {
      event.preventDefault()
      const title = input.value
      const content = textarea.value
      const color = form.querySelector('input[name="color"]:checked').value;

      controller.addNote(title, content, color)
      input.value = '';
      textarea.value = '';
    })
  },

  renderNotes(notes) {
    const notesList = document.querySelector('.notes-list')

  if (notes.length === 0) {
    notesList.innerHTML = `
    <p class="empty-note">У вас нет еще ни одной заметки <br> Заполните поля выше и создайте свою первую заметку!</p>
    `
    return;
  }

    let noteHTML = ''
    for (let i = 0; i < notes.length; i++) {
      const note = notes[i]
      noteHTML = noteHTML + `
        <li id="${note.id}" class="${note.isFavorite ? 'done' : ''}" style="background-color: ${note.color};">
          <b class="task-title">${note.title}</b>
          <p class="task-content">${note.content}</p>
          <button class="delete-button" type="button"><img src="./images/icons/trash.png" alt="trash"></button>
          <button class="favourite-button" type="button"><img src="./images/icons/heart-inactive.png" alt="heart"></button>
        </li>
      `
    }
    notesList.innerHTML = noteHTML
    this.setupEventListeners(); 
  },

  setupEventListeners(){
    const deleteButtons = document.querySelectorAll('.delete-button');
    const favouriteButtons = document.querySelectorAll('.favourite-button');

    deleteButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        const noteId = +event.target.closest('li').id;
        controller.deleteNotes(noteId)
      });
    });
    favouriteButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        const noteId = +event.target.closest('li').id;
        controller.addFavouritesNotes(noteId)
      });
    });
  },

  renderNotesCount(counts){
    const notesCountElement = document.querySelector('.counts-right');
    notesCountElement.textContent = `Всего заметок: ${counts}`;
  },

  showMessage(type,  content = {}) {
  const messageElement = document.querySelector('.messages-box');
  messageElement.innerHTML = '';

  let messageContent = '';

    if (type === 'done') {
      messageContent = `
  <div class="done-note"><img src="./images/icons/done.png" alt="doneNote">Заметка добавлена</div>
  `
    }
    if (type === 'cancel') {
      messageContent  = `
  <div class="cancel-note"><img src="./images/icons/cancel.png" alt="deleteNote">Заметка удалена</div>
  `
    }
    if (type === 'favorite') {
      messageContent  = `
  <div class="favorite-note"><img src="./images/icons/heart-active.png" alt="heart ">Заметка добавлена в избранное</div>
  `
    }
    if (type === 'warning') {
      messageContent = `
        <div class="warning-note"><img src="./images/icons/warning.png" alt="warning">Максимальная длина заголовка - 50 символов</div>
      `;
    }
    

    messageElement.innerHTML = messageContent;

    messageElement.style.display = 'block'; 
    setTimeout(() => {
      messageElement.style.display = 'none'; 
    }, 3000);
  },
}




const controller = {
  addNote(title, content, color) {
    if (title.length > 50) {
      view.showMessage('warning');
    } else {
      model.addNote(title, content, color);
      view.showMessage('done');
    }
  },

  deleteNotes(noteId) {
    model.deleteNotes(noteId)
    view.showMessage('cancel')
  },
  addFavouritesNotes(noteId){
    model.addFavouritesNotes(noteId)
    view.showMessage('favorite')
  },
}


function viewDefault() {
  view.init()
}
viewDefault()



