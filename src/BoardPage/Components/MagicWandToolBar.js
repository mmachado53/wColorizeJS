import React, {useRef, useState} from "react";
import Slide from "@material-ui/core/Slide";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import makeStyles from "@material-ui/core/styles/makeStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Slider from "@material-ui/core/Slider";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import {MenuTab,MenuTabs,VerticalSlider} from "./StylizedMaterialComponents";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';




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
    },
    label:{
        color: theme.palette.secondary.light,
        marginRight:theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    smallButton:{
        minWidth: 10,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    },
    sliderPaper:{
        padding:theme.spacing(1),
        height:200,
        marginBottom:theme.spacing(1)
    },
    flexGrow1:{
        flexGrow:1
    }


}));




const MagicWandToolBar = (props)=>{

    const classes = useStyles()
    const {visible,handleTolerance,handleClose,handleType,magicWandValues,handleAccept,handleToleranceCommitted} = props
    const {tolerance,type} = magicWandValues
    const toolType = type === 0 ? 1 : 0

    const [visibleToleranceSlider, setVisibleToleranceSlider] = useState(false)

    const toleranceBtnRef = useRef()

    const handleToleranceBtnClick = ()=>{
        setVisibleToleranceSlider(!visibleToleranceSlider)
    }


    const handleToolTypeChange = (event, newValue) => {
        handleType(newValue === 0 ? 1 : 0)
    };
    const handleCloseSlider = (event)=>{
        setVisibleToleranceSlider(false)
    }
    return (
        <Slide direction="up" in={visible}>
            <AppBar  position="fixed" color="primary" className={classes.appBarBottom}>
                <Toolbar  className={classes.toolbar} variant="dense">
                    <MenuTabs onChange={handleToolTypeChange}  value={toolType}>
                        <MenuTab  icon={<AddCircleIcon/>}/>
                        <MenuTab  icon={<RemoveCircleOutlineIcon/>}/>
                    </MenuTabs>
                    <Divider orientation="vertical" className={classes.divider}  light={true}/>
                    <span className={classes.label}>Tolerance:</span>
                    <Button ref={toleranceBtnRef} onClick={handleToleranceBtnClick} className={classes.smallButton} size="small" color="secondary" variant="outlined">{tolerance}</Button>
                    <div className={classes.flexGrow1}/>
                    <IconButton onClick={handleClose}  color="secondary">
                        <CloseIcon/>
                    </IconButton>
                    <IconButton onClick={handleAccept}  color="secondary">
                        <CheckIcon/>
                    </IconButton>

                    <Popper open={visibleToleranceSlider} anchorEl={toleranceBtnRef.current} disablePortal>
                        <Paper className={classes.sliderPaper}>
                            <ClickAwayListener onClickAway={handleCloseSlider}>
                                <VerticalSlider
                                    onChangeCommitted={handleToleranceCommitted}
                                    orientation="vertical"
                                    defaultValue={100}
                                    min={1} max={200}
                                    value={tolerance}
                                    onChange={handleTolerance}
                                    aria-labelledby="vertical-slider"
                                />
                            </ClickAwayListener>
                        </Paper>
                    </Popper>
                </Toolbar>
            </AppBar>
        </Slide>
    )
}
MagicWandToolBar.propTypes = {
    visible:PropTypes.bool.isRequired,
    handleTolerance: PropTypes.func.isRequired,
    handleToleranceCommitted: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleType: PropTypes.func.isRequired,
    magicWandValues: PropTypes.object.isRequired,
    handleAccept: PropTypes.func.isRequired
}

export default MagicWandToolBar