import PropTypes from "prop-types";
import React from 'react';
import {Link} from "react-router-dom";


const Logo = ({image}) => {
    return(
        <div className="header-logo">
            <Link to={process.env.PUBLIC_URL + "/"}>
                <img src={process.env.PUBLIC_URL + image} alt="Logo" />
            </Link>
        </div>
    )
}

Logo.propTypes = {
    image: PropTypes.string
};

export default Logo;
