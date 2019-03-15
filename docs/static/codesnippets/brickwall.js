  var scene, camera, renderer;
  var geometry, material, mesh;

  // ObjectLoader
  var customObject;

  // ShaderFrog Runtime
  var runtime = new ShaderRuntime()
  var clock = new THREE.Clock()
  
  // DAT GUI
  var gui = new dat.GUI({ autoPlace: false });
  var objectFolder = gui.addFolder('Object');

  // HTML Port
  var bodyId = "body"
  var canvasContainerId = "canvasContainer"
  var glslCodeContainerId1 = "glslCodeContainer_vert"
  var glslCodeContainerId2 = "glslCodeContainer_frag"
  var cppCodeContainerId = "cppCodeContainer"
  var aspectRatio = 0.75;
  var modelScale = 0.002;

  init();
  animate();

  function init() {
    
    // Init
    var canvasContainer = document.getElementById(canvasContainerId);
    var body = document.getElementById(bodyId);

    loadHighlightCode("language-glsl","../codes/brickwall.vert",glslCodeContainerId1);
    loadHighlightCode("language-glsl","../codes/brickwall.frag",glslCodeContainerId2);
    loadStatsUI(canvasContainer)
    loadDATGUI(gui,mesh,reset)

    // Scene & Cam & Tex
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, 1/aspectRatio, 1, 10000 );
    camera.position.z = 4;
    camera.position.y = 0;
    runtime.registerCamera( camera );
    

    // ------------ Model Code Here ------------
    geometry = new THREE.BoxGeometry( 2, 2, 2 );
    material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide} );
    mesh = new THREE.Mesh( geometry, material );
    loadShader(scene,'../jsons/brickwall.json',mesh,objectFolder)


    mesh.traverse( function( node ) {
      if( node.material ) {
          node.material.side = THREE.DoubleSide;
      }
    });
    scene.add( mesh );

    // Renderer
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setClearColor( 0x000000, 1 );
    renderer.setSize((body.offsetWidth-40),(body.offsetWidth-40)*aspectRatio);
    canvasContainer.appendChild( renderer.domElement );
    
    // Controls
    controls = new THREE.OrbitControls(camera,renderer.domElement)
    controls.reset;
    addZoomCondition(controls,renderer)
    addLight(scene)
    resizeWindow(renderer,gui)

  }


  function animate() {

    requestAnimationFrame( animate );
    updateDATGUI()
    //### Uniform update can refer this - https://github.com/AndrewRayCode/ShaderFrog-Runtime
    time = clock.getElapsedTime();
    runtime.updateShaders(time);

    renderer.render( scene, camera );

  }

  var brickValue = new THREE.Vector2(0.9,0.85);
  var brickCol =  new THREE.Vector3(1.,0.3,0.2);

  function reset(){
    controls.reset();
    mesh.scale.x = 1.;
    mesh.scale.y = 1.;
    mesh.scale.z = 1.;
    mesh.material.wireframe = false;
    mesh.position.y = 0.;
    brickValue.x = 0.9;
    brickValue.y = 0.85;
    brickCol.x =  1.;
    brickCol.y =  0.3;
    brickCol.z =  0.2;
    colorConf.brickColor = [255,255*0.3,255*0.2];
  }

  function loadShader(scene,shaderPath,object,guiFolder){
    var customShader;
    runtime.load([
        shaderPath
    ], function( shaders ) {
        customShader = runtime.get( shaders[0].name );
        customShader.uniforms.textureMap.value = THREE.ImageUtils.loadTexture( '../textures/dirt.jpg' );
        customShader.uniforms.BrickPct.value = brickValue;
        customShader.uniforms.BrickColor.value = brickCol;


        // Color Uniform
        var ColorConfiguracion=function(){
          this.brickColor = [255,255*0.3,255*0.2];
        }
        var colorConf = new ColorConfiguracion();
        var colorController = guiFolder.addColor(colorConf,'brickColor').listen();
        colorController.onChange( function( colorValue  )
        {
          brickCol.x = colorValue[0]/255.;
          brickCol.y = colorValue[1]/255.;
          brickCol.z = colorValue[2]/255.;
        });

        mesh.material = customShader;

        guiFolder.add(object.position, 'y', -2, 2).name('positionY').listen();
        guiFolder.add(object.scale, 'x', 0, 3).name('width').listen();
        guiFolder.add(object.scale, 'y', 0, 3).name('height').listen();
        guiFolder.add(brickValue, 'x', 0, 3).name('brickWidth').listen();
        guiFolder.add(brickValue, 'y', 0, 3).name('brickHeight').listen();
  
        guiFolder.add(object.material, 'wireframe').listen();
        
    });
  }






