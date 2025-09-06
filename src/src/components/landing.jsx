import React, { useState } from 'react';
import './landing.css';

function LoginForm() {
  return (
    <form className="form-content">
      <h1>Login</h1>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button style={{ marginTop: '20px' }}>Login</button>
    </form>
  );
}

function SignupForm() {
  return (
    <form className="form-content">
      <h1>Register</h1>
      <input type="text" placeholder="Name" required />
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Password" minLength="8"
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$" required />
      <input type="tel" placeholder="Mobile Number" pattern="[0-9]{10}" maxLength="10" required />
      <input type="number" step="1" min="0" placeholder='Age' required />
      <select id="gender" name="gender" required>
        <option value="" disabled selected section>Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
        <option value="prefer-not-to-say">Prefer not to say</option>
      </select>
      <button style={{ marginTop: '20px' }}>Register</button>
    </form>
  );
}

function App() {
  const [active, setActive] = useState('login');

  return (
    <div className="page-wrapper">
      <h1>Welcome Foodies !!</h1>
      <p>Planning to start a new diet regime ?</p>
      <p>You've got us !! Get personalized diet plans for all purposes.</p>

      <div className="auth-box">
        <div
          className={`panel left ${active === 'login' ? 'active' : 'inactive'}`}
          onClick={() => setActive('login')}
        >
          {active === 'login' ? <LoginForm /> : (<div><p>Already have an account ?</p><p>Welcome back</p>
            <button className="Inactive-login-bttn">Login</button></div>)}
        </div>
        <div
          className={`panel right ${active === 'signup' ? 'active' : 'inactive'}`}
          onClick={() => setActive('signup')}
        >
          {active === 'signup' ? <SignupForm /> : (<div><p>No account yet ?</p><p> Create one now !</p>
            <button className='Inactive-register-bttn'>Register</button>
          </div>)}
        </div>
      </div>
    </div>
  );
}



export default App;
