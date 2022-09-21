import React, { Fragment, useRef } from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { CreateTask } from '../../api-services/Api-services';
import { ToastContainer } from "react-toastify";
import toast, { Toaster } from 'react-hot-toast';
import {
  isEmpty,
  isEmail,
  successsToast,
  errorToast,
} from "../helper/FormHelper";

function Create() {
  let taskRef, taskDetailRef = useRef;
  let navigate = useNavigate();

  const handleSubmit = () => {
    let title = taskRef.value;
    let description = taskDetailRef.value;
    console.log(title, description);

    if (isEmpty(title)) {
      errorToast("Title is Required!");
    } else if (isEmpty(description)) {
      errorToast("Task Description is Required!");
    } else {
      CreateTask(title, description).then((result) => {
       
        if (result === true) {
          setTimeout(()=>{
            navigate('/NewPage')
          }, 1000)
        }
      });
    }
  }
  

  return (
    <Fragment>
      <Container fluid={true}>
        <Row className='d-flex justify-content-center'>
          <Col lg={8} md={8} sm={12}>
            <div className='card w-100 p-4 mt-4 shadow p-3 mb-5 bg-body rounded"'>
              <div className="card-body">
                  <h6 className="text-center fw-bolder">Create New Task</h6>
                  <input ref={(input)=>taskRef=input} type="text" placeholder="Task title" className="form-control" /> <br/>
                  <textarea ref={(input)=>taskDetailRef=input} type="text" rows={5} className="form-control" placeholder='Detail About Task' /> <br/>
                  <input onClick={handleSubmit} type="button" value={"Create New"} className='btn btn-info float-end'/>
              </div>

            </div>

          </Col>
        </Row>
      </Container>
      <Toaster />
      <ToastContainer />
    </Fragment>
  )
}

export default Create
