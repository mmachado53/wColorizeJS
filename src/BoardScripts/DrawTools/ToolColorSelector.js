import * as PIXI from "pixi.js";
import MagnifyingGlass from "../UI/MagnifyingGlass";
import UTILS from "../Utils";

const ToolColorSelector = function(UIRenderTexture,selectionCtrl,image,pixiApp,boardController){
    const colorPointsGraphics = new ColorPointsGraphics(image.width,image.height,pixiApp.renderer,UIRenderTexture)

    this.UIRenderTexture=UIRenderTexture;
    this.setActive=(layer)=>{

        if(this.layer==layer || this.UIRenderTexture==null){return;}
        pixiApp.renderer.render(this.blankObj,this.UIRenderTexture,true)
        if(layer!=null){
            this.layer=layer;
            this.active=true;
        }else{
            this.layer=null;
            pixiApp.renderer.render(this.blankObj,this.UIRenderTexture,true)
            colorPointsGraphics.clearPoints()
            this.active=false;
        }

    };
    this.setToRemove=()=>{
        this.add=false;
    };

    this.setToAdd=()=>{
        this.add=true;
    };

    this.MouseDown=(mouse)=>{
        for(let i=0; i < colorPointsGraphics.points.length;i++){
            const point = colorPointsGraphics.points[i]
            if(UTILS.distance2d(mouse,point.uiPoint) <= colorPointsGraphics.pointsRadius){
                this.draggablePointIndex = i
                break
            }
        }
    };
    this.MouseMove = (mouse)=>{
        const {x,y} = mouse
        if(this.draggablePointIndex != null){
            const localPoint = this.layer.toLocal(mouse)
            let color = this.rgbColors[getPixelIndexFromUint32Array(Math.round(localPoint.x),Math.round(localPoint.y),image.width)]
            colorPointsGraphics.movePoint(this.draggablePointIndex,{x,y},localPoint,color.hexColor)
        }
    }

    this.addPoint = ()=>{
        const x = Math.round(image.width / 2)
        const y = Math.round(image.height / 2)
        const globalPoint = this.layer.toGlobal({x,y})
        let color = this.rgbColors[getPixelIndexFromUint32Array(x,y,image.width)]
        colorPointsGraphics.addPoint(globalPoint,{x,y},color.hexColor)
    }

    this.MouseUp=async (mouse)=>{
        this.draggablePointIndex = null


    };
    this.onPhotoScaleChange=(scale,r)=>{
       if(this.layer){
           for(let i in colorPointsGraphics.points){
               const point = colorPointsGraphics.points[i]
               point.uiPoint = this.layer.toGlobal(point.layerPoint)
           }
           colorPointsGraphics.render()
       }
    };

    const getPixelIndexFromUint32Array = (x,y,width)=>{
        return y * width + x
    }

    const cacheCanvas = document.createElement("canvas")
    cacheCanvas.width = image.width
    cacheCanvas.height = image.height
    const cacheCanvasCtx = cacheCanvas.getContext("2d")
    cacheCanvasCtx.drawImage(image,0,0)
    const imageData = cacheCanvasCtx.getImageData(0,0,image.width,image.height)
    const imageUint32Array = new Uint32Array(imageData.data.buffer);
    this.rgbColors = []
    const totalOfPixels = imageUint32Array.length
    for(let i = 0;i<totalOfPixels;i++){
        const pixelVal = imageUint32Array[i]
        const a = pixelVal >> 24 & 0xFF
        const b = pixelVal >> 16 & 0xFF
        const g = pixelVal >> 8 & 0xFF
        const r = pixelVal & 0xFF
        const red = r.toString(16)
        const blue = b.toString(16)
        const green = g.toString(16)
        const hexColor =  (red.length == 1 ? `0${red}` : red) + (green.length == 1 ? `0${green}` : green) + (blue.length == 1 ? `0${blue}` : blue)
        this.rgbColors.push({r,g,b,a,hexColor:parseInt(hexColor,16)})
    }

    this.blankObj=new PIXI.Container();




}


const ColorPointsGraphics = function(width,height,renderer,renderTexture){
    this.pointsRadius = 20
    const textStyle = new PIXI.TextStyle({

    })

    this.points = []

    /*
    * uiPoint : point for UIrenderer (global position)
    * layerPoint: point in layer (local position)
    * color: number
    * */
    this.addPoint = (uiPoint,layerPoint,color)=>{
        const graphics = new PIXI.Graphics()
        redrawPoint(graphics,color)
        let newPoint = {uiPoint,layerPoint,color,graphics}
        this.points.push(newPoint)
        const matrix = new PIXI.Matrix()
        matrix.translate(uiPoint.x,uiPoint.y)
        renderer.render(graphics,renderTexture,false,matrix)
    }

    this.movePoint = (index,uiPoint,layerPoint,newColor)=>{

        const point = this.points[index]
        point.uiPoint = uiPoint
        point.layerPoint = layerPoint
        if (point.color != newColor){
            point.color = newColor
            redrawPoint(point.graphics,newColor)
        }
        this.render()
    }

    /*
    * pointGraphics : PIXI.Graphics
    * */
    const redrawPoint = (pointGraphics,color)=>{
        pointGraphics.clear()

        pointGraphics.beginFill(color,1)
        pointGraphics.lineStyle(3,0xFFFFFF,1)
        pointGraphics.drawCircle(0,0,this.pointsRadius)
        pointGraphics.endFill()

        pointGraphics.beginFill(color,0)
        pointGraphics.lineStyle(1,0x000000,1)
        pointGraphics.drawCircle(0,0,this.pointsRadius)
        pointGraphics.endFill()

    }

    this.render = ()=>{
        for (var i=0;i<this.points.length;i++){
            const point = this.points[i]
            const matrix = new PIXI.Matrix()
            matrix.translate(point.uiPoint.x,point.uiPoint.y)
            renderer.render(point.graphics,renderTexture,i===0,matrix)
        }
    }

    this.clearPoints = ()=>{
        for(let i in this.points){
            const point = this.points[i]
            point.graphics.destroy()
        }
        this.points.length = 0
    }
}


export default ToolColorSelector