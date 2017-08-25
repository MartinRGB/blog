<template>
  <div class="three-canvas" id="threecanvas"></div>
</template>

<script>  
    import Stats from 'stats.js'
    import * as THREE from 'three'
    import '../static/js/orbitControls.js'
    import ShaderFrogRuntime from 'shaderfrog-runtime'

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
            var mesh = new THREE.Mesh( geometry, material );
            var renderer = new THREE.WebGLRenderer();
            var controls = new THREE.OrbitControls(camera,renderer.domElement)
            var lights = [];

            camera.position.z = 20;
            mesh.rotation.x = 0.;
            mesh.rotation.y = 0.;
            scene.add( mesh );
            renderer.setSize((centerContainer.offsetWidth),(centerContainer.offsetWidth)*aspectRatio);
            canvasContainer.appendChild(stats.dom)
            canvasContainer.appendChild(renderer.domElement);

             
            // Animation
            var animation = animate()
            animation.start()
            function animate () {
                var id
                function animation () {
                    stats.begin();
                    stats.end();
                    renderer.render(scene, camera);
                    mesh.rotation.x += 0.02;
                    mesh.rotation.y += 0.02;
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