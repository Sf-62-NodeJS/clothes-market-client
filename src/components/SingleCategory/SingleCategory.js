import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import useHttpRequest from '../../hooks/useHttpRequest';
import Loading from '../Main/Loading';

const SingleCategory = ({ id }) => {
  SingleCategory.propTypes = {
    id: PropTypes.string
  };

  const navigate = useNavigate();
  const {
    state: { error, data, loading }
  } = useHttpRequest({
    method: 'GET',
    url: `categories/?_id=${id}`
  });

  return (
        <span>
            {loading && <Loading />}
            {error && navigate('/error')}
            {data && data.length && data[0].name}
        </span>
  );
};

export default SingleCategory;
