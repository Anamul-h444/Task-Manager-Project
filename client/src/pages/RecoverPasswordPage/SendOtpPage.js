import React, { Fragment, Suspense, lazy } from "react";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const SendOTP = lazy(() => import("../../components/RecoverPassword/SendOTP"));

export default function SendOtpPage() {
  return (
    <Fragment>
      <Suspense fallback={<LazyLoader />}>
        <SendOTP />
      </Suspense>
    </Fragment>
  );
}
