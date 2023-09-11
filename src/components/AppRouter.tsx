import React from 'react';
import {Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router";
import {useSelector} from "react-redux";


const AppRouter = () => {
    const auth = false;

    const public_routes = publicRoutes.map(route =>
        <Route
            key={route.path}
            path={route.path}
            element={route.element}
        />
    )

    return (
            <Routes>
                {public_routes}
            </Routes>
    );
};

export default AppRouter;