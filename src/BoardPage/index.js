import React, {useCallback, useRef, useState} from "react";
import AppBar from '@material-ui/core/AppBar';
import {Container, Popover} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Toolbar from "@material-ui/core/Toolbar";
import brushIcon from '../images/brush-icon.png'
import ereaseIcon from '../images/erease-icon.png'
import magicWandIcon from '../images/magic-wand-icon.png'
import polygonIcon from '../images/polygon-icon.png'
import bgImage from '../images/bg_dark.gif'
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import LayersTwoToneIcon from '@material-ui/icons/LayersTwoTone';
import ExposureTwoToneIcon from '@material-ui/icons/ExposureTwoTone';
import Paper from "@material-ui/core/Paper";
import Slider from "@material-ui/core/Slider";
import withStyles from "@material-ui/core/styles/withStyles";
import Grow from '@material-ui/core/Grow';
import Slide from '@material-ui/core/Slide';
import HueSlider from "./Components/HueSlider";
import GradientSlider from "./Components/GradientSlider";
import { FixedSizeList } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import LayerRow from "./Components/LayerRow";
import memoize from "memoize-one";
import FileDropView from "../Components/FileDropView";


import BoardController  from "color-replace-app-core"
//import BoardManinController from "color-replace-app-core"
//import BoardMainController from "../BoardScripts/BoardMainController";
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import Fab from "@material-ui/core/Fab";
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from "@material-ui/core/Grid";
import BottomToolBar from "./Components/BottomToolBar";
import BrushToolBar from "./Components/BrushToolBar";
import MagicWandToolBar from "./Components/MagicWandToolBar";

/*const generateLayers = numItems =>
    Array(numItems)
        .fill(true)
        .map(_ => ({
            count:0,
            name: Math.random()
                .toString(36)
                .substr(2),
        }));*/


const createItemData = memoize((layers, selectedLayerIndex,selectLayer) => ({
    layers,
    selectedLayerIndex,
    selectLayer
}));


const MySlider = withStyles({
    root: {
        color: '#52af77',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus,&:hover,&$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);


const useStyles = makeStyles(theme => ({
    toolbar:{
        paddingLeft:0,
        paddingRight:0
    },
    bg:{
        background:"url("+bgImage+")",
        width:"100%",
        height:"100%",
        position:"absolute",
        top: 0,
        left:0,
        right:0,
        bottom: 0
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
    iconBtn:{
        /*backgroundColor:"#ffffff14",
        '&:active':{
            backgroundColor:"#FF0000"
        }*/

    },
    divider:{
        height: 24,
        backgroundColor: "rgb(100,100,100)",
        marginLeft:5,
        marginRight:5
    },
    colorBtn:{
        width: 24,
        height:24,
        backgroundColor:"#FF0000",
        borderRadius:5
    },
    svgIcon:{
        color:"#919191"
    },
    layerNameLabel:{
        marginLeft: 5,
        marginRight: 5
    },
    toolPaper:{
        width:300,
        padding:20
    },
    toolPaperDivider:{
        marginTop: 10,
        marginBottom:10
    },
    layersPaper:{
        position:"inherit",
        width:"100%",
        bottom:50,
        top:0,
        left:0,
        borderRadius:0
    },
    layersContainer:{
        position:"absolute",
        width:200,
        bottom:50,
        top:50,
        left:0
    },
    layersAppBar:{
        position:"inherit",
        top: 'auto',
        bottom: 0,
    },
    content:{
        position:"absolute",
        top:50,
        left:0,
        right:0,
        bottom:50
    },
    grow:{
        flexGrow:1
    },
    addLayerBtn: {
        position: 'absolute',
        zIndex: 1,
        top: -20,
        left: 0,
        right: 0,
        margin: '0 auto',
    }
}));


function BoardPage(props){


    //const mc2 = new BoardMainController("id",window)
    //console.log("TEST2",mc2)
    const TOOL_BRUSH = BoardController.TOOL_BRUSH
    const TOOL_MAGIC_WAND = BoardController.TOOL_MAGIC_WAND
    const TOOL_POLYGON = BoardController.TOOL_POLYGON



    const colorBtnRef = useRef()
    const contentRef = useRef()
    const darkLightBtnRef = useRef()

    //const [layers,setLayers] = useState(generateLayers(2000))
    //const [selectedLayerIndex,setSelectedLayerIndex] = useState(null)

    const [layersData,setLayersData] = useState({
        selectedLayer:null,
        layers:[]
    })


    const topBarPopoverAnchorOrigin = {horizontal:"center",vertical:"bottom"}
    const topBarPopoverTransformOrigin = {horizontal:"center",vertical:"top"}
    const botomBarPopoverAnchorOrigin = {horizontal:"center",vertical:"top"}
    const botomBarPopoverTransformOrigin = {horizontal:"center",vertical:"bottom"}

    const [popoverAnchorOrigin,setPopoverAnchorOrigin] = useState(topBarPopoverAnchorOrigin)
    const [popoverTransformOrigin,setPopoverTransformOrigin] = useState(topBarPopoverTransformOrigin)
    const [visibleFileLoader,setVisibleFileLoader] = useState(true)
    const [visibleBottomBar,setVisibleBottomBar] = useState(false)
    const [visibleTopBar,setVisibleTopBar] = useState(false)

    const classes = useStyles()

    const [visibleLayersBox,setVisibleLayersBox] = useState(false)
    const [popoverAnchor,setPopoverAnchor] = useState(null)
    const [boardCtrl] = useState(new BoardController())
    const [toolsValues,setToolsValues] = useState(null)
    const [selectedTool,setSelectedTool] = useState(null)


    function handleClosePopover(){
        setPopoverAnchor(null)

    }

    function handleBrushBtn(event) {
        boardCtrl.setTool(BoardController.TOOL_BRUSH)
        setSelectedTool(TOOL_BRUSH)
    }

    function handleEreaseBtn(event) {
        boardCtrl.setTool(BoardController.TOOL_EREASE)
        setPopoverAnchorOrigin(botomBarPopoverAnchorOrigin)
        setPopoverTransformOrigin(botomBarPopoverTransformOrigin)
        setPopoverAnchor(event.currentTarget)
    }
    function handleSelectionPolygonBtn(event) {
        boardCtrl.setTool(BoardController.TOOL_SELECTION_POLYGON)
    }


    function handleMagicWandBtn(event) {
        boardCtrl.setTool(TOOL_MAGIC_WAND)
        setSelectedTool(TOOL_MAGIC_WAND)
    }

    function handleLayersBtn(event){
        setVisibleLayersBox(!visibleLayersBox)
    }
    function handleColorBtn(event) {
        setPopoverAnchorOrigin(topBarPopoverAnchorOrigin)
        setPopoverTransformOrigin(topBarPopoverTransformOrigin)
        setPopoverAnchor(event.currentTarget)
    }

    function handleDarksLightsBtn(event) {
        setPopoverAnchorOrigin(topBarPopoverAnchorOrigin)
        setPopoverTransformOrigin(topBarPopoverTransformOrigin)
        setPopoverAnchor(event.currentTarget)
    }


    function selectLayer(index,id) {
        let layerInfo = boardCtrl.selectLayer(id)
        console.log("SELECT LAYER",layerInfo)
        setLayersData((prevLayerData)=>{
            var resData = Object.assign({},prevLayerData)
            resData.layers = [...resData.layers]
            resData.layers[index] = layerInfo
            resData.selectedLayer = layerInfo
            return resData
        })


    }

    function getItemData() {
        return {layers:layersData.layers,selectedLayer:layersData.selectedLayer,selectLayer:selectLayer}
        //return createItemData(layers,selectedLayerIndex,selectLayer)
    }

    function addLayerClick(){
        let layerInfo = boardCtrl.addLayer()
        setLayersData((prevLayerData)=>{
            var resData = Object.assign({},prevLayerData)
            resData.layers = [layerInfo,...resData.layers]
            resData.selectedLayer = layerInfo
            console.log("added2",resData)
            return resData
        })
    }

    function onFileDrop(files){
        if(files && files[0]){
            var reader = new FileReader();
            reader.onload = function (e) {
                const pixelRatio = window.devicePixelRatio || 1
                const screenWidth = window.screen.width * pixelRatio
                const screenHeight = window.screen.height * pixelRatio
                const maxCanvasSize =  (screenWidth > screenHeight ? screenWidth : screenHeight) * 1.5
                boardCtrl.loadImage(contentRef.current,e.target.result,maxCanvasSize).then((canvas)=>{
                    setVisibleFileLoader(false)
                    contentRef.current.appendChild(canvas)
                    setToolsValues(boardCtrl.getToolsValues())
                    setVisibleBottomBar(true)
                    setVisibleTopBar(true)
                })
            }
            reader.readAsDataURL(files[0]);
        }
    }

    const handleHueSliderChange = (event, newValue) => {
        let layerInfo = boardCtrl.setHueToSelectedLayer(newValue)
        setLayersData((prevLayerData)=>{
            return {...prevLayerData,["selectedLayer"]:layerInfo}
        })

    };

    const handleSaturationSliderChange = (event, newValue) => {
        let layerInfo = boardCtrl.setSaturationToSelectedLayer(newValue)
        setLayersData((prevLayerData)=>{
            return {...prevLayerData,["selectedLayer"]:layerInfo}
        })
    };

    const handleBrightnessSliderChange = (event, newValue) => {
        let layerInfo = boardCtrl.setBrightnessToSelectedLayer(newValue)
        setLayersData((prevLayerData)=>{
            return {...prevLayerData,["selectedLayer"]:layerInfo}
        })
    };

    const handleDarksSlider =  (event, newValue) => {
        let layerInfo = boardCtrl.setBlackLevelToSelectedLayer(newValue)
        setLayersData((prevLayerData)=>{
            return {...prevLayerData,["selectedLayer"]:layerInfo}
        })
    }

    const handleLightsSlider =  (event, newValue) => {
        let layerInfo = boardCtrl.setWhiteLevelToSelectedLayer(newValue)
        setLayersData((prevLayerData)=>{
            return {...prevLayerData,["selectedLayer"]:layerInfo}
        })
    }

    const handleBrushSize = (event, newValue) => {
        boardCtrl.setBrushSize(newValue)
        setToolsValues((prevValue)=>{
            return {...boardCtrl.getToolsValues()}
        })
    }

    const handleBrushType = (type)=>{
        if(type === 0){
            boardCtrl.setBrushToRemove()
        }else{
            boardCtrl.setBrushToAdd()
        }
        setToolsValues((prevValue)=>{
            return {...boardCtrl.getToolsValues()}
        })
    }

    const handleBrushHardness = (event, newValue) => {
        boardCtrl.setBrushHardness(newValue)
        setToolsValues((prevValue)=>{
            return {...boardCtrl.getToolsValues()}
        })
    }




    const handleCloseBrushTool = ()=>{
        boardCtrl.setTool(null)
        setSelectedTool(null)
    }

    const handleMagicWandTolerance = (event, val)=>{
        boardCtrl.setMagicWandTolerance(val)
        setToolsValues((prevValue)=>{
            return {...boardCtrl.getToolsValues()}
        })
    }

    const handleMagicWandToleranceCommitted = (event,val)=>{
        boardCtrl.setMagicWandTolerance(val)
        boardCtrl.fillMagicWand()
        setToolsValues((prevValue)=>{
            return {...boardCtrl.getToolsValues()}
        })
    }

    const handleCloseMagicWandTool = ()=>{
        boardCtrl.setTool(null)
        setSelectedTool(null)
    }

    const handleMagicWandType = (type)=>{
        if(type === 0){
            boardCtrl.setMagicWandToRemove()
        }else{
            boardCtrl.setMagicWandToAdd()
        }
        setToolsValues((prevValue)=>{
            return {...boardCtrl.getToolsValues()}
        })
    }

    const handleAcceptMagicWand = ()=>{
        boardCtrl.applyMagicWandToSelectedLayer()
        //boardCtrl.setTool(null)
        //setSelectedTool(null)
    }







    return(
        <>
            <div className={classes.bg}>
                <Slide direction="down" in={visibleTopBar}>
                    <AppBar  position="static" color="primary" >
                        <Toolbar className={classes.toolbar} variant="dense">
                            <IconButton onClick={handleLayersBtn} className={classes.iconBtn}>
                                <LayersTwoToneIcon className={classes.svgIcon}/>
                            </IconButton>
                            <Divider orientation="vertical" className={classes.divider}  light={true}/>
                            <Typography className={classes.layerNameLabel} variant="h6">
                                {layersData.selectedLayer && layersData.selectedLayer.name}

                            </Typography>
                            {layersData.selectedLayer && (
                                <IconButton ref={colorBtnRef} onClick={handleColorBtn} className={classes.iconBtn}>
                                    <div style={{backgroundColor:`#${layersData.selectedLayer.hexColor}`}} className={classes.colorBtn}></div>
                                </IconButton>
                            )}


                            <IconButton ref={darkLightBtnRef} onClick={handleDarksLightsBtn} className={classes.iconBtn}>
                                <ExposureTwoToneIcon className={classes.svgIcon}/>
                            </IconButton>
                            <IconButton onClick={()=> boardCtrl.switchGlass()} className={classes.iconBtn}>
                                <SearchIcon className={classes.svgIcon}/>
                            </IconButton>

                        </Toolbar>
                    </AppBar>
                </Slide>


                <div ref={contentRef} className={classes.content}>
                    {visibleFileLoader && (
                        <FileDropView onFiles={onFileDrop} accept={"image/x-png,image/jpeg"}/>
                    )}
                </div>


                <Slide direction="right" in={visibleLayersBox}>
                    <div className={classes.layersContainer}>
                        <Paper className={classes.layersPaper}>
                            <AutoSizer>
                                {({ height, width }) => (
                                    <FixedSizeList height={height} width={width} itemData={getItemData()} itemSize={46} itemCount={layersData.layers.length} >
                                        {LayerRow}
                                    </FixedSizeList>
                                )}
                            </AutoSizer>
                        </Paper>
                        <AppBar className={classes.layersAppBar}  position="static" color="primary" >
                            <Toolbar className={classes.toolbar} variant="dense">
                                <Fab onClick={addLayerClick} size={"small"} color="secondary" aria-label="add" className={classes.addLayerBtn}>
                                    <AddIcon />
                                </Fab>
                                <div className={classes.grow}/>
                                <IconButton disabled={layersData.selectedLayerIndex == null} className={classes.iconBtn}>
                                    <DeleteIcon className={classes.svgIcon}/>
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                    </div>
                </Slide>



                <BottomToolBar visible={visibleBottomBar && selectedTool === null} handleBrushBtn={handleBrushBtn} handleMagicWandBtn={handleMagicWandBtn} handleSelectionPolygonBtn={handleSelectionPolygonBtn}/>





                {toolsValues && (
                    <>
                        <BrushToolBar visible={selectedTool === TOOL_BRUSH}
                                  brushValues={{type:toolsValues[BoardController.TOOL_BRUSH].type,size:toolsValues[BoardController.TOOL_BRUSH].size,hardness:toolsValues[BoardController.TOOL_BRUSH].hardness}}
                                  handleBrushType={handleBrushType}
                                  handleHardness={handleBrushHardness}
                                  handleSize={handleBrushSize}
                                  handleClose={handleCloseBrushTool} />

                        <MagicWandToolBar visible={selectedTool === TOOL_MAGIC_WAND}
                                          handleToleranceCommitted={handleMagicWandToleranceCommitted}
                                          handleTolerance={handleMagicWandTolerance}
                                          handleClose={handleCloseMagicWandTool}
                                          handleType={handleMagicWandType}
                                          magicWandValues={{type:toolsValues[TOOL_MAGIC_WAND].type,tolerance:toolsValues[TOOL_MAGIC_WAND].tolerance}}
                                          handleAccept={handleAcceptMagicWand}/>
                    </>
                )}







                <Popover
                    open={popoverAnchor != null}
                    onClose={handleClosePopover}
                    anchorEl={popoverAnchor}
                    anchorOrigin={popoverAnchorOrigin}
                    transformOrigin={popoverTransformOrigin}
                >




                    {popoverAnchor == colorBtnRef.current && layersData.selectedLayer && (
                        <Paper className={classes.toolPaper}>
                            <Typography variant={"h5"}>Color</Typography>
                            <Divider className={classes.toolPaperDivider}/>
                            <Typography gutterBottom>Hue</Typography>
                            <HueSlider onChange={handleHueSliderChange} value={layersData.selectedLayer.hsvColor.h} min={0} max={359} defaultValue={0} valueLabelDisplay="on"/>
                            <Typography gutterBottom>Saturation</Typography>
                            <GradientSlider onChange={handleSaturationSliderChange} value={layersData.selectedLayer.hsvColor.s} defaultValue={0} valueLabelDisplay="on"/>
                            <Typography gutterBottom>Brightness</Typography>
                            <GradientSlider onChange={handleBrightnessSliderChange} value={layersData.selectedLayer.hsvColor.v} defaultValue={0} valueLabelDisplay="on"/>
                        </Paper>
                    )}

                    {popoverAnchor == darkLightBtnRef.current && layersData.selectedLayer && (
                        <Paper className={classes.toolPaper}>
                            <Divider className={classes.toolPaperDivider}/>
                            <Typography gutterBottom>Blancos</Typography>
                            <GradientSlider onChange={handleLightsSlider} value={layersData.selectedLayer.whiteLevel / .01} min={0} max={100} defaultValue={0} valueLabelDisplay="on"/>
                            <Typography gutterBottom>Negros</Typography>
                            <GradientSlider onChange={handleDarksSlider} value={layersData.selectedLayer.blackLevel / .01} min={0} max={100} defaultValue={0} valueLabelDisplay="on"/>
                        </Paper>
                    )}
                </Popover>


            </div>
        </>
    )
}


export default  BoardPage