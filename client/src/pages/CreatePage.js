import React, { Fragment, Suspense, lazy } from 'react'
import MasterLayout from '../components/MasterLayout/MasterLayout'
import LazyLoader from '../components/MasterLayout/LazyLoader'
const Create = lazy(() => import('../components/Create/Create'))

function CreatePage() {
  return (
    <Fragment>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <Create />
        </Suspense>
      </MasterLayout>
    </Fragment>
  )
}

export default CreatePage