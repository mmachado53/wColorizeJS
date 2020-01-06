import React, {useCallback, useRef, useState} from "react";
import AppBar from '@material-ui/core/AppBar';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Toolbar from "@material-ui/core/Toolbar";
import bgImage from '../images/bg_dark.gif'
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import LayersTwoToneIcon from '@material-ui/icons/LayersTwoTone';
import ExposureTwoToneIcon from '@material-ui/icons/ExposureTwoTone';
import Slide from '@material-ui/core/Slide';
import FileDropView from "../Components/FileDropView";
import ColorLayerToolBar from "./Components/ToolBars/ColorLayerToolBar";
import BlackWhiteLayerToolBar from "./Components/ToolBars/BlackWhiteLayerToolBar";
import BoardController  from "color-replace-app-core"
import SearchIcon from '@material-ui/icons/Search';
import BottomToolBar from "./Components/ToolBars/BottomToolBar";
import BrushToolBar from "./Components/ToolBars/BrushToolBar";
import MagicWandToolBar from "./Components/ToolBars/MagicWandToolBar";
import LayersBox from "./Components/LayersBox";
import Button from "@material-ui/core/Button";



const useStyles = makeStyles(theme => ({
    toolbar:{
        paddingLeft:0,
        paddingRight:10
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
    content:{
        position:"absolute",
        top:50,
        left:0,
        right:0,
        bottom:50
    },
    grow:{
        flexGrow:1
    }
}));


function BoardPage(props){

    const classes = useStyles()

    const TOOL_BRUSH = BoardController.TOOL_BRUSH
    const TOOL_MAGIC_WAND = BoardController.TOOL_MAGIC_WAND
    const TOOL_POLYGON = BoardController.TOOL_POLYGON



    const contentRef = useRef()


    const [layersData,setLayersData] = useState({
        selectedLayerIndex : null,
        selectedLayerId : null,
        layers : []
    })



    const [visibleFileLoader,setVisibleFileLoader] = useState(true)
    const [visibleBottomBar,setVisibleBottomBar] = useState(false)
    const [visibleTopBar,setVisibleTopBar] = useState(false)
    const [visibleColorLayerToolBar,setVisibleColorLayerToolBar] = useState(false)
    const [visibleBlackWhiteLayerToolBar,setVisibleBlackWhiteLayerToolBar] = useState(false)



    const [visibleLayersBox,setVisibleLayersBox] = useState(false)

    const [boardCtrl] = useState(new BoardController())
    const [toolsValues,setToolsValues] = useState(null)
    const [selectedTool,setSelectedTool] = useState(null)

    const [disableMagicWandButtons,setDisableMagicWandButtons] = useState(true)



    function handleBrushBtn(event) {
        boardCtrl.setTool(BoardController.TOOL_BRUSH)
        setSelectedTool(TOOL_BRUSH)
    }

    function handleSelectionPolygonBtn(event) {
        boardCtrl.setTool(BoardController.TOOL_SELECTION_POLYGON)
    }


    function handleMagicWandBtn(event) {
        boardCtrl.setTool(TOOL_MAGIC_WAND)
        setSelectedTool(TOOL_MAGIC_WAND)
        setDisableMagicWandButtons(true)
    }

    function handleLayersBtn(event){
        setVisibleLayersBox(!visibleLayersBox)
    }
    function handleColorBtn(event) {
        setVisibleTopBar(false)
        setVisibleColorLayerToolBar(true)
    }

    function handleDarksLightsBtn(event) {
        setVisibleTopBar(false)
        setVisibleBlackWhiteLayerToolBar(true)
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
                    boardCtrl.magicWandCallBack = ()=>{
                        setDisableMagicWandButtons(false)
                    }
                })
            }
            reader.readAsDataURL(files[0]);
        }
    }

    const handleHueSliderChange = (event, newValue) => {
        let layerInfo = boardCtrl.setHueToSelectedLayer(newValue)
        setLayersData((prevLayerData)=>{
            prevLayerData.layers[prevLayerData.selectedLayerIndex] = layerInfo
            return {...prevLayerData,["layers"]:[...prevLayerData.layers]}
        })

    };

    const handleSaturationSliderChange = (event, newValue) => {
        let layerInfo = boardCtrl.setSaturationToSelectedLayer(newValue)
        setLayersData((prevLayerData)=>{
            prevLayerData.layers[prevLayerData.selectedLayerIndex] = layerInfo
            return {...prevLayerData,["layers"]:[...prevLayerData.layers]}
        })
    };

    const handleBrightnessSliderChange = (event, newValue) => {
        let layerInfo = boardCtrl.setBrightnessToSelectedLayer(newValue)
        setLayersData((prevLayerData)=>{
            prevLayerData.layers[prevLayerData.selectedLayerIndex] = layerInfo
            return {...prevLayerData,["layers"]:[...prevLayerData.layers]}
        })
    };

    const handleDarksSlider =  (event, newValue) => {
        let layerInfo = boardCtrl.setBlackLevelToSelectedLayer(newValue)
        setLayersData((prevLayerData)=>{
            prevLayerData.layers[prevLayerData.selectedLayerIndex] = layerInfo
            return {...prevLayerData,["layers"]:[...prevLayerData.layers]}
        })
    }

    const handleLightsSlider =  (event, newValue) => {
        let layerInfo = boardCtrl.setWhiteLevelToSelectedLayer(newValue)
        setLayersData((prevLayerData)=>{
            prevLayerData.layers[prevLayerData.selectedLayerIndex] = layerInfo
            return {...prevLayerData,["layers"]:[...prevLayerData.layers]}
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

    const handleCancelMagicWandTool = ()=>{
        boardCtrl.setTool(null)
        setDisableMagicWandButtons(true)
        handleMagicWandBtn(null)
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
        setDisableMagicWandButtons(true)
    }

    const handleCloseLayersBox = ()=>{
        setVisibleLayersBox(false)
    }
    const handleOpenLayersBox = ()=>{
        setVisibleLayersBox(true)
    }

    const handleAddLayer = useCallback(()=>{
        let layerInfo = boardCtrl.addLayer()
        setLayersData((prevLayerData)=>{
            var resData = Object.assign({},prevLayerData)
            resData.layers = [layerInfo,...resData.layers]
            resData.selectedLayerIndex = 0
            resData.selectedLayerId = layerInfo.id
            return resData
        })
    },[setLayersData,boardCtrl])

    const handleSelectLayer = useCallback(
        (index,id) => {
            let layerInfo = boardCtrl.selectLayer(id)
            setLayersData((prevLayerData)=>{
                var resData = Object.assign({},prevLayerData)
                resData.layers = [...resData.layers]
                resData.layers[index] = layerInfo
                resData.selectedLayerIndex = index
                resData.selectedLayerId = layerInfo.id
                return resData
            })
        },
        [setLayersData,boardCtrl],
    );



    function handleRemoveLayer(){

    }


    const selectedLayer = layersData.selectedLayerIndex === null ? null : layersData.layers[layersData.selectedLayerIndex]

    const handleExportResult = ()=>{
        let resultCanvas = boardCtrl.getCanvasResult()
        var image = new Image();
        image.src = resultCanvas.toDataURL();
        var w = window.open("");
        w.document.write(image.outerHTML);
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
                                {selectedLayer && selectedLayer.name}

                            </Typography>
                            {selectedLayer && (
                                <IconButton onClick={handleColorBtn} className={classes.iconBtn}>
                                    <div style={{backgroundColor:`#${selectedLayer.hexColor}`}} className={classes.colorBtn}></div>
                                </IconButton>
                            )}


                            <IconButton  onClick={handleDarksLightsBtn} className={classes.iconBtn}>
                                <ExposureTwoToneIcon className={classes.svgIcon}/>
                            </IconButton>
                            <IconButton onClick={()=> boardCtrl.switchGlass()} className={classes.iconBtn}>
                                <SearchIcon className={classes.svgIcon}/>
                            </IconButton>

                            <div className={classes.grow}/>
                            <Button onClick={handleExportResult} variant="contained" size="small" color="secondary">
                                Export image
                            </Button>
                        </Toolbar>
                    </AppBar>
                </Slide>


                <div ref={contentRef} className={classes.content}>
                    {visibleFileLoader && (
                        <FileDropView onFiles={onFileDrop} accept={"image/x-png,image/jpeg"}/>
                    )}
                </div>

                <LayersBox
                    onClose={handleCloseLayersBox}
                    onOpen={handleOpenLayersBox}
                    open={visibleLayersBox}
                    layers={layersData.layers}
                    handleSelect={handleSelectLayer}
                    handleAddLayer={handleAddLayer}
                    handleRemoveLayer={handleRemoveLayer}
                    selectedLayerIndex={layersData.selectedLayerIndex}
                    selectedLayerId={layersData.selectedLayerId}
                />






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
                                          handleCancel={handleCancelMagicWandTool}
                                          handleToleranceCommitted={handleMagicWandToleranceCommitted}
                                          handleTolerance={handleMagicWandTolerance}
                                          handleClose={handleCloseMagicWandTool}
                                          handleType={handleMagicWandType}
                                          disabledButtons={disableMagicWandButtons}
                                          magicWandValues={{type:toolsValues[TOOL_MAGIC_WAND].type,tolerance:toolsValues[TOOL_MAGIC_WAND].tolerance}}
                                          handleAccept={handleAcceptMagicWand}/>
                    </>
                )}




                {selectedLayer && (
                    <>
                    <ColorLayerToolBar visible={visibleColorLayerToolBar}
                                       handleHueSliderChange={handleHueSliderChange}
                                       handleSaturationSliderChange={handleSaturationSliderChange}
                                       handleBrightnessSliderChange={handleBrightnessSliderChange}
                                       handleClose={()=>{
                                           setVisibleColorLayerToolBar(false)
                                           setVisibleTopBar(true)
                                       }}
                                       layerName={selectedLayer.name}
                                       layerColor={`#${selectedLayer.hexColor}`}
                                       hue={selectedLayer.hsvColor.h}
                                       saturation={selectedLayer.hsvColor.s}
                                       brightness={selectedLayer.hsvColor.v}/>

                     <BlackWhiteLayerToolBar
                         visible={visibleBlackWhiteLayerToolBar}
                         handleWhitesSliderChange={handleLightsSlider}
                         white={selectedLayer.whiteLevel / .01}
                         handleBlacksSliderChange={handleDarksSlider}
                         black={selectedLayer.blackLevel / .01}
                         handleClose={()=>{
                             setVisibleBlackWhiteLayerToolBar(false)
                             setVisibleTopBar(true)
                         }}/>
                                       </>
                )}



            </div>
        </>
    )
}



export default  BoardPage