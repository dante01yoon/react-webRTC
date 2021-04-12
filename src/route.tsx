import { Route } from "react-router";

import {
  ErrorPage,
  HomePage
} from "./pages"

interface WebRoute {
  path?: string;
  exact?: boolean;
  component: React.ComponentType,
  authed?: boolean;
}

const routes: WebRoute[] = [
  {
    path: "/",
    authed: false,
    component: HomePage,
  },
  {
    authed: false,
    component: ErrorPage,
  }
]

const renderRoute = () => routes.map(({ path, exact, component: Component }) => {
  if (path) {
    return <Route path={path} exact={exact || true} component={Component} />
  }
  return <Route component={Component} />
})

export default renderRoute;