import React, { Component } from 'react';
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

class ImageCard extends Component {
    constructor(props) {
        super(props);
        this.state = { span: 0 };
        this.imageRef = createRef();

        this.setSpan = this.setSpan.bind(this);
    };

    componentDidMount() {
        // console.log(this.imageRef); // debug
        this.imageRef.current.addEventListener("load", this.setSpan);
    };

    setSpan() {
        const height = this.imageRef.current.clientHeight;
        const span = Math.ceil(height/10);
        this.setState({ span });
    };

    render() {
        const { description, urls } = this.props;

        return (
            <div style={{ gridRowEnd: `span ${this.state.span}`}}>
                <img src={urls.regular} alt={description} ref={this.imageRef}/>
            </div>
        );
    };
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

class ImageSearch extends Component {
    state = { images: [] };

    onSearchSubmit = async (term) => {
        const response = await getUnsplashApi.get("/search/photos", {
            params: { query: term },
        });
        this.setState({ images: response.data.results });
        // debug
        // console.log(this.state.images);
    };

    render() {
        const { images } = this.state;
        return (
            <div className='ui container'>
                <SearchBar onSubmit={this.onSearchSubmit} name="Image" />

                {/* ImageList, bukan ImageSearch ntar malah not responding */}
                <ImageList images={images} />
            </div>
        )
    }
}

export default ImageSearch;