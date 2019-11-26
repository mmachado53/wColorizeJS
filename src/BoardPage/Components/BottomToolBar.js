import React, {memo} from "react";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import brushIcon from "../../images/brush-icon.png";
import ereaseIcon from "../../images/erease-icon.png";
import Divider from "@material-ui/core/Divider";
import magicWandIcon from "../../images/magic-wand-icon.png";
import polygonIcon from "../../images/polygon-icon.png";
import AppBar from "@material-ui/core/AppBar/AppBar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PropTypes from "prop-types"
import LayerRow from "./LayerRow";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles(theme => ({
    toolbar:{
        paddingLeft:0,
        paddingRight:0
    },
    appBarBottom: {
        top: 'auto',
        bottom: 0/*,
        height:50*/
    },
    iconImg:{
        width:24,
        height: 24
    },
    divider:{
        height: 24,
        backgroundColor: "rgb(100,100,100)",
        marginLeft:5,
        marginRight:5
    }


}));

const BottomToolBar = (props)=>{
    const {handleBrushBtn,handleMagicWandBtn,handleSelectionPolygonBtn,visible} = props
    const classes = useStyles()
    return (
        <Slide direction="up" in={visible}>
            <AppBar  position="fixed" color="primary" className={classes.appBarBottom}>
                <Toolbar className={classes.toolbar} variant="dense">
                    <IconButton  onClick={handleBrushBtn} >
                        <img className={classes.iconImg} src={brushIcon}/>
                    </IconButton>
                    <Divider orientation="vertical" className={classes.divider}  light={true}/>

                    <IconButton  onClick={handleMagicWandBtn} >
                        <img className={classes.iconImg} src={magicWandIcon}/>
                    </IconButton>

                    <IconButton onClick={handleSelectionPolygonBtn}>
                        <img className={classes.iconImg} src={polygonIcon}/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Slide>
    )
}

BottomToolBar.propTypes = {
    handleBrushBtn: PropTypes.func.isRequired,
    handleMagicWandBtn: PropTypes.func.isRequired,
    handleSelectionPolygonBtn: PropTypes.func.isRequired,
    visible:PropTypes.bool.isRequired
};




export default BottomToolBar