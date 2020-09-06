import React from 'react';
import {Link} from "react-router-dom";

const LinksList = ({links}) => {
    if(!links)
        return <p>Сылок пока нет</p>

    return (
        <table>
            <thead>
            <tr>
                <th>№</th>
                <th>Оригинальная</th>
                <th>Сокращенная</th>
                <th>Открыть</th>
            </tr>
            </thead>

            <tbody>
            {
                links.map((link, index) => {
                    return (
                        <tr key={link._id}>
                            <td>{index}</td>
                            <td>{link.from}</td>
                            <td>{link.to}</td>
                            <td><Link to={`/detail/${link._id}`}>Открыть</Link></td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    );
};

export default LinksList;