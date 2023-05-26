import React from 'react';

import { Container } from './styles';


interface IContentHeaderProps {
    children: React.ReactNode;
}

const Content: React.FC<IContentHeaderProps> = ({ children }) => (
    <Container>
        {children}
    </Container>

);

export default Content;