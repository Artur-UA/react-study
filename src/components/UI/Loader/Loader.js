import React from 'react';
import './Loader.css'

const Loader = props => ( //лоадер установлен из сайта loaders.io 
    <div className="center">
        <div className="lds-ellipsis">
            <div /><div /><div /><div />
        </div>
    </div>
)

export default Loader