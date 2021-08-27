import PropTypes from "prop-types";
import React, {useEffect, useRef} from "react";
import contactData from '../../data/contactInfo/contactInfo.json';
import SectionTitle from '../../components/SectionTitles/SectionTitle';
import ContactInfoItem from '../../components/ContactInfo/ContactInfoItem.jsx';
import Parallax from 'parallax-js';

// import { useDispatch, useSelector } from 'react-redux';
// import { clubInfo } from '../../actions/clubActions';


const ContactInformation = ({ classOption }) => { //match
    // const dispatch = useDispatch();
    // dispatch(clubInfo(match.params.clubName));
    
    const sceneEl = useRef(null);
    useEffect(() => {
        const parallaxInstance = new Parallax(sceneEl.current, {
        relativeInput: true,
        })
        
        parallaxInstance.enable();

        return () => parallaxInstance.disable();

    }, [])

    // const sns = useSelector(state => state.clubReducer.sns);

    return (
        <div className={`section section-padding-t90-b100 ${classOption}`}>
            <div className="container shape-animate">
                <SectionTitle
                    titleOption="section-title text-center mb-lg-12 mb-sm-8 mb-xs-8"
                    title="동아리 SNS를 둘러보세요!"
                    subTitle="동아리 활동 기록 | 동아리 활동 사진"
                />

                <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-1 mb-n6">
                    {contactData && contactData.map((single, key) => {
                        return(
                            <div key={key} className="col mb-6" data-aos="fade-up">
                                <ContactInfoItem data={single} key={key} />
                            </div>
                        ); 
                    })}
                </div>

                <div className="shape shape-1" id="scene" ref={sceneEl}>
                    <span data-depth="1"><img src={process.env.PUBLIC_URL + "images/shape-animation/video-shape-1.png"} alt="shape" /></span>
                </div>

            </div>
        </div>
    )
}

ContactInformation.propTypes = {
    classOption: PropTypes.string,
    match: PropTypes.shape({
        params: PropTypes.shape({
            clubName: PropTypes.string
        })
    })
};
ContactInformation.defaultProps = {
    classOption: "section section-padding-t90-b100"
};

export default ContactInformation
