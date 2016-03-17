var scene = new THREE.Scene(),
//if the browser doesn't support webgl then use canvas
renderer = window.WebGLRenderingContext ?  new THREE.WebGLRenderer() : new THREE.CanvasRenderer,
light = new THREE.AmbientLight(0xffffff),
camera,
box;

function addThingsASceneNeeds(){
    //light is not needed but it is used to have an affect on certain mesh materials
    scene.add(light);
    //you can't see anything if the camera is not observing the scene
    scene.add(camera);
    //you don't actually need a box but what is the point if you don't put anything in the scene
    scene.add(box);
}
function initScene(){
    //this just sets the boundaries of where anything can happen
    //you can have it take up the entire window or part of it
    //this allows there to be multiple scenes in one window
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    //there has to be a standar html element as the starting place just like anything else
    document.getElementById('webgl-container').appendChild(renderer.domElement);
    
    camera = new THREE.PerspectiveCamera(
        35, //FOV field of view what angle from the camera is it capable of seeing
        //this is just like any other cameras capability to see a certain degree of anggle like 180
        //but it is relevant to up and down not right to left
        window.innerWidth/window.innerHeight, // calculationg for aspect ratio
        1, //near range
        1000 //far range
    );
    
    camera.position.z = 100;
  
    createMesh();
    addThingsASceneNeeds();
    render();
}
//still not sure why its called Mesh
function createMesh(){
    box = new THREE.Mesh(
        //the shape is the skeleton of the object
        //it only includes the lines that are used to make a shape, not the fill
        getBuiltInGeometry(),
        //mesh material is like the fill, its what the in between the lines looks like
        new THREE.MeshBasicMaterial({color:0xFF0000})
        
    );
    box.name = "box";
   
    
}
//look at the documenation for a list of all pre built shapes available
//for the most part you shouldn't have to make your own anything
function getBuiltInGeometry(){
    //radius, widthSegments,heightSegments
    //radius determines how big it is
    //computers cannot create perfect circles so you use the width and height property to determine how close to perfect you want it
    //the closer to perfect the more resources it takes to render it
    return new THREE.SphereGeometry(10,20,20);
    return new THREE.BoxGeometry(20,20,20);
}
//i don't get this part, if you assign the rotation property at the time you make the object it won't work
//you have to assign the property when you are rendering
function makeObjectRotate(obj){
    obj.rotation.y += 0.01;
    obj.rotation.x += 0.01;
}
function render(){
    makeObjectRotate(box);
    renderer.render(scene,camera);
    requestAnimationFrame(render);
    
}

window.onload = initScene;
