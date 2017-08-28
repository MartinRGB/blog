<template>
  <div class="three-canvas" id="threecanvas"></div>
</template>

<script>  
    import Stats from 'stats.js'
    import * as THREE from 'three'
    import '../static/js/orbitControls.js'
    import ShaderFrogRuntime from 'shaderfrog-runtime'
    import dat from 'dat.gui/build/dat.gui.js'

//       import Vue from 'vue'
//   import VueResource from 'vue-resource'
//   Vue.use(VueResource);
    import shader0 from '../static/shaders/brickwall.json'
    import texture0 from '../static/textures/metal.jpg'
    import model0 from '../static/models/teapot.json'


    var articleViewId = 'article-view'
    var canvasContainerId = 'threecanvas'
    var aspectRatio = 0.75
    export default {
        name: 'ThreeComponent',
        data () {
            return {}
        },
        methods:{
                initThreeCanvas: function (canvasContainer,centerContainer) {
                // ----------------------------------------
                // init ShaderRuntime
                // ----------------------------------------               
                var _this = this;
                var mRuntime = new ShaderFrogRuntime()
                var mClock = new THREE.Clock()
                
                var timeUniform
                var brickPctUniform = new THREE.Vector2(0.9,0.85);
                var brickColUniform =  new THREE.Vector3(1.,0.3,0.2);
                function uniformSetting(shader){
                    shader.uniforms.textureMap.value = THREE.ImageUtils.loadTexture(texture0);
                    shader.uniforms.BrickPct.value = brickPctUniform;
                    shader.uniforms.BrickColor.value = brickColUniform;
                }
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
                //mModel = new THREE.SphereGeometry( 1.5,1.5, 3);
                //mMaterial = new THREE.MeshLambertMaterial( { color: 0x9e4fc5, wireframe: true } );

                // mModel = new THREE.SphereGeometry( 1.5,1.5, 3);
                // mMaterial = texture0;

                // mModel = model0;
                // mMaterial = shader0;

                mModel = model0;
                mMaterial = shader0;


                // ----------------------------------------
                // Stats & Dat)
                // ----------------------------------------               
                var mStats = new Stats()
                var mGUI = new dat.GUI()
                mGUI.domElement.style.right = (window.innerWidth - centerContainer.offsetWidth)/2 + 'px';
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
                addObject(mScene,mRuntime,mModel,mMaterial,mGUI);
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

            
                function addObject(scene,runtime,modelFile,textureFile,gui){


                    if (!textureFile.isMaterial){

                        if (!modelFile.isGeometry){
                            var loader = new THREE.ObjectLoader();
                            loader.load(modelFile, function ( obj ) {
                                mObject = obj

                                // Texture
                                if(textureFile.split('.').pop() == 'png' || textureFile.split('.').pop() == 'jpg'){
                                    var textureLoader = new THREE.TextureLoader();
                                    var customTexture;
                                    textureLoader.load(texture0,function ( texture ) {
                                        texture.repeat.x = 0.5;
                                        texture.repeat.y = 0.5;
                                        var TextureMaterial = new THREE.MeshBasicMaterial( {
                                            map: texture
                                        });
                                        mObject.material = TextureMaterial

                                        _this.addObjectGUI(gui,mObject)

                                    });
                                }

                                //Shader
                                else if (textureFile.split('.').pop() == 'json'){
                                    runtime.load([textureFile], function( shaders ) {
                                        var customShader = runtime.get( shaders[0].name );
                                        uniformSetting(customShader)
                                        mObject.material = customShader
                                        _this.addObjectGUI(gui,mObject)

                                    })
                                }

                                scene.add(mObject)



                            });
                        }
                        else{
                            // Texture
                            if(textureFile.split('.').pop() == 'png' || textureFile.split('.').pop() == 'jpg'){
                                var textureLoader = new THREE.TextureLoader();
                                var customTexture;
                                textureLoader.load(texture0,function ( texture ) {
                                    texture.repeat.x = 0.5;
                                    texture.repeat.y = 0.5;
                                    var TextureMaterial = new THREE.MeshBasicMaterial( {
                                        map: texture
                                    });
                                    mObject.material = TextureMaterial

                                    _this.addObjectGUI(gui,mObject)

                                });
                            }

                            //Shader
                            else if (textureFile.split('.').pop() == 'json'){
                                runtime.load([textureFile], function( shaders ) {
                                    var customShader = runtime.get( shaders[0].name );
                                    uniformSetting(customShader)
                                    mObject.material = customShader

                                    _this.addObjectGUI(gui,mObject)

                                })
                            }
                            mObject.geometry.dispose()
                            mObject.geometry = modelFile
                            scene.add(mObject)
                        }

                    }
                    else{
                        if (!modelFile.isGeometry){
                            var loader = new THREE.ObjectLoader();
                            loader.load(modelFile, function ( obj ) {
                                mObject = obj
                                mObject.material = textureFile
                                _this.addObjectGUI(gui,mObject)
                                scene.add(mObject)



                            });
                        }
                        else{
                            mObject.geometry.dispose()
                            mObject.geometry = modelFile;
                            mObject.material = textureFile
                            _this.addObjectGUI(gui,mObject)
                            scene.add(mObject)
                        }


                    }

                }

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
                        // object.rotation.x += 0.02;
                        // object.rotation.y += 0.02;
                        id = requestAnimationFrame( animation );
                        // console.log(`id:${id}`)
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
            }
            // ,addObject:function(scene,mObject,runtime,modelFile,textureFile,gui){

            //         var _this = this;
            //         if (!textureFile.isMaterial){

            //             if (!modelFile.isGeometry){
            //                 var loader = new THREE.ObjectLoader();
            //                 loader.load(modelFile, function ( obj ) {
            //                     mObject = obj

            //                     // Texture
            //                     if(textureFile.split('.').pop() == 'png' || textureFile.split('.').pop() == 'jpg'){
            //                         var textureLoader = new THREE.TextureLoader();
            //                         var customTexture;
            //                         textureLoader.load(texture0,function ( texture ) {
            //                             texture.repeat.x = 0.5;
            //                             texture.repeat.y = 0.5;
            //                             var TextureMaterial = new THREE.MeshBasicMaterial( {
            //                                 map: texture
            //                             });
            //                             mObject.material = TextureMaterial

            //                             _this.addObjectGUI(gui,mObject)

            //                         });
            //                     }

            //                     //Shader
            //                     else if (textureFile.split('.').pop() == 'json'){
            //                         runtime.load([textureFile], function( shaders ) {
            //                             var customShader = runtime.get( shaders[0].name );
            //                             uniformSetting(customShader)
            //                             mObject.material = customShader
            //                             _this.addObjectGUI(gui,mObject)

            //                         })
            //                     }

            //                     scene.add(mObject)



            //                 });
            //             }
            //             else{
            //                 // Texture
            //                 if(textureFile.split('.').pop() == 'png' || textureFile.split('.').pop() == 'jpg'){
            //                     var textureLoader = new THREE.TextureLoader();
            //                     var customTexture;
            //                     textureLoader.load(texture0,function ( texture ) {
            //                         texture.repeat.x = 0.5;
            //                         texture.repeat.y = 0.5;
            //                         var TextureMaterial = new THREE.MeshBasicMaterial( {
            //                             map: texture
            //                         });
            //                         mObject.material = TextureMaterial

            //                         _this.addObjectGUI(gui,mObject)

            //                     });
            //                 }

            //                 //Shader
            //                 else if (textureFile.split('.').pop() == 'json'){
            //                     runtime.load([textureFile], function( shaders ) {
            //                         var customShader = runtime.get( shaders[0].name );
            //                         uniformSetting(customShader)
            //                         mObject.material = customShader

            //                         _this.addObjectGUI(gui,mObject)

            //                     })
            //                 }
            //                 mObject.geometry.dispose()
            //                 mObject.geometry = modelFile
            //                 scene.add(mObject)
            //             }

            //         }
            //         else{
            //             if (!modelFile.isGeometry){
            //                 var loader = new THREE.ObjectLoader();
            //                 loader.load(modelFile, function ( obj ) {
            //                     mObject = obj
            //                     mObject.material = textureFile
            //                     _this.addObjectGUI(gui,mObject)
            //                     scene.add(mObject)



            //                 });
            //             }
            //             else{
            //                 mObject.geometry.dispose()
            //                 mObject.geometry = modelFile;
            //                 mObject.material = textureFile
            //                 _this.addObjectGUI(gui,mObject)
            //                 scene.add(mObject)
            //             }


            //         }

            // }

        },
        mounted:function(){
            console.log('mounted canvas')
            this.destroyWebGL = this.initThreeCanvas(document.getElementById(canvasContainerId),document.getElementById(articleViewId))

        },
        destroyed:function(){
            console.log('destroyed canvas')
            this.destroyWebGL()
        }
    }
</script>