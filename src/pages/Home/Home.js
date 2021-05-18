import React, {useContext} from 'react';
import content from '../../data/content.json';
import {LanguageContext} from "../../context/LanguageContextProvider";
import Tile from "../../components/tile/Tile";
import YoungBoy from '../../assets/images/young-boy-chess-board.jpg';

function Home() {
    const {activeLanguage} = useContext(LanguageContext);
    return (
        <div className="page-container">
            <footer>
                <Tile title={content[activeLanguage].home.title}>
                    <p>{content[activeLanguage].home.introText}</p>
                </Tile>
                <Tile
                    image={YoungBoy}
                    alternative_text="brand-image"
                >
                </Tile>
            </footer>
        </div>
    );
}

export default Home;