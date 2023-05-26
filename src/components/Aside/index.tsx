import React, {useState} from 'react';
import logImg from '../../assets/wallet-svgrepo-com.svg'
import Toggle from '../Toggle';

import { 
    Container,
    Header,
    LogImg,
    Title,
    MenuContainer,
    MenuItemLink,
    MenuItemButton,
    ToggleMenu,
    ThemeToggleFooter,
} from './styles';

import {
    MdDashboard,
    MdArrowDownward,
    MdArrowUpward,
    MdExitToApp,
    MdClose,
    MdMenu,
} from 'react-icons/md'

import { useAuth } from '../../hocks/auth';
import { useTheme } from '../../hocks/theme';

const Aside: React.FC = () => {
    const { signOut } = useAuth();
    const {toggleTheme,theme} = useTheme();


    const [toggleMenuIsOpened, setTtoggleMenuIsOpened] = useState(false);
    const [darkTheme, setDarkTheme] = useState(() => theme.title ==="dark" ?true :false);


    const handleToggleMenu = () => {
        setTtoggleMenuIsOpened(!toggleMenuIsOpened);
    }

    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme);
        toggleTheme();
        }


    return (
        <Container menuIsOpen={toggleMenuIsOpened}>
            <Header>
                <ToggleMenu onClick={handleToggleMenu} >
                    {toggleMenuIsOpened ? <MdClose/> : <MdMenu/>}
                </ToggleMenu>
                
                <LogImg src={logImg} alt="Logo Minha Carteira"/>
                <Title>Minha Carteira</Title>
            </Header>
            
            <MenuContainer>
                <MenuItemLink href='/'>
                   <MdDashboard/>
                    Dashboard
                </MenuItemLink>

                <MenuItemLink href='/list/entry-balance'>
                    <MdArrowUpward/>
                    Entrads
                </MenuItemLink>

                <MenuItemLink href='/list/exit-balance'>
                    <MdArrowDownward/>
                    Saidas
                </MenuItemLink>

                <MenuItemButton onClick={signOut}>
                    <MdExitToApp/>
                    Sair
                </MenuItemButton>
            </MenuContainer>

            <ThemeToggleFooter menuIsOpen={toggleMenuIsOpened}>
                <Toggle
                labelLeft='Light'
                labelRight='Dark'
                checked={darkTheme}
                onChange={handleChangeTheme}
                />

            </ThemeToggleFooter>
        </Container>
        
    );
}

export default Aside;