// Unknown types
declare var MediaRecorder : any;
declare var BlobPart: any;

class MusicController {
    public static TIMESLICE = 10; // Timeslice is 10 milliseconds.
    public static mediaRecorder;
    public static audioChunks: Array<BlobPart> = [];

    static startRecording () {
        MusicController.audioChunks = new Array<BlobPart>();
        // Start recording the audio 
        navigator.mediaDevices.getUserMedia({audio: true}).then(stream => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.start(this.TIMESLICE);
        this.mediaRecorder.addEventListener("dataavailable", this.processEntry);
    }).catch((err) => {
        console.log(err.name, err.message);
    });

    }

    static processEntry(recordingEvent) {
        var eventData = recordingEvent.data;
        this.audioChunks.push(eventData);
        MediaDisplay.addData(eventData.size)
    }

    /*
    Stops recording the audio
    Requires the audio to be curently recorded
    */
    static stopRecording() {
        this.mediaRecorder.stop();
    }

    /*
    starts playing the audio
    Requires the audio to currently be
    */
    static startPlaying() {
        this.mediaRecorder.dispatchEvent(new Event("stop"));
        const audioBlob = new Blob(this.audioChunks);
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
        this.audioChunks = [];
    }
    
}