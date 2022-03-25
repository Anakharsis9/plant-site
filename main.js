import "./style.scss";
import "./spinner.scss";
import $ from "jquery";

//открыть модалку
$(".header__btn").on("click", function () {
  $(".modal").addClass("modal_active");
  $("body").addClass("body_overlowHidden");
  $(".modal__content").addClass("modal__content_active");
});

$(".close").on("click", closeModal);

//функция закрыть модалку
function closeModal(event) {
  event.preventDefault();
  $(".modal").removeClass("modal_active");
  $("body").removeClass("body_overlowHidden");
  $(".modal__content").removeClass("modal__content_active");
}

const form = $("#form");
const formName = document.getElementById("formName");
const phone = document.getElementById("formPhone");

form.on("submit", sendForm);

function sendForm(event) {
  event.preventDefault();

  const invalidCount = formValidate();
  const API_URL = "https://jsonplaceholder.typicode.com/todos";

  //если не прошли валидацию, не делаем запрос
  if (invalidCount !== 0) return;
  $.ajax({
    url: API_URL,
    type: "GET",
    beforeSend: function () {
      $("#form").remove();
      // перед отправкой включаем спиннер
      $(".spinner").removeClass("spinner_hidden");
    },
    success: function (data) {
      //фильтрируем полученные данные
      const tableData = data.filter(
        (todo) => todo.userId === 5 && todo.completed === false
      );
      //заменяем контент модалки таблицей
      $(".modal__content").append(createTable(tableData));
    },
    complete: function () {
      // после запроса убрать спиннер
      $(".spinner").addClass("spinner_hidden");
    },
    error: function () {
      //заменяем контент модалки на сообщение об ошибке
      $(".modal__content").append(
        "<span class='error'>Произошла ошибка при запросе, обновите страницу и попробуйте еще раз.</span>"
      );
    },
  });
}

function formValidate() {
  let isValid = 0;
  //убираем состояние ошибки
  $(".modal__form__input").removeClass("invalid");
  $(".error").remove();

  //регулярка для валидации номера
  const reg = /^((8|\+7))[\d]{10}$/g;

  if (formName.value.length < 3) {
    formName.classList.add("invalid");
    $("#formName").after(
      "<span class='error'>Имя должно быть не менее 3-х символов.</span>"
    );
    isValid += 1;
  }
  if (!phone.value.match(reg)) {
    phone.classList.add("invalid");
    $("#formPhone").after(
      "<span class='error'>Телефон должен начинаться с +7 или 8, за которыми следуют еще 10 цифр.</span>"
    );
    isValid += 1;
  }

  return isValid;
}

//собираем саму таблицу
function createTable(todos) {
  const table = document.createElement("table");
  table.className = "modal__table";
  table.appendChild(createTableHeaders(todos[0]));
  for (const todo of todos) {
    table.appendChild(createTableCells(todo));
  }
  return table;
}
//создаем th для таблицы
function createTableHeaders(todo) {
  const headers = Object.keys(todo);
  const tr = document.createElement("tr");
  for (const header of headers) {
    const th = document.createElement("th");
    th.innerText = header;
    tr.appendChild(th);
  }
  return tr;
}
//создаем td для таблицы
function createTableCells(todo) {
  const headers = Object.keys(todo);
  const tr = document.createElement("tr");
  for (const header of headers) {
    const td = document.createElement("td");
    td.innerText = todo[header];
    tr.appendChild(td);
  }
  return tr;
}
