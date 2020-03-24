import { Button, Icon, TextField } from '@material-ui/core';
import React, { ChangeEvent, Fragment, FunctionComponent } from 'react';

export interface ISearchbarProps {
  onChange(query: string): void;
  onSearchRequest(): void;
  label: string;
  inputValue: string;
}

export const Searchbar: FunctionComponent<ISearchbarProps> = ({
  onChange,
  onSearchRequest,
  label = 'Search here',
  inputValue,
}) => {
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      onSearchRequest();
    }
  };

  return (
    <Fragment>
      <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
        <TextField
          id="filled-name"
          label={label}
          margin="normal"
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
          style={{ flex: 1 }}
          value={inputValue}
        />
        <Button
          color="primary"
          onClick={onSearchRequest}
          style={{ height: 'fit-content', marginLeft: 20 }}
          variant="contained"
        >
          <Icon style={{ marginRight: 5 }}>search</Icon>
          Search
        </Button>
      </div>
    </Fragment>
  );
};
