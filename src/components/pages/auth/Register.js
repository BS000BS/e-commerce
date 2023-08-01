import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

function Register() {
    const notify = () => toast.error("This user is already registered!", {
        position: 'bottom-right'
    });
    const navigate = useNavigate();
    const [nameWrongFormat, setNameWrongFormat] = useState(false);
    const [emailWrongFormat, setEmailWrongFormat] = useState(false);
    const [passwordWrongFormat, setPasswordWrongFormat] = useState(false);

    function doesUserExist(email) {
        let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers'));
        for (let i = 0; i < registeredUsers.length; i++) {
            if (registeredUsers[i].email === email) {
                return true;
            }
        }
        return false;
    }

    function validateInputs(name, email, password) {
        const password_regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^<>{}a-zA-Z\\d]).{8,}$");
        const email_regex = new RegExp("^([a-z 0-9 . _]+)@([a-z]+).([a-z]{2,6})$");
        if (name.length < 2 || name.length > 40) {
            setNameWrongFormat(true);
            return true;
        } else if (name.length > 2 || name.length < 41) {
            setNameWrongFormat(false);
        }
        if (!email_regex.test(email)) {
            setEmailWrongFormat(true);
            return true;
        } else if (email_regex.test(email)) {
            setEmailWrongFormat(false);
        }
        if (!password_regex.test(password)) {
            setPasswordWrongFormat(true);
            return true;
        } else if (password_regex.test(password)) {
            setPasswordWrongFormat(false);
        }
        return false;
    }

    function register(e) {
        e.preventDefault();
        let register_error = false;
        let user_data = Array.from(e.target.elements);
        let name_input = user_data[0].value;
        let email_input = user_data[1].value;
        let password_input = user_data[2].value;
        let user = {
            name: name_input,
            email: email_input,
            password: password_input
        }

        if (validateInputs(name_input, email_input, password_input)) {
            return;
        }

        if (localStorage.getItem('registeredUsers') === null) {
            localStorage.setItem('registeredUsers', JSON.stringify([user]));
            localStorage.setItem('loggedIn', email_input);
        } else {
            if (!doesUserExist(email_input)) {
                let registered_users = JSON.parse(localStorage.getItem('registeredUsers'))
                localStorage.setItem('registeredUsers', JSON.stringify([...registered_users, user]))
                localStorage.setItem('loggedIn', email_input);
            } else {
                register_error = true;
                notify();
            }
        }

        if (!register_error) {
            setTimeout(() => {
                navigate('/');
            }, 500)
        }
    }

    return (
        <>
            <form onSubmit={(e) => register(e)} className='m-auto mt-5' style={{ width: '50vw' }}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Your name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="nameHelp" required />
                    <div id="nameHelp" className="form-text text-danger">{nameWrongFormat ? 'Please enter your name correctly!' : ''}</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" required />
                    <div id="emailHelp" className="form-text text-danger">{emailWrongFormat ? 'Please enter your email correctly!' : ''}</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" required />
                    <div id="passwordHelp" className="form-text text-danger">{passwordWrongFormat ? 'Your password must be of minimum length 8 characters, and contain at least: one lowercase letter, one upper case letter, one number, and one special character.' : ''}</div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <ToastContainer />
        </>
    )
}

export default Register