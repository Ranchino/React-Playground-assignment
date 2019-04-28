import React, { Component } from 'react';
import Axios, { AxiosResponse } from 'axios';

import ImageCard, { ImageUrls } from './imageCard';
import { ThemedCSSProperties, ThemeContext } from '../../../contexts/themeContext';

import ls from 'local-storage';
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
    
    private savedToLocal = (urls: ImageUrls) => {
        let searchParam: string = this.props.view
        let url = urls.small

        let storageContentFromKey: string | null = localStorage.getItem(searchParam)

        if(storageContentFromKey) {
            let urlArray: string[] = JSON.parse(storageContentFromKey)
            urlArray.push(url)
            localStorage.setItem(searchParam, JSON.stringify(urlArray))
        }else{
            localStorage.setItem(searchParam, JSON.stringify(this.state.likedImages))
        }
    }

   private get handleImageLiked(){
       if(localStorage.getItem(this.props.view)) {
           console.log("localStorage finns!")
           return
       }else{
           localStorage.setItem(this.props.view, JSON.stringify(this.state.likedImages))
           console.log("en ny local har skapats!")
       }
   }

    onImageLiked = (url: ImageUrls) => {
        this.setState({
            likedImages: [...this.state.likedImages, url],
            isLiked: true
        })
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

    componentDidUpdate(isLiked: any, urls: any) {
/*         JSON.stringify(this.state.likedImages)
 */        
            this.onImageLiked

        /* console.log(localStorage[this.props.view])         
        localStorage[this.props.view] = isLiked(this.props.view, [urls]) */


       /*  if(this.props.view in localStorage){
            this.state.likedImages.push(JSON.parse(localStorage.getItem(this.state.likedImages)))
            localStorage.setItem(this.props.view, urls, JSON.stringify(this.state.likedImages))
        }else{
            localStorage[this.props.view] = JSON.stringify(this.state.likedImages)
            console.log("Det gick fel!")
        } */


    }

   

    render() {
        return (
            <ThemeContext.Consumer>
                {({ theme }) => (
                    <div style={root(theme)}>
                        {this.state.likedImages.map((urls: ImageUrls, index:number) =>
                            <ImageCard isLiked={true} view={this.props.view} key={index} urls={urls} onImageLiked={this.savedToLocal} />
                        )}  
                        {this.state.imagesUrls.map((urls, index) =>
                            <ImageCard view={this.props.view} isLiked={false} key={index} urls={urls} onImageLiked={this.savedToLocal}/>
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