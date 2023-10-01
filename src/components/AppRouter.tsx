import React from 'react';
import {Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router";
import {useAppSelector} from "../store/hooks/redux";
import {isAuthSelector} from "../store/slices/UserSlice";


const AppRouter = () => {

    const isAuth = useAppSelector(isAuthSelector)

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