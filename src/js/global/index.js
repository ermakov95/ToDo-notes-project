// Стартовые заметки
let dataNotes
if (localStorage.getItem('todo')) {
    dataNotes = JSON.parse(localStorage.getItem('todo'))
} else {
    dataNotes = [
        [0, 'Название заметки', [[false, 'Lorem, ipsum dolor sit amet'], [true, 'Сonsectetur adipisicing elit'], [false, 'Autem veniam quam dolorem']]],
        [1, 'Заметка с длинным названием', [[true, 'Autem veniam quam dolorem'], [false, 'Lorem, ipsum dolor sit amet'], [true, 'Сonsectetur adipisicing elit']]],
        [3, 'Заметка с очень длинным названием', [[false, 'Сonsectetur adipisicing elit'], [true, 'Autem veniam quam dolorem'], [false, 'Lorem, ipsum dolor sit amet']]],
        [5, 'Название заметки', [[false, 'Lorem, ipsum dolor sit amet'], [true, 'Сonsectetur adipisicing elit'], [false, 'Autem veniam quam dolorem']]],
        [6, 'Заметка с длинным названием', [[true, 'Autem veniam quam dolorem'], [false, 'Lorem, ipsum dolor sit amet'], [true, 'Сonsectetur adipisicing elit']]],
        [8, 'Заметка с очень длинным названием', [[false, 'Сonsectetur adipisicing elit'], [true, 'Autem veniam quam dolorem'], [false, 'Lorem, ipsum dolor sit amet']]],
        [10, '<button> Заметка </button>', [[false, 'Lorem, ipsum dolor sit amet'], [true, 'Сonsectetur adipisicing elit'], [false, 'Autem veniam <br> quam dolorem']]],
        [11, 'Заметка с длинным названием', [[true, 'Autem veniam <br> quam dolorem'], [false, 'Lorem, ipsum dolor sit amet'], [true, 'Сonsectetur adipisicing elit']]],
        [13, 'Заметка с очень <br> длинным названием', [[false, 'Сonsectetur adipisicing elit'], [true, 'Autem veniam <br> quam dolorem'], [false, 'Lorem, ipsum dolor sit amet']]],
    ]
}

// Отрисовываем заметки
const allNotes = document.getElementsByClassName('note')
const divNotes = document.querySelector('.notes') 

const rendering = () => {
    const arrayAllId = []
    for (element of allNotes) { // Учитываем все отрисованные заметки из DOM
        arrayAllId.push(element.id)
    };

    for (note of dataNotes) {

        if (arrayAllId.includes(`${note[0]}-note`) === true) { continue } // Проверяем что заметка отсутсвует в DOM

        // Рисуем заметку
        const newNote = document.createElement(`div`)
        newNote.className = 'note'
        newNote.id = `${note[0]}-note`

        const noteTitle = document.createElement(`div`)
        noteTitle.className = 'note__title'
        noteTitle.append(note[1])

        const noteText = document.createElement(`div`)
        noteText.className = 'note__text'
        for (todo of note[2]) {
            noteText.append(todo[1])
            noteText.insertAdjacentHTML('beforeend', '<br>')
        }

        newNote.append(noteTitle)
        newNote.append(noteText)
        divNotes.append(newNote)
    } 

    localStorage.setItem('todo', JSON.stringify(dataNotes))  
}
rendering()

const divWrap = document.querySelector('.wrap')
const divEdit = document.querySelector('.edit') 
const divEditInfo = document.querySelector('.edit__info') 
const divEditTitle = document.querySelector('.edit__title') 
const divEditTodos = document.querySelector('.edit__todos') 
const editAddTodo = document.querySelector('.edit__add-todo') 
const allTodo = document.getElementsByClassName('edit__todo')
const divPopup = document.querySelector('.popup');
const divPopupInner = document.querySelector('.popup-inner');

let mainMode = 'main' // main / new / old
let popupMode = 'none' // none / cancel / delete
let countTodo = 0 // Количество отрисованных todo
let idNote // ID заметки
let iNote // Место заметки в базе

const editNote = (mode = 'main', title = '', todos = '', count = 0, id = null, i = null ) => { // Функция при создании или редактировании заметки
    mainMode = mode
    divEditTitle.value = title
    divEditTodos.innerHTML = todos
    countTodo = count
    idNote = id
    iNote = i
}

// Отслеживаем клики и делигируем
document.addEventListener('click', (event) => {

    if (event.target.closest('.new-note')) { // Кнопка Новая заметка

        divWrap.classList.toggle('main-page')
        divWrap.classList.toggle('edit-page')
        editNote('new')

    } else if (event.target.closest('.note')) { // Редактирование старой заметки

        divWrap.classList.toggle('main-page')
        divWrap.classList.toggle('edit-page')

        // Находим idNote заметки
        if (event.target.closest('.note__title') || event.target.closest('.note__text')) {
            idNote = event.path[1].id
        } else { idNote = event.path[0].id }
        
        idNote = +idNote.match(/\d+/)
        console.log(idNote)

        // Находим заметку
        let oldNote
        iNote = 0
        for (note of dataNotes) {
            if (idNote === +note[0]) { 
                oldNote = note
                break
            }
            iNote++
        }
        // Верстаем todos
        countTodo = 0
        let todos = ''
        for (todo of oldNote[2]) {
            todos += `
            <div id="${countTodo}-todo" class="edit__todo">
                <input type="checkbox", ${todo[0] ? 'checked' : ''}>
                <input type="text", placeholder="Название todo ${countTodo++}", value="${todo[1]}">
                <button>X</button>
            </div>`
        }

        editNote('old', oldNote[1], todos, countTodo, idNote, iNote)

    } else if (event.target.closest('.edit__add-todo')) { // Кнопка Добавить новый todo

        divEditTodos.insertAdjacentHTML('beforeend', `
        <div id="${countTodo}-todo" class="edit__todo">
            <input type="checkbox">
            <input type="text", placeholder="Название todo ${countTodo++}">
            <button>X</button>
        </div>`
        )

    } else if (event.target.closest('.edit__todo button')) { // Кнопка Удалить todo

        allTodo[event.path[1].id].remove()

    } else if (event.target.closest('.save-note')) { // Кнопка Сохранить изменения

        const todos = []
        // Обход todo
        for (todo of allTodo) { 
            const inputs = todo.querySelectorAll('input')
            // Если todo не пустой - добавляем в массив
            if (inputs[1].value) { 
                todos.push([inputs[0].checked, inputs[1].value])
            }
        }
        // Если массив todos не пустой и есть заголовок заметки - добавляем в dataNotes
        if (divEditTitle.value && todos.length !== 0) { 
            
            if (mainMode === 'new') { // При создании новой заметки
                dataNotes.push([dataNotes[dataNotes.length-1][0]+1, divEditTitle.value, todos])

            } else if (mainMode === 'old') { // При редактировании старой заметки
                dataNotes[iNote] = [idNote, divEditTitle.value, todos]
            }
            // Отрисовываем 
            rendering() 
            divWrap.classList.toggle('main-page')
            divWrap.classList.toggle('edit-page')
            mode = 'main'
            divEditInfo.style.display = 'none'
        } else { // Иначе выводим строку "*Добавьте название заметки и минимум 1 непустой todo"
            divEditInfo.style.display = 'block'
        }

        editNote()

    } else if (event.target.closest('.cancel-note')) { // Кнопка Отменить редактирование

        popupMode = 'cancel'
        divPopupInner.querySelectorAll('span')[0].style.display='block'
        divPopup.classList.add('active');
        divPopupInner.classList.add('active')

    } else if (event.target.closest('.delete-note')) { // Кнопка Удалить заметку

        popupMode = 'delete'
        divPopupInner.querySelectorAll('span')[1].style.display='block'
        divPopup.classList.add('active');
        divPopupInner.classList.add('active')

    } else if (event.target.closest('.popup__no') || event.target === divPopup) { // Кнопка Нет поп-апа или клик на фон

        popupMode = 'none'
        divPopup.classList.remove('active');
        divPopupInner.classList.remove('active')
        divPopupInner.querySelectorAll('span')[0].style.display='none'
        divPopupInner.querySelectorAll('span')[1].style.display='none'

    } else if (event.target.closest('.popup__yes')) { // Кнопка Да поп-апа

        if (popupMode === 'delete' && mainMode === 'old') { // Действия при удалении старой заметки
            dataNotes.splice(iNote, 1)
            allNotes[`${idNote}-note`].remove()
        }

        rendering()
        editNote()
        popupMode = 'none'

        divPopup.classList.remove('active');
        divPopupInner.classList.remove('active')
        divPopupInner.querySelectorAll('span')[0].style.display='none'
        divPopupInner.querySelectorAll('span')[1].style.display='none'

        divWrap.classList.toggle('main-page')
        divWrap.classList.toggle('edit-page')
        divEditInfo.style.display = 'none'
    }
})
