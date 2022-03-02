'use strict'

// Стартовые заметки
import defaultDataNotes from "../modules/defaultDataNotes.js";
const dataNotes = JSON.parse(localStorage.getItem("todo")) || defaultDataNotes;

// Отрисовываем заметки на главной странице
const allNotes = document.getElementsByClassName("note"); // Живая коллекция заметок с главной страницы
const divNotes = document.querySelector(".notes");

const rendering = () => {
	// Учитываем все ранее отрисованные заметки из DOM
	const arrayAllId = [];
	for (const element of allNotes) {
		arrayAllId.push(element.id);
	}

	for (const note of dataNotes) {
		// Проверяем что заметка отсутсвует в DOM
		if (arrayAllId.includes(`${note[0]}-note`)) {
			continue;
		}
		// Рисуем заметку
		const newNote = document.createElement(`div`);
		newNote.className = "note";
		newNote.id = `${note[0]}-note`;

		const noteTitle = document.createElement(`div`);
		noteTitle.className = "note__title";
		noteTitle.append(note[1]);

		const noteText = document.createElement(`div`);
		noteText.className = "note__text";
		for (const todo of note[2]) {
			if (todo[0]) {
				// Если todo выполнен - рисуем италиком
				const italicSpan = document.createElement(`span`);
				italicSpan.className = "it";
				italicSpan.append(todo[1]);

				noteText.append(italicSpan);
				noteText.insertAdjacentHTML("beforeend", "<br>");
			} else {
				noteText.append(todo[1]);
				noteText.insertAdjacentHTML("beforeend", "<br>");
			}
		}

		const noteDelete = document.createElement(`button`);
		noteDelete.className = "note__delete";
		noteDelete.append("Х");

		newNote.append(noteTitle);
		newNote.append(noteText);
		newNote.append(noteDelete);
		divNotes.append(newNote);
	}
	localStorage.setItem("todo", JSON.stringify(dataNotes));
};
rendering();

const divWrap = document.querySelector(".wrap");
const divEditInfo = document.querySelector(".edit__info");
const divEditTitle = document.querySelector(".edit__title");
const divEditTodos = document.querySelector(".edit__todos");
const allTodo = document.getElementsByClassName("edit__todo"); // Живая коллекция todo со страницы создания или редактирования заметок
const divPopup = document.querySelector(".popup");
const divPopupInner = document.querySelector(".popup-inner");

let createdEventStorage = []; // Буфер совершенных событий на странице редактирования: добавление/удаление todo, переключение чекбокса
let cancelEventStorage = []; // Буфер отменённых событий
let mainMode = "main"; // main - режим на главной странице / new - режим создания новой заметки / old - режим редактирования старой заметки
let popupMode = "none"; // none / cancel / delete / режимы поп-апа
let countTodo = 0; // Количество созданных todo
let idNote; // ID заметки
let iNote; // Место заметки в базе

// Функция установки переменных
const setVars = (
	mode = "main",
	title = "",
	todos = "",
	count = 0,
	id = null,
	i = null,
	createdStorage = [],
	cancelStorage = []
) => {
	mainMode = mode;
	divEditTitle.value = title;
	divEditTodos.innerHTML = todos;
	countTodo = count;
	idNote = id;
	iNote = i;
	createdEventStorage = createdStorage;
	cancelEventStorage = cancelStorage;
};

// Отслеживаем клики и делигируем
document.addEventListener("click", (event) => {
	// Кнопка Новая заметка
	if (event.target.closest(".new-note")) {

		divWrap.classList.remove("main-page");
		divWrap.classList.add("edit-page");
		setVars("new");

		// Редактирование старой заметки
	} else if (
		event.target.closest(".note") &&
		!event.target.closest(".note__delete")
	) {
		divWrap.classList.remove("main-page");
		divWrap.classList.add("edit-page");
		// Находим idNote заметки
		if (event.target.closest(".it") || event.target.closest("br")) {
			idNote = event.path[2].id;
		} else if (
			event.target.closest(".note__title") ||
			event.target.closest(".note__text")
		) {
			idNote = event.path[1].id;
		} else {
			idNote = event.path[0].id;
		}

		idNote = +idNote.match(/\d+/);

		// Находим заметку в базе и её место там
		let oldNote;
		iNote = 0;
		for (const note of dataNotes) {
			if (idNote === +note[0]) {
				oldNote = note;
				break;
			}
			iNote++;
		}
		// Верстаем todos
		countTodo = 0;
		let todos = "";
		for (const todo of oldNote[2]) {
			todos += `
            <div id="${countTodo}-todo" class="edit__todo">
                <input type="checkbox", class="edit__check", ${ todo[0] ? "checked" : ""}>
                <input type="text", placeholder="Название todo ${countTodo++}", value="${todo[1]}">
                <button>X</button>
            </div>`;
		}
		// Передаём данные в DOM для отрисовки Названия заметки и списка todo
		setVars("old", oldNote[1], todos, countTodo, idNote, iNote);

		// Кнопка Добавить новый todo
	} else if (event.target.closest(".edit__add-todo")) {

		createdEventStorage.push(["add-todo", countTodo]);

		divEditTodos.insertAdjacentHTML(
			"beforeend",
			`<div id="${countTodo}-todo" class="edit__todo">
                <input type="checkbox" class="edit__check">
                <input type="text", placeholder="Название todo ${countTodo++}">
                <button>X</button>
            </div>`
		);
		// Кнопка Удалить todo
	} else if (event.target.closest(".edit__todo button")) {

		createdEventStorage.push([
			"remove-todo",
			+event.path[1].id.match(/\d+/),
			allTodo[event.path[1].id],
		]);

		allTodo[event.path[1].id].remove();

		// Кнопка Сохранить изменения
	} else if (event.target.closest(".save-note")) {

		// Собираем непустые todo в todos
		const todos = [];
		for (const todo of allTodo) {
			const inputs = todo.querySelectorAll("input");
			if (inputs[1].value) {
				todos.push([inputs[0].checked, inputs[1].value]);
			}
		}
		// Если массив todos не пустой и есть название заметки:
		if (divEditTitle.value && todos.length > 0) {

			// При создании новой заметки - добавляем в базу dataNotes
			if (mainMode === "new") {

				dataNotes.push([
					dataNotes[dataNotes.length - 1][0] + 1,
					divEditTitle.value,
					todos,
				]);
				// При редактировании старой заметки - обновляем в базе dataNotes и переотрисовываем
			} else if (mainMode === "old") {

				dataNotes[iNote] = [idNote, divEditTitle.value, todos];

				const note = allNotes[`${idNote}-note`];
				note.firstChild.innerHTML = "";
				note.firstChild.append(divEditTitle.value);
				note.childNodes[1].innerHTML = "";
				todos.forEach((element) => {
					if (element[0]) {
						const italicSpan = document.createElement(`span`);
						italicSpan.className = "it";
						italicSpan.append(element[1]);

						note.childNodes[1].append(italicSpan);
						note.childNodes[1].insertAdjacentHTML("beforeend", "<br>");
					} else {
						note.childNodes[1].append(element[1]);
						note.childNodes[1].insertAdjacentHTML("beforeend", "<br>");
					}
				});
			}
			// Отрисовываем
			rendering();
			divWrap.classList.add("main-page");
			divWrap.classList.remove("edit-page");
			divEditInfo.style.display = "none";
			setVars();
			// Если массив todos пуст и/или нет названия - выводим строку "*Добавьте название заметки и/или непустой todo"
		} else {
			divEditInfo.style.display = "block";
		}
		// Кнопка Отменить редактирование
	} else if (event.target.closest(".cancel-note")) {

		popupMode = "cancel";
		divPopupInner.querySelectorAll("span")[0].style.display = "block";
		divPopup.classList.add("active");
		divPopupInner.classList.add("active");

		// Кнопка Удалить заметку или крестик на заметке
	} else if (
		event.target.closest(".delete-note") ||
		event.target.closest(".note__delete")
	) {
		popupMode = "delete";
		divPopupInner.querySelectorAll("span")[1].style.display = "block";
		divPopup.classList.add("active");
		divPopupInner.classList.add("active");
		// Если крестиком на заметке - фиксируем id заметки
		if (event.target.closest(".note__delete")) {
			idNote = event.path[1].id;
			idNote = +idNote.match(/\d+/);
		}
		// Кнопка Нет поп-апа или крестик на поп-апе или клик на фон
	} else if (
		event.target.closest(".popup__no") ||
		event.target.closest(".popup__exit") ||
		event.target === divPopup
	) {
		popupMode = "none";
		divPopup.classList.remove("active");
		divPopupInner.classList.remove("active");
		divPopupInner.querySelectorAll("span")[0].style.display = "none";
		divPopupInner.querySelectorAll("span")[1].style.display = "none";
		idNote = null;

		// Кнопка Да поп-апа
	} else if (event.target.closest(".popup__yes")) {

		    // Действия при удалении старой заметки в режиме редактирования
		if (popupMode === "delete" && mainMode === "old") {

			dataNotes.splice(iNote, 1);
			allNotes[`${idNote}-note`].remove();

			// Действия при удалении старой заметки крестиком
		} else if (popupMode === "delete" && mainMode === "main") {

			allNotes[`${idNote}-note`].remove();
			for (let i = 0; i < dataNotes.length; i++) {
				if (dataNotes[i][0] === idNote) {
					dataNotes.splice(i, 1);
					break;
				}
			}
		}

		rendering();
		popupMode = "none";

		divPopup.classList.remove("active");
		divPopupInner.classList.remove("active");
		divPopupInner.querySelectorAll("span")[0].style.display = "none";
		divPopupInner.querySelectorAll("span")[1].style.display = "none";

		if (mainMode !== "main") {
			divWrap.classList.add("main-page");
			divWrap.classList.remove("edit-page");
		}
		divEditInfo.style.display = "none";
		setVars();

		// Переключение чекбокса у todo
	} else if (event.target.closest(".edit__check")) {

		createdEventStorage.push(["check-toggle", allTodo[event.path[1].id]]);

		// Кнопка Отменить действие
	} else if (event.target.closest(".edit__cancel")) {

		const crLen = createdEventStorage.length;

		if (crLen > 0) {

			const lastEl = createdEventStorage[crLen - 1];
			const id = lastEl[1];

                // Если отменяем добавление todo
			if (lastEl[0] === "add-todo" && allTodo[`${id}-todo`]) {
				
				cancelEventStorage.push(["remove-todo", id, allTodo[`${id}-todo`]]);
				allTodo[`${id}-todo`].remove();
				createdEventStorage.pop();

                // Если отменяем удаление todo
			} else if (lastEl[0] === "remove-todo" && lastEl[2]) {
				
				cancelEventStorage.push(["add-todo", id]);

				if (allTodo.length === 0 || id < +allTodo[0].id.match(/\d+/)) {

					divEditTodos.insertAdjacentElement("afterbegin", lastEl[2]);

				} else if (id > +allTodo[allTodo.length - 1].id.match(/\d+/)) {

					divEditTodos.insertAdjacentElement("beforeend", lastEl[2]);

				} else {

					for (let i = 0; i < allTodo.length - 1; i++) {
						if (
							id > +allTodo[i].id.match(/\d+/) &&
							id < +allTodo[i + 1].id.match(/\d+/)
						) {
							allTodo[i].insertAdjacentElement("afterend", lastEl[2]);
						}
					}
				}
				createdEventStorage.pop();

                // Если отменяем переключение чекбокса
			} else if (lastEl[0] === "check-toggle") {

				lastEl[1].children[0].checked = lastEl[1].children[0].checked
					? false
					: true;
				cancelEventStorage.push(createdEventStorage.pop());
			}
		}
        // Кнопка Повторить действие
	} else if (event.target.closest(".edit__repeat")) {
		
		const canLen = cancelEventStorage.length;

		if (canLen > 0) {

			const lastEl = cancelEventStorage[canLen - 1];
			const id = lastEl[1];

                // Если повторяем удаление todo
			if (lastEl[0] === "add-todo" && allTodo[`${id}-todo`]) {

				createdEventStorage.push(["remove-todo", id, allTodo[`${id}-todo`]]);
				allTodo[`${id}-todo`].remove();
				cancelEventStorage.pop();

                // Если повторяем добавление todo
			} else if (lastEl[0] === "remove-todo" && lastEl[2]) {
				
				createdEventStorage.push(["add-todo", id]);

				if (allTodo.length === 0 || id < +allTodo[0].id.match(/\d+/)) {

					divEditTodos.insertAdjacentElement("afterbegin", lastEl[2]);

				} else if (id > +allTodo[allTodo.length - 1].id.match(/\d+/)) {

					divEditTodos.insertAdjacentElement("beforeend", lastEl[2]);

				} else {

					for (let i = 0; i < allTodo.length - 1; i++) {
						if (
							id > +allTodo[i].id.match(/\d+/) &&
							id < +allTodo[i + 1].id.match(/\d+/)
						) {
							allTodo[i].insertAdjacentElement("afterend", lastEl[2]);
						}
					}
				}
				cancelEventStorage.pop();
                
                // Если повторяем переключение чекбокса
			} else if (lastEl[0] === "check-toggle") {

				lastEl[1].children[0].checked = lastEl[1].children[0].checked
					? false
					: true;
				createdEventStorage.push(cancelEventStorage.pop());
			}
		}
	}
});