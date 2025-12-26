// 目录下的index.tsx/js会自动调用

import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import MangeLayout from "../layouts/MangeLayout";
import List from "../pages/mange/List";
import Trash from "../pages/mange/Trash";
import Star from "../pages/mange/Star";
import QuestionLayout from "../layouts/QuestionLayout";
import Edit from "../pages/question/Edit";
import Stat from "../pages/question/Stat";
import Page from "../pages/demo";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/page",
        element: <Page></Page>,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "manage",
        element: <MangeLayout></MangeLayout>,
        children: [
          {
            path: "list",
            element: <List></List>,
          },
          {
            path: "star",
            element: <Star></Star>,
          },
          {
            path: "trash",
            element: <Trash></Trash>,
          },
        ],
      },

      {
        path: "*",
        element: <NotFound></NotFound>,
      },
    ],
  },
  {
    path: "question",
    element: <QuestionLayout></QuestionLayout>,
    children: [
      {
        path: "edit/:id",
        element: <Edit></Edit>,
      },
      {
        path: "stat/:id",
        element: <Stat></Stat>,
      },
    ],
  },
]);
export default router;
export const HOME_PATHNAME = "/";
export const LOGIN_PATHNAME = "/login";
export const REGISTER_PATHNAME = "/register";
export const MANAGE_INDEX_PATHNAME = "/manage/list";

export function isLoginOrRegister(pathname: string) {
  if ([LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) {
    return true;
  }
  return false;
}

export function isNoNeedUserInfo(pathname: string) {
  if ([HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) {
    return true;
  }
  return false;
}
