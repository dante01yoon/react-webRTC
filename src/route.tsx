import React from "react";
import { Route } from "react-router";

import {
  ErrorPage,
  HomePage,
  ChannelPage,
  RoomPage,
} from "./pages"



export interface WebRoute {
  path?: string;
  exact?: boolean;
  authed?: boolean;
}

const routes: Array<WebRoute & {
  component: React.FC<any>,
}> = [
    {
      path: "/",
      authed: false,
      component: HomePage,
    },
    {
      path: "/channel",
      authed: true,
      component: ChannelPage,
    },
    {
      path: "/room/:id",
      authed: true,
      component: RoomPage,
    },
    {
      authed: false,
      component: ErrorPage,
    }
  ]

const renderRoute = () => routes.map(({ authed, path, exact, component: Component }) => {
  const route = {
    authed,
    path,
    exact
  }

  if (path) {
    return <Route path={path} exact={exact ?? true} render={(props) => <Component {...props} route={route} />} />
  }
  return <Route render={(props) => <Component {...props} route={route} />} />
})

export default renderRoute;