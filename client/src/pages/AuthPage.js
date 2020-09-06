import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/auth.context";

const AuthPage = () => {

    const auth = useContext(AuthContext)

    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({email: '', password: ''})
    const message = useMessage()


    const changeHandler = (event) => {
        setForm(
            {
                ...form,
                [event.target.name]: event.target.value
            }
        )
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            console.log('Data:', data)
        } catch (e) {

        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.logIn(data.token, data.userID)
        } catch (e) {

        }
    }

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    return (
        <div className='row'>
            <div className='col s6 offset-s3'>
                <h1>Скоратить ссылку</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input placeholder="Введите e-mail"
                                       id="email"
                                       type="email"
                                       name="email"
                                       value={form.email}
                                       className="validate"
                                       onChange={changeHandler}
                                />
                                <label htmlFor="email">E-mail</label>
                            </div>
                            <div className="input-field">
                                <input placeholder="Введите пароль"
                                       id="password"
                                       type="password"
                                       name="password"
                                       value={form.password}
                                       className="validate"
                                       onChange={changeHandler}
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className={'btn yellow darken-4 mr3'}
                            style={{marginRight: 10}}
                            onClick={loginHandler}
                            disabled={loading}
                        >Войти
                        </button>
                        <button
                            className={'btn gray lighten-1 black-text'}
                            onClick={registerHandler}
                            disabled={loading}
                        >Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;