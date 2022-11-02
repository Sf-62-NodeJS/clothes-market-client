import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useHttpRequest from '../../hooks/useHttpRequest';
import Cookie from 'js-cookie';
import User from '../../services/User';
import Loading from '../Main/Loading';
import CommentAuthor from '../CommentAuthor/CommentAuthor';

const SingleComment = ({ userId, commentId, commentValue }) => {
  SingleComment.propTypes = {
    userId: PropTypes.string,
    commentId: PropTypes.string,
    commentValue: PropTypes.string
  };

  const [comment, setComment] = useState(commentValue);
  const [isUpdate, setIsUpdate] = useState(false);

  const [replyCommentId, setReplyCommentId] = useState('');
  const [replyCommentValue, setReplyCommentValue] = useState('');
  const [isReply, setIsReply] = useState(false);
  const [isUpdateReplyId, setIsUpdateReplyId] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const isAuthorized = Cookie.get('connect.sid');
  const isReplyCommentUpdate = searchParams.get('replyComment') || '';
  const { userData } = User();

  const {
    fetchRequest: updateCommentRequest,
    state: { loading: updateCommentLoading, error: updateCommentError }
  } = useHttpRequest({
    method: 'PUT',
    url: `comments/${commentId}`,
    preventAutoFetch: true
  });

  const { fetchRequest: deleteCommentRequest } = useHttpRequest({
    method: 'DELETE',
    url: `comments/${commentId}`,
    preventAutoFetch: true
  });

  const {
    fetchRequest: replyCommentsRequest,
    state: {
      error: replyCommentsError,
      data: replyCommentsData,
      loading: replyCommentsLoading
    }
  } = useHttpRequest({
    method: 'GET',
    url: `replyComments/?commentId=${commentId}`
  });

  const {
    fetchRequest: postReplyCommentRequest,
    state: {
      error: postReplyCommentError,
      loading: postReplyCommentLoading
    }
  } = useHttpRequest({
    method: 'POST',
    url: 'replyComments/',
    preventAutoFetch: true
  });

  const {
    fetchRequest: updateReplyCommentRequest,
    state: {
      loading: updateReplyCommentLoading,
      error: updateReplyCommentError
    }
  } = useHttpRequest({
    method: 'PUT',
    url: `replyComments/${replyCommentId}`,
    preventAutoFetch: true
  });

  const { fetchRequest: deleteReplyCommentRequest } = useHttpRequest({
    method: 'DELETE',
    url: `replyComments/${replyCommentId}`,
    preventAutoFetch: true
  });

  const postReplyCommentHandler = (event) => {
    event.preventDefault();
    postReplyCommentRequest({ comment: replyCommentValue, commentId });
    setReplyCommentValue('');
    searchParams.append('replyComment', true);
    searchParams.append('comment', true);
    setSearchParams(searchParams);
    setIsReply(false);
  };

  useEffect(() => {
    if (isReplyCommentUpdate) {
      replyCommentsRequest();
      searchParams.delete('replyComment');
      setSearchParams(searchParams);
    }
  }, [isReplyCommentUpdate]);

  return (
        <React.Fragment key={commentId}>
            <div key={commentId} className="card">
                <div className="card-header">
                    <h5>
                        <CommentAuthor userId={userId} /> commented:
                    </h5>
                </div>
                <div className="card-body">
                    {commentValue}
                    {isAuthorized && userData && userData._id === userId && (
                        <>
                            <br />
                            <br />
                        </>
                    )}
                    <div className="btn-group">
                        {isAuthorized && userData && userData._id === userId && (
                            <div className="leave-comment">
                                {updateCommentLoading && <Loading />}
                                {updateCommentError && navigate('/error')}
                                {!isUpdate
                                  ? (
                                    <button
                                        className="btn btn-sm btn-warning bi bi-pen"
                                        onClick={() => setIsUpdate(true)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-pen"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                                        </svg>{' '}
                                        Edit comment
                                    </button>
                                    )
                                  : (
                                    <>
                                        <br />
                                        <form
                                            onSubmit={(e) => {
                                              e.preventDefault();
                                              updateCommentRequest({
                                                comment
                                              });
                                              setIsUpdate(false);
                                              searchParams.append(
                                                'comment',
                                                true
                                              );
                                              setSearchParams(searchParams);
                                            }}
                                            className="comment-form"
                                        >
                                            <div className="row">
                                                <div className="col-lg-11">
                                                    <textarea
                                                        placeholder="Edit comment..."
                                                        onChange={(e) =>
                                                          setComment(
                                                            e.target.value
                                                          )
                                                        }
                                                        value={comment}
                                                        required
                                                    ></textarea>
                                                    <button
                                                        type="submit"
                                                        className="btn btn-sm btn-warning"
                                                    >
                                                        Update comment
                                                    </button>{' '}
                                                    <button
                                                        type="submit"
                                                        className="btn btn-sm btn-light"
                                                        onClick={() =>
                                                          setIsUpdate(false)
                                                        }
                                                    >
                                                        Cancel
                                                    </button>{' '}
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-danger bi bi-trash"
                                                        onClick={() => {
                                                          deleteCommentRequest();
                                                          searchParams.append(
                                                            'comment',
                                                            true
                                                          );
                                                          setSearchParams(
                                                            searchParams
                                                          );
                                                        }}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="16"
                                                            height="16"
                                                            fill="currentColor"
                                                            className="bi bi-trash"
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                                            />
                                                        </svg>
                                                        Delete Comment
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </>
                                    )}
                            </div>
                        )}
                    </div>
                </div>
                <div className="leave-comment">
                    {postReplyCommentLoading && <Loading />}
                    {postReplyCommentError && navigate('/error')}
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
                                    onSubmit={postReplyCommentHandler}
                                    className="comment-form"
                                >
                                    <div className="row">
                                        <div className="col-lg-11">
                                            <textarea
                                                placeholder="Write reply comment..."
                                                onChange={(e) =>
                                                  setReplyCommentValue(
                                                    e.target.value
                                                  )
                                                }
                                                value={replyCommentValue}
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
                                                onClick={() =>
                                                  setIsReply(false)
                                                }
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </>
                            ))}
                </div>
                {replyCommentsError && navigate('/error')}
                {replyCommentsLoading && <Loading />}
                {replyCommentsData &&
                    replyCommentsData.length > 0 &&
                    replyCommentsData.map((replyComment) => {
                      return (
                            <React.Fragment key={replyComment._id}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5>
                                            <CommentAuthor
                                                userId={replyComment.userId}
                                            />{' '}
                                            replied:
                                        </h5>
                                        <br />
                                        {replyComment.comment}
                                        {isAuthorized &&
                                            userData &&
                                            userData._id ===
                                                replyComment.userId && (
                                                <>
                                                    <br />
                                                    <br />
                                                </>
                                        )}
                                        <div className="btn-group">
                                            {isAuthorized &&
                                                userData &&
                                                userData._id ===
                                                    replyComment.userId && (
                                                    <div className="leave-comment">
                                                        {updateReplyCommentLoading && (
                                                            <Loading />
                                                        )}
                                                        {updateReplyCommentError &&
                                                            navigate('/error')}
                                                        {isUpdateReplyId !==
                                                        replyComment._id
                                                          ? (
                                                            <>
                                                                <button
                                                                    className="btn btn-sm btn-warning bi bi-pen"
                                                                    onClick={() => {
                                                                      setIsUpdateReplyId(
                                                                        replyComment._id
                                                                      );
                                                                      setReplyCommentValue(
                                                                        replyComment.comment
                                                                      );
                                                                      setReplyCommentId(
                                                                        replyComment._id
                                                                      );
                                                                    }}
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-pen"
                                                                        viewBox="0 0 16 16"
                                                                    >
                                                                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                                                                    </svg>{' '}
                                                                    Edit reply
                                                                    comment
                                                                </button>
                                                            </>
                                                            )
                                                          : (
                                                            <>
                                                                <br />
                                                                <form
                                                                    onSubmit={(
                                                                      e
                                                                    ) => {
                                                                      e.preventDefault();
                                                                      updateReplyCommentRequest(
                                                                        {
                                                                          comment:
                                                                                    replyCommentValue
                                                                        }
                                                                      );
                                                                      setIsUpdateReplyId(
                                                                        ''
                                                                      );
                                                                      setReplyCommentValue(
                                                                        ''
                                                                      );
                                                                      setReplyCommentId(
                                                                        ''
                                                                      );
                                                                      searchParams.append(
                                                                        'replyComment',
                                                                        true
                                                                      );
                                                                      setSearchParams(
                                                                        searchParams
                                                                      );
                                                                    }}
                                                                    className="comment-form"
                                                                >
                                                                    <div className="row">
                                                                        <div className="col-lg-11">
                                                                            <textarea
                                                                                placeholder="Edit comment..."
                                                                                onChange={(
                                                                                  e
                                                                                ) =>
                                                                                  setReplyCommentValue(
                                                                                    e
                                                                                      .target
                                                                                      .value
                                                                                  )
                                                                                }
                                                                                value={
                                                                                    replyCommentValue
                                                                                }
                                                                                required
                                                                            ></textarea>
                                                                            <button
                                                                                type="submit"
                                                                                className="btn btn-sm btn-warning"
                                                                            >
                                                                                Update
                                                                                comment
                                                                            </button>{' '}
                                                                            <button
                                                                                type="submit"
                                                                                className="btn btn-sm btn-light"
                                                                                onClick={() => {
                                                                                  setIsUpdateReplyId(
                                                                                    ''
                                                                                  );
                                                                                  setReplyCommentValue(
                                                                                    ''
                                                                                  );
                                                                                  setReplyCommentId(
                                                                                    ''
                                                                                  );
                                                                                }}
                                                                            >
                                                                                Cancel
                                                                            </button>{' '}
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-sm btn-danger bi bi-trash"
                                                                                onClick={() => {
                                                                                  deleteReplyCommentRequest();
                                                                                  searchParams.append(
                                                                                    'replyComment',
                                                                                    true
                                                                                  );
                                                                                  searchParams.append(
                                                                                    'comment',
                                                                                    true
                                                                                  );
                                                                                  setSearchParams(
                                                                                    searchParams
                                                                                  );
                                                                                }}
                                                                            >
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="16"
                                                                                    height="16"
                                                                                    fill="currentColor"
                                                                                    className="bi bi-trash"
                                                                                    viewBox="0 0 16 16"
                                                                                >
                                                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                                                    <path
                                                                                        fillRule="evenodd"
                                                                                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                                                                    />
                                                                                </svg>
                                                                                Delete
                                                                                Comment
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </>
                                                            )}
                                                    </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                      );
                    })}
            </div>
            <br />
        </React.Fragment>
  );
};

export default SingleComment;
