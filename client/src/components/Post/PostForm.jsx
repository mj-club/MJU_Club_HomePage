import React from "react"
import MyQuill from "./MyQuill";
import { useForm } from "react-hook-form";


const ContentEditor = () => {
  const {  handleSubmit } = useForm({
    mode: "onBlur"
  });
  const onSubmit = (data) => {
    console.log(data);
  }


  return (

    <>
    <style type="text/css">
      {`
        input.postform{
          background : #fff;
          background-color : #fff;
          border-color : #ccc;
          color : yellow;
        }

        .form-select{
          width: 100%;
          min-height: 56px;
          padding: 3px 20px;
          color: #9F9F9F;
          border-radius: 5px;
          outline: none;
        }
      `}
    </style>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <select className="mb-2 form-select">
          <option>공지사항</option>
        </select>
        <input className="mb-2 postform" type="text" placeholder="제목" name="title" />
        <MyQuill />
        <p className="text-right"><input type="checkbox" name="isTop"/>상단 고정</p>
        
        <div className="text-center">
          <button className="btn btn-primary btn-hover-secondary">글쓰기</button>
        </div>
      </form>
      
    </>
  );
}

export default ContentEditor;