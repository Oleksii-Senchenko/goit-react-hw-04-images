import React, { useState } from 'react';

import {
  Header,
  Form,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

function Searchbar({ onChange }) {
  const [searchQuery, setSearchQuery] = useState('');
  const handleChange = ({ target }) => {
    const { value } = target;

    setSearchQuery(value);
  };

  const onSubmit = e => {
    e.preventDefault();

    onChange(searchQuery);
  };

  return (
    <Header>
      <Form onSubmit={onSubmit}>
        <SearchFormButton type="submit">
          <span>Search</span>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
}

export default Searchbar;
