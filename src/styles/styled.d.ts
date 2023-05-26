import { styled } from '@mui/material/styles';

declare module 'styled-components' {
    export interface DefaultTheme {
        title: string;

        colors: {
            primary: string;
            secondary: string;
            tertiary: string;

            white: string;
            black: string;
            gray: string;

            sucess: string;
            info: string;
            warning: string;
        }
    }
}