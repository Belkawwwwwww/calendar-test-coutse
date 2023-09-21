import React from 'react';
import {Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router";


const AppRouter = () => {

    const public_routes = publicRoutes.map(route =>
        <Route
            key={route.path}
            path={route.path}
            element={route.element}
        />
    )

    return (

        <Routes>
            {privateRoutes.map(route =>
                <Route
                    path={route.path}
                    element={route.element}
                    key={route.path}
                />
            )}
            {public_routes}
            </Routes>


    );
};

export default AppRouter;