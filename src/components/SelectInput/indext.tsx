import React from 'react';

import { Container } from './styles';


interface ISelecInputProps {
    options: {
        value: string | number;
        label: string | number;
    }[],
    onChange(evente: React.ChangeEvent<HTMLSelectElement>): void | undefined;
    defaultValue?: string | number;
}

const SelecInput: React.FC<ISelecInputProps> = ({ options, onChange, defaultValue }) => (
    <Container>
        <select onChange={onChange} defaultValue={defaultValue}>
            {
                options.map(option => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))
            }
        </select>
    </Container>

);


export default SelecInput;