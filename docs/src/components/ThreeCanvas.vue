<template>
  <div class="three-canvas" id="threecanvas">
  </div>
</template>

<script>  
    import Stats from 'stats.js'
    import * as THREE from 'three'
    import '../assets/js/orbitControls.js'
    import ShaderFrogRuntime from 'shaderfrog-runtime'

    var centerContainerId = 'body'
    var canvasContainerId = 'threecanvas'
    var aspectRatio = 0.75

    var scene, camera, renderer;
    var geometry, material, mesh, lights;
    var count = 0;
    var stats;




    export default {
        name: 'threecanvas',
        data () {
            return {}
        },
        mounted:function(){
            // Panel
            var canvasContainer  = document.getElementById(canvasContainerId)
            var centerContainer = document.getElementById(centerContainerId)
            

            if(renderer !=null){
                canvasContainer.appendChild( stats.dom )
                canvasContainer.appendChild( renderer.domElement );
            }
            else{
                init();
                addAnimate();
            }

            console.log(count)

            function init() {   
                
                stats = new Stats()
                addStatsUI(canvasContainer)
                
                count++;
                scene = new THREE.Scene();
                addLight(scene)
                camera = new THREE.PerspectiveCamera( 75, 1/aspectRatio, 1, 1000 );
                camera.position.z = 20;

                geometry = new THREE.BoxGeometry( 5, 5, 5 );
                material = new THREE.MeshLambertMaterial( { color: 0x333300, wireframe: false } );

                mesh = new THREE.Mesh( geometry, material );
                mesh.rotation.x = 0.;
                mesh.rotation.y = 0.;
                scene.add( mesh );

                renderer = new THREE.WebGLRenderer();
                renderer.setSize((centerContainer.offsetWidth),(centerContainer.offsetWidth)*aspectRatio);
                canvasContainer.appendChild( renderer.domElement );
                
                var controls = new THREE.OrbitControls(camera,renderer.domElement)
                addZoomCondition(controls,renderer)

                window.addEventListener("resize", function() {
                    renderer.setSize((centerContainer.offsetWidth),(centerContainer.offsetWidth)*aspectRatio);
                    //datgui.domElement.style.right = (window.innerWidth - body.offsetWidth+40)/2 + 'px';
                });
            
            }

            function addAnimate() {
                
                stats.begin();
                stats.end();
                renderer.render(scene, camera);
                mesh.rotation.x += 0.02;
                mesh.rotation.y += 0.02;

                requestAnimationFrame( addAnimate );

            }

            // Light
            function addLight(scene){
                lights = [];
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
            }

            function addStatsUI(container){
                stats.dom.id = 'stats-board'
                stats.showPanel(0)
                stats.dom.style.top = ""
                stats.dom.style.left = ""
                stats.dom.style.position = "absolute"
                container.appendChild(stats.dom)
            }

        },
        destroyed:function(){
        }
    }
</script>