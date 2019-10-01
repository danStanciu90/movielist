import React, { Fragment, FunctionComponent, ChangeEvent } from 'react';
import { TextField, Icon, Button } from '@material-ui/core';

export interface ISearchbarProps {
  onChange(query: string): void;
  onSearchRequest(): void;
  label: string;
  inputValue: string;
}

export const Searchbar: FunctionComponent<ISearchbarProps> = ({
  onChange, onSearchRequest, label = "Search here", inputValue
}) => {

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      onSearchRequest()
    }
  }

  return (
    <Fragment>
      <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
        <TextField
          id="filled-name"
          label={label}
          value={inputValue}
          onChange={handleSearchChange}
          margin="normal"
          style={{ flex: 1 }}
          onKeyPress={handleKeyPress}
        />
        <Button color="primary" variant="contained" onClick={onSearchRequest} style={{ height: 'fit-content', marginLeft: 20 }}>
          <Icon style={{ marginRight: 5 }}>search</Icon>
          Search
        </Button>
      </div>
    </Fragment>
  )
}