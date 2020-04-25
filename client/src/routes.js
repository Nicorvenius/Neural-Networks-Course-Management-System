import React from "react";
import {Switch, Route, Redirect} from "react-router-dom/"
import UserOffice from './pages/UserOffice'
import AuthPage from "./pages/AuthPage";
import Course from "./pages/Course";
import CreateCourse from "./pages/CreateCourse";
import ReadCourse from "./pages/ReadCourse";
import EditCourse from "./pages/EditCourse";


export const useRoutes = (isAuthenticated, props) => {
    if (props.isAdmin === true){
        return (
            <Switch>
                <Route path="/create-course/" exact>
                    <CreateCourse token = {props.token} userId = {props.userId}/>
                </Route>

                <Route path="/edit/:id?" exact>
                    <EditCourse token = {props.token} userId = {props.userId}/>
                </Route>

                <Route path="/course" exact>
                    <Course token = {props.token} userId = {props.userId}/>
                </Route>

                <Route path="/course/:id" exact>
                    <ReadCourse token = {props.token} userId = {props.userId}/>
                </Route>

                <Route path="/user" exact>
                    <UserOffice token = {props.token} userId = {props.userId}/>
                </Route>

                <Redirect to="/course"/>
            </Switch>
        )
    }
    if (isAuthenticated) {
        return (
            <Switch>

                <Route path="/course/:id" exact>
                    <ReadCourse token = {props.token} userId = {props.userId}/>
                </Route>

                <Route path="/course" exact>
                    <Course token = {props.token} userId = {props.userId}/>
                </Route>

                <Route path="/user" exact>
                    <UserOffice token = {props.token} userId = {props.userId}/>
                </Route>
                <Redirect to="/course"/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage login = {props.login}/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}
