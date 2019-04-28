import React, { Component, CSSProperties, Fragment } from 'react';
import Spinner from '../../spinner';
import Modal from '../../modal';
import { ThemedCSSProperties, ThemeContext, ThemeState } from '../../../contexts/themeContext';
import ls from 'local-storage';
//Testing

export interface ImageUrls {
    full: string
    raw: string
    regular: string
    small: string
    thumb: string
}

interface Props {
    urls: ImageUrls
    view: string
    isLiked: boolean
    onImageLiked: (urls: ImageUrls, index: number) => void
    index: number

}
interface State {
    isHover: boolean
    isModalOpen: boolean
}

export default class ImageCard extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            isHover: false,
            isModalOpen: false
        }

        this.likeImage = this.likeImage.bind(this);

    }

    iconClassName() {
        if (this.props.isLiked) {
            return 'large heart icon'
        }
        return 'large outline heart icon'
    }

    style(theme: ThemeState): CSSProperties {
        const hover: CSSProperties = this.state.isHover ? {
            boxShadow: `0 8px 40px -5px ${theme.foreground.darkened}`,
            transform: 'scale(1.05, 1.05) translateY(-1%)',
            position: "relative"
        } : {}
        return {
            ...imageContainer(theme),
            ...hover
        }
    }

    onMouseEnter = () => this.setState({ isHover: true })
    onMouseLeave = () => this.setState({ isHover: false })
    openModal = () => this.setState({ isModalOpen: true });
    closeModal = () => this.setState({ isModalOpen: false });

    likeImage(event: React.MouseEvent<HTMLElement, MouseEvent>) {
        this.props.onImageLiked(this.props.urls, this.props.index);
        event.stopPropagation();
    }

    render() {
        return (
            <Fragment>
                <ThemeContext.Consumer>
                    {({ theme }) => (
                        <div
                            style={this.style(theme)}
                            onMouseEnter={this.onMouseEnter}
                            onMouseLeave={this.onMouseLeave}
                            onClick={this.openModal}
                        >
                            {this.props.urls.small ?  
                            <div style={imageBox}>
                                <i 
                                    onClick={this.likeImage} 
                                    style={IconStyle} 
                                    className={this.iconClassName()} 
                                    >
                                </i>
                                <img src={this.props.urls.small} style={card}/>
                            </div>
                             : <Spinner/>}
                        </div>
                    )}
                </ThemeContext.Consumer>
                {
                    this.state.isModalOpen ? (
                        <Modal shouldClose={this.closeModal}>
                            <img src={this.props.urls.regular} style={preview}/>
                        </Modal>
                    ) : null
                }
            </Fragment>
        )
    }
}

const imageContainer: ThemedCSSProperties = (theme) => ({
    margin: '1em',
    flexGrow: 1,
    background: `${theme.background.primary}AA`,
    width: '12em',
    height: '18em',
    transition: 'all 300ms'
})

const card: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',

}
const preview: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
}

const imageBox: CSSProperties = {
    height: '100%',
    position: 'relative',

}

const IconStyle: CSSProperties = {
    position: "absolute", 
    top: "0.5em", 
    left: "-0.5em", 
    zIndex:22, 
    width: "3em", 
    height: "3em", 
    color: "red",
}