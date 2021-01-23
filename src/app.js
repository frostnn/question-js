import { Question } from './question';
import './style.css';
import { isValid } from './utils';

const form = document.querySelector('#form');
const input = form.querySelector('#question-input');
const submitBtn = form.querySelector('#submit');
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
