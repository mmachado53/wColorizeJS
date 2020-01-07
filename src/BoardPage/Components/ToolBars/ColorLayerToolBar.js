import makeStyles from "@material-ui/core/styles/makeStyles";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import InputHorizontalSlider from "../InputHorizontalSlider";
import PropTypes from "prop-types";
import React from "react";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import HueSlider from "../HueSlider";
import Typography from "@material-ui/core/Typography";




const useStyles = makeStyles(theme => ({
    flexGrow1:{
        flexGrow:1
    },
    container:{
        color: theme.palette.secondary.light,
        top: 0,
        bottom: "auto",
        left:0,
        right:0,
        position: "fixed",
        backgroundColor: theme.palette.primary.main
    },
    bar:{
        display : "flex"
    },
    hueContainer: {
        paddingRight : 20,
        paddingLeft : 20
    },
    colorBtn:{
        width: 24,
        height:24,
        backgroundColor:"#FF0000",
        borderRadius:5,
        marginTop: 6
    },
    layerNameLabel:{
        marginLeft: 10,
        marginRight: 10,
        marginTop: 6,
        color: "#FFFFFF"

    }
}));




const ColorLayerToolBar = (props)=>{

    const classes = useStyles()

    const {visible,
        handleHueSliderChange,
        handleSaturationSliderChange,
        handleBrightnessSliderChange,
        handleClose,
        hue,
        saturation,
        brightness,
        layerName,
        layerColor} = props



    return (
        <Slide  direction="down" in={visible}>
            <div  className={classes.container}>
                <Grid container>
                    <Grid item xs={12} className={classes.hueContainer}>
                        <HueSlider
                            onChange={handleHueSliderChange}
                            value={hue} min={0} max={359}
                            defaultValue={0} />
                    </Grid>
                    <Grid item xs={12}>
                        <InputHorizontalSlider
                            onChange={handleSaturationSliderChange}
                            value={saturation}
                            defaultValue={0}
                            label={"Saturation"} />
                    </Grid>
                    <Grid item xs={12}>
                        <InputHorizontalSlider
                            onChange={handleBrightnessSliderChange}
                            value={brightness} defaultValue={0}
                            label={"Brightness"} />
                    </Grid>
                </Grid>
                <div className={classes.bar}  >
                    <Typography className={classes.layerNameLabel}>
                        {layerName}
                    </Typography>

                    <div style={{backgroundColor:`${layerColor}`}}
                             className={classes.colorBtn}></div>

                    <div className={classes.flexGrow1}/>
                    <IconButton onClick={handleClose}  color="secondary">
                        <ExpandLessIcon/>
                    </IconButton>
                </div>
            </div>
        </Slide>
    )
}



ColorLayerToolBar.propTypes = {
    visible:PropTypes.bool.isRequired,
    handleHueSliderChange: PropTypes.func.isRequired,
    handleSaturationSliderChange: PropTypes.func.isRequired,
    handleBrightnessSliderChange: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    hue : PropTypes.number.isRequired,
    saturation : PropTypes.number.isRequired,
    brightness : PropTypes.number.isRequired,
    layerName : PropTypes.string.isRequired,
    layerColor : PropTypes.string.isRequired
}

export default ColorLayerToolBar