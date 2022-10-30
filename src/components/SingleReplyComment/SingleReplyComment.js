import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useHttpRequest from '../../hooks/useHttpRequest';
import Cookie from 'js-cookie';
import User from '../../services/User';
import Loading from '../Main/Loading';

const SingleReplyComment = ({ userId, commentId, commentValue }) => {
  SingleReplyComment.propTypes = {
    userId: PropTypes.string,
    commentId: PropTypes.string,
    commentValue: PropTypes.string
  };

  const [comment, setComment] = useState(commentValue);
  const [isUpdate, setIsUpdate] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const isAuthorized = Cookie.get('connect.sid');
  const { userData } = User();

  const {
    fetchRequest: updateCommentRequest,
    state: {
      loading: updateCommentLoading,
      error: updateCommentError,
      data: updateCommentData
    }
  } = useHttpRequest({
    method: 'PUT',
    url: `replyComments/${commentId}`,
    preventAutoFetch: true
  });

  const { fetchRequest: deleteCommentRequest } = useHttpRequest({
    method: 'DELETE',
    url: `replyComments/${commentId}`,
    preventAutoFetch: true
  });

  const {
    state: { data: commentAuthorData }
  } = useHttpRequest({
    method: 'GET',
    url: `users/username/?userId=${userId}`
  });

  return (
        <React.Fragment key={commentId}>
            <div className="card">
                <div className="card-body">
                    <h5>
                        {commentAuthorData &&
                            `${commentAuthorData.name} ${commentAuthorData.surname}`}{' '}
                        replied:
                    </h5>
                    <br />
                    {commentValue}
                    {isAuthorized && userData && userData._id === userId && (
                        <>
                            <br />
                            <br />
                        </>
                    )}
                    {updateCommentData && (
                        <div className="alert alert-success" role="alert">
                            You just edit this comment!
                        </div>
                    )}
                    <div className="btn-group">
                        {isAuthorized && userData && userData._id === userId && (
                            <div className="leave-comment">
                                {updateCommentLoading && <Loading />}
                                {updateCommentError && navigate('/error')}
                                {!isUpdate
                                  ? (
                                    <>
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
                                    </>
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
                                                'replyComment',
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
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </>
                                    )}
                            </div>
                        )}
                        {isAuthorized && userData && userData._id === userId && (
                            <button
                                type="submit"
                                className="btn btn-sm btn-danger bi bi-trash"
                                onClick={() => {
                                  deleteCommentRequest();
                                  searchParams.append('replyComment', true);
                                  searchParams.append('comment', true);
                                  setSearchParams(searchParams);
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
                        )}
                    </div>
                </div>
            </div>
        </React.Fragment>
  );
};

export default SingleReplyComment;
