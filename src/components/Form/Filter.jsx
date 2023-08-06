import React from 'react';
import PropTypes from 'prop-types';

import { FilterInput } from './Form.styled';

export const Filter = ({ filter, onChangeValue }) => {
  return (
    <div>
      <FilterInput
        type="text"
        placeholder="Write contact"
        value={filter}
        onChange={e => onChangeValue(e.target.value)}
      />
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChangeValue: PropTypes.func,
};
