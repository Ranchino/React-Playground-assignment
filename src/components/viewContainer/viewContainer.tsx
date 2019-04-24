import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Spinner from '../spinner';
import SearchBox from '../searchBox';


const MasterView = React.lazy(() => import(/* webpackChunkName: "masterView" */ './masterView'));
const DetailView = React.lazy(() => import(/* webpackChunkName: "detailView" */ './detailView/detailView'));

/** React function component */
export default function ViewContainer() {


    return (
        <Suspense fallback={<Spinner/>}>
            <Switch>
                <Route path="/:id" component={DetailView}></Route>
                <SearchBox/>
            </Switch>
        </Suspense>
    );
}