import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/auth.context";
import Loader from "../componetns/Loader";
import LinksList from "../componetns/LinksList";
import {useMessage} from "../hooks/message.hook";

const LinksPage = () => {

    const [links, setLinks] = useState([])
    const {request, loading, error, clearError} = useHttp()
    const message = useMessage();
    const {token} = useContext(AuthContext)

    const fetchLinks = useCallback(async () => {
        try {
            const resp = await request('/api/link', 'GET', null, {
                authorization: `Bearer ${token}`
            })
            console.log(resp)
            setLinks(resp)
        }
        catch (e) {
            console.log('Ошибка авторизации?')
        }
    }, [token, request])

    useEffect(()=>{
        fetchLinks()
    }, [fetchLinks])

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    if(loading)
        return <Loader/>

    return (
        <>
            {  !loading &&  <LinksList links={links}/>}
        </>
    );
};

export default LinksPage;