import React from "react";
import Slide from "@material-ui/core/Slide";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import PropTypes from "prop-types"
import Grid from "@material-ui/core/Grid";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from "@material-ui/core/IconButton";
import {MenuTab,MenuTabs,VerticalSlider} from "../StylizedMaterialComponents";
import InputHorizontalSlider from "../InputHorizontalSlider";



const useStyles = makeStyles(theme => ({
    flexGrow1:{
        flexGrow:1
    },
    container:{
        color: theme.palette.secondary.light,
        top:"auto",
        bottom: 0,
        left:0,
        right:0,
        position: "fixed",
        backgroundColor: theme.palette.primary.main
    },
    bar:{
        display : "flex"
    }
}));




const BrushToolBar = (props)=>{

    const classes = useStyles()

    const {visible,handleSize,handleHardness,handleClose,handleBrushType,brushValues} = props
    const {size,hardness,type} = brushValues
    const brushType = type === 0 ? 1 : 0
    const handleBrushTypeChange = (event, newValue) => {
        handleBrushType(newValue === 0 ? 1 : 0)
    };

    return (
        <Slide  direction="up" in={visible}>
            <div  className={classes.container}>
                <div className={classes.bar}  >
                    <MenuTabs onChange={handleBrushTypeChange}  value={brushType}>
                        <MenuTab  icon={<AddCircleIcon/>}/>
                        <MenuTab  icon={<RemoveCircleOutlineIcon/>}/>
                    </MenuTabs>
                    <div className={classes.flexGrow1}/>
                    <IconButton onClick={handleClose}  color="secondary">
                        <ExpandMoreIcon/>
                    </IconButton>
                </div>
                <Grid container>
                    <Grid item xs={12}>
                        <InputHorizontalSlider
                            defaultValue={30}
                            min={1} max={500}
                            value={size}
                            onChange={handleSize}
                            unit={"px"}
                            label={"Size"} />
                    </Grid>
                    <Grid item xs={12}>
                        <InputHorizontalSlider
                            defaultValue={30}
                            min={0} max={100}
                            value={hardness}
                            onChange={handleHardness}
                            label={"Hardness"} />
                    </Grid>
                </Grid>
            </div>
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