import React, { Component, CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ThemedCSSProperties, ThemeContext } from '../contexts/themeContext';
import PropTypes from 'prop-types';
import ls from 'local-storage';


interface Props {}

interface State {
    inputText: string
}

export default class SearchBox extends Component<Props, State>{

    constructor(props: Props){
        super(props);

        this.state = {
            inputText: ls.get("InputFieldSearch") || "",
        }
        this.updateInput = this.updateInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    updateInput(event: React.ChangeEvent<HTMLInputElement>){
        this.setState({inputText : event.target.value})
    }

    handleSubmit(event: any){
        ls.set("InputFieldSearch", this.state.inputText);
        const searchTerms = ls.get("InputFieldSearch");
        console.log('Your input value is: ' + this.state.inputText);
        event.stopPropagation()
        if (event.which === 13) {
            this.context.router.history.push(this.state.inputText)
        }
        this.setState({inputText: searchTerms})
    }

    static contextTypes = {
        router: PropTypes.object
    }


    /* handleKeyDown = (event: any) => {
        event.stopPropagation()
        if (event.which === 13) {
            this.context.router.history.push(this.state.inputText)
        }
    } */
    
    render(){
        return(
            <ThemeContext.Consumer>
                {({ theme }) => (
                        <form>
                            <div style={searchContainer}>
                                <input  type="text" placeholder="Search Field" onKeyPress={this.handleSubmit} onChange={this.updateInput} style={searchStyle(theme)} value={this.state.inputText}></input>
                                <button type="submit" onClick={this.handleSubmit} style={searchButton(theme)}>
                                    <Link to={this.state.inputText} style={searchTextButton(theme)}>Sök</Link>
                                </button>
                            </div><p></p>
                        </form>
                )}
            </ThemeContext.Consumer>

        )


    }


}


const searchContainer: CSSProperties = {
    marginTop: '5em',
    marginLeft: '37em',
    height: '2em',
    width: '20em'
}

const searchStyle: ThemedCSSProperties = (theme) => ({
    height: '2em',
    width: '10em',
    boxSizing: 'border-box',
    borderRadius: '4px',
    border: '2px solid red',
    backgroundColor: theme.foreground.primary,
    color: `${theme.background.primary}B3`,
    fontWeight: 'bolder'

})

const searchButton: ThemedCSSProperties = (theme) => ({
    height: '2em',
    borderRadius: '4px',
    backgroundColor: theme.foreground.primary,

})

const searchTextButton: ThemedCSSProperties = (theme) => ({
    color: `${theme.background.primary}B3`,
})