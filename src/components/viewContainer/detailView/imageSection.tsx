import React, { Component } from 'react';
import Axios, { AxiosResponse } from 'axios';

import ImageCard, { ImageUrls } from './imageCard';
import { ThemedCSSProperties, ThemeContext } from '../../../contexts/themeContext';

import LikedCards from './savedImages';


interface Props {
    view: string
}
interface State {
    imagesUrls: ImageUrls[],
    isLoading: boolean
    likedImages: ImageUrls[]
    isLiked: boolean
}

export default class ImageSection extends Component<Props, State> {
    /** Not a good place for the key.. well.. what the heck.. - GET YOUR OWN! */
    readonly accessKey = "0320e99cd8724084bfafbe7eb240c6f3b7e8d5220aaee12b642a76fc5512f85a"
    readonly imageDatabaseApiUrl = "https://api.unsplash.com/search/photos/"

    state: State = {
        imagesUrls: new Array(24).fill({}),
        isLoading: true,
        likedImages: [],
        isLiked: true,
    }


    handleResponse(response: AxiosResponse) {
        if (response.data && response.data.results) {
            const images = response.data.results.map((img: any) => img.urls)
            this.setState({ imagesUrls: images, isLoading: false })
        }
    }

    async componentDidMount() {
        try {
            const response = await Axios.get(this.imageDatabaseApiUrl, {
                params: {
                    client_id: this.accessKey,
                    query: this.props.view,
                    page: Math.round(Math.random() * 100),
                    per_page: 24,
                }
            })
            this.handleResponse(response);
        } catch(error) {
            console.error(error)
        }
    }

    myImagesInLocal() {
        const imageData: ImageUrls[] = JSON.parse(localStorage.getItem(this.props.view) || "{}")

        if(imageData.length > 0) {
            this.setState ({
                likedImages: this.state.likedImages = [...imageData]
            });
        }
    }

    fixLocalStorage() {
        localStorage.setItem(this.props.view, JSON.stringify(this.state.likedImages))
    }

    componentDidUpdate() {
        if(this.props.view in localStorage && this.state.likedImages.length === 0) {
            this.myImagesInLocal();

        } else {
            this.fixLocalStorage(); 
        }
    }


    onImageLiked = (url: ImageUrls, index: number) => {
        this.setState({
            likedImages: [...this.state.likedImages, url]
        });
        this.setState({
            imagesUrls: this.state.imagesUrls.filter((_, i) => i !== index)
        });
    }

   

    render() {
        return (
            <ThemeContext.Consumer>
                {({ theme }) => (
                    <div style={root(theme)}>
                        {this.state.likedImages.map((urls: ImageUrls, index:number) =>
                            <ImageCard index={index} isLiked={true} view={this.props.view} key={index} urls={urls} onImageLiked={this.onImageLiked} />
                        )}  
                        {this.state.imagesUrls.map((urls, index) =>
                            <ImageCard index={index} view={this.props.view} isLiked={false} key={index} urls={urls} onImageLiked={this.onImageLiked}/>
                        )}
                    </div>
                )}
            </ThemeContext.Consumer>
        )
    }
}

const root: ThemedCSSProperties = (theme) => ({
    margin: '3em -1em -1em -1em',
    display: 'flex',
    flexWrap: 'wrap',
    background: `${theme.background.primary}B3`,
    boxShadow: `0 0px 80px 15px ${theme.background.primary}`
})