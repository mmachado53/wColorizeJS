import React from "react";
import PropTypes from "prop-types"
import FileDropView from "./FileDropView";
import makeStyles from "@material-ui/core/styles/makeStyles";
import logoImg from "../../../images/logo.png"
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import chromeIconImg from "../../../images/chrome-icon.png"
const VideoButton = withStyles(theme => ({
    root: {
        color: '#ffffff',
        borderRadius: 10,
        boxShadow: 'none',
        fontSize: 22,
        textTransform : "none",
        padding: '10px 40px',
        border: '0px solid',
        lineHeight: 1.5,
        background : "#f04b63",
        '&:hover': {
            background: theme.palette.primary.light,
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

const useStyles = makeStyles(theme => ({
    grow:{
        flexGrow:1
    },
    loaderContainer:{
        position:"fixed",
        top:0,
        left:0,
        right:0,
        bottom:0,
        background: "#292827",
        "& p":{
            textAlign : "center"
        },
        "& p:first-child" : {
            marginTop: 40
        }
    },
    videoButtonContainer: {
        marginTop : 40,
        marginBottom : 40
    },
    logo : {
        width : 246,
        height : 115,
        margin : "auto",
        background :"url("+logoImg+")",
        backgroundSize : "cover"
    },
    chromeIcon : {
        width : 20,
        height : 20,
        background :"url("+chromeIconImg+")",
        backgroundSize : "cover",
        display : "inline-block",
        marginLeft : 5
    },
    chromeWarning : {
        fontSize: 16,
        color: "#ffffff"
    }
}));


const Index = (props)=>{
    const classes = useStyles()
    const {onFileDrop} = props
    const openVideo = ()=>{
        window.open('https://www.youtube.com/watch?v=xLzOS9Q5Zng','_blank')
    }
    return (
        <div className={classes.loaderContainer}>
            <p>
                <div className={classes.logo} />
            </p>
            <p className={classes.videoButtonContainer}>
                <VideoButton onClick={openVideo}>
                    Watch Demo Video
                </VideoButton>
            </p>
            <p className={classes.chromeWarning}>
                For now it is only supported by chrome
                <span className={classes.chromeIcon}/>
            </p>
            <FileDropView onFiles={onFileDrop} accept={"image/x-png,image/jpeg"}/>
        </div>
    )
}

Index.propTypes = {
    onFileDrop : PropTypes.func.isRequired
}

export default Index