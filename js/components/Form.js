export function formValidate() {
  const formEl = document.querySelector(".questions__form");
  const validator = new JustValidate(".questions__form");

  validator
    .addField("#name", [
      {
        rule: "required",
        errorMessage: "Введите ваше имя",
      },
      {
        rule: "minLength",
        value: 3,
        errorMessage: "Минимальное число символов 3",
      },
      {
        rule: "maxLength",
        value: 20,
        errorMessage: "Максимальное число символов 20",
      },
    ])
    .addField("#email", [
      {
        rule: "required",
        errorMessage: "Введите вашу почту",
      },
      {
        rule: "email",
        errorMessage: "Почта введена неверно",
      },
    ])
    .addField("#agree", [
      {
        rule: "required",
        errorMessage: "Согласие обязательно",
      },
    ]);

  validator.onSuccess(async () => {
    try {
      await postForm(formEl);
      showModal("Благодарим за обращение!");
      formEl.reset();
    } catch {
      showModal("Не удалось отправить обращение");
    }
  });
}

export async function postForm(form) {
  const formData = new FormData(form);
  const response = await fetch("https://httpbin.org/post", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Ошибка отправки");
  }
}

export function showModal(text) {
  const fondModalEl = document.createElement("div");
  fondModalEl.className = "modal__fond";
  document.body.append(fondModalEl);
  const modalEl = document.createElement("div");
  modalEl.className = "modal";

  modalEl.innerHTML = `
    <div class="modal__content">
      <button class="modal__close">x</button>
      <p class="modal__title">${text}</p>
    </div>
  `;

  document.body.append(modalEl);

  modalEl.querySelector(".modal__close").addEventListener("click", function () {
    modalEl.remove();
    fondModalEl.style.display = "none";
  });
}
