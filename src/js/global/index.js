// Стартовые заметки
let dataNotes
if (localStorage.getItem('todo')) {
    dataNotes = JSON.parse(localStorage.getItem('todo'))
} else {
    dataNotes = [
        [0, 'Название заметки', [[false, 'Lorem, ipsum dolor sit amet'], [true, 'consectetur adipisicing elit'], [false, 'Autem veniam quam dolorem']]],
        [1, 'Заметка с длинным названием', [[true, 'Autem veniam quam dolorem'], [false, 'Lorem, ipsum dolor sit amet'], [true, 'consectetur adipisicing elit']]],
        [2, 'Заметка с очень длинным названием', [[false, 'consectetur adipisicing elit'], [true, 'Autem veniam quam dolorem'], [false, 'Lorem, ipsum dolor sit amet']]],
        [3, 'Название заметки', [[false, 'Lorem, ipsum dolor sit amet'], [true, 'consectetur adipisicing elit'], [false, 'Autem veniam quam dolorem']]],
        [4, 'Заметка с длинным названием', [[true, 'Autem veniam quam dolorem'], [false, 'Lorem, ipsum dolor sit amet'], [true, 'consectetur adipisicing elit']]],
        [5, 'Заметка с очень длинным названием', [[false, 'consectetur adipisicing elit'], [true, 'Autem veniam quam dolorem'], [false, 'Lorem, ipsum dolor sit amet']]],
    ]
}

// Отрисовываем заметки
const allNotes = document.getElementsByClassName('note')
const divNotes = document.querySelector('.notes') 

const rendering = () => {
    const arrayAllId = []
    for (element of allNotes) { // Учитываем все заметки из DOM
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
const buttons = document.querySelector('.buttons');
const divEdit = document.querySelector('.edit') 
const divEditInfo = document.querySelector('.edit__info') 
const divEditTitle = document.querySelector('.edit__title') 
const divEditTodos = document.querySelector('.edit__todos') 
const editAddTodo = document.querySelector('.edit__add-todo') 
const allTodo = document.getElementsByClassName('edit__todo')

let mode = 'main'
let countTodo = 0

const newNote = () => { // Функция при создании новой заметки
    mode = 'new'
    countTodo = 0
    divEditTitle.value = ''
    divEditTodos.innerHTML = '' 
}

// Отслеживаем клики и делигируем
divWrap.addEventListener('click', (event) => {

    if (event.target.closest('.new-note')) { // Кнопка Новая заметка

        divWrap.classList.toggle('main-page')
        divWrap.classList.toggle('edit-page')
        newNote()

    } else if (event.target.closest('.edit__add-todo')) { // Кнопка Добавить новый todo

        divEditTodos.insertAdjacentHTML('beforeend', `
        <div id="${countTodo}-todo" class="edit__todo">
            <input type="checkbox">
            <input placeholder="Название todo ${countTodo++}">
            <button>X</button>
        </div>`
        )

    } else if (event.target.closest('.edit__todo button')) { // Кнопка Удалить todo

        allTodo[event.path[1].id].remove()

    } else if (event.target.closest('.save-note')) { // Кнопка Сохранить изменения
        if (mode === 'new') { // Режим создания новой заметки
            const todos = []
            for (todo of allTodo) { // Обход todo
                const inputs = todo.querySelectorAll('input')
                if (inputs[1].value) { // Если todo не пустой - добавляем в массив
                    todos.push([inputs[0].checked, inputs[1].value])
                }
            }
            // Если массив todos не пустой и есть заголовок - добавляем в dataNotes
            if (divEditTitle.value && todos.length !== 0) { 
                dataNotes.push([dataNotes[dataNotes.length-1][0]+1, divEditTitle.value, todos])
                rendering() // Отрисовываем 
                divWrap.classList.toggle('main-page')
                divWrap.classList.toggle('edit-page')
                mode = 'main'
                divEditInfo.style.display = 'none'
            } else {
                divEditInfo.style.display = 'block'
            }

        }
    }
})
