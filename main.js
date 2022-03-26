import "./style.scss";

import { formValidate } from "./utilities/validate";
import { createTable } from "./utilities/createTable";

import $ from "jquery";

//открыть модалку
$(".header__btn").on("click", function () {
  $(".modal").addClass("modal_active");
  $("body").addClass("body_overlowHidden");
  $(".modal__content").addClass("modal__content_active");
});

$(".close").on("click", closeModal);

function closeModal(event) {
  event.preventDefault();
  $(".modal").removeClass("modal_active");
  $("body").removeClass("body_overlowHidden");
  $(".modal__content").removeClass("modal__content_active");
}

$("#form").on("submit", sendForm);

function sendForm(event) {
  event.preventDefault();

  const invalidCount = formValidate();
  const API_URL = "https://jsonplaceholder.typicode.com/todos";

  //если не прошли валидацию, не делаем запрос
  if (invalidCount !== 0) return;
  $.ajax({
    url: API_URL,
    type: "GET",
    beforeSend() {
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
    complete() {
      // после запроса убрать спиннер
      $(".spinner").addClass("spinner_hidden");
    },
    error() {
      //заменяем контент модалки на сообщение об ошибке
      $(".modal__content").append(
        "<span class='error'>Произошла ошибка при запросе, обновите страницу и попробуйте еще раз.</span>"
      );
    },
  });
}
