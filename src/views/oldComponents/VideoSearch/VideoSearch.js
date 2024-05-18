import React, { useState } from 'react';
import axios from 'axios';

import SearchBar from '../ARCHIVE/components/SearchBar';
import './Video.css'

import { generateRandomComments, RandomComments } from './RandomComments';

// to dotenv??? youtube api key
const API_KEY = "AIzaSyD5OzX0gNSKszwwTfHe4Q6PX3aXOd5_Y8Q";

const SelectedVideo = (props) => {
    const { selectedVideo, selectedVideoId, comments } = props;
    if (selectedVideo == null) return (<></>);
    else return (
        <div>
            <iframe
                className='iframe-video'
                title={selectedVideo.title}
                src={`https://www.youtube.com/embed/${selectedVideoId}`}
                allowFullScreen
            ></iframe>
            <h2>{selectedVideo.title}</h2>
            <p>{selectedVideo.description}</p>

            <RandomComments data={comments} />
        </div>
    );
}

const VideoCard = (props) => {
    const { video } = props;

    return (
        <div key={video.id.videoId} className="video-card" style={{ margin: '10px' }}>
            <form onClick={() => props.onClick(video.id.videoId, video.snippet)}>
                <img
                    src={video.snippet.thumbnails.default.url}
                    alt="gtw malezzz"
                    allowFullScreen
                />
                <div className='video-card-title'>
                    <h2>{video.snippet.title}</h2>
                    {/* <p>{video.snippet.description}</p> */}
                </div>
                <br />
            </form>
        </div>
    );
}

const RecommendedVideos = (props) => {
    return (
        <div>
            {props.videos.map((video) => (
                <VideoCard video={video} onClick={props.onClick} />
            ))}
        </div>
    );
}

const VideoSearch = () => {
    const [selectedVideoId, setSelectedVideoId] = useState("");
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [videos, setVideos] = useState([]); // videos by search result
    const [comments, setComments] = useState([]);

    const onSearchSubmit = async (term) => {
        const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10`; // &order=date
        const response = await axios.get(apiUrl, {
            params: { q: term, key: API_KEY, },
        });
        const videoData = response.data.items;

        setVideos(videoData);
        setSelectedVideoId(videoData[0].id.videoId);
        setSelectedVideo(videoData[0].snippet);
    };

    const onVideoCardClick = async (id, snippet) => {
        setSelectedVideoId(id);
        setSelectedVideo(snippet);
        setComments(generateRandomComments());
    };

    return (
            <div className='ui container'>
                    <SearchBar onSubmit={onSearchSubmit} name="Video" />

                <div className='content-container'>
                    <SelectedVideo className="selected-video" selectedVideo={selectedVideo} selectedVideoId={selectedVideoId} comments={comments} />

                    <RecommendedVideos className="recommended-video" videos={videos} onClick={onVideoCardClick} />
                </div>
            </div>
    );
}

export default VideoSearch;