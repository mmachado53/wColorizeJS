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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from "@material-ui/core/IconButton";
import {MenuTab,MenuTabs,VerticalSlider} from "./StylizedMaterialComponents";




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




const BrushToolBar = (props)=>{

    const classes = useStyles()

    const {visible,handleSize,handleHardness,handleClose,handleBrushType,brushValues} = props
    const {size,hardness,type} = brushValues
    const brushType = type === 0 ? 1 : 0

    const [visibleSizeSlider, setVisibleSizeSlider] = useState(false)
    const [visibleHardnessSlider, setVisibleHardnessSlider] = useState(false)

    const sizeBtnRef = useRef()
    const hardnessBtnRef = useRef()

    const handleSizeBtnClick = ()=>{
        setVisibleSizeSlider(!visibleSizeSlider)
    }
    const handleHardnessBtnClick = ()=>{
        setVisibleHardnessSlider(!visibleHardnessSlider)
    }

    const handleBrushTypeChange = (event, newValue) => {
        handleBrushType(newValue === 0 ? 1 : 0)
        //setValue(newValue);
    };
    const handleCloseSlider = (event)=>{
        setVisibleHardnessSlider(false)
        setVisibleSizeSlider(false)
    }
    return (
        <Slide direction="up" in={visible}>
            <AppBar  position="fixed" color="primary" className={classes.appBarBottom}>
                <Toolbar  className={classes.toolbar} variant="dense">
                    <MenuTabs onChange={handleBrushTypeChange}  value={brushType}>
                        <MenuTab  icon={<AddCircleIcon/>}/>
                        <MenuTab  icon={<RemoveCircleOutlineIcon/>}/>
                    </MenuTabs>
                    <Divider orientation="vertical" className={classes.divider}  light={true}/>
                    <span className={classes.label}>Size:</span>
                    <Button ref={sizeBtnRef} onClick={handleSizeBtnClick} className={classes.smallButton} size="small" color="secondary" variant="outlined">{size}</Button>
                    <span className={classes.label}>hardness:</span>
                    <Button ref={hardnessBtnRef} onClick={handleHardnessBtnClick} className={classes.smallButton} size="small" color="secondary" variant="outlined">{hardness}</Button>
                    <div className={classes.flexGrow1}/>
                    <IconButton onClick={handleClose}  color="secondary">
                        <ExpandMoreIcon/>
                    </IconButton>

                    <Popper open={visibleSizeSlider} anchorEl={sizeBtnRef.current} disablePortal>
                        <Paper className={classes.sliderPaper}>
                            <ClickAwayListener onClickAway={handleCloseSlider}>
                                <VerticalSlider
                                    orientation="vertical"
                                    defaultValue={30}
                                    min={1} max={500}
                                    value={size}
                                    onChange={handleSize}
                                    aria-labelledby="vertical-slider"
                                />
                            </ClickAwayListener>
                        </Paper>
                    </Popper>

                    <Popper open={visibleHardnessSlider} anchorEl={hardnessBtnRef.current} disablePortal>
                        <Paper className={classes.sliderPaper}>
                            <ClickAwayListener onClickAway={handleCloseSlider}>
                                <VerticalSlider
                                    orientation="vertical"
                                    defaultValue={30}
                                    min={0} max={100}
                                    value={hardness}
                                    onChange={handleHardness}
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
BrushToolBar.propTypes = {
    visible:PropTypes.bool.isRequired,
    handleSize: PropTypes.func.isRequired,
    handleHardness: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleBrushType: PropTypes.func.isRequired,
    brushValues: PropTypes.object.isRequired,
}

export default BrushToolBar