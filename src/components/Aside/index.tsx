import React, {useState} from 'react';

import Toggle from "../Toggle"
import {
    MdDashboard,
    MdArrowDownward,
    MdArrowUpward,
    MdExitToApp,
    MdClose,
    MdMenu,
} from 'react-icons/md';

import logoImg from '../../assets/logo.svg';

import {useAuth} from '../../hooks/auth';
import {useTheme} from '../../hooks/theme';

import {
    Container,
    Header,
    LogImg,
    Title,
    MenuContainer,
    MenuItemLink,
    MenuItemButton,
    ToggleMenu,
    ThemeToogleFooter,
} from './styles';

const Aside: React.FC = () => {
    const {signOut} = useAuth();
    const {theme, toogleTheme} = useTheme();

    const [toggleMenuIsOpened, setToggleMenuIsOpened] = useState(false);

    const [darkTheme, setDarkTheme] = useState(() =>
        theme.title === 'dark'
    );

    const handleToggleMenu = () => {
        setToggleMenuIsOpened(!toggleMenuIsOpened);
    }

    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme);
        toogleTheme();
    }

    return (<Container menuIsOpen={toggleMenuIsOpened}>
        <Header>
            <ToggleMenu>
                {toggleMenuIsOpened ? <MdClose onClick={handleToggleMenu}/> : <MdMenu onClick={handleToggleMenu}/>}
            </ToggleMenu>
            <LogImg src={logoImg} alt="Logo Minha Carteira"/>
            <Title>Minha Carteira</Title>
        </Header>
        <MenuContainer>
            <MenuItemLink href="/">
                <MdDashboard/>
                Dashboard
            </MenuItemLink>
            <MenuItemLink href="/list/entry-balance">
                <MdArrowUpward/>
                Entradas
            </MenuItemLink>
            <MenuItemLink href="/list/exit-balance">
                <MdArrowDownward/>
                Saídas
            </MenuItemLink>
            <MenuItemButton onClick={signOut}>
                <MdExitToApp/>
                Sair
            </MenuItemButton>
        </MenuContainer>
        <ThemeToogleFooter menuIsOpen={toggleMenuIsOpened}>
            <Toggle labelLeft="Light" labelRight="Dark" checked={darkTheme} onChange={handleChangeTheme}/>
        </ThemeToogleFooter>
    </Container>);

}

export default Aside;