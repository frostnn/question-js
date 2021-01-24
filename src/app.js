import { authEmailAndPassword, getAuthForm } from './auth';
import { Question } from './question';
import './style.css';
import { createModal, isValid } from './utils';

window.addEventListener('loader', Question.renderList);

const form = document.querySelector('#form');
const input = form.querySelector('#question-input');
const submitBtn = form.querySelector('#submit');
const modal = document.querySelector('#modal');

function submitFormHundler(e) {
  e.preventDefault();
  if (isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON(),
    };
    submitBtn.disabled = true;
    Question.create(question).then(() => {
      input.value = '';
      input.className = '';
      submitBtn.disabled = false;
    });
  }
}

form.addEventListener('submit', submitFormHundler);
input.addEventListener('input', () => {
  submitBtn.disabled = !isValid(input.value);
});

const authFormHeadler = (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  const email = e.target.querySelector('#email').value;
  const password = e.target.querySelector('#password').value;

  btn.disabled = true;
  authEmailAndPassword(email, password)
    .then(Question.fetch)
    .then(renderModalAfterAuth)
    .then(() => (btn.disabled = false));
};

function renderModalAfterAuth(content) {
  if (typeof content === 'string') {
    createModal('Ошибка!', content);
  } else {
    createModal('Список вопросов', Question.listToHTML(content));
  }
}

const openModale = () => {
  createModal('Авторизация', getAuthForm());
  document
    .querySelector('#auth-form')
    .addEventListener('submit', authFormHeadler, { once: true });
};

modal.addEventListener('click', openModale);
