import React from 'react';
import SelecInput from '../SelectInput/indext';

import {
    Container,
    Controllers,
    TitleContainer
} from './styles';

interface IContentHeaderProps {
    title: string;
    lineColor: string;
    children: React.ReactNode;
}

const ContentHeader: React.FC<IContentHeaderProps> = ({
    title, lineColor, children
}) => (
    <Container >
        <TitleContainer lineColor={lineColor}>
            <h1>{title}</h1>
        </TitleContainer>
        <Controllers>
            {children}
        </Controllers>
    </Container>

);

export default ContentHeader;