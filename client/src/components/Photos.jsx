import React from 'react';

import Photo from './Photo'
import { PHOTO_WIDTH } from './constants';

import './styles/Photos.css'



export default function Photos () {
    return (
        <div className="photos-wrapper" style={{width: `${PHOTO_WIDTH * 2}px`}}>
            <div className="photos-container" style={{width: `${PHOTO_WIDTH * 4}px` }}>
                <Photo />
                <Photo />
                <Photo />
                <Photo />
            </div>
        </div>
    )
}
