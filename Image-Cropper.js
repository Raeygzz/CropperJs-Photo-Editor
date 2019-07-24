bm.add('Image-Cropper', {
  label: `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 58 58" style="enable-background:new 0 0 58 58;" xml:space="preserve" width="40px" height="40px"><path d="M57,6H1C0.448,6,0,6.447,0,7v44c0,0.553,0.448,1,1,1h56c0.552,0,1-0.447,1-1V7C58,6.447,57.552,6,57,6z M56,50H2V8h54V50z" fill="#FFFFFF"/><path d="M16,28.138c3.071,0,5.569-2.498,5.569-5.568C21.569,19.498,19.071,17,16,17s-5.569,2.498-5.569,5.569   C10.431,25.64,12.929,28.138,16,28.138z M16,19c1.968,0,3.569,1.602,3.569,3.569S17.968,26.138,16,26.138s-3.569-1.601-3.569-3.568   S14.032,19,16,19z" fill="#FFFFFF"/><path d="M7,46c0.234,0,0.47-0.082,0.66-0.249l16.313-14.362l10.302,10.301c0.391,0.391,1.023,0.391,1.414,0s0.391-1.023,0-1.414   l-4.807-4.807l9.181-10.054l11.261,10.323c0.407,0.373,1.04,0.345,1.413-0.062c0.373-0.407,0.346-1.04-0.062-1.413l-12-11   c-0.196-0.179-0.457-0.268-0.72-0.262c-0.265,0.012-0.515,0.129-0.694,0.325l-9.794,10.727l-4.743-4.743   c-0.374-0.373-0.972-0.392-1.368-0.044L6.339,44.249c-0.415,0.365-0.455,0.997-0.09,1.412C6.447,45.886,6.723,46,7,46z" fill="#FFFFFF"/>
  </svg>    
  <div class="gjs-block-label">Image-Cropper</div>`,
  category: 'Prismanote Blocks',
  content: {
    droppable: false,
    draggable: true,
    resizable: true,
    removable: true,
    copyable:  false,
    script: function () {
      var moveButton = document.getElementById('moveButton');
      var cropButton = document.getElementById('cropButton');
      var zoomInButton = document.getElementById('zoomInButton');
      // var zoomOutButton = document.getElementById('zoomOutButton');
      // var rotateNegativeButton = document.getElementById('rotateNegativeButton');
      var rotatePositiveButton = document.getElementById('rotatePositiveButton');
      // var scaleXButton = document.getElementById('scaleXButton');
      // var scaleYButton = document.getElementById('scaleYButton');
      var resetButton = document.getElementById('resetButton');
      var doneButton = document.getElementById('doneButton');
      var ratio16by9 = document.getElementById('16/9');
      var ratio4by3 = document.getElementById('4/3');
      var ratio1by3 = document.getElementById('1/3');
      var ratio3by4 = document.getElementById('3/4');
      var image = document.getElementsByClassName('images')[window.parent.window.cropperIndex || 0];
      var cropper = new Cropper(image, {
        autoCrop: false,
        viewMode: 3,
        dragMode: 'none',
        // initialAspectRatio: NaN,
        // aspectRatio: NaN,
        // data: null,
        responsive: true,
        // checkCrossOrigin: true,
        // checkOrientation: true,
        // modal: true,
        // background: true,
        // toggleDragModeOnDblclick: true,
        minContainerWidth: 200,
        minContainerHeight: 100,
        minCanvasWidth: 0,
        minCanvasHeight: 0,
        minCropBoxWidth:0,
        minCropBoxHeight: 0,
        ready() {
          window.moveButton = function(env) {
            cropper.setDragMode("move");
            // console.log('crop', cropper.getCanvasData());
          }
          window.cropButton = function (env) {
            cropper.setDragMode("crop");
            var dataURL = cropper.getCroppedCanvas().toDataURL("image/jpeg");
            cropper.replace(dataURL, false);
          };
          window.zoomInButton = function(env) {
            cropper.zoom(0.1);
          };
          // zoomOutButton.onclick = function() {
          //   cropper.zoom(-0.1);
          // };
          // rotateNegativeButton.onclick = function() {
          //   cropper.rotate(-90);
          // };
          window.rotatePositiveButton = function(env) {
            cropper.rotate(90);
          };
          // scaleXButton.onclick = function() {
          //   if(cropper.imageData.scaleX == -1) {
          //     cropper.scaleX(1);
          //     return;
          //   }
          //   cropper.scaleX(-1);
          // };
          // scaleYButton.onclick = function() {
          //   if(cropper.imageData.scaleY == -1) {
          //     cropper.scaleY(1);
          //     return;
          //   }
          //   cropper.scaleY(-1);
          // };
          window.resetButton = function (env) {
            cropper.destroy();
            cropper = new Cropper(image, {
              autoCrop: false,
              // background: true,
              viewMode: 3,
              dragMode: 'none',
              // initialAspectRatio: NaN,
              // aspectRatio: NaN,
              // data: null,
              responsive: true,
              // checkCrossOrigin: true,
              // checkOrientation: true,
              // modal: true,
              // toggleDragModeOnDblclick: true,
              minContainerWidth: 200,
              minContainerHeight: 100,
              minCanvasWidth: 0,
              minCanvasHeight: 0,
              minCropBoxWidth:0,
              minCropBoxHeight: 0,
            });
            // document.getElementById('dropbox').style.zIndex = -9999;
            document.getElementsByClassName('editButton')[window.parent.window.cropperIndex || 0].style.zIndex = -9999;
          };
          window.doneButton = function (env) {
            var canvas = cropper.getCroppedCanvas({
              width: 320,
              fillColor: '#fff',
              imageSmoothingEnabled: false,
              imageSmoothingQuality: 'high',
            });
            var dataURL = canvas.toDataURL("image/jpeg");
            // localStorage.setItem('image', dataURL);
            cropper.destroy();
            // image.src = localStorage.getItem('image');
            image.src = dataURL;
            document.getElementsByClassName('editButton')[window.parent.window.cropperIndex || 0].style.display = 'none';
            document.getElementsByClassName('button-section')[window.parent.window.cropperIndex || 0].style.display = 'none';
            window.parent.window.cropperIndex = window.parent.window.cropperIndex == undefined ? 1 : window.parent.window.cropperIndex + 1;
            // document.getElementById('moveButton').style.display = 'none';
            // document.getElementById('cropButton').style.display = 'none';
            // // document.getElementById('rotateNegativeButton').style.display = 'none';
            // document.getElementById('rotatePositiveButton').style.display = 'none';
            // // document.getElementById('scaleXButton').style.display = 'none';
            // // document.getElementById('scaleYButton').style.display = 'none';
            // document.getElementById('resetButton').style.display = 'none';
            // document.getElementById('doneButton').style.display = 'none';
            // document.getElementById('16/9').style.display = 'none';
            // document.getElementById('4/3').style.display = 'none';
            // document.getElementById('1/3').style.display = 'none';
            // document.getElementById('3/4').style.display = 'none';
          };
          window.ratio16by9 = function(env) {
            cropper.destroy();
            cropper = new Cropper(image, {
              autoCrop: true,
              viewMode: 3,
              aspectRatio: 16/9,
              responsive: true,
              ready() {
                var canvas = cropper.getCroppedCanvas({
                  minWidth: 220,
                  fillColor: '#fff',
                  imageSmoothingEnabled: false,
                  imageSmoothingQuality: 'high',
                });
                var dataURL = canvas.toDataURL("image/jpeg");
                // localStorage.setItem('image', dataURL);
                cropper.destroy();
                // image.src = localStorage.getItem('image');
                image.src = dataURL;
              }
            });
            // document.getElementById('dropbox').style.display = 'none';
            // document.getElementsByClassName('button-section')[0].style.display = 'none';
            document.getElementsByClassName('editButton')[window.parent.window.cropperIndex || 0].style.display = 'none';
            document.getElementsByClassName('button-section')[window.parent.window.cropperIndex || 0].style.display = 'none';
            window.parent.window.cropperIndex = window.parent.window.cropperIndex == undefined ? 1 : window.parent.window.cropperIndex + 1;
          };
          window.ratio4by3 = function(env) {
            cropper.destroy();
            cropper = new Cropper(image, {
              autoCrop: true,
              viewMode: 3,
              aspectRatio: 4/3,
              responsive: true,
              ready() {
                var canvas = cropper.getCroppedCanvas({
                  minWidth: 220,
                  fillColor: '#fff',
                  imageSmoothingEnabled: false,
                  imageSmoothingQuality: 'high',
                });
                var dataURL = canvas.toDataURL("image/jpeg");
                // localStorage.setItem('image', dataURL);
                cropper.destroy();
                // image.src = localStorage.getItem('image');
                image.src = dataURL;
              }
            });
            // document.getElementById('dropbox').style.display = 'none';
            // document.getElementsByClassName('button-section')[0].style.display = 'none';
            document.getElementsByClassName('editButton')[window.parent.window.cropperIndex || 0].style.display = 'none';
            document.getElementsByClassName('button-section')[window.parent.window.cropperIndex || 0].style.display = 'none';
            window.parent.window.cropperIndex = window.parent.window.cropperIndex == undefined ? 1 : window.parent.window.cropperIndex + 1;
          };
          window.ratio1by3 = function(env) {
            cropper.destroy();
            cropper = new Cropper(image, {
              autoCrop: true,
              viewMode: 3,
              aspectRatio: 1/3,
              responsive: true,
              ready() {
                var canvas = cropper.getCroppedCanvas({
                  minWidth: 220,
                  fillColor: '#fff',
                  imageSmoothingEnabled: false,
                  imageSmoothingQuality: 'high',
                });
                var dataURL = canvas.toDataURL("image/jpeg");
                // localStorage.setItem('image', dataURL);
                cropper.destroy();
                // image.src = localStorage.getItem('image');
                image.src = dataURL;
              }
            });
            // document.getElementById('dropbox').style.display = 'none';
            // document.getElementsByClassName('button-section')[0].style.display = 'none';
            document.getElementsByClassName('editButton')[window.parent.window.cropperIndex || 0].style.display = 'none';
            document.getElementsByClassName('button-section')[window.parent.window.cropperIndex || 0].style.display = 'none';
            window.parent.window.cropperIndex = window.parent.window.cropperIndex == undefined ? 1 : window.parent.window.cropperIndex + 1;
          };
          window.ratio3by4 = function(env) {
            cropper.destroy();
            cropper = new Cropper(image, {
              autoCrop: true,
              viewMode: 3,
              aspectRatio: 3/4,
              responsive: true,
              ready() {
                var canvas = cropper.getCroppedCanvas({
                  minWidth: 220,
                  fillColor: '#fff',
                  imageSmoothingEnabled: false,
                  imageSmoothingQuality: 'high',
                });
                var dataURL = canvas.toDataURL("image/jpeg");
                // localStorage.setItem('image', dataURL);
                cropper.destroy();
                // image.src = localStorage.getItem('image');
                image.src = dataURL;
              }
            });
            // document.getElementById('dropbox').style.display = 'none';
            // document.getElementsByClassName('button-section')[0].style.display = 'none';
            document.getElementsByClassName('editButton')[window.parent.window.cropperIndex || 0].style.display = 'none';
            document.getElementsByClassName('button-section')[window.parent.window.cropperIndex || 0].style.display = 'none';
            window.parent.window.cropperIndex = window.parent.window.cropperIndex == undefined ? 1 : window.parent.window.cropperIndex + 1;
          };
        },
      });  
      
      window.edit = function(env) {
        document.getElementsByClassName('editButton')[window.parent.window.cropperIndex || 0].style.zIndex = 9999;
      };

      var _URL = window.URL || window.webkitURL;
      // var fileSelect = document.getElementById("fileSelect"), 
      // fileElem = document.getElementById("fileElem");
      var fileSelect = document.getElementsByClassName("uploadhref")[window.parent.window.cropperIndex || 0], 
      fileElem = document.getElementsByClassName("fileElem")[window.parent.window.cropperIndex || 0];
      fileSelect.addEventListener("click", function (e) {
        if (fileElem) {
          fileElem.click();
        }
        e.preventDefault();
      }, false);
      window.handleFiles = function (files) {
        // document.getElementById('dropbox').style.zIndex = -9999;
        document.getElementsByClassName('editButton')[window.parent.window.cropperIndex || 0].style.zIndex = -9999;
        var imgs; var file = files[0];
        if (file) {
          imgs = new Image;
          imgs.onload = function () {
            var height = imgs.height;
            var width = imgs.width;
            // console.log('height ==> ', height, 'width ==> ', width);
            // document.getElementsByClassName('commonSize').height = height;
            // document.getElementsByClassName('commonSize').width = width;
            if (width < 200 || height < 400) {
              alert("Height("+ this.height +") and Width("+ this.width +") must be greater than 200 * 400px");
              var dataURL = "../images/236*400.jpeg";
              cropper.replace(dataURL, false);
            }
          };
          imgs.src = _URL.createObjectURL(file);
          var reader = new FileReader();
          reader.onload = window._handleReaderLoaded.bind(this);            
          reader.readAsBinaryString(file);
        }
      };
      window._handleReaderLoaded = function (readerEvt) {   
        cropper.destroy();
        var binaryString = readerEvt.target.result;
        var base64textString = btoa(binaryString);
        var replaceImage = 'data:image/jpeg;base64,' + base64textString;       
        // document.getElementById("image").src = replaceImage;
        document.getElementsByClassName("images")[window.parent.window.cropperIndex || 0].src = replaceImage;
        cropper = new Cropper(image, {
          autoCrop: false,
          dragMode: 'none',
          // background: true,
          viewMode: 3,
          // initialAspectRatio: NaN,
          // aspectRatio: NaN,
          // data: null,
          responsive: true,
          // checkCrossOrigin: true,
          // checkOrientation: true,
          // modal: true,
          // toggleDragModeOnDblclick: true,
          minContainerWidth: 200,
          minContainerHeight: 100,
          minCanvasWidth: 0,
          minCanvasHeight: 0,
          minCropBoxWidth:0,
          minCropBoxHeight: 0,
        }); 
      }

      // <button class="btn btn-light btn-sm" id="dropbox">
      //   <input type="file" id="fileElem" style="display:none" onchange="handleFiles(this.files)">
      //   <a href="#" class="uploadhref" id="fileSelect"><i class="fa fa-upload"></i></a>
      // </button>
      // <button id="zoomOutButton" class="btn btn-default btn-sm"><i class="fa fa-search-minus"></i></button>
      // <button id="rotateNegativeButton" class="button-ml btn btn-light btn-sm"><i class="fa fa-undo"></i></button>
      // <button id="scaleXButton" class="button-ml btn btn-light btn-sm"><i class="fa fa-arrows-h"></i></button>
      // <button id="scaleYButton" class="button-ml btn btn-light btn-sm"><i class="fa fa-arrows-v"></i></button> 
    },
    content: `
    <style>
      .commonSize {
    
      }
      img {
        /*border: 1px solid blue;*/ 
        max-width: 100%;
        overflow: hidden;
      }
      .image-div {
        /*border: 1px solid red;*/
        max-width: 250px;
        /*max-height: 500px;*/
        /*min-height: 500px;*/
        overflow: hidden;
        position: relative;
      }
      .uploadhref {
        color: black;
        text-decoration: none;
      }
      .button-ml {
        margin-left : -4px;
        margin: 2px;
      }
      .btn-sm{
        padding: 6px 6px !important;
        background: transparent !important;
        border: 1px solid #a0a0a0 !important;
        color: #fff !important;
      }
      .editButton {
        position: absolute;
        display: block;
        left: 0%;
        right: 0%;
        margin: 0 auto !important;
        top: 45%;
        width: 50px;
        /*z-index: -9999;*/
      }
      .button-section {
        text-align: center;
        border: 1px solid #000;
        border-radius: 5px;
        width: 240px;
        margin: 0 auto;
        background: #485569;
      }
      button#moveButton {
        margin-left: -4px;
      }
      button#cropButton {
      margin-left: -6px;
      }
      button#rotatePositiveButton {
        margin-left: -6px;
      }
      button#doneButton {
        margin-left: -6px;
      }
      .cropper-wrap-box, .cropper-canvas {
        border: 2px solid #000 !important;
      }
  </style>
  <div id="divId" class="image-div commonSize" ondblclick="edit(this)">
    <button class="editButton btn btn-light btn-sm" id="dropbox">
      <input type="file" class="fileElem" id="fileElem" style="display:none" onchange="handleFiles(this.files)">
      <a href="#" class="uploadhref" id="fileSelect">Edit</a>
    </button>
    <div class="button-section">
      <button id="moveButton" onclick="moveButton(this)" class="button-ml btn btn-light btn-sm"><i class="fa fa-arrows"></i></button>
      <button id="cropButton" onclick="cropButton(this)" class="button-ml btn btn-light btn-sm"><i class="fa fa-crop"></i></button>
      <button id="zoomInButton" onclick="zoomInButton(this)" class="button-ml btn btn-default btn-sm"><i class="fa fa-search-plus"></i></button>
      <button id="rotatePositiveButton" onclick="rotatePositiveButton(this)" class="button-ml btn btn-light btn-sm"><i class="fa fa-rotate-right"></i></button>
      <button id="resetButton" onclick="resetButton(this)" class="button-ml btn btn-light btn-sm"><i class="fa fa-ban"></i></button>
      <button id="doneButton" onclick="doneButton(this)" class="button-ml btn btn-light btn-sm"><i class="fa fa-check"></i></button>
      <div>
        <button id="16/9" onclick="ratio16by9(this)" class="button-ml btn btn-light btn-sm">16/9</button>
        <button id="4/3" onclick="ratio4by3(this)" class="button-ml btn btn-light btn-sm">4/3</button>
        <button id="1/3" onclick="ratio1by3(this)" class="button-ml btn btn-light btn-sm">1/3</button>
        <button id="3/4" onclick="ratio3by4(this)" class="button-ml btn btn-light btn-sm">3/4</button>
      </div>
    </div>
    <img class="images" id="image" src="../images/236*400.jpeg" crossorigin>
  </div>
    `
  }
});