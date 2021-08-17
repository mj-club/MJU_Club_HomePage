import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const HomeAboutThree = ({introduction}) => {
    // const publicUrl = process.env.PUBLIC_URL;
    // const [isOpen, setOpen] = useState(false)
    // const sceneEl = useRef(null);
    // useEffect(() => {
    //     const parallaxInstance = new Parallax(sceneEl.current, {
    //     relativeInput: true,
    //     })
        
    //     parallaxInstance.enable();

    //     return () => parallaxInstance.disable();

    // }, [])
    return (
        <div className="video-section section section-padding-t90-b100">
            <div className="container">
                <div className="row">

                    <div className="col-lg-8 m-auto" data-aos="fade-up">
                        <div className="about-content-full text-center mb-lg-10 mb-0">
                            <h2 className="title">동아리 이름</h2>
                            <p>{introduction}</p>
                            <p></p>

                            <Link to={process.env.PUBLIC_URL + "/"} className="link"> <mark>Read More</mark> </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

HomeAboutThree.propTypes = {
    introduction: PropTypes.string
};

export default HomeAboutThree;
