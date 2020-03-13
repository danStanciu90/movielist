import { CircularProgress } from '@material-ui/core';
import React, { FunctionComponent } from 'react';

export const LoadingOverlay: FunctionComponent = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#FFFFFF',
        opacity: 0.6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
    </div>
  );
};
