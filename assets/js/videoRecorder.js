const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;
let videoRecorder;

const handleVideoData = (event) => {
    const { data: videoFile } = event;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(videoFile);
    link.download = "recoreded.webm";
    document.body.appendChild(link);
    link.click();
};

// video 녹화 중지를 위한 함수
const stopRecording = () => {
    videoRecorder.stop();
    recordBtn.removeEventListener("click", stopRecording);
    recordBtn.addEventListener("click", getVideo);
    recordBtn.innerHTML = "Start recording";
};

// video 녹화 시작을 위한 함수
const startRecording = () => {
    videoRecorder = new MediaRecorder(streamObject);
    videoRecorder.start();
    videoRecorder.addEventListener("dataavailable", handleVideoData);

    recordBtn.addEventListener("click", stopRecording);
    recordBtn.innerHTML = "Stop recording";
};

// 촬영 디바이스(= CAM) 허가 요청을 위한 함수
const getVideo = async () => {
    try {
        streamObject = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: { width: 1280, height: 720 },
        });

        // video 태그에 실시간 미디어 영상 연결
        videoPreview.srcObject = streamObject;
        videoPreview.muted = true;
        videoPreview.play();

        // 실시간 미디어 영상 저장
        startRecording();
    } catch (error) {
        recordBtn.innerHTML = "😥 Can't record";
    } finally {
        recordBtn.removeEventListener("click", getVideo);
    }
};

function init() {
    recordBtn.addEventListener("click", getVideo);
}

if (recorderContainer) {
    init();
}
