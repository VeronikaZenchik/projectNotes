const colors = {
  YELLOW: '#F3DB7D',
  GREEN: '#C2F37D',
  BLUE: '#7DE1F3',
  RED: '#F37D7D',
  PURPLE: '#E77DF3',
}

const MOCK_NOTES = [
  {
  id: 1,
  title: 'Работа с формами',
  content: 'К определённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте name',
  color: colors.PURPLE,  
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
  isShowOnlyFavorite: false,

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
toggleShowOnlyFavorite(isShowOnlyFavorite) { 
  this.isShowOnlyFavorite = !this.isShowOnlyFavorite;
  this.updateNotesView();
},
  updateNotesView() {
    const notesToRender = this.isShowOnlyFavorite
      ? this.notes.filter(note => note.isFavorite)
      : this.notes;

    view.renderNotes(notesToRender);
    view.renderNotesCount(notesToRender.length);
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

      const colorMap = { // можно ли как-то иначе, очень запуталась с этими цветами, почему не получалось как в предложенном варианте
        green: colors.GREEN,
        blue: colors.BLUE,
        red: colors.RED,
        yellow: colors.YELLOW,
        purple: colors.PURPLE,
      };

      controller.addNote(title, content, colorMap[color])
      input.value = '';
      textarea.value = '';
    })

    const onlyFavorite = document.querySelector('.filter-box');
    onlyFavorite.innerHTML = `
    <input class="checkbox" type="checkbox" name="favorite" value="only-favorite">
    <p id="toggle-favorite-button">Показать только избранные заметки</p>
    `

    document.querySelector('.checkbox').addEventListener('click', () => {
      controller.toggleShowOnlyFavorite();
    });
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
        <li id="${note.id}" class="${note.isFavorite ? 'done' : ''}">
        <div class="title-content">
          <b class="note-title" style="background-color: ${note.color};">${note.title}
          <div class="buttons-note">
          <button class="favourite-button" type="button" style="background-color: ${note.color};">
            <img src="${note.isFavorite ? './images/icons/heart-active.png' : './images/icons/heart-inactive.png'}" alt="heart">
          </button>
          <button class="delete-button" type="button"  style="background-color: ${note.color};">
          <img src="./images/icons/trash.png" alt="trash">
          </button>
          </div>
          </b>
          <p class="note-content">${note.content}</p>
          </div>
          </li>
      `
    }
    notesList.innerHTML = `<div class="note-container"><ul class="view-notes">${noteHTML}</ul></div>`
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
  toggleShowOnlyFavorite() {
    model.toggleShowOnlyFavorite();
  },
}


function viewDefault() {
  view.init()
}
viewDefault()



