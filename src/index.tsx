import React from 'react';
import ReactDOM from 'react-dom';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import Edit from "./pages/Edit";
import Display from "./pages/Display";
import Homepage from "./pages/Homepage";

import './styles/App.scss';

const router = createBrowserRouter([
  {path: "/edit/:name", element: <Edit/>},
  {path: "/:name", element: <Display/>},
  {path: "/", element: <Homepage/>},
]);

ReactDOM.render(<RouterProvider router={router}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
