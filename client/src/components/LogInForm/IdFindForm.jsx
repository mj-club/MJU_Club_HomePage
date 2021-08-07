import React, {Fragment, useState} from 'react';
import { useForm } from "react-hook-form";
import {  nameCheck } from "../../actions";
import { useDispatch } from "react-redux";

const IdFindForm = () => {

  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = (event) => {
    setShowPopup(event.target.value)
  };

  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm({
      mode: "onBlur"
  });
  const onSubmit = (data) => {
    const body = data;
    dispatch(nameCheck(body));
  }
  
    
    return (
        <Fragment>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row mb-n4">
            <div className="col-md-12 col-12 mb-4">
              <input type="text"  placeholder="Name *" name="name" ref={register({
                required: 'name is required',
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "invalid name"
                }
              })} />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div className="col-md-12 col-12 mb-4">
              <input type = "number" placeholder="Student Id *" name="studentid" ref={register({ 
                required: 'Student Id is required',
                pattern: {
                  value:/[0-9]{8}/,
                  message: "invalid student Id"
                }
             })} />
              {errors.studentid && <p>{errors.studentid.message}</p>}
            </div>
              <div className="col-12 text-center mb-4">
                <button className="btn btn-primary btn-hover-secondary" onClick={togglePopup} value = 'false'>Email 찾기</button>
                {showPopup ? (
                  <div>
                    <div className = "popup_inner">
                      <h2>this is your email</h2>
                      <button className = "close" onClick = {togglePopup}>
                        Close
                      </button>
                    </div>
                  </div>
                ): null}
              </div>
          </div>
        </form>
        <p className="form-messege"></p>
        </Fragment>
    )
}

export default IdFindForm;
