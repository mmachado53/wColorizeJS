import makeStyles from "@material-ui/core/styles/makeStyles";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";
import InputHorizontalSlider from "../InputHorizontalSlider";
import IconButton from "@material-ui/core/IconButton";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import PropTypes from "prop-types";
import React from "react";



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
    }
}));




const BlackWhiteLayerToolBar = (props)=>{

    const classes = useStyles()

    const {visible,
        handleWhitesSliderChange,
        white,
        handleBlacksSliderChange,
        black,
        handleClose
    } = props

    return (
        <Slide  direction="down" in={visible}>
            <div  className={classes.container}>
                <Grid container>
                    <Grid item xs={12}>
                        <InputHorizontalSlider
                            onChange={handleWhitesSliderChange}
                            value={white}
                            defaultValue={0}
                            label={"W. levels"} />
                    </Grid>
                    <Grid item xs={12}>
                        <InputHorizontalSlider
                            onChange={handleBlacksSliderChange}
                            value={black} defaultValue={0}
                            label={"B. levels"} />
                    </Grid>
                </Grid>
                <div className={classes.bar}  >
                    <div className={classes.flexGrow1}/>
                    <IconButton onClick={handleClose}  color="secondary">
                        <ExpandLessIcon/>
                    </IconButton>
                </div>
            </div>
        </Slide>
    )
}



BlackWhiteLayerToolBar.propTypes = {
    visible:PropTypes.bool.isRequired,
    handleWhitesSliderChange: PropTypes.func.isRequired,
    white: PropTypes.number.isRequired,
    handleBlacksSliderChange: PropTypes.func.isRequired,
    black: PropTypes.number.isRequired,
    handleClose : PropTypes.func.isRequired
}

export default BlackWhiteLayerToolBar