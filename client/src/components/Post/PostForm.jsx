import React, {  useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import MyQuill from "./MyQuill";


const PostForm = () => {
  const [content, setContent] = useState('');
  


  // useEffect(() => {
  //   var text = document.getElementById('text')
  //   text.innerHTML = content;
  //   console.log(content);
  // },[content]);

  const {  register, handleSubmit , formState: {errors}} = useForm({
    mode: "onBlur"
  });
  const onSubmit = (data) => {
    console.log(content);
    console.log(data);
  }

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, false] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline','strike', 'blockquote', { 'align': [] }],
      [{ 'color': [] }, { 'background': [] }],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  return(
    <>
    <style type="text/css">
      {`
        input.postform{
          background : #fff;
          background-color : #fff;
          border-color : #ccc;
        }
        .form-select{
          width: 100%;
          min-height: 56px;
          padding: 3px 20px;
          color: #9F9F9F;
          border-radius: 5px;
          outline: none;
        }
        .ql-container.ql-snow{
          height: 30rem;
          border-radius: 0px 0px 5px 5px;
        }
        .ql-toolbar.ql-snow{
          border-radius: 5px 5px 0px 0px;
        }
      `}
    </style>
    <form onSubmit={handleSubmit(onSubmit)}>
    <select className="mb-2 form-select" name="category" {...register("category") }>
          <option value="공지사항">공지사항</option>
        </select>
       
        <input className="mb-2 postform" type="text" placeholder="제목" name="title" 
        {...register("title", {required: "제목을 입력해주세요"})}
        />
        {errors.title && <p>{errors.title.message}</p>}
        <ReactQuill className="mb-2 editor" theme="snow"
                  modules={modules}
                  value={content} onChange={setContent}
                  >
        </ReactQuill>
        <p className="text-right"><input type="checkbox" name="isTop" {...register("isTop")}/>상단 고정</p>
        
        <div className="text-center">
          <button className="btn btn-primary btn-hover-secondary"
          // onClick={() => {
          //   const editor = this.reactQuillRef.getEditor();
          //   const unprivilegedEditor = this.reactQuillRef.makeUnprivilegedEditor(editor);
          //   // You may now use the unprivilegedEditor proxy methods
          //   const text = unprivilegedEditor.getContent();
          //   console.log(text);
          // }
          // }
          >글쓰기</button>
        </div>
        <MyQuill />
    </form>
    </>
  );
}

export default PostForm;