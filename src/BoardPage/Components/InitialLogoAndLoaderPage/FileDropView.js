import React, {useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types'
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";



const useStyles = makeStyles(theme => ({
    main:{
        boxShadow : "0px 2px 100px 10px rgba(0,0,0,0.30)",
        border : "2px dashed #38342f",
        borderRadius:20,
        maxWidth:440,
        margin: "auto",
        padding: "50px 0px",
        textAlign: "center",
        background : "#2f2d2a",
        color : '#ffffff',
        fontSize: 22,
        "& p":{
        }
    },
    spanT:{
        borderRadius : 10,
        display : "inline-block",
        overflow: "hidden",
        background : 'conic-gradient(#75baeb, #ff66cc, #75baeb) ',
        padding : 1,
        '&:hover': {
            //background: 'conic-gradient(#ff66cc, #75baeb, #ff66cc) ',
           // borderColor: '#0062cc',
            //boxShadow: 'none',
        }
    }
}));


const LoadButton = withStyles(theme => ({
    root: {
        color: '#ffffff',
        borderRadius: 9,
        boxShadow: 'none',
        fontSize: 22,
        textTransform : "none",
        padding: '10px 40px',
        border: '0px solid',
        lineHeight: 1.5,
        background : "#2f2d2a",
        '&:hover': {
            background: theme.palette.primary.dark,
            boxShadow: 'none',
        },
        '&:active': {
            //boxShadow: 'none',
            //backgroundColor: '#0062cc',
            //borderColor: '#005cbf',
        },
        '&:focus': {
            //boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        }
    },
}))(Button);

function FileDropView(props) {
    const classes = useStyles();

    const fileInputRef = useRef()
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

    const handleLoadPicture = ()=>{
        console.log("handleLoadPicture")
        fileInputRef.current.click()
    }

    return (
        <Paper color={""} className={classes.main} onDragEnter={onDragEnter}
               onDragOver={onDragOver} onDrop={onFileDrop}>
            <p>
                <div className={classes.spanT}>
                <LoadButton onClick={handleLoadPicture} variant="contained">
                    Load Picture
                </LoadButton>
                </div>
            </p>

            <input hidden={true} ref={fileInputRef} type="file" accept={props.accept || ""}
                   onChange={(event)=> {
                       readFile(event)
                   }}
                   onClick={(event)=> {
                       event.target.value = null
                       event.currentTarget.value = null;
                   }}
            />
            <p>or</p>
            <p>Drag a picture here</p>
        </Paper>
    );
}

FileDropView.propTypes = {
    onFiles:PropTypes.func.isRequired,
    accept:PropTypes.string.isRequired
}


export default  FileDropView;