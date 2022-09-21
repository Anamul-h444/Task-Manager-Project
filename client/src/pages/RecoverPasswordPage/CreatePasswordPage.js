import React, { Fragment, Suspense, lazy } from "react";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const CreatePassword = lazy(() =>
  import("../../components/RecoverPassword/CreatePassword")
);

function CreatePasswordPage() {
  return (
    <Fragment>
      <Suspense fallback={<LazyLoader />}>
        <CreatePassword />
      </Suspense>
    </Fragment>
  );
}

export default CreatePasswordPage;
