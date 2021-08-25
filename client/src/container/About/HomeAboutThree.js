import React from "react";
// import {Link} from "react-router-dom";
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
        <>
        <style>
            {`
                .detail_intro{
                    font-size: 18px;
                }
            `}
        </style>
        <div className="video-section section section-padding-t90-b100">
            <div className="container">
                <div className="row">

                    <div className="col-lg-8 m-auto" data-aos="fade-up">
                        <div className="about-content-full text-center mb-lg-10 mb-0">
                            <h2 className="title">명지대학교 유일 족구동아리 &apos;삼박자&apos;</h2>
                            <p>{introduction}</p>
                            <p className="detail_intro">명지대학교 &apos;유일 족구 동아리 삼박자&apos;입니다! 족구 동아리지만 족구만 하는 동아리가 아닌, &apos;족구&apos;라는 스포츠 주제로 운동, 문화홍보, 건강증진 등 다양한 목표를 가지고 학업 뿐만 아니라 학우 간 유대감을 더욱 강화하고자 모인 동아리입니다. 족구 실력과 상관 없이 족구에 관심이 있거나, 다양한 친목 활동을 통하여 재밌게 놀고 싶은 사람 신입생부터 복학생까지 모두 다 환영합니다!</p>

                            {/* <Link to={process.env.PUBLIC_URL + "/"} className="link"> <mark>Read More</mark> </Link> */}
                        </div>
                    </div>
                </div>

            </div>
        </div>
        </>
    )
}

HomeAboutThree.propTypes = {
    introduction: PropTypes.string
};

export default HomeAboutThree;
