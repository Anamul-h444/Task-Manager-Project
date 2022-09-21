import React, { Fragment, useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import {
  AiOutlineEdit,
  AiOutlineCalendar,
  AiOutlineDelete,
} from "react-icons/ai";
import { TaskListByStatus } from "../../api-services/Api-services";
import { useSelector } from "react-redux";
import { DeleteToDO } from "../helper/deleteAlert";
import { UpdateToDO } from "../helper/updateAlert";


function New() {
  useEffect(() => {
    TaskListByStatus("new");
  }, []);

  const newTask = useSelector((state) => state.task.new);
  //console.log("New:", newTask);

  const deleteHandler = (_id) => {
    DeleteToDO(_id).then((result) => {
      if (result === true) {
        TaskListByStatus("new");
      }
    });
  };
  const updateHandler = (_id, status) => {
    UpdateToDO(_id, status).then((result) => {
      if (result === true) {
        TaskListByStatus("new");
      }
    });
  };
  return (
    <Fragment>
      <Container>
        <Row>
          <Col sm={12} md={6} lg={8} className="mt-4">
            <h4>New Task</h4>
          </Col>

          <Col sm={12} md={6} lg={4} className="d-flex">
            <input type="text" className="form-control me-2" />
            <button className="btn btn-info">Search</button>
          </Col>
        </Row>
        <Row>
          {newTask.map((task, index) => (
            <Col key={index.toString()} lg={4} md={4} sm={6} xs={12}>
              <div className='card mt-4 shadow p-3 mb-5 bg-body rounded"'>
                <div className="card-body">
                  <h5>{task.title}</h5>
                  <p>{task.description}</p>
                  <AiOutlineCalendar className="me-2" /> {task.Date}
                  <AiOutlineEdit onClick={updateHandler.bind(this, task._id, task.status)} className="ms-2 me-2" />
                  <AiOutlineDelete
                    onClick={deleteHandler.bind(this, task._id)}
                  />
                  <button className="btn btn-info float-end btn-sm">
                    {task.status}
                  </button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </Fragment>
  );
}

export default New;
