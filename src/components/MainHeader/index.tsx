import React, {useState} from 'react';
import Toggle from "../Toggle";

import {Container, Profile, Username, Welcome} from './styles';

import {useTheme} from "../../hooks/theme";
import {useAuth} from "../../hooks/auth";

const MainHeader: React.FC = () => {
    const {loggedUser} = useAuth();
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
                <Username>{loggedUser}</Username>
            </Profile>
        </Container>
    );
}

export default MainHeader;