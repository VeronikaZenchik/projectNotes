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
addNotes(title, content, color){
  // 1. создадим новую заметку
  const note = {title, content, color}
  // 2. добавим заметку в начало списка
  this.notes.push(note)
  // 3. обновим view
  view.renderNotes(model.notes)
},
updateNotesView() {
  // 1. рендерит список заметок (вызывает метод view.renderNotes)
  view.renderNotes(model.notes)
  // 2. рендерит количество заметок (вызывает метод view.renderNotesCount)
  view.renderNotesCount(model.notes)
},
deleteNotes(){},
addFavouritesNotes(){},
}


const view = {
  init() {
    this.renderNotes(model.notes)
    this.renderNotesCount(model.notes.length)

    const form = document.querySelector(".note-form")
    form.addEventListener('submit', (event) => {
      event.preventDefault()
      const title = input.value
      const content = textarea.value
      const color = colors
      // получаем данные из полей формы
      // передаем данные в контроллер

      controller.addNote(title, content, color)
    })
  },

  renderNotes(notes) {
    // находим контейнер для заметок и рендерим заметки в него (если заметок нет, отображаем соответствующий текст)
    // также здесь можно будет повесить обработчики кликов на кнопки удаления и избранного

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
        <b class="task-title">${note.title}</b>
        <button class="delete-button" type="button"><img src="./images/icons/trash.png" alt="trash"></button>
        <button class="favourite-button" type="button"><img src="./images/icons/heart-inactive.png" alt="trash"></button>
      </li>
      `
      notesList.innerHTML = noteHTML
    }

    const deleteButtons = document.querySelectorAll('.delete-button');
    const favouriteButtons = document.querySelectorAll('.favourite-button');

    deleteButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        const noteId = event.target.closest('li').id;
        this.deleteNote(noteId);
      });
    });

    favouriteButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        const noteId = event.target.closest('li').id;
        this.toggleFavorite(noteId);
      });
    });
  },


  renderNotesCount(counts){
    const notesCountElement = document.querySelector('.counts-right');
    notesCountElement.textContent = `Всего заметок: ${counts}`;
  }
}



const controller = {
  addNote(title, content, color) {
    // здесь можно добавить валидацию полей
    // your code
    if (title.trim() !== '') {
      model.addNote(title)
    }
    if (content.trim() !== '') {
      model.addNote(content)
    }
    if (color.trim() !== '') {
      model.addNote(color)
    }
    
    // вызываем метод модели
    model.addNote(title, content, color)

    // вызываем метод view, реализацию которого вам нужно будет добавить
    view.showMessage('Заметка добавлена')
  },
}


function viewDefault() {
  view.init()
}
viewDefault()


