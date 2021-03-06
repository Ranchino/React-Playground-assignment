import React, { CSSProperties } from 'react';
import { ThemedCSSProperties, ThemeContext } from '../../../contexts/themeContext';
import Button from '../../button';

interface Props {
    view: string
    openModal: () => void;
}

export default function HeaderSection(props: Props) {

    const color: CSSProperties = {
        color: selectColor(props.view)
    }

    function selectColor(view: string) {
        switch(view) {
            case 'forest': return '#63b323'
            case 'sky': return '#5fb2f6'
            case 'desert': return '#e7a11f'
        }
    }
    
    return (
        <ThemeContext.Consumer>
            {({ theme }) => (
                <div style={headerSegment}>
                    <h2 style={{ ...inputText(theme)}}>
                        {props.view.toUpperCase()}
                    </h2>
                    <Button size="small" onClick={props.openModal}>Open Modal</Button>
                </div>
            )}
        </ThemeContext.Consumer>
    )
}

const headerSegment: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
}


const header: ThemedCSSProperties = (theme) => ({
    textShadow: `0px 0px 2px ${theme.background.primary}`
})

const inputText: ThemedCSSProperties = (theme) => ({
    display: 'block',
    lineHeight: '1.5',
    fontSize: '1.5em',
    fontWeight: 'bold',
    color: theme.foreground.primary,
    textShadow: `1px 1px 2px ${theme.background.primary}`
})