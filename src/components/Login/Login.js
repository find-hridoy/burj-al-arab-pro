import { Button, Container } from '@material-ui/core';
import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import { googleSignIn, initializeFrameWork, authToken } from '../../firebaseLogin';


const Login = () => {
    //Context use
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    //Private Route element 
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    // Initialize
    initializeFrameWork();
    //Google SignIn function
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(res => {
                // console.log(res);
                setLoggedInUser(res);
                storeAuthToken();
                history.replace(from);
            })
            .catch(err => {
                // console.log(err);
                setLoggedInUser(err);
            })
    }
    // Auth Token
    const storeAuthToken = () => {
        authToken()
            .then(res => {
                sessionStorage.setItem('token', res);
            })
            .catch(err => {
                //error
            })
    }
    return (
        <>
            <Container>
                <h1>This is Login</h1>
                <Button onClick={handleGoogleSignIn} variant="contained" color="secondary">
                    Sign In with Google
                </Button>
            </Container>
        </>
    );
};

export default Login;