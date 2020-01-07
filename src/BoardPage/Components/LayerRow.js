import React, {memo,useContext} from "react";
import PropTypes from "prop-types"
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {areEqual} from "react-window";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";


const colorsStyle = {
    backgroundColor:'#fff000',
    width:20,
    height:20,
    borderRadius:5
}

const LayerRow = memo(({ data, index, style }) => {

    const { layers,selectedLayerIndex, selectedLayerId, selectLayer } = data;
    const layer = layers[index];
    const colorStyle_ = {...colorsStyle,["backgroundColor"]:`#${layer.hexColor}`}

    function handleClick(){
        selectLayer(index,layer.id)
    }
    function handleRemove() {
        console.log("remove")
    }
    return (
        <ListItem onClick={handleClick} selected={selectedLayerId === layer.id} button style={style} key={index}>
            <ListItemAvatar style={{minWidth:30}}>
                <Avatar  style={colorStyle_}> </Avatar>
            </ListItemAvatar>
            <ListItemText secondary={layer.id} primary={layer.name} />
        </ListItem>
    );
}, (prev,next)=>{
    /*{id:layerID,name:layerName,color:layer.currentColor}*/

    const prevData  = prev.data
    const nextData = next.data
    const prevLayerInfo = prevData.layers[prev.index]
    const nextLayerInfo = nextData.layers[next.index]

    if( prevLayerInfo.id === nextLayerInfo.id
        && prevLayerInfo.name === nextLayerInfo.name
        && prevLayerInfo.hexColor === nextLayerInfo.hexColor){
        if(prevData.selectedLayerId != nextData.selectedLayerId && (prevData.selectedLayerId == prevLayerInfo.id || nextData.selectedLayerId == nextLayerInfo.id ) ){
           return false
        }
        return true
    }


    return false

});


LayerRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
};

export default LayerRow