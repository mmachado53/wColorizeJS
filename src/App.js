import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Container} from "@material-ui/core";
import BoardPage from "./BoardPage";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    rootContainer: {
       padding:0,
        margin:0
    }
});

function App() {
    const classes = useStyles()

  return (
      <Container className={classes.rootContainer} maxWidth={false}>
        <BoardPage/>
      </Container>

  );
}

export default App;
