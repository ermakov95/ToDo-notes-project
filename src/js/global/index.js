// Стартовые заметки
let dataNotes
if (localStorage.getItem('todo')) {
    dataNotes = JSON.parse(localStorage.getItem('todo'))
} else {
    dataNotes = [
        [0, 'Название заметки', [[true, 'Выполненный todo италиком'], [false, 'Невыполненный todo'], [true, 'Выполненный todo италиком'], [false, 'Невыполненный todo']]],
        [1, 'Название заметки', [[false, 'Lorem, ipsum dolor sit amet'], [true, 'Сonsectetur adipisicing elit'], [false, 'Autem veniam quam dolorem']]],
        [3, 'Заметка с длинным названием', [[true, 'Autem veniam quam dolorem'], [false, 'Lorem, ipsum dolor sit amet'], [true, 'Сonsectetur adipisicing elit']]],
        [5, 'Заметка с очень длинным названием', [[false, 'Сonsectetur adipisicing elit'], [true, 'Autem veniam quam dolorem'], [false, 'Lorem, ipsum dolor sit amet']]],
        [6, 'Название <span> заметки </span>', [[false, 'Lorem, ipsum <br> dolor sit amet'], [true, 'Сonsectetur adipisicing elit'], [false, 'Autem veniam quam dolorem']]],
        [8, 'Заметка с длинным названием', [[true, 'Autem veniam quam dolorem'], [false, 'Lorem, ipsum dolor sit amet'], [true, 'Сonsectetur adipisicing elit']]],
        [9, 'Заметка с очень длинным названием', [[false, 'Сonsectetur adipisicing elit'], [true, 'Autem veniam quam dolorem'], [false, 'Lorem, ipsum dolor sit amet']]],
        [12, '<button> Заметка </button>', [[false, 'Lorem, ipsum dolor sit amet'], [true, 'Сonsectetur adipisicing elit'], [false, 'Autem veniam <br> quam dolorem']]],
        [14, 'Заметка с длинным названием', [[true, 'Autem veniam <br> quam dolorem'], [false, 'Lorem, ipsum dolor sit amet'], [true, 'Сonsectetur adipisicing elit']]],
        [15, 'Заметка с очень <br> длинным названием', [[false, 'Сonsectetur adipisicing elit'], [true, 'Autem veniam <br> quam dolorem'], [false, 'Lorem, ipsum dolor sit amet']]],
    ]
}

// Отрисовываем заметки
const allNotes = document.getElementsByClassName('note') // Живая коллекция заметок с главной страницы
const divNotes = document.querySelector('.notes') 

const rendering = () => {
    const arrayAllId = []
    for (element of allNotes) { // Учитываем все ранее отрисованные заметки из DOM
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
            if (todo[0]) {
                const italicSpan = document.createElement(`span`)
                italicSpan.className = 'it'
                italicSpan.append(todo[1])

                noteText.append(italicSpan)
                noteText.insertAdjacentHTML('beforeend', '<br>')
            } else {
                noteText.append(todo[1])
                noteText.insertAdjacentHTML('beforeend', '<br>')
            }
        }
        const noteDelete = document.createElement(`button`)
        noteDelete.className = 'note__delete'
        noteDelete.append('Х')

        newNote.append(noteTitle)
        newNote.append(noteText)
        newNote.append(noteDelete)
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
const allTodo = document.getElementsByClassName('edit__todo') // Живая коллекция todo со страницы создания или редактирования заметок
const divPopup = document.querySelector('.popup');
const divPopupInner = document.querySelector('.popup-inner');

let mainMode = 'main' // main / new / old
let popupMode = 'none' // none / cancel / delete
let countTodo = 0 // Количество созданных todo
let idNote // ID заметки
let iNote // Место заметки в базе

const editNote = (mode = 'main', title = '', todos = '', count = 0, id = null, i = null ) => { // Функция установки переменных
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

        divWrap.classList.remove('main-page')
        divWrap.classList.add('edit-page')
        editNote('new')

    } else if (event.target.closest('.note') && !event.target.closest('.note__delete')) { // Редактирование старой заметки

        divWrap.classList.remove('main-page')
        divWrap.classList.add('edit-page')
        // Находим idNote заметки
        if (event.target.closest('.it') || event.target.closest('br')) {
            idNote = event.path[2].id
        } else if (event.target.closest('.note__title') || event.target.closest('.note__text') ) {
            idNote = event.path[1].id 
        } else { 
            idNote = event.path[0].id 
        }

        idNote = +idNote.match(/\d+/)

        // Находим заметку в базе и её место там
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

        // Передаём данные в DOM
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

        // Собираем непустые todo в todos
        const todos = []
        for (todo of allTodo) { 
            const inputs = todo.querySelectorAll('input')
            // Если todo не пустой - добавляем в массив
            if (inputs[1].value) { 
                todos.push([inputs[0].checked, inputs[1].value])
            }
        }
        // Если массив todos не пустой и есть название заметки:
        if (divEditTitle.value && todos.length > 0) { 

            if (mainMode === 'new') { // При создании новой заметки - просто добавляем в базу dataNotes
                dataNotes.push([dataNotes[dataNotes.length-1][0]+1, divEditTitle.value, todos])

            } else if (mainMode === 'old') { // При редактировании старой заметки - обновляем в базе dataNotes и переотрисовываем
                dataNotes[iNote] = [idNote, divEditTitle.value, todos]

                const note = allNotes[`${idNote}-note`]
                note.firstChild.innerHTML = ''
                note.firstChild.append(divEditTitle.value)
                note.childNodes[1].innerHTML = ''
                todos.forEach(element => {
                    if (element[0]) {
                        const italicSpan = document.createElement(`span`)
                        italicSpan.className = 'it'
                        italicSpan.append(element[1])
        
                        note.childNodes[1].append(italicSpan)
                        note.childNodes[1].insertAdjacentHTML('beforeend', '<br>')
                    } else {
                        note.childNodes[1].append(element[1])
                        note.childNodes[1].insertAdjacentHTML('beforeend', '<br>')
                    }
                });
            }
            // Отрисовываем 
            rendering() 
            divWrap.classList.add('main-page')
            divWrap.classList.remove('edit-page')
            divEditInfo.style.display = 'none'
            editNote()
        // Если массив todos пуст или нет названия - выводим строку "*Добавьте название заметки и минимум 1 непустой todo"
        } else { 
            divEditInfo.style.display = 'block'
        }

    } else if (event.target.closest('.cancel-note')) { // Кнопка Отменить редактирование

        popupMode = 'cancel'
        divPopupInner.querySelectorAll('span')[0].style.display='block'
        divPopup.classList.add('active');
        divPopupInner.classList.add('active')

    } else if (event.target.closest('.delete-note') || event.target.closest('.note__delete')) { // Кнопка Удалить заметку или крестик на заметке

        popupMode = 'delete'
        divPopupInner.querySelectorAll('span')[1].style.display='block'
        divPopup.classList.add('active');
        divPopupInner.classList.add('active')
        if (event.target.closest('.note__delete')) { // Если крестиком на заметке - фиксируем id заметки
            idNote = event.path[1].id
            idNote = +idNote.match(/\d+/)
        }

    } else if (event.target.closest('.popup__no') || event.target === divPopup) { // Кнопка Нет поп-апа или клик на фон

        popupMode = 'none'
        divPopup.classList.remove('active');
        divPopupInner.classList.remove('active')
        divPopupInner.querySelectorAll('span')[0].style.display='none'
        divPopupInner.querySelectorAll('span')[1].style.display='none'
        idNote = null

    } else if (event.target.closest('.popup__yes')) { // Кнопка Да поп-апа

        if (popupMode === 'delete' && mainMode === 'old') { // Действия при удалении старой заметки
            dataNotes.splice(iNote, 1)
            allNotes[`${idNote}-note`].remove()

        } else if (popupMode === 'delete' && mainMode === 'main') { // Действия при удалении заметки крестиком
            allNotes[`${idNote}-note`].remove()
            for (let i = 0; i < dataNotes.length; i++) {
                if (dataNotes[i][0] === idNote) {
                    dataNotes.splice(i, 1)
                    break
                }
            }
        };

        rendering()
        popupMode = 'none'

        divPopup.classList.remove('active');
        divPopupInner.classList.remove('active')
        divPopupInner.querySelectorAll('span')[0].style.display='none'
        divPopupInner.querySelectorAll('span')[1].style.display='none'

        if (mainMode !== 'main') {
            divWrap.classList.add('main-page')
            divWrap.classList.remove('edit-page')
        }
        divEditInfo.style.display = 'none'
        editNote()
    }
})
