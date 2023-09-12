import React from 'react';
import {Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router";
import {useSelector} from "react-redux";
import {useAppSelector} from "../hooks/redux";


const AppRouter = () => {
    const auth = false;
    const {isAuth} = useAppSelector(state => state.auth)

    const public_routes = publicRoutes.map(route =>
        <Route
            key={route.path}
            path={route.path}
            element={route.element}
        />
    )

    return (
        isAuth
        ?
            <Routes>
                {privateRoutes.map(route =>
                <Route
                    path={route.path}
                    element={route.element}
                    key={route.path}
                />
                )}
            </Routes>
            :
            <Routes>
                {public_routes}
            </Routes>
    );
};

export default AppRouter;