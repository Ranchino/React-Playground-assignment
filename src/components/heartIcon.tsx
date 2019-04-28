import React, { Component, CSSProperties} from 'react';
import { Icon } from 'semantic-ui-react';

interface Props {
    isLiked: boolean
    onclick: () => void
}



export default function HeartIcon(props: Props) {

    const handleUpdate = (event:any) => {
        event.stopPropagation()
        props.onclick()
    }

    const className = props.isLiked
        ? 'heart large icon'
        : 'heart outline large icon'

    return(
        <div>
            <Icon className={className} style={IconStyle} link onClick={handleUpdate}/>
        </div>
    )


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

const LikedIcon: CSSProperties = {
    position: "absolute", 
    top: "0.5em", 
    left: "-0.5em", 
    zIndex:22, 
    width: "3em", 
    height: "3em", 
    color: "red",
}