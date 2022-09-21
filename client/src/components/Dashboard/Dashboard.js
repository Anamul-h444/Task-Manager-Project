import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { statusSummary } from "../../api-services/Api-services";

function Dashboard() {
  useEffect(() => {
    statusSummary("count");
  }, []);

  const summary = useSelector((state) => state.summary.count);

  console.log("dashboard:", summary);

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          {summary.map((item, index) => (
            <div
              key={index.toString()}
              className="col-lg-3 col-md-3 col-sm-6 col-12"
            >
              <div className="card rounded-4 shadow p-3 mb-5 bg-body rounded mt-4">
                <div className="card-body">
                  <h5>Total {item._id}</h5>
                  <h6 className="text-center">{item.sum}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default Dashboard;
