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
        console.log(response);
      });
  }
}
