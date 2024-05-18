import React, { useState } from 'react';
import axios from 'axios';

import SearchBar from '../ARCHIVE/components/SearchBar';

import './ImageList.css';

const getUnsplashApi = axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: 
            'Client-ID 2b98c1afb0aed3b3d94a1866bdc3ac013d21a0c86d236a0fee32355c331c0296',
    },
});

const ImageCard = (props) => {
    const { description, urls } = props;
    let span = 0;
    let imageRef = createRef();

    componentDidMount = () => {
        imageRef.current.addEventListener("load", setSpan);
    }

    const setSpan = () => {
        const height = imageRef.current.clientHeight;
        const newSpan = Math.ceil(height/10);
        span = newSpan;
    }

    return (
        <div style={{ gridRowEnd: `span ${state.span}`}}>
            <img src={urls.regular} alt={description} ref={imageRef}/>
        </div>
    )
}

const ImageList = (props) => {
    return (
        <div className="image-list">
            {props.images.map((image, index) => (
                <ImageCard key={index} urls={image.urls} description={image.alt_description} />
            ))}
        </div>
    )
};

const ImageSearch = () => {
    const [images, setImages] = useState([]);

    const onSearchSubmit = async (term) => {
        const response = await getUnsplashApi.get("/search/photos", {
            params: { query: term },
        });
        setImages(response.data.results);
    };

    return (
        <div className='ui container'>
            <SearchBar onSubmit={onSearchSubmit} name="Image" />

            {/* ImageList, bukan ImageSearch ntar malah not responding */}
            <ImageList images={images} />
        </div>
    )
}

export default ImageSearch;