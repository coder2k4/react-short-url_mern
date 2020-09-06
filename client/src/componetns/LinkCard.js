// react

import React from 'react';

const LinkCard = ({link}) => {
    console.log(link)

    return (
        <>
            <h5>Информация о ссылке:</h5>
            <p>Ваша ссылка: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
            <p>Откуда: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
            <p>Количество кликов по ссылке: <strong>{link.clicks}</strong></p>
            <p>Дата создания: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </>
    );
};

export default LinkCard;