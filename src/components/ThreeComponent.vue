<template>
  <div class="three-canvas" v-bind:id='bindId'></div>
</template>

<script>  
    import Stats from 'stats.js'
    import * as THREE from 'three'
    import '../static/js/orbitControls.js'
    import ShaderFrogRuntime from 'shaderfrog-runtime'
    import dat from 'dat.gui/build/dat.gui.js'
    
    var articleViewId = 'article-view'
    var aspectRatio = 0.75
    export default {
        name: 'ThreeComponent',
        props: ['bindModel','bindMaterial','bindUniform','bindId'],
        data () {
            return {}
        },
        methods:{
                initThreeCanvas: function (canvasContainer,centerContainer) {
                          
                var _this = this;
                // ----------------------------------------
                // init ShaderRuntime
                // ----------------------------------------         

                var mUniform
                var mRuntime = new ShaderFrogRuntime()
                var mClock = new THREE.Clock()
                var timeUniform

                // ----------------------------------------
                // init ThreeJS
                // ----------------------------------------              
                var mScene = new THREE.Scene();
                var mCamera = new THREE.PerspectiveCamera( 75, 1/aspectRatio, 1, 10000 );
                mRuntime.registerCamera( mCamera );

                var mModel = new THREE.BoxGeometry( 2, 2, 2 );
                var mMaterial = new THREE.MeshLambertMaterial( { color: 0xfff000, wireframe: true } );
                var mObject = new THREE.Mesh( mModel, mMaterial );

                var mRenderer = new THREE.WebGLRenderer();
                var mControl = new THREE.OrbitControls(mCamera,mRenderer.domElement)
                var mLights = [];
                // ----------------------------------------
                // define Tex and Shape Here
                // ----------------------------------------

                if(this.bindModel != null){
                    mModel = this.bindModel;
                }
                else{
                    mModel = new THREE.BoxGeometry( 2, 2, 2 );
                }

                if(this.bindMaterial != null){
                    mMaterial = this.bindMaterial;
                }
                else{
                    mMaterial =  new THREE.MeshLambertMaterial( { color: 0xfff000, wireframe: false } );
                }

                if(this.bindUniform != null){
                    mUniform = this.bindUniform;
                }
                else{
                    //
                }

                // ----------------------------------------
                // Stats & Dat)
                // ----------------------------------------               
                var mStats = new Stats()
                var mGUI = new dat.GUI()
                mGUI.domElement.style.right = (window.innerWidth - centerContainer.offsetWidth)/2 + 'px';
                
                
                // ##### TODO:USE Options #######
                var guiOptions = {

                    color:{
                        background: "#3f403b"
                    },
                    camera: {
                        rotationX: 0,
                        rotationY: 0,
                        rotationZ: 0,
                        positionX: 0,
                        positionY: 0,
                        positionZ: 4.
                    },
                    object: {
                        scaleX:1,
                        scaleY:1,
                        scaleZ:1,
                        positionX:0,
                        positionY:0,
                        positionZ:0,
                        wireframe:false
                    },
                    reset: function() {
                        _this.addGUIReset(mObject,mControl,mCamera,guiOptions)
                    }
                }
                this.addStatsUI(mStats)
                this.addBaseGUI(mGUI,mObject,mControl,mCamera,guiOptions)
                this.addGUIReset(mObject,mControl,mCamera,guiOptions)

                function updateDATGUI(renderer,option){
                    //listen
                    renderer.setClearColor( option.color.background, 1 );
                }

                // ----------------------------------------
                // Add Object & Element Setting
                // ----------------------------------------
                this.addObject(mScene,mObject,mRuntime,mModel,mMaterial,mUniform,mGUI);
                mRenderer.setSize((centerContainer.offsetWidth),(centerContainer.offsetWidth)*aspectRatio);
                mRenderer.setClearColor( 0x3f403b, 1 );
                canvasContainer.appendChild( mGUI.domElement );
                canvasContainer.appendChild(mStats.dom)
                canvasContainer.appendChild(mRenderer.domElement);

                // ----------------------------------------
                // Light & Control
                // ----------------------------------------          

                this.addLight(mLights,mScene)
                this.addControlCondition(mControl,mRenderer)

                // ----------------------------------------
                // Animation Updating
                // ----------------------------------------
                var animation = animate()
                animation.start()
                function animate () {
                    var id
                    function animation () {
                        mStats.begin();
                        mStats.end();
                        updateDATGUI(mRenderer,guiOptions)
                        timeUniform = mClock.getElapsedTime();
                        mRuntime.updateShaders(timeUniform);
                        mRenderer.render(mScene, mCamera);
                        id = requestAnimationFrame( animation );

                        // console.log(`id:${id}`)
                        // mObject.rotation.x += 0.02;
                        // mObject.rotation.y += 0.02;
                    }
                    return {
                        start: function () {
                            animation()
                        },
                        stop: function () {
                            cancelAnimationFrame(id)
                        }
                    }
                }

                // ----------------------------------------
                // Window Resize Event
                // ----------------------------------------
                function onResize () {
                    mRenderer.setSize((centerContainer.offsetWidth),(centerContainer.offsetWidth)*aspectRatio);
                    mGUI.domElement.style.right = (window.innerWidth - centerContainer.offsetWidth)/2 + 'px';
                }
                window.addEventListener("resize", onResize);

                // ----------------------------------------
                // Remove Event When Destoryed
                // ----------------------------------------
                return function () {
                    window.removeEventListener('resize',onResize)
                    animation.stop()
                }
            },
            addLight:function(lights,scene){
                    lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
                    lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
                    lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );
                    lights[ 3 ] = new THREE.AmbientLight( 0x904040 );
                    lights[ 0 ].position.set( 0, 20, 20 );
                    lights[ 1 ].position.set( 10, 10, 10 );
                    lights[ 2 ].position.set( - 10, - 20, - 10 );
                    scene.add( lights[ 0 ] );
                    scene.add( lights[ 1 ] );
                    scene.add( lights[ 2 ] );
                    scene.add( lights[ 3 ] );

            },
            addStatsUI:function(object){
                    object.dom.id = 'stats-board'
                    object.showPanel(0)
                    object.dom.style.top = ""
                    object.dom.style.left = ""
                    object.dom.style.position = "absolute"
                    object.dom.style.zIndex = "1000"
            },
            addControlCondition:function(controls,renderer){
                    controls.enableZoom = false;
                    controls.enableRotate = false;
                    controls.enablePan = false;
                    renderer.domElement.onmouseover = function(){
                        controls.enableZoom = true;
                        controls.enableRotate = true;
                        controls.enablePan = true;
                    }
                    renderer.domElement.onmouseleave = function(){
                        controls.enableZoom = false;
                        controls.enableRotate = false;
                        controls.enablePan = false;
                    }
                    return function () {
                        renderer.domElement.onmouseover = null
                        renderer.domElement.onmouseleave = null
                    }
            },
            addBaseGUI:function(gui,object,control,camera,options){

                var guiBGColor = gui.addFolder('BGColor');
                var guiCam = gui.addFolder('Camera');
                //var guiObject = gui.addFolder('Object');
                
                guiBGColor.addColor(options.color,'background').listen();

                guiCam.add(camera.position, 'x', -20, 20).name('positionX').listen();
                guiCam.add(camera.position, 'y', -20, 20).name('positionY').listen();
                guiCam.add(camera.position, 'z', 0, 20).name('positionZ').listen();
                guiCam.add(camera.rotation, 'x', -1, 1).name('rotationX').listen();
                guiCam.add(camera.rotation, 'y', -1, 1).name('rotationY').listen();
                guiCam.add(camera.rotation, 'z', -20, 20).name('rotationZ').listen();

                gui.add(options, 'reset');
                gui.close()
            },
            addObjectGUI:function(gui,object){
                var guiFolder = gui.addFolder('Object');
                guiFolder.add(object.position, 'x', -20, 20).name('positionX').listen();
                guiFolder.add(object.position, 'y', -20, 20).name('positionY').listen();
                guiFolder.add(object.position, 'z', -20, 20).name('positionZ').listen();
                guiFolder.add(object.scale, 'x', 0, 3).name('width').listen();
                guiFolder.add(object.scale, 'y', 0, 3).name('height').listen();
                guiFolder.add(object.scale, 'z', 0, 3).name('depth').listen();
                guiFolder.add(object.material, 'wireframe').listen();

            },
            addGUIReset:function(object,control,camera,options){
                options.color.background = '#3f403b'
                control.reset()
                object.scale.x = 1
                object.scale.y = 1
                object.scale.z = 1
                object.material.wireframe = false;
                object.position.x = 0
                object.position.y = 0
                object.position.z = 0

                camera.position.x = 0;
                camera.position.y = 0;
                camera.position.z = 4;
                camera.rotation.x = 0;
                camera.rotation.y = 0;
                camera.rotation.z = 0;
            },
            // BUG Probably happened here,try using nextTick
            uniformSetting:function(gui,shader,uniform){
                //Key-Value

                console.log("loaded Uniform")
                var PropKeys = Object.keys(uniform)
                var PropValues = Object.values(uniform)
                var guiUniform = gui.addFolder('Uniform')

                Object.keys(PropKeys).forEach(function (index) {
                    shader['uniforms'][PropKeys[index]]['value'] = PropValues[index]


                    console.log(PropValues[index].constructor.name)


                    if(PropValues[index].constructor.name == 'Vector2' || PropValues[index].constructor.name == 'r'){
                        guiUniform.add(PropValues[index],'x',-1,1).name(PropKeys[index]+'.v1').listen;
                        guiUniform.add(PropValues[index],'y',-1,1).name(PropKeys[index]+'.v2').listen;
                        //alert(PropKeys[index])
                    }
                    if(PropValues[index].constructor.name == 'Vector3' || PropValues[index].constructor.name == 'c'){
                        
                        if(PropKeys[index].match(new RegExp('color', "gi"))){
                            var ColorConfiguracion=function(){
                                this[PropKeys[index]] = [PropValues[index].x*255,PropValues[index].y*255,PropValues[index].z*255];
                            }
                            var colorConf = new ColorConfiguracion();
                            var colorController = guiUniform.addColor(colorConf,String(PropKeys[index])).listen();
                            colorController.onChange( function( colorValue  )
                            {
                                PropValues[index].x = colorValue[0]/255.;
                                PropValues[index].y = colorValue[1]/255.;
                                PropValues[index].z = colorValue[2]/255.;
                            });
                        }
                        else{
                            guiUniform.add(PropValues[index],'x',-1,1).name(PropKeys[index]+'.v1').listen;
                            guiUniform.add(PropValues[index],'y',-1,1).name(PropKeys[index]+'.v2').listen;
                            guiUniform.add(PropValues[index],'z',-1,1).name(PropKeys[index]+'.v3').listen;

                        }
                    }
                });
            }
            ,addObject:function(scene,object,runtime,modelFile,textureFile,uniform,gui){

                    var _this = this;
                    if (!textureFile.isMaterial){

                        if (!modelFile.isGeometry){
                            var loader = new THREE.ObjectLoader();
                            loader.load(modelFile, function ( obj ) {
                                object = obj

                                //自定义材质，自定义模型
                                if(textureFile.split('.').pop() == 'png' || textureFile.split('.').pop() == 'jpg'){
                                    var textureLoader = new THREE.TextureLoader();
                                    var customTexture;
                                    textureLoader.load(textureFile,function ( texture ) {
                                        texture.repeat.x = 0.5;
                                        texture.repeat.y = 0.5;
                                        var TextureMaterial = new THREE.MeshBasicMaterial( {
                                            map: texture
                                        });
                                        object.material = TextureMaterial

                                        _this.addObjectGUI(gui,object)

                                    });
                                }

                                //自定义着色器材质，自定义模型
                                else if (textureFile.split('.').pop() == 'json'){

                                    runtime.load([textureFile], function( shaders ) {
                                        var customShader = runtime.get( shaders[0].name );
                                        _this.uniformSetting(gui,customShader,uniform)
                                        object.material = customShader
                                        _this.addObjectGUI(gui,object)

                                    })

                                }

                                scene.add(object)



                            });
                        }
                        else{
                            //自定义材质，不自定义模型
                            if(textureFile.split('.').pop() == 'png' || textureFile.split('.').pop() == 'jpg'){
                                var textureLoader = new THREE.TextureLoader();
                                var customTexture;
                                textureLoader.load(textureFile,function ( texture ) {
                                    texture.repeat.x = 0.5;
                                    texture.repeat.y = 0.5;
                                    var TextureMaterial = new THREE.MeshBasicMaterial( {
                                        map: texture
                                    });
                                    object.material = TextureMaterial

                                    _this.addObjectGUI(gui,object)

                                });
                            }

                            //自定义着色器材质，不自定义模型
                            else if (textureFile.split('.').pop() == 'json'){
                                runtime.load([textureFile], function( shaders ) {
                                    var customShader = runtime.get( shaders[0].name );
                                    _this.uniformSetting(gui,customShader,uniform)
                                    object.material = customShader

                                    _this.addObjectGUI(gui,object)

                                })
                            }
                            object.geometry.dispose()
                            object.geometry = modelFile
                            scene.add(object)
                        }

                    }
                    else{
                        //不自定义材质，自定义模型
                        if (!modelFile.isGeometry){
                            var loader = new THREE.ObjectLoader();
                            loader.load(modelFile, function ( obj ) {
                                object = obj
                                object.material = textureFile
                                _this.addObjectGUI(gui,object)
                                scene.add(object)



                            });
                        }
                        //不自定义材质，不自定义模型
                        else{
                            object.geometry.dispose()
                            object.geometry = modelFile;
                            object.material = textureFile
                            _this.addObjectGUI(gui,object)
                            scene.add(object)
                        }


                    }

            }

        },
        mounted:function(){
            console.log('mounted canvas')

            var canvasContainerId = this.bindId;
            this.destroyWebGL = this.initThreeCanvas(document.getElementById(canvasContainerId),document.getElementById(articleViewId))

        },
        destroyed:function(){
            console.log('destroyed canvas')
            this.destroyWebGL()
        }
    }
</script>