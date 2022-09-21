import React from 'react';
import "../../assets/css/progress.css"
import loaderImg from "../../assets/images/Infinity-1s-200px.svg"
import {useSelector} from 'react-redux'
const LazyLoader = () => {
    const loader = useSelector((state)=> state.progress.loader)
    return (
        <div className={loader+"ProcessingDiv"}>
            <div className="center-screen">
                <img className="loader" src={loaderImg} />
            </div>
        </div>
    );
};

export default LazyLoader;