import React, {memo} from "react";

import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import AutoSizer from "react-virtualized-auto-sizer";
import {FixedSizeList} from "react-window";
import LayerRow from "./LayerRow";
import IconButton from "@material-ui/core/IconButton";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({

    iconBtn:{
        /*backgroundColor:"#ffffff14",
        '&:active':{
            backgroundColor:"#FF0000"
        }*/
    },
    svgIcon:{
        color:"#919191"
    },
    layersPaper:{
        position:"absolute !important",
        width:"100%",
        bottom:50,
        top:75,
        left:0,
        borderRadius:0
    },
    layersContainer: {
        width : 250,
        height : "100%",
        backgroundColor: theme.palette.primary.main,
        color: "#FFFFFF"
    },
    h4:{
        marginLeft:16,
        marginTop:16
    },
    layerToolBar : {
        position : "absolute",
        width : "100%",
        bottom : 0,
        height : 50,
        backgroundColor: theme.palette.primary.dark,
        display: "flex"
    },
    grow:{
        flexGrow:1
    }
}));

const LayersBox = memo((props) => {
    const classes = useStyles()
    const {onClose,onOpen,open,layers,handleSelect,selectedLayerIndex,selectedLayerId,handleAddLayer} = props
    const data = {layers,selectedLayerIndex,selectedLayerId,selectLayer:handleSelect}

    return (
        <SwipeableDrawer
            onClose={onClose}
            onOpen={onOpen}
            open={open}>
            <div  className={classes.layersContainer} role="presentation">
                <Typography className={classes.h4} variant={"h4"}>Layers</Typography>
                <div className={classes.layersPaper}>
                    <AutoSizer>
                        {({ height, width }) => (
                            <FixedSizeList height={height} width={width} itemData={data} itemSize={46} itemCount={layers.length} >
                                {LayerRow}
                            </FixedSizeList>
                        )}
                    </AutoSizer>
                </div>

                <div className={classes.layerToolBar}>
                    <div className={classes.grow}/>
                    <IconButton style={{display:"none"}} disabled={selectedLayerIndex == null} className={classes.iconBtn}>
                        <DeleteIcon className={classes.svgIcon}/>
                    </IconButton>
                    <IconButton onClick={handleAddLayer} className={classes.iconBtn}>
                        <AddIcon className={classes.svgIcon}/>
                    </IconButton>
                </div>
            </div>
        </SwipeableDrawer>
    );
}, (prev,next)=>{

    return false

});


LayersBox.propTypes = {
    onClose : PropTypes.func.isRequired,
    onOpen : PropTypes.func.isRequired,
    open : PropTypes.bool.isRequired,
    layers : PropTypes.array.isRequired,
    handleSelect : PropTypes.func.isRequired,
    selectedLayerIndex : PropTypes.number,
    selectedLayerId : PropTypes.number,
    handleAddLayer : PropTypes.func.isRequired,
    handleRemoveLayer : PropTypes.func.isRequired

};

export default LayersBox