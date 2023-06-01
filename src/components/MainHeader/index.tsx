import React, {useState} from 'react';
import Toggle from "../Toggle";

import {Container, Profile, Username, Welcome} from './styles';

import {useTheme} from "../../hooks/theme";

const MainHeader: React.FC = () => {
    const {toogleTheme, theme} = useTheme();

    const [darkTheme, setDarkTheme] = useState(() =>
        theme.title === 'dark'
    );
    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme);
        toogleTheme();
    }

    return (
        <Container>
            <Toggle labelLeft="Light" labelRight="Dark" checked={darkTheme} onChange={handleChangeTheme}/>
            <Profile>
                <Welcome>Olá</Welcome>
                <Username>Ezequiel Lorenzatti</Username>
            </Profile>
        </Container>
    );
}

export default MainHeader;