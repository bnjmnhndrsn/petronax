import React, { Component } from 'react';

export default class PhotoList extends Component {
    constructor(){
        super();
    }

    render(){
        return (
            <div className="photo-list">
                {
                    this.props.photos.map(photo => (
                        <div class="photo-item" key={photo.scaled_url}>
                            <div
                                className="img-container"
                                style={{backgroundImage: `url(${photo.scaled_url})`, width: `${this.props.photoWidth - 20}px`}}
                            />
                            <div className="title">
                                <a
                                    rel="noopener noreferrer"
                                    href={photo.description_url}
                                    target="_blank"
                                >
                                    {photo.title}
                                </a>
                            </div>
                        </div>
                    ))
                }
            </div>
        );
    }
}
