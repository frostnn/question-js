export class Question {
  static create(question) {
    return fetch(
      'https://question-app-8e9d1-default-rtdb.firebaseio.com/question.json',
      {
        method: 'POST',
        body: JSON.stringify(question),
        header: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        question.id = response.name;
        return question;
      })
      .then(addToLocalStorage)
      .then(Question.renderList);
  }

  static fetch(token) {
    if (!token) {
      return Promise.resolve('<h1 class="error>У вас нет токена</h1>');
    }
    return fetch(
      ` https://question-app-8e9d1-default-rtdb.firebaseio.com/question.json?auth=${token}`
    )
      .then((response) => response.json())
      .then((response) => {
        if (response && response.error) {
          return `<h1 class="error>${response.error}</h1>`;
        }

        return response
          ? Object.keys(response).map((key) => ({
              ...response[key],
              id: key,
            }))
          : [];
      });
  }

  static renderList() {
    const question = getQuestionFromLocalStorage();
    const html = question.length
      ? question.map(toCard).join('')
      : `<div class="mui--text-black-54 mui--text-body2">Нет вопросов</div>`;
    const list = document.querySelector('#list');
    list.innerHTML = html;
  }

  static listToHTML(question) {
    return question.length
      ? `<ol>${question.map((q) => `<li>${q.text}</li>`).join('')}</ol>`
      : '<p>Вопросов нет</p>';
  }
}

function addToLocalStorage(question) {
  const all = getQuestionFromLocalStorage();
  all.push(question);
  localStorage.setItem('question', JSON.stringify(all));
}

function getQuestionFromLocalStorage() {
  return JSON.parse(localStorage.getItem('question') || '[]');
}

function toCard(question) {
  return `          
  <div class="mui--text-black-54">
    ${new Date(question.date).toLocaleDateString()}
    ${new Date(question.date).toLocaleTimeString()}
  </div>
  <div>${question.text}</div>`;
}
