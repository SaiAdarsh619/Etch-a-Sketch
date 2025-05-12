let container = document.querySelector('.container');
let newcanvas = document.querySelector('.newcanvas');


/* initialization of the canvas on start with default size*/
let def = 16;

const containerWidth = container.offsetWidth;
const containerHeight = container.offsetHeight;

//console.log(`Pixel width: ${containerWidth / def}, Pixel height: ${containerHeight / def}`);


//initial creation of the canvas
for (let i = 0; i < def * def; i++) {
    const newpixel = document.createElement('div');
    newpixel.className = 'pixel';
    newpixel.style.width = `${containerWidth / def}px`;
    newpixel.style.height = `${containerHeight / def}px`;
    newpixel.setAttribute('numofhover','0')
    container.appendChild(newpixel);
}

//event listener to the button and canvas
newcanvas.addEventListener('click', createCanvas)
container.addEventListener('mouseover', changePixel);

//create new canvas on clicking newcanvas button
function createCanvas()
{
    let size =0;
   do{
    size = parseInt(prompt('new canvas size ( between 2 and 100): '));
    if(!(size>=2 && size<=100))
    {
        alert('invalid size range')
    }
    else
    break;
    }
    while(true);     
    
    def = size;
    
    const newcontainer = document.querySelector('.container');
    newcontainer.innerHTML = ''; // Clear the container
    for (let i = 0; i < def * def; i++) {
    const newpixel = document.createElement('div');
    newpixel.className = 'pixel';
    newpixel.style.width = `${containerWidth / def}px`;
    newpixel.style.height = `${containerHeight / def}px`;

    newpixel.setAttribute('numofhover','0')
    container.appendChild(newpixel);
    }
 
}

//change the pixel color 
function changePixel(event)
{
    let element = event.target;

    if(element.className === 'pixel')
    {
        let numofhover = parseInt(element.getAttribute('numofhover'));
        
        if(numofhover === 0){
            let rdColor = randomColor()
            let colorString = `rgba(${rdColor.get('red')}, ${rdColor.get('green')}, ${rdColor.get('blue')}, 1)`;
            element.style.backgroundColor = colorString;
            numofhover+=1;
            element.setAttribute('numofhover', `${numofhover}`);
        }
        else if(numofhover > 0 && numofhover <= 10) {
            let opacity = 1 - (numofhover * 0.1); 
            setOpacityOfDiv(element, opacity);

            numofhover += 1;
            element.setAttribute('numofhover', `${numofhover}`);
        }
    }
}

//set opacity of the pixel on mulitple hovers
function setOpacityOfDiv(div, opacity){
    let color = div.style.backgroundColor;

    //isolate into the red, green, blue numbers
    let colorMap = color.substring(color.indexOf('(') + 1, color.length - 1);

    //separate into red, green, blue array
    colorMap = colorMap.split(',');

    //set color using rgba()
    div.style.backgroundColor = `rgba(${colorMap[0]}, ${colorMap[1]}, ${colorMap[2]}, ${opacity})`;
}

//generate a random color combo of RGB
function randomColor()
{
    let red = Math.floor(Math.random()*255)
    let green = Math.floor(Math.random()*255)
    let blue = Math.floor(Math.random()*255)

    let color = new Map([
        ["red", red],
        ["green", green],
        ["blue", blue]
    ]);

    return color;
}
