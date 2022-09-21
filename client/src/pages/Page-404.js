import React, { Fragment, Suspense, lazy } from 'react'
import LazyLoader from '../components/MasterLayout/LazyLoader'
const NotFound = lazy(() => import('../components/NotFound/NotFound'))

function Page404() {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader />}>
                <NotFound />
            </Suspense>
        </Fragment>
    )
}

export default Page404