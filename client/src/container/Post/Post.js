import React from 'react';
import SectionTitle from '../../components/SectionTitles/SectionTitle';
// import WorkData from '../../data/work/workDetails.json';
// import WorkItemTwo from '../../components/Work/WorkItemTwo.jsx';
import PostForm from '../../components/Post/PostForm';

const Post = () => {
    return (
        <div className="section section-padding-t90-b100">
            <div className="container">

                <SectionTitle
                    headingOption="title fz-32"
                    title="글쓰기"
                />

                {/* <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1 mb-n6">

                    {WorkData && WorkData.map((single, key) => {
                            return(
                                <div key={key} className="col mb-6" data-aos="fade-up" data-aos-delay="300">
                                    <WorkItemTwo classOption="box-border" data={single} key={key} />
                                </div>
                            ); 
                    })}
                    
                </div> */}

                <PostForm />
            </div>
        </div>
    )
}

export default Post;
