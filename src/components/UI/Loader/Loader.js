import React from 'react';
import './Loader.css'

const Loader = props => ( 
    <div className="center">
        <div className="lds-ellipsis">
            <div /><div /><div /><div />
        </div>
    </div>
)

export default Loader