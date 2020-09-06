import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/auth.context";
import {useHistory} from "react-router-dom"
import {useMessage} from "../hooks/message.hook";


const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const [link, setLink] = useState('')
    const {request, clearError, error} = useHttp()
    const message = useMessage()

    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
                const data = await request(
                    '/api/link/generate',
                    'POST',
                    {from: link},
                    {
                        authorization: `Bearer ${auth.token}`
                    })

                history.push(`/detail/${data.link._id}`)
            } catch (e) {

            }
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
        <div className={"row"}>
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input placeholder="Введите e-mail"
                           id="link"
                           type="text"
                           value={link}
                           onChange={e => setLink(e.target.value)}
                           onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Введите ссылку</label>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;