import React, {Fragment} from 'react';
import { useForm } from "react-hook-form";
import { findEmail } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

const FindEmailForm = () => {

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);

  const { register, handleSubmit, errors } = useForm({
      mode: "onBlur"
  });
  const onSubmit = (data) => {
    const body = data;
    dispatch(findEmail(body));
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
              <input type = "text" placeholder="phone number *" name="phone_number" ref={register({ 
                required: 'Phone Number is required',
                pattern: {
                  value:/^\d{3}\d{3,4}\d{4}$/,
                  message: "invalid phone numver"
                }
             })} />
              {errors.phone_number && <p>{errors.phone_number.message}</p>}
            </div>
            {!loading &&
              <div className="col-12 text-center mb-4">
                <button className="btn btn-primary btn-hover-secondary">Email 찾기</button>
              </div>
            }
            {loading &&
              <div className="col-12 text-center mb-4">
                <button className="btn btn-primary btn-hover-secondary">-</button>
              </div>
            }
          </div>
        </form>
        <p className="form-messege"></p>
        {

        }
        </Fragment>
    )
}

export default FindEmailForm;

