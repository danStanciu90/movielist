import React, { FunctionComponent } from 'react';
import { CircularProgress } from '@material-ui/core';


export const LoadingOverlay: FunctionComponent = () => {
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#FFFFFF', opacity: .6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
        </div>
    )
}