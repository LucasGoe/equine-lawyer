import React from 'react';


function Tile({className, title, children, image, alternative_text}) {

    if (title === undefined)
        return (
            <section className={className}>
                <img className="footerImage" src={image} alt={alternative_text}></img>
            </section>
        );
    else {
    return (
        <section className="tile">
            <h2>{title}</h2>
            {children}
            <img src={image} alt={alternative_text}/>
        </section>
    );
}
}

export default Tile;