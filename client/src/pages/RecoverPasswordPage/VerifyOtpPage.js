import React, { Fragment, Suspense, lazy } from "react";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const VerifyOTP = lazy(() =>
  import("../../components/RecoverPassword/VerifyOTP")
);

function VerifyOtpPage() {
  return (
    <Fragment>
      <Suspense fallback={<LazyLoader />}>
        <VerifyOTP />
      </Suspense>
    </Fragment>
  );
}

export default VerifyOtpPage;
