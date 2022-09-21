import React, { Fragment, Suspense, lazy } from 'react'
import LazyLoader from '../components/MasterLayout/LazyLoader'
import MasterLayout from '../components/MasterLayout/MasterLayout'
const Canceled = lazy(() => import('../components/Canceled/Canceled'))

export default function CanceledPage() {
  return (
    <Fragment>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <Canceled />
        </Suspense>
      </MasterLayout>
    </Fragment>
  )
}
