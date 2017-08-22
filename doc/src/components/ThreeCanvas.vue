<template>
  <div class="three-canvas" id="threecanvas">
  </div>
</template>

<script>  
    import Stats from 'stats.js'
    import * as THREE from 'three'
    import '../assets/js/orbitControls.js'

    var centerContainerId = 'body'
    var canvasContainerId = 'threecanvas'

    var scene, camera, renderer;
    var geometry, material, mesh;

    export default {
        name: 'threecanvas',
        data () {
            return {}
        },
        mounted:function(){
            // Panel
            var canvasContainer  = document.getElementById(canvasContainerId)
            var centerContainer = document.getElementById(centerContainerId)
            var aspectRatio = 0.75
            var stats = new Stats()
            stats.dom.id = 'stats-board'
            stats.showPanel(0)
            stats.dom.style.top = ""
            stats.dom.style.left = ""
            stats.dom.style.position = "absolute"
            canvasContainer.appendChild(stats.dom)

            init();
            animate();


            
            function init() {

                scene = new THREE.Scene();

                camera = new THREE.PerspectiveCamera( 75, 1/aspectRatio, 1, 10000 );
                camera.position.z = 1000;

                geometry = new THREE.BoxGeometry( 200, 200, 200 );
                material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

                mesh = new THREE.Mesh( geometry, material );
                scene.add( mesh );

                renderer = new THREE.WebGLRenderer();
                renderer.setSize( window.innerWidth, window.innerHeight );
                renderer.setSize((centerContainer.offsetWidth),(centerContainer.offsetWidth)*aspectRatio);
                canvasContainer.appendChild( renderer.domElement );
                var controls = new THREE.OrbitControls(camera,renderer.domElement)

                window.addEventListener("resize", function() {
                    renderer.setSize((centerContainer.offsetWidth),(centerContainer.offsetWidth)*aspectRatio);
                    //datgui.domElement.style.right = (window.innerWidth - body.offsetWidth+40)/2 + 'px';
                });
            
            }

            function animate() {

                stats.begin();
                stats.end();
                renderer.render(scene, camera);

                requestAnimationFrame( animate );

            }

        },
        destroyed:function(){
            // cancelAnimationFrame(animate)
            // cancelAnimationFrame(statsAnimate)
            // var canvasContainer  = document.getElementById(canvasContainerId)
            //var canvasContainer  = document.getElementById(canvasContainerId)
            //canvasContainer.remove(render.domElement)
        }
    }
</script>