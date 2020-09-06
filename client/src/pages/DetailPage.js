import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/auth.context";
import Loader from "../componetns/Loader";
import LinkCard from "../componetns/LinkCard";

const DetailPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [link, setLink] = useState(null)
    //Получаем параметры из командной строки (наш ID) http://localhost:3000/detail/5e58a6d62663b33f40e6dfa8
    const linkID = useParams().id

    const getLink = useCallback(async () => {
        try {
            const resp = await request(`/api/link/${linkID}`, 'GET', null, {
                authorization: `Bearer ${token}`
            })
            setLink(resp)
        } catch (e) {

        }
    }, [token, linkID, request])

    useEffect(() => {
        getLink()
    }, [getLink])

    if (loading) {
        return <Loader/>
    }

    return (
        <>
            {!loading && link && <LinkCard link={link}/>}
        </>
    );
};

export default DetailPage;