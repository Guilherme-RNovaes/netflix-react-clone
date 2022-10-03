import React from "react";
import './Header.css';
import {BiCaretDown} from "react-icons/bi";


export default ({black}) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="" />
                </a>
            </div>
            <div className="header--user">
                <div>
                    <a href="/">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="" />
                    </a>
                </div>
                <div>
                    <BiCaretDown />
                </div>
            </div>
            
        </header>
    )
}
