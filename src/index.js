let ar_image = new Image();

const width = 1280;
const height = 720;
let filterOption = "";
let debugMsg = document.getElementById('debug_msg');
let buttonContainer = document.getElementById('button_container');
let grayscaleBtn = document.createElement('button');
let arStickerBtn = document.createElement('button');
let isArStickerOn = false;
let removeFilterBtn = document.createElement('button');

let canvas = document.getElementById('filtered_canvas');
let context = canvas.getContext( '2d' );
let videoElement = document.createElement("video");

async function drawToCanvas() {
    
    context.drawImage( videoElement, 0, 0, width, height );
    
    if (filterOption === "grayscale") { 
        if (!canvas.classList.contains("grayscale")) {
            canvas.classList.add("grayscale");
        }
        if (isArStickerOn) {
            context.drawImage(ar_image, 150, 200, 250, 400);
        }
    }
    if (filterOption === "ar_sticker") {
        context.drawImage(ar_image, 150, 200, 250, 400);
    } 
    if (filterOption === "original") {
        // do nothing
        if (canvas.classList.contains("grayscale")) {
            canvas.classList.remove("grayscale");
        }
    }

    requestAnimationFrame( drawToCanvas );
}

function onGrayscaleClicked() {
    filterOption = 'grayscale';
    console.log("switch to grayscale");
}

function onArStickerClicked() {
    filterOption = 'ar_sticker';
    isArStickerOn = true;
    console.log("switch to ar sticker");
}

function onOriginalClicked() {
    filterOption = 'original';
    isArStickerOn = false;
    console.log("remove all filters");
}

grayscaleBtn.classList.add('btn');
grayscaleBtn.classList.add('btn-success');
grayscaleBtn.classList.add('custom_btn_length');
grayscaleBtn.innerText = "Grayscale";
grayscaleBtn.addEventListener( 'click', onGrayscaleClicked);
arStickerBtn.classList.add('btn');
arStickerBtn.classList.add('btn-info');
arStickerBtn.classList.add('custom_btn_length');
arStickerBtn.innerText = "AR Sticker";
arStickerBtn.addEventListener( 'click', onArStickerClicked);
removeFilterBtn.classList.add('btn');
removeFilterBtn.classList.add('btn-primary');
removeFilterBtn.classList.add('custom_btn_length');
removeFilterBtn.innerText = "Remove Filters";
removeFilterBtn.addEventListener( 'click', onOriginalClicked);

buttonContainer.appendChild(grayscaleBtn);
buttonContainer.appendChild(arStickerBtn);
buttonContainer.appendChild(removeFilterBtn);

Promise.all([
    ar_image.src = "img/duck2.png",
]).then(() => {
    debugMsg.innerText += "\n AR image loaded successfully\n";
    loadMedia();
}).catch(()=> {
    debugMsg.innerText += "\n [Error] Can't load AR image\n";
});


function loadMedia() {
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            mandatory: {
                minWidth: 1280,
                maxWidth: 1280,
                minHeight: 720,
                maxHeight: 720,
            }
        },
      }).then(stream => {
        debugMsg.innerText += "Starting local stream...\n";
        videoElement.srcObject = stream;
        videoElement.muted = true;
        videoElement.play();
        drawToCanvas();
      }).catch((err) => {
        debugMsg.innerText += "[Error] Can't start local stream\n";
        debugMsg.innerText += "[Error] "+err.name+ ": "+ err.message +"\n";
      });
} 