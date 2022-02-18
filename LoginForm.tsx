import React, {useState} from 'react';

type User = {
    username: string;
    password: string;
}

interface ILoginForm {
    onFormSubmitted: (user: User) => void
}

function LoginForm({onFormSubmitted}: ILoginForm) {
    const [error, setError] = useState('')
    const onHandleSubmit = (event: any) => {
        event.preventDefault();
        const {usernameInput: {value: username}, passwordInput: {value: password}}
            = event.target.elements
        if (!username) {
            setError('username is required')
        } else if (!password) {
            setError('password is required')
        } else {
            setError('')
            onFormSubmitted({username, password})
        }

    }

    return (
        <div>
            <form onSubmit={onHandleSubmit}>
                <div>
                    <label htmlFor="usernameInput">UserName</label>
                    <input id={'usernameInput'} type="text"/>
                </div>
                <div>
                    <label htmlFor="passwordInput">Password</label>
                    <input id={'passwordInput'} type="password"/>
                </div>
                <button type="submit">Submit</button>
            </form>
            {error ? <div role="error">{error}</div> : null}
        </div>
    );
}

export default LoginForm;
