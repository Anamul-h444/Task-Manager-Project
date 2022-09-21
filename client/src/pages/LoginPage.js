import React, { Fragment, Suspense, lazy } from 'react'
import LazyLoader from '../components/MasterLayout/LazyLoader'
const Login = lazy(() => import('../components/Login/Login'))

function LoginPage() {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader />}>
                <Login />
            </Suspense>
        </Fragment>
    )
}

export default LoginPage