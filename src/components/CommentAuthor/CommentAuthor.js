import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import useHttpRequest from '../../hooks/useHttpRequest';
import Loading from '../Main/Loading';

const CommentAuthor = ({ userId }) => {
  CommentAuthor.propTypes = {
    userId: PropTypes.string
  };

  const navigate = useNavigate();
  const {
    state: { error, data, loading }
  } = useHttpRequest({
    method: 'GET',
    url: `users/username/?userId=${userId}`
  });

  return (
        <>
            {loading && <Loading />}
            {error && navigate('/error')}
            {data && `${data.name} ${data.surname}`}
        </>
  );
};

export default CommentAuthor;
