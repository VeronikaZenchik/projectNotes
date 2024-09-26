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

const colors = {
  GREEN: 'green',
  BLUE: 'blue',
  RED: 'red',
  YELLOW: 'yellow',
  PURPLE: 'purple',
}

const model = {
notes: MOCK_NOTES,
addNotes(){},
deleteNotes(){},
addFavouritesNotes(){},
}


const view = {
  init() {
    this.renderNotes(model.notes)
  },



  renderNotes(notes) {
    // находим контейнер для заметок и рендерим заметки в него (если заметок нет, отображаем соответствующий текст)
    // также здесь можно будет повесить обработчики кликов на кнопки удаления и избранного

    const notesList = document.querySelector('.notes-list')

    // Проверка наличия заметок
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
  }
}



const controller = {}


function viewDefault() {
  view.init()
}
viewDefault()


