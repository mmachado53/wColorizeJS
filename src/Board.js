import React, {useEffect, useRef, useState} from "react";
import * as PIXI from 'pixi.js'
import logo from "./logo.svg"
import {func} from "prop-types";

function Board(props){
    const [pixiApp,setPixiApp] = useState(null)
    const divRef = useRef()
    const [count,setCount] = useState(0)
    const [stop,setStop] = useState(false)

    useEffect(() => {
        console.log('mounted')
        startPixi()
    }, []);
    useEffect(() => {
        return () => {
            console.log('will unmount');
            stopPixi()
        }
    }, []);

    function startPixi(){
        let pixiA = new PIXI.Application()
        divRef.current.appendChild(pixiA.view)
        pixiA.loader.add("logo",logo).load((loader,resources)=>{
            const logoSprite = new PIXI.Sprite(resources.logo.texture)
            logoSprite.x = pixiA.renderer.width / 2
            logoSprite.y = pixiA.renderer.height / 2
            logoSprite.anchor.x = 0.5
            logoSprite.anchor.y = 0.5

            pixiA.stage.addChild(logoSprite)

            pixiA.ticker.add(()=>{
                logoSprite.rotation += 0.01
            })

        })
        pixiA.start()
        setPixiApp(pixiA)

    }
    function stopPixi() {
        pixiApp.stop()

    }
    
    function ticker() {

    }
    function addCount() {
        setCount(count+1)
        if(!stop){
            pixiApp.stop()
            setStop(true)
        }else{
            pixiApp.start()
            setStop(false)
        }

    }
    return(
        <div>
            <input type="button" value={"hola"+count} onClick={addCount}/>
            <div  ref={divRef}></div>
        </div>
    )
}

export default Board