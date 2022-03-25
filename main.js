import "./style.scss";
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

async function sendForm(event) {
  event.preventDefault();

  const isValid = !formValidate();
  const API_URL = "https://jsonplaceholder.typicode.com/todos";

  if (isValid) {
    $.ajax({
      url: API_URL,
      type: "GET",
      success: function (data) {
        const userTableData = data.filter(
          (user) => user.userId === 5 && user.completed === false
        );
        for (const user of userTableData) {
          console.log(user);
        }
      },
      error: function () {
        $("#form").remove();

        $(".modal__content").append(
          "<span class='error'>Произошла ошибка при запросе, обновите страницу и попробуйте еще раз.</span>"
        );
      },
    });
  }
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

function createTable(data) {
  const table = document.createElement("table");
  table.className = "modal__table";

  for (user of data) {
    let tr = document.createElement("tr");
    let index = document.createElement("td");
    let value = document.createElement("td");

    index.innerHTML = "Input #" + (i + 1);
    tr.appendChild(index);

    value.innerHTML = inputs[i].value;
    tr.appendChild(value);
    table.appendChild(tr);
  }
}

// console.log(formValidate());
