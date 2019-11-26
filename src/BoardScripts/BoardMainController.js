import * as PIXI from 'pixi.js'
import UTILS from "./Utils";
import MagnifyingGlass from "./UI/MagnifyingGlass";
import Layer from "./Layer";
import SelectionPixelsCtrl from "./DrawTools/SelectionPixelsCtrl";
import ToolBrush from "./DrawTools/ToolBrush";
import ToolSelectionPolygon from "./DrawTools/ToolSelectionPolygon";
import ToolSelectionMagicWand from "./DrawTools/ToolSelectionMagicWand";

const ColorPicker = function(){
    
}


function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.addEventListener("load", () => resolve(img));
        img.addEventListener("error", err => reject(err));
        img.src = src;
    });
};

const BoardMainController = function (containerId,window) {
    const bolaSrc="data:image/png;base64,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";
    this.containerId=containerId;
    this.window=window;
    this.wWidth=this.window.innerWidth;
    this.wHeight=this.window.innerHeight;
    this.photoWidth=0;
    this.photoHeight=0;
    this.pixiApp = null
    this.containerHTMLElement = null


    this.loadImage= async (url,containerHTMLElement,maxSize)=>{
        this.containerHTMLElement = containerHTMLElement

        var image = await loadImage(url)
        let scale = 1
        if(maxSize && (maxSize < image.width || maxSize < image.height)){
            const scaleX = maxSize / image.width
            const scaleY = maxSize / image.height
            scale = scaleX < scaleY ? scaleX : scaleY
        }

        var canvas=document.createElement("canvas");
        canvas.width=Math.round(image.width * scale);
        canvas.height=Math.round(image.height * scale);
        var ctx=canvas.getContext("2d");
        ctx.drawImage(image,0,0,canvas.width,canvas.height);

        this.baseImage = canvas

        var base = PIXI.BaseTexture.from(canvas)
        var texture = new PIXI.Texture(base);
        this.photoWidth=canvas.width;
        this.photoHeight=canvas.height;
        alert(`SIZES ${this.photoWidth} ${this.photoHeight} ${maxSize}`)
        console.log("SIZES", this.photoWidth,this.photoHeight)
        var shadowsAndLights=UTILS.getShadowsAndLights(canvas);

        this.shadowsTexture=PIXI.Texture.from(shadowsAndLights.shadows);
        this.lightsTexture=PIXI.Texture.from(shadowsAndLights.ligths);
        var centerData=UTILS.getCenterData(canvas.width,canvas.height,containerHTMLElement.clientWidth,containerHTMLElement.clientHeight);
        this.initSizes=centerData;
        this.photoSprite=new PIXI.Sprite(texture);
        return  this.startPixi()
    };

    this.startPixi=()=>{
        this.layerCount=0;
        this.layers=[];
        this.currentLayer=null;
        this.pixiApp = new PIXI.Application({
            autoDensity: true,
            resizeTo: this.containerHTMLElement,
            transparent: true,
            antialias: true,
            resolution: window.devicePixelRatio || 1
        })
        this.pixiApp.stage.interactive = true



        this.pixiApp.view.onwheel = onScrollE


        this.uiRenderTexture = PIXI.RenderTexture.create(window.screen.width,window.screen.height)
        this.uiSprite=new PIXI.Sprite(this.uiRenderTexture);
        this.currentTool=null;

        this.selectionCtrl=new SelectionPixelsCtrl(this.photoWidth,this.photoHeight,this.pixiApp)
        //BoardMainController.TOOLS["BRUSH"]=new ToolBrush(this.uiRenderTexture,this.selectionCtrl,this.pixiApp,this);
        BoardMainController.TOOLS["BRUSH"]=new ToolBrush(this);
        //BoardMainController.TOOLS["EREASE"]=new ToolBrush(this.uiRenderTexture,this.selectionCtrl,this.pixiApp);
        //BoardMainController.TOOLS["EREASE"].setToRemove();
        BoardMainController.TOOLS["SELECTION_POLYGON"]=new ToolSelectionPolygon(this);
        //BoardMainController.TOOLS["SELECTION_POLYGON"]=new ToolSelectionPolygon(this.uiRenderTexture,this.selectionCtrl,this.pixiApp);
        //BoardMainController.TOOLS["SELECTION_MAGIC_WAND"]=new ToolSelectionMagicWand(this.uiRenderTexture,this.selectionCtrl,this.photoImage,this.pixiApp);
        BoardMainController.TOOLS[BoardMainController.TOOL_SELECTION_MAGIC_WAND] = new ToolSelectionMagicWand(this)
        this.buildContainer();
        this.pixiApp.start()
        return this.pixiApp.view
    };

    /*MainController.prototype.animate=function(){
        requestAnimationFrame( this.animate.bind(this) );
        this.renderer.render(this.stage);
    };*/

    this.buildContainer=function(){
        this.container=new PIXI.Container();
        this.photoAndLayersContainer=new PIXI.Container();
        this.layersContainer=new PIXI.Container();
        this.container.addChild(this.photoAndLayersContainer);
        this.photoAndLayersContainer.addChild(this.photoSprite);
        this.photoAndLayersContainer.addChild(this.layersContainer);
        this.photoAndLayersContainer.addChild(this.selectionCtrl.uiSprite);
        this.container.addChild(this.uiSprite);
        this.pixiApp.stage.addChild(this.container);
        this.container.interactive=true;

        this.pixiApp.view.addEventListener("mousedown",mouseDown)
        this.pixiApp.view.addEventListener("touchstart",touchStart)


        this.pixiApp.view.addEventListener("mouseup",mouseUp)
        this.pixiApp.view.addEventListener("touchend",touchEnd)
        this.pixiApp.view.addEventListener("touchcancel",touchCancel)



        this.pixiApp.view.addEventListener("mousemove",mouseMove)
        this.pixiApp.view.addEventListener("touchmove",touchMove)




        this.photoAndLayersContainer.scale.set(this.initSizes.scale,this.initSizes.scale);
        this.photoAndLayersContainer.position.set(this.initSizes.x,this.initSizes.y);
        //this.photoAndLayersContainer.addChild(this.selectionCtrl.selectionSprite);
    };

    this.getToolsValues=()=>{
        if(!this.toolsValues){
            this.toolsValues=[];
            this.toolsValues["BRUSH"]={};
            //this.toolsValues["EREASE"]={};
            this.toolsValues[BoardMainController.TOOL_SELECTION_MAGIC_WAND]={};
        }
        this.toolsValues["BRUSH"].size=BoardMainController.TOOLS["BRUSH"].size;
        this.toolsValues["BRUSH"].hardness=100*BoardMainController.TOOLS["BRUSH"].hardness;
        this.toolsValues["BRUSH"].type =  BoardMainController.TOOLS["BRUSH"].add ? 1 : 0
        //this.toolsValues["EREASE"].size=BoardMainController.TOOLS["EREASE"].size;
        //this.toolsValues["EREASE"].hardness=100*BoardMainController.TOOLS["EREASE"].hardness;
        this.toolsValues[BoardMainController.TOOL_SELECTION_MAGIC_WAND].tolerance = BoardMainController.TOOLS[BoardMainController.TOOL_SELECTION_MAGIC_WAND].getTolerance()
        this.toolsValues[BoardMainController.TOOL_SELECTION_MAGIC_WAND].type = BoardMainController.TOOLS[BoardMainController.TOOL_SELECTION_MAGIC_WAND].add ? 1 : 0
        return this.toolsValues;
    }

    this.setBrushSize=(val)=>{
        BoardMainController.TOOLS["BRUSH"].setSize(val);
    };
    this.setBrushHardness=(val)=>{
        BoardMainController.TOOLS["BRUSH"].setHardness(val*.01);
    };
    this.setBrushToAdd = ()=>{
        BoardMainController.TOOLS["BRUSH"].setToAdd()
    }
    this.setBrushToRemove = ()=>{
        BoardMainController.TOOLS["BRUSH"].setToRemove()
    }
    this.setEreaseSize=function(val){
        BoardMainController.TOOLS["EREASE"].setSize(val);
    };
    this.setEreaseHardness=function(val){
        BoardMainController.TOOLS["EREASE"].setHardness(val*.01);
    };
    this.setMagicWandTolerance = function (val) {
        BoardMainController.TOOLS[BoardMainController.TOOL_SELECTION_MAGIC_WAND].setTolerance(val)
    }
    this.fillMagicWand = function () {
        BoardMainController.TOOLS[BoardMainController.TOOL_SELECTION_MAGIC_WAND].fillFromPickedColor()
    }

    this.setMagicWandToAdd = ()=>{
        BoardMainController.TOOLS[BoardMainController.TOOL_SELECTION_MAGIC_WAND].setToAdd()
    }
    this.setMagicWandToRemove = ()=>{
        BoardMainController.TOOLS[BoardMainController.TOOL_SELECTION_MAGIC_WAND].setToRemove()
    }

    this.applyMagicWandToSelectedLayer = ()=>{
        BoardMainController.TOOLS[BoardMainController.TOOL_SELECTION_MAGIC_WAND].apply()
    }

    const onScrollE = (e,v)=>{
        var x=e.offsetX;
        var y=e.offsetY;
        var deltaY=e.deltaY;
        if(deltaY<0){
            zoomIn(deltaY*-1,x,y);
        }else{
            zoomOut(deltaY,x,y);
        }
    }
    let timerForPinchToZoomGesture = null
    let lastPinchGestureData = null
    const touchStart = (event)=>{
        const touches = event.targetTouches
        if(touches.length === 1){
            const position = getPositionFromTouch(touches[0])
            timerForPinchToZoomGesture = setTimeout(()=>{
                mouseDown({
                    offsetX:position.x,
                    offsetY: position.y
                })
            },100)
            return

        }
        /*PREVENT PAINT WHEN PINCH TO ZOOM*/
        if(timerForPinchToZoomGesture){
            clearTimeout(timerForPinchToZoomGesture)
        }

        if(touches.length === 2){
            lastPinchGestureData = makeNewPinchGestureData(touches[0],touches[1])
        }


    }

    const makeNewPinchGestureData = (touchA,touchB)=>{
        const pointA = getPositionFromTouch(touchA)
        const pointB = getPositionFromTouch(touchB)
        const middlePoint = UTILS.middlePoint(pointA,pointB)
        const distance = UTILS.distance2d(pointA,pointB)
        return {middlePoint,distance}
    }

    const touchMove = (event) =>{
        const touches = event.targetTouches
        if(touches.length === 1){
            const position = getPositionFromTouch(touches[0])
            mouseMove({
                offsetX:position.x,
                offsetY: position.y
            })
            return
        }
        /*PINCH TO ZOOM LOGIC*/
        if(touches.length === 2 && lastPinchGestureData){
            const pinchGestureData = makeNewPinchGestureData(touches[0],touches[1])
            const movX = pinchGestureData.middlePoint.x - lastPinchGestureData.middlePoint.x
            const movY = pinchGestureData.middlePoint.y - lastPinchGestureData.middlePoint.y
            let scale = pinchGestureData.distance / lastPinchGestureData.distance
            const pivot = this.photoAndLayersContainer.toLocal(lastPinchGestureData.middlePoint)
            this.photoAndLayersContainer.pivot.set(pivot.x,pivot.y)
            this.photoAndLayersContainer.position.set(lastPinchGestureData.middlePoint.x,lastPinchGestureData.middlePoint.y)

            scale = this.photoAndLayersContainer.scale.x * scale
            this.photoAndLayersContainer.scale.set(scale,scale)
            const {x,y} = this.photoAndLayersContainer
            this.photoAndLayersContainer.position.set(x+movX,y+movY)
            lastPinchGestureData = pinchGestureData
            this.updateToolUI();
        }
    }

    const touchEnd = (event) =>{
        console.log("touchEnd",event)
        lastPinchGestureData = null
        mouseUp({
                offsetX:null,
                offsetY: null
            })
    }

    const touchCancel = (event)=>{
        console.log("touchCancel",event)
    }

    const getPositionFromTouch = (touch)=>{
        const rect = touch.target.getBoundingClientRect()
        return {
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top
        }

    }
    let lastMousePointClicked = null
    const mouseDown = (event)=>{

        //var pos=this.r.photoAndLayersContainer.toLocal(event.data.global);
        //var m=this.r.photoAndLayersContainer.toLocal(pos);
        var pos={x:event.offsetX,y:event.offsetY};
        lastMousePointClicked = pos
        console.log("mouseDown",pos)
        //var pos=event.data.global;
        if(this.currentTool){
            this.currentTool.mouseDown(pos);
        }
    }

    const mouseUp = (event)=>{

        var pos={x:event.offsetX,y:event.offsetY};
        //var pos=event.data.global;
        if(this.currentTool){
            this.currentTool.mouseUp(pos);
            console.log("MOUSEUP _____------_____")
        }
        lastMousePointClicked = null
    }
    const mouseMove = (event)=>{
        const pos={x:event.offsetX,y:event.offsetY};
        if(this.currentTool){
            this.currentTool.mouseMove(pos);
        }else if(lastMousePointClicked){
            const movX = pos.x - lastMousePointClicked.x
            const movY = pos.y - lastMousePointClicked.y
            const {x,y} = this.photoAndLayersContainer
            this.photoAndLayersContainer.position.set(x+movX,y+movY)
            lastMousePointClicked = pos
        }
        if(this.glass && this.glass.visible){
            this.glass.update(pos);

             /*this.glass.setPivot(MagnifyingGlass.TOP_RIGHT);
             if(event.data.global.x>this.wWidth-200 && event.data.global.y<200){
                 this.r.glass.setPivot(MagnifyingGlass.BOTTOM_LEFT);
             }else if(event.data.global.y<200){
                 this.r.glass.setPivot(MagnifyingGlass.BOTTOM_RIGHT);
             }else if(event.data.global.x>this.wWidth-200){
                 this.r.glass.setPivot(MagnifyingGlass.TOP_LEFT);
             }*/
            this.glass.position.x=pos.x;
            this.glass.position.y=pos.y;

        }
    }



    const zoomIn = (delta,x,y)=>{
        //this.photoAndLayersContainer.scale;
        var scale=delta*.01;
        scale=this.photoAndLayersContainer.scale.x+scale;
        var pivot=this.photoAndLayersContainer.toLocal(new PIXI.Point(x, y));
        var position=this.photoAndLayersContainer.toGlobal(pivot);
        this.photoAndLayersContainer.pivot.set(pivot.x,pivot.y);
        this.photoAndLayersContainer.position.set(position.x,position.y);
        this.photoAndLayersContainer.scale.set(scale,scale);
        this.updateToolUI();
    }

    const zoomOut = (delta,x,y)=>{
        var scale=delta*.01;
        scale=this.photoAndLayersContainer.scale.x-scale;
        if(scale<=this.initSizes.scale){
            this.photoAndLayersContainer.scale.set(this.initSizes.scale,this.initSizes.scale);
            this.photoAndLayersContainer.pivot.set(0,0);
            this.photoAndLayersContainer.position.set(this.initSizes.x,this.initSizes.y);
            this.updateToolUI();
            return
        }
        var pivot=this.photoAndLayersContainer.toLocal(new PIXI.Point(x, y));
        var position=this.photoAndLayersContainer.toGlobal(pivot);
        this.photoAndLayersContainer.pivot.set(pivot.x,pivot.y);
        this.photoAndLayersContainer.position.set(position.x,position.y);
        this.photoAndLayersContainer.scale.set(scale,scale);
        this.updateToolUI();
    }

    this.setTool = (tool)=>{
        if(this.currentTool){this.currentTool.setActive(null);}
        this.currentTool=tool == null ? null : BoardMainController.TOOLS[tool];
        if(this.currentLayer && this.currentTool){
            this.currentTool.setActive(this.currentLayer,this.photoAndLayersContainer.scale.x);
        }
    }

    this.updateToolUI = ()=>{
        if(this.currentTool && this.currentTool.onPhotoScaleChange){
            this.currentTool.onPhotoScaleChange(this.photoAndLayersContainer.scale.x);
        }
    }

    this.addLayer = ()=>{
        var layerID=this.layerCount;
        var layerName="layer "+this.layerCount;
        var layer=new Layer(this.photoWidth,this.photoHeight,layerName,layerID,this.shadowsTexture,this.lightsTexture);
        this.layers.push(layer);
        this.layersContainer.addChild(layer);
        this.layerCount+=1;
        this.selectLayer(layer.layerID);
        return layer.info
    }

    this.findLayer = (id)=>{
        var total=this.layers.length;
        for(var i=0;i<total;i++){
            if(this.layers[i].layerID==id){
                return this.layers[i];
            }
        }
        return null;
    }

    this.selectLayer = (id)=>{
        if(this.selectedLayerValues==null){this.selectedLayerValues={}}
        var layer=this.findLayer(id);
        this.currentLayer=layer;
        /*if(this.colorPicker){
            this.colorPicker.setColor(layer.currentColor);
        }*/
        if(this.currentTool){
            this.currentTool.setActive(layer,this.photoAndLayersContainer.scale.x);
        }

        this.selectedLayerValues.id=id;
        this.selectedLayerValues.name=layer.name;
        this.selectedLayerValues.color=layer.color;
        this.selectedLayerValues.darkVal=layer.blackLevel*100;
        this.selectedLayerValues.ligthVal=layer.whiteLevel*100;
        return layer.info;
    }

    this.setDarkToSelectedLayer = (val)=>{
        if(!this.currentLayer){return;}
        //console.log("setDarkToSelectedLayer: "+val*.001);
        this.currentLayer.blackLevel = val*.01
        //this.currentLayer.setDarkLevel(val*.01);
        if(this.currentTool){this.currentTool.onSelectedLayerPropsChange()}
        return this.currentLayer.info
    }

    this.setLightToSelectedLayer = (val)=>{
        if(!this.currentLayer){return;}
        //console.log("setLightToSelectedLayer: "+val*.001);
        this.currentLayer.whiteLevel = val*.01
        //this.currentLayer.setWhiteLevel(val*.01);
        if(this.currentTool){this.currentTool.onSelectedLayerPropsChange()}
        return this.currentLayer.info
    }

   this.showGlass = ()=>{
       if(!this.glass){
           this.glass=new MagnifyingGlass(200,200,this.pixiApp.renderer,this.container,2);
           this.glass.setPivot(MagnifyingGlass.TOP_RIGHT);
           this.pixiApp.stage.addChild(this.glass);
       }
       this.glass.visible=true;
   }

   this.hideGlass = ()=>{
       if(!this.glass){
           this.glass=new MagnifyingGlass(200,200,this.pixiApp.renderer,this.container);
           this.pixiApp.stage.addChild(this.glass);
       }
       this.glass.visible=false;
   }

   this.switchGlass = ()=>{
        const isVisible = this.glass == null ? false : this.glass.visible
       if(isVisible){
           this.hideGlass()
       }else{
           this.showGlass()
       }

   }

   this.showColorPicker = ()=>{
       if(!this.colorPicker){
           this.colorPicker=new ColorPicker();
           this.colorPicker.scale.set(.3,.3);
           this.colorPicker.position.set(this.wWidth-350,30);
           this.colorPicker.r=this;
           this.colorPicker.onValueChange=onColorPickerChange;
       }
       this.stage.addChild(this.colorPicker);
   }

   this.hideColorPicker = ()=>{
       this.stage.removeChild(this.colorPicker);
   }

    const onColorPickerChange = (data)=>{
        this.r.currentLayer.color = data.colorNumber;
    }



    this.setColorToSelectedLayer = (colorNumber)=>{
        this.currentLayer.color = colorNumber;
        if(this.currentTool){this.currentTool.onSelectedLayerPropsChange()}
        return this.currentLayer.info
    }

    this.setHueToSelectedLayer = (hue)=>{
        const {s,v} = this.currentLayer.currentHSVColor
        return this.setColorToSelectedLayer(UTILS.HSVtoRGBnumber(hue / 360,s / 100,v / 100))
    }

    this.setSaturationToSelectedLayer = (sat)=>{
        const {h,v} = this.currentLayer.currentHSVColor
        return this.setColorToSelectedLayer(UTILS.HSVtoRGBnumber(h / 360,sat / 100, v / 100))
    }

    this.setBrightnessToSelectedLayer = (brightness)=>{
        const {h,s} = this.currentLayer.currentHSVColor
        return this.setColorToSelectedLayer(UTILS.HSVtoRGBnumber(h / 360,s / 100,brightness / 100))
    }

    this.clearSelection = ()=>{
        this.selectionCtrl.clearSelection();
    }




    return this
}

BoardMainController.TOOLS=[];
BoardMainController.TYPE_TOOL_DRAW=0;
BoardMainController.TYPE_TOOL_SELECTION=1;
BoardMainController.TOOL_BRUSH = "BRUSH";
BoardMainController.TOOL_EREASE = "EREASE";
BoardMainController.TOOL_SELECTION_POLYGON = "SELECTION_POLYGON";
//BoardMainController.TOOL_COLOR_SELECTOR = "TOOL_COLOR_SELECTOR";
BoardMainController.TOOL_SELECTION_MAGIC_WAND = "SELECTION_MAGIC_WAND";

export default BoardMainController
