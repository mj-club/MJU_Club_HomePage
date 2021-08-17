import React, { 
  useState 
} from "react"
// import MyQuill from "./MyQuill";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useForm } from "react-hook-form";


const ContentEditor = () => {
  const [content, setContent] = useState('');

  const {  register, handleSubmit } = useForm({
    mode: "onBlur"
  });
  const onSubmit = (data) => {
    console.log(content);
    console.log(data);
  }

  

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }
  return (

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

        .my-editing-area {
          height: 30rem;
          border-radius: 0px 0px 5px 5px;
        }
        .ql-toolbar.ql-snow{
          border-radius: 5px 5px 0px 0px;
        }

      `}
    </style>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <select className="mb-2 form-select" name="category" ref={register({
          required: "카테고리를 선택해주세요"
        })}>
          <option value="공지사항">공지사항</option>
        </select>
       
        <input className="mb-2 postform" type="text" placeholder="제목" name="title" ref={register()}/>
        {/* <MyQuill/> */}
        <ReactQuill className="mb-2 editor" theme="snow"
                  modules={modules}
                  value={content} onChange={setContent}
                  >
                    <div className="my-editing-area"  name="content"/>
        </ReactQuill>
        <p className="text-right"><input type="checkbox" name="isTop" ref={register()}/>상단 고정</p>
        
        <div className="text-center">
          <button className="btn btn-primary btn-hover-secondary">글쓰기</button>
        </div>
      </form>
    </>
  );
}

export default ContentEditor;