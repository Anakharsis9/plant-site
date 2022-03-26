import $ from "jquery";

export const formValidate = () => {
  let isValid = 0;
  const formName = $("#formName");
  const formPhone = $("#formPhone");

  // убираем состояние ошибки
  $(".modal__form__input").removeClass("invalid");
  $(".error").remove();

  // регулярка для валидации номера
  const reg = /^((8|\+7))[\d]{10}$/g;

  if (formName.val().length < 3) {
    formName.addClass("invalid");
    formName.after(
      "<span class='error'>Имя должно быть не менее 3-х символов.</span>"
    );
    isValid += 1;
  }
  if (!formPhone.val().match(reg)) {
    formPhone.addClass("invalid");
    formPhone.after(
      "<span class='error'>Телефон должен начинаться с +7 или 8, за которыми следуют еще 10 цифр.</span>"
    );
    isValid += 1;
  }

  return isValid;
};
