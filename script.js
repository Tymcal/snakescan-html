const ExampleContent = {
    img: "https://t1.blockdit.com/photos/2023/08/64e7553e5a93cc5b02cb7001_800x0xcover_64vNo9MJ.jpg",
    title:  "งูเแสงอาทิตย์",
    appearance: "เกล็ดลำตัวเรียบเป็นเงาแวววาวเมื่อสะท้อนแสง",
    poisonous: "ไม่มี",
    attack: "ไม่",
    threaten: "มี",
    prey: "กิ้งก่า กบ หนู สัตว์มีกระดูกสันหลัง ลูกงูเห่า งูกะปะ",
    habitat: "ใต้ขอนไม้ ก้อนหินที่เป็นดินร่วนและชื้นน้อย ยามน้ำท่วมปีนขึ้นที่สูง"
};

document.addEventListener('DOMContentLoaded', () => {
  const videoElement = document.getElementById('camera-stream');
  const capturedImageElement = document.getElementById('captured-image');
  const infoOverlayElement = document.getElementById('info-overlay');
  const uploadButton = document.getElementById('upload-button');
  const captureButton = document.getElementById('capture-button');
  const backButton = document.getElementById('back-button');
  const uploadImageInput = document.getElementById('upload-image');

  // Display the example content in the overlay
  document.getElementById('snake-img').src = ExampleContent.img;
  document.getElementById('snake-title').textContent = ExampleContent.title;
  document.getElementById('appearance').textContent = ExampleContent.appearance;
  document.getElementById('poisonous').textContent = ExampleContent.poisonous + 'พิษ';
  document.getElementById('attack').textContent = ExampleContent.attack + 'กัด';
  document.getElementById('threaten').textContent = ExampleContent.threaten + 'ขู่';
  document.getElementById('prey').textContent = ExampleContent.prey;
  document.getElementById('habitat').textContent = ExampleContent.habitat;

  // Start camera
  function startCamera() {
    navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
      audio: false
    })
    .then((stream) => {
      videoElement.srcObject = stream;
    })
    .catch((error) => {
      console.error('Error accessing the camera: ', error);
    });
  }

  startCamera(); // Start camera on page load

  // Capture the photo
  captureButton.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    const context = canvas.getContext('2d');
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL('image/png');
    capturedImageElement.src = imageData;
    capturedImageElement.style.display = 'block';
    videoElement.style.display = 'none';
    captureButton.style.display = 'none';
    uploadButton.style.display = 'none';
    infoOverlayElement.style.display = 'block'; // Show overlay
  });

  // Handle back button
  backButton.addEventListener('click', () => {
    capturedImageElement.style.display = 'none';
    videoElement.style.display = 'block';
    infoOverlayElement.style.display = 'none'; // Hide overlay
    captureButton.style.display = 'inline-block';
    uploadButton.style.display = 'inline-block';
    startCamera(); // Restart the camera
  });

  // Handle file upload
  uploadButton.addEventListener('click', () => {
    uploadImageInput.click(); // Trigger file input click
  });

  uploadImageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        capturedImageElement.src = e.target.result;
        capturedImageElement.style.display = 'block';
        captureButton.style.display = 'none';
        uploadButton.style.display = 'none';
        videoElement.style.display = 'none';
        infoOverlayElement.style.display = 'block'; // Show overlay
      };
      reader.readAsDataURL(file);
    }
  });
});
