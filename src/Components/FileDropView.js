import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types'



const useStyles = makeStyles(theme => ({
    main:{
        padding: theme.spacing(10),
        textAlign: "center"
    }
}));
function FileDropView(props) {
    const classes = useStyles();
    console.log("props",props)

    function componentDidMount() {
        console.log("componentDidMount")
    }

    function componentWillUnmount() {
        console.log("componentWillUnmount")
    }
    function onFileDrop(e) {
        let event = e
        event.stopPropagation()
        event.preventDefault()
        if (props.onFiles) {
            props.onFiles(e.dataTransfer.files)
        }
    }

    function onDragOver(e) {
        let event = e
        event.stopPropagation()
        event.preventDefault()
    };

    function onDragEnter(e) {
        let event = e
        event.stopPropagation()
    };

    function readFile(e){
        if (props.onFiles) {
            props.onFiles(e.currentTarget.files)
        }
        e.currentTarget.value = null
    }

    return (
        <Paper className={classes.main} onDragEnter={onDragEnter}
               onDragOver={onDragOver} onDrop={onFileDrop}>
            <input type="file" accept={props.accept || ""}
                   onChange={(event)=> {
                       readFile(event)
                   }}
                   onClick={(event)=> {
                       event.target.value = null
                       event.currentTarget.value = null;
                   }}
            />
            <p>Arrastra y suelta un archivos a esta zona ...</p>
        </Paper>
    );
}

FileDropView.propTypes = {
    onFiles:PropTypes.func.isRequired,
    accept:PropTypes.string.isRequired
}


export default  FileDropView;