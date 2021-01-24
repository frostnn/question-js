export const getAuthForm = () => {
  return `          
    <form class="mui-form" id="auth-form">
      <div class="mui-textfield mui-textfield--float-label">
        <input type="email" id="email" required/>
        <label>Email</label>
      </div>
      <div class="mui-textfield mui-textfield--float-label">
        <input type="password" id="password" required/>
        <label>Password</label>
      </div>
      <button
        type="submit"
        class="mui-btn mui-btn--raised mui-btn--primary"
      >
        Enter
      </button>
    </form>`;
};

export const authEmailAndPassword = (email, password) => {
  const apiKey = 'AIzaSyA2tfj5oMaBFj16YrYqDnui77jQ3pUE1mo';
  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data.idToken);
};
