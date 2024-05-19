import React, { Component, useState } from 'react';
import { faker } from '@faker-js/faker';

// ga perlu length, O(n) mah ga ngaruh
const generateRandomComments = () => {
    const generateRandomDate = () => {
        const startDate = new Date(2023, 0, 1); // January 1, 2023
        const endDate = new Date(); // Current date
        const timestamp = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
        return new Date(timestamp);
    }

    const min = 1, max = 100;
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;
    const comments = [];
    for (let i = 0; i < randomNumber; i++){
        comments.push({
            avatar: faker.image.avatar(),
            name: faker.person.fullName(),
            sentence: faker.lorem.sentences(),
            date: generateRandomDate().toLocaleDateString(),
        });
    }

    // auto sorted by date
    comments.sort((c1, c2) => new Date(c1.date) - new Date(c2.date));
    return {comments, length: randomNumber};
}

// functional component of comment container
// TO DO: date + day + time
const Comment = (props) => {
    const [clickCounter, setClickCounter] = useState(0);
    const [liked, setLiked] = useState(false);

    const handleClick = () => {
        setClickCounter((prevClickCounter) => prevClickCounter + 1);
    }

    const handleLike = (event) => {
        // event.preventDefault();
        setLiked(event.target.name === "like" ? true : false);
    }

    // const handleLike = () => {
    //     if (!liked) setLiked((prevLiked) => !prevLiked);
    // }

    // const handleDislike = () => {
    //     if (liked) setLiked((prevLiked) => !prevLiked);
    // }

    const [key, avatar, name, date, sentence] = props;
    return (
        <div className="ui container comments" key={key}>
            <div className="comment">
                <a href="/" className="avatar">
                    <img alt="avatar" src={avatar} />
                </a>
                <div className="content">
                    <a href="/" className="author">
                        {name}
                    </a>
                    <a className="metadata">
                        <span className="date">{date}</span>
                    </a>
                    <a className="like"> { liked ? "| Liked by me" : "" } | Clicked: {clickCounter}</a>
                    <div className="text">{sentence}</div>
                    <button onClick={handleClick}>Click me</button>
                    <input onClick={handleLike} type="button" name="like" value="Like" />
                    <input onClick={handleLike} type="button" name="dislike" value="Dislike" />
                    {/* <button onClick={this.handleLike}>Like</button>
                    <button onClick={this.handleDislike}>Dislike</button> */}
                </div>
            </div>
        </div>
    );
};

const Comments = (props) => {
    const [comments, setComments] = useState(props.data.comments);
    const [length, setLength] = useState(props.data.length);

    return (
        <div>
            <h1>{comments.length} Comment{comments.length > 1 ? "" : "s"}</h1>
            {comments.map((comment, index) => (
                <Comment
                    key={index}
                    avatar={comment.avatar}
                    name={comment.name}
                    sentence={comment.sentence}
                    date={comment.date}
                />
            ))};
        </div>
    );
}

const RandomComments = () => {
    return <Comments data={generateRandomComments()} />;
};

export { generateRandomComments, Comments, RandomComments };