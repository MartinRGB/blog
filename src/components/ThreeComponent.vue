<template>
  <div class="three-canvas" id="threecanvas"></div>
</template>

<script>  
    import Stats from 'stats.js'
    import * as THREE from 'three'
    import '../static/js/orbitControls.js'
    import ShaderFrogRuntime from 'shaderfrog-runtime'
    import dat from 'dat.gui'


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
            var stats = new Stats()
            var scene = new THREE.Scene();

            var camera = new THREE.PerspectiveCamera( 75, 1/aspectRatio, 1, 1000 );
            var geometry = new THREE.BoxGeometry( 5, 5, 5 );
            var material = new THREE.MeshLambertMaterial( { color: 0x333300, wireframe: false } );
            
            var object = new THREE.Mesh( geometry, material );
            var renderer = new THREE.WebGLRenderer();
            var controls = new THREE.OrbitControls(camera,renderer.domElement)
            controls.reset;
            var lights = [];


            var gui = new dat.GUI()
            var guiOptions;
            var guiBGColor = gui.addFolder('BGColor');
            var guiCam = gui.addFolder('Camera');
            var guiObject = gui.addFolder('Object');

            camera.position.z = 20;
            object.rotation.x = 0.;
            object.rotation.y = 0.;
            scene.add( object );
            renderer.setSize((centerContainer.offsetWidth),(centerContainer.offsetWidth)*aspectRatio);
            renderer.setClearColor( 0x3f403b, 1 );
            canvasContainer.appendChild( gui.domElement );
            canvasContainer.appendChild(stats.dom)
            canvasContainer.appendChild(renderer.domElement);


            // DATGUI
            function addDATGUI(){
                guiOptions = {
                    color:{
                        background: "#3f403b"
                    },
                    camera: {
                        rotationX: 0,
                        rotationY: 0,
                        rotationZ: 0,
                        positionX: 0,
                        positionY: 0,
                        positionZ: 20.
                    },
                    reset: function() {
                        guiReset()
                    }
                }

                gui.domElement.style.right = (window.innerWidth - centerContainer.offsetWidth)/2 - 2 + 'px';
                gui.domElement.style.position = "absolute";
                gui.domElement.style.display = 'table'
                gui.domElement.style.marginRight = '0px'
                gui.domElement.style.width = '280px'
                guiBGColor.addColor(guiOptions.color,'background').listen();

                guiCam.add(camera.position, 'x', -20, 20).name('positionX').listen();
                guiCam.add(camera.position, 'y', -20, 20).name('positionY').listen();
                guiCam.add(camera.position, 'z', -20, 20).name('positionZ').listen();
                guiCam.add(camera.rotation, 'x', -1, 1).name('rotationX').listen();
                guiCam.add(camera.rotation, 'y', -1, 1).name('rotationY').listen();
                guiCam.add(camera.rotation, 'z', -20, 20).name('rotationZ').listen();

                guiObject.add(object.position, 'x', -20, 20).name('positionX').listen();
                guiObject.add(object.position, 'y', -20, 20).name('positionY').listen();
                guiObject.add(object.position, 'z', -20, 20).name('positionZ').listen();
                guiObject.add(object.scale, 'x', 0, 3).name('width').listen();
                guiObject.add(object.scale, 'y', 0, 3).name('height').listen();
                guiObject.add(object.scale, 'z', 0, 3).name('depth').listen();
                guiObject.add(object.material, 'wireframe').listen();

                gui.add(guiOptions, 'reset');
                gui.close()
            }
            addDATGUI()


            function guiReset(){
                
                guiOptions.color.background = '#3f403b'
                
                object.scale.x = 1
                object.scale.y = 1
                object.scale.z = 1
                object.material.wireframe = false;
                object.position.x = 0
                object.position.y = 0
                object.position.z = 0

                camera.position.x = 0;
                camera.position.y = 0;
                camera.position.z = 20;
                camera.rotation.x = 0;
                camera.rotation.y = 0;
                camera.rotation.z = 0;

            }

            function updateDATGUI(){
                //listen

                renderer.setClearColor( guiOptions.color.background, 1 );
            }

             
            // Animation
            var animation = animate()
            animation.start()
            function animate () {
                var id
                function animation () {
                    stats.begin();
                    stats.end();
                    renderer.render(scene, camera);
                    updateDATGUI()
                    object.rotation.x += 0.02;
                    object.rotation.y += 0.02;
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

            // Light
            function addLight(scene){
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
            }
            addLight(scene)

            // Control
            function addZoomCondition(controls,renderer){
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
            }
            var cancelZoom = addZoomCondition(controls,renderer)

             // Stats
            function addStatsUI(stats){
                stats.dom.id = 'stats-board'
                stats.showPanel(0)
                stats.dom.style.top = ""
                stats.dom.style.left = ""
                stats.dom.style.position = "absolute"
                stats.dom.style.zIndex = "1000"
            }
            addStatsUI(stats)

            // Resize
            function onResize () {
                renderer.setSize((centerContainer.offsetWidth),(centerContainer.offsetWidth)*aspectRatio);
                gui.domElement.style.right = (window.innerWidth - centerContainer.offsetWidth)/2 - 4 + 'px';
            }
            window.addEventListener("resize", onResize);

            //解除绑定
            return function () {
              cancelZoom()
              window.removeEventListener('resize',onResize)
              animation.stop()
            }
          }

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