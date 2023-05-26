import React, { useState,useMemo } from 'react';
import Toggle from '../Toggle';
import emojis from '../../utils/emojis';


import {useTheme} from '../../hocks/theme';

import {
    Container,
    Profile,
    Welcome,
    UserName,

} from './styles';
import dark from '../../styles/themes/dark';

const MainHeader: React.FC = () => {

    const {toggleTheme, theme } = useTheme();

    const [darkTheme, setDarkTheme] = useState(() => theme.title ==="dark" ?true :false);

    const handleChangeTheme = () =>{
        setDarkTheme(!dark)
        toggleTheme();
    }
    const emoji = useMemo(() => {
        const indice = Math.floor(Math.random() * emojis.length);
        return emojis[indice];
    }, []);

    return (
        <Container>
             <Toggle
                labelLeft="Light"
                labelRight="Dark"
                checked={darkTheme}
                onChange={handleChangeTheme}
            />
            <Profile>
                <Welcome>Olá, {emoji}</Welcome>
                <UserName>Pedro Henrique</UserName>
            </Profile>
        </Container>

    );
}

export default MainHeader;