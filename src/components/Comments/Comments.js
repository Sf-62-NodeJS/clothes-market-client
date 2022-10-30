import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import useHttpRequest from '../../hooks/useHttpRequest';
import Cookie from 'js-cookie';
import Loading from '../Main/Loading';
import SingleComment from '../SingleComment/SingleComment';

const Comments = ({ productId }) => {
  Comments.propTypes = {
    productId: PropTypes.string
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const isAuthorized = Cookie.get('connect.sid');
  const isCommentUpdate = searchParams.get('comment') || '';

  const [comment, setComment] = useState('');

  const {
    fetchRequest: commentsRequest,
    state: {
      error: commentsError,
      data: commentsData,
      loading: commentsLoading
    }
  } = useHttpRequest({
    method: 'GET',
    url: `comments/?productId=${productId}`
  });

  const {
    fetchRequest: postCommentRequest,
    state: { error: postCommentError, loading: postCommentLoading }
  } = useHttpRequest({
    method: 'POST',
    url: 'comments/',
    preventAutoFetch: true
  });

  const postCommentHandler = (event) => {
    event.preventDefault();
    postCommentRequest({ comment, productId });
    setComment('');
    searchParams.append('comment', true);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (isCommentUpdate) {
      commentsRequest();
      searchParams.delete('comment');
      searchParams.delete('replyComment');
      setSearchParams(searchParams);
    }

    if (productId) {
      commentsRequest();
    }
  }, [isCommentUpdate, productId]);

  return (
        <div className="customer-review-option">
            <h4>Comments</h4>
            <div className="comment-option">
                {commentsLoading && <Loading />}
                {commentsError && navigate('/error')}
                {!commentsData && <h5>No comments to show...</h5>}
                {commentsData &&
                    commentsData.map((comment) => {
                      return (
                            <SingleComment
                                key={comment._id}
                                userId={comment.userId}
                                commentId={comment._id}
                                commentValue={comment.comment}
                                replyComments={comment.replyComments}
                            />
                      );
                    })}
            </div>
            <br />
            <br />
            {isAuthorized
              ? (
                <div className="leave-comment">
                    {postCommentLoading && <Loading />}
                    {postCommentError && navigate('/error')}
                    <>
                        <h5>Leave A Comment</h5>
                        <br />
                        <form
                            onSubmit={postCommentHandler}
                            className="comment-form"
                        >
                            <div className="row">
                                <div className="col-lg-11">
                                    <textarea
                                        placeholder="Write comment..."
                                        onChange={(e) =>
                                          setComment(e.target.value)
                                        }
                                        value={comment}
                                        required
                                    ></textarea>
                                    <button type="submit" className="site-btn">
                                        Send comment
                                    </button>
                                </div>
                            </div>
                        </form>
                    </>
                </div>
                )
              : (
                <h5>
                    <Link to="/login">Login</Link> to leave a comment.
                </h5>
                )}
        </div>
  );
};

export default Comments;
