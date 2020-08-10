import React, { useState, useEffect } from "react";
import "./Post.css";
import avatar1 from "./static/images/avatar/1.jpg";
import Avatar from "@material-ui/core/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import firebase from "firebase";
import {
  faHeart,
  faComment,
  faPaperPlane,
  faBookmark,
} from "@fortawesome/free-regular-svg-icons";
import { db } from "./firebase";

function Post({ postId, user, username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;

    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" alt="th_aditi" src={avatar1} />
        <h3>{username}</h3>
      </div>

      <img alt="" className="post__image" src={imageUrl} />
      <div className="post__footer">
        <FontAwesomeIcon className="fa fa-lg " icon={faHeart} />
        <FontAwesomeIcon className="fa fa-lg" icon={faComment} />
        <FontAwesomeIcon className="fa fa-lg" icon={faPaperPlane} />
        <FontAwesomeIcon
          className="fa fa-lg"
          transform="large-1 fa-2x right-250"
          icon={faBookmark}
        />
      </div>
      <h4 className="post__text">
        <strong className="name">{username}</strong>
        {caption}
      </h4>

      <div className="post__comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>

      {user && (
        <form className="post__commentBox">
          <input
            className="post__input"
            type="text"
            placeholder="Add a comment.."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post__button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            <strong>Post</strong>
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
