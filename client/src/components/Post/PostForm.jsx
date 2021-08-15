import React, {useState} from 'react';
import {useDispatch, 
  // useSelector 
} from "react-redux";
import { createPost } from '../../actions';


//Todo
// 글쓴이에 이름? id? email?
//

//  I. 총동연   II. 동아리별
// 1. 글쓰기
// 2. 글보기(table로, 클릭했을때)
// 3. 글수정하기 & 삭제

const PostForm = () => {
  const [title, setTitle] = useState(null);
  const [category, setCategory] = useState(null);
  const [content, setContent] = useState(null);
  // const [thumbnail, setThumbnail] = useState(null);
  const [top, setTop] = useState(null);
  

  // const userEmail = useSelector(state => state.authReducer.user_email);
  //validation
  // const { register, handleSubmit, setError, errors } = useForm({
  //   mode: "onBlur"
  // });
  // const onSubmit = data => console.log(data);
  // console.log("error", errors);

  const dispatch = useDispatch();

  // const Submit = () => {
  //   if(length(content) > 3){
  //     setThumbnail(content.substring(0,2) + "...");
  //   } else {
  //     console.log(content);
  //   }
  //   console.log(title, category, content, thumbnail, top);
    
  // }

  dispatch(createPost(title, category, content, top));
  
  return(
    <>
    <form action="/create/union/announcement" 
    // onSubmit={handleSubmit(onSubmit)}
    >
      <p>제목</p>
      <input name="title" onChage={({target:value}) => {
        setTitle(value);
        console.log(value);
      }}/>

      <p>카테고리</p>
      <input name="category" 
      value="announcement"
      onChage={({target:value}) => {
        setCategory(value);
        console.log(value);
      }}/>

      <p>setTop</p>
      <input name="set_top" onClick={() => {
        setTop(true);
      }}/>

      <p>내용</p>
      <textarea name="content" onChange={({target:value}) => {
        setContent(value);
      }}/>
{/* 
      <button 
      onClick={Submit()}
      >글쓰기</button> */}
    </form>
    </>
  );
};

export default PostForm;