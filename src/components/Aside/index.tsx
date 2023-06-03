import React, {useState} from 'react';

import Toggle from "../Toggle"
import {MdArrowDownward, MdArrowUpward, MdClose, MdDashboard, MdExitToApp, MdMenu,} from 'react-icons/md';

import logoImg from '../../assets/logo.svg';

import {useAuth} from '../../hooks/auth';
import {useTheme} from '../../hooks/theme';

import {
    Container,
    Header,
    LogImg,
    MenuContainer,
    MenuItemButton,
    MenuItemLink,
    ThemeToogleFooter,
    Title,
    ToggleMenu,
} from './styles';
import {useNavigate} from "react-router-dom";


const Aside: React.FC = () => {
    const {signOut} = useAuth();
    const {theme, toogleTheme} = useTheme();

    const [toggleMenuIsOpened, setToggleMenuIsOpened] = useState(false);

    const [darkTheme, setDarkTheme] = useState(() =>
        theme.title === 'dark'
    );

    const navigator = useNavigate();

    const handleSignOut = () => {
        navigator('/');
        signOut();
    }

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
                Compras
            </MenuItemLink>
            <MenuItemLink href="/list/exit-balance">
                <MdArrowDownward/>
                Vendas
            </MenuItemLink>
            <MenuItemLink href="/profile">
                <MdArrowDownward/>
                Meu Perfil
            </MenuItemLink>
            <MenuItemButton onClick={handleSignOut}>
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