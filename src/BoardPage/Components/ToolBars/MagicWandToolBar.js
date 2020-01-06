import React from "react";
import Slide from "@material-ui/core/Slide";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import {MenuTab,MenuTabs,VerticalSlider} from "../StylizedMaterialComponents";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from "@material-ui/core/Grid";
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
    },
    barButton:{
        margin:10
    }


}));




const MagicWandToolBar = (props)=>{
    const classes = useStyles()
    const {disabledButtons,visible,handleTolerance,handleClose,handleCancel,handleType,magicWandValues,handleAccept,handleToleranceCommitted} = props
    const {tolerance,type} = magicWandValues
    const toolType = type === 0 ? 1 : 0
    const handleToolTypeChange = (event, newValue) => {
        handleType(newValue === 0 ? 1 : 0)
    };

    return (
        <Slide  direction="up" in={visible}>
            <div  className={classes.container}>
                <div className={classes.bar}  >
                    <MenuTabs onChange={handleToolTypeChange}  value={toolType}>
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
                            onChangeCommitted={handleToleranceCommitted}
                            defaultValue={100}
                            min={1} max={200}
                            value={tolerance}
                            onChange={handleTolerance}
                            label={"Tolerance"} />
                    </Grid>
                    <Grid item xs={12} className={classes.bar}>
                        <div className={classes.flexGrow1}/>
                        <Button size="small" disabled={disabledButtons} onClick={handleCancel} className={classes.barButton} variant="outlined" color="secondary">
                            Cancel
                        </Button>
                        <Button size="small" disabled={disabledButtons} onClick={handleAccept} className={classes.barButton} variant="outlined" color="secondary">
                            Apply
                        </Button>
                    </Grid>
                </Grid>
            </div>
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
    handleAccept: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    disabledButtons: PropTypes.bool.isRequired
}

export default MagicWandToolBar