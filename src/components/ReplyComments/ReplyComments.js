import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSearchParams, useNavigate } from 'react-router-dom';
import useHttpRequest from '../../hooks/useHttpRequest';
import Cookie from 'js-cookie';
import Loading from '../Main/Loading';
import SingleReplyComment from '../SingleReplyComment/SingleReplyComment';

const ReplyComments = ({ commentId }) => {
  ReplyComments.propTypes = {
    commentId: PropTypes.string
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [comment, setComment] = useState('');
  const [isReply, setIsReply] = useState(false);

  const isAuthorized = Cookie.get('connect.sid');
  const isCommentUpdate = searchParams.get('replyComment') || '';

  const {
    fetchRequest: commentsRequest,
    state: {
      error: commentsError,
      data: commentsData,
      loading: commentsLoading
    }
  } = useHttpRequest({
    method: 'GET',
    url: `replyComments/?commentId=${commentId}`
  });

  const {
    fetchRequest: postCommentRequest,
    state: { error: postCommentError, loading: postCommentLoading }
  } = useHttpRequest({
    method: 'POST',
    url: 'replyComments/',
    preventAutoFetch: true
  });

  const postCommentHandler = (event) => {
    event.preventDefault();
    postCommentRequest({ comment, commentId });
    setComment('');
    searchParams.append('replyComment', true);
    searchParams.append('comment', true);
    setSearchParams(searchParams);
    setIsReply(false);
  };

  useEffect(() => {
    if (isCommentUpdate) {
      commentsRequest();
      searchParams.delete('replyComment');
      setSearchParams(searchParams);
    }
  }, [isCommentUpdate]);

  return (
        <>
            <div className="leave-comment">
                {postCommentLoading && <Loading />}
                {postCommentError && navigate('/error')}
                {isAuthorized &&
                    (!isReply
                      ? (
                        <>
                            <button
                                className="btn btn-sm btn-secondary bi bi-reply"
                                onClick={() => setIsReply(true)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-reply"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M6.598 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.499.499 0 0 0 .042-.028l3.984-2.933zM7.8 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z"></path>
                                </svg>{' '}
                                Reply to this comment
                            </button>
                        </>
                        )
                      : (
                        <>
                            <br />
                            <form
                                onSubmit={postCommentHandler}
                                className="comment-form"
                            >
                                <div className="row">
                                    <div className="col-lg-11">
                                        <textarea
                                            placeholder="Write reply comment..."
                                            onChange={(e) =>
                                              setComment(e.target.value)
                                            }
                                            value={comment}
                                            required
                                        ></textarea>
                                        <button
                                            type="submit"
                                            className="btn btn-sm btn-secondary"
                                        >
                                            Send reply comment
                                        </button>{' '}
                                        <button
                                            type="submit"
                                            className="btn btn-sm btn-light"
                                            onClick={() => setIsReply(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </>
                        ))}
            </div>
            {commentsError && navigate('/error')}
            {commentsLoading && <Loading />}
            {commentsData &&
                commentsData.length > 0 &&
                commentsData.map((comment) => {
                  return (
                        <SingleReplyComment
                            key={comment._id}
                            userId={comment.userId}
                            commentId={comment._id}
                            commentValue={comment.comment}
                        />
                  );
                })}
        </>
  );
};

export default ReplyComments;
