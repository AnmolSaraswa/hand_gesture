prediction="";
Webcam.set({
    height: 300,
    width: 350,
    image_format: 'png',
    png_quality: 100

});
camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshots() {
    Webcam.snap(function (data_uri) {
         document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>'; });
}
console.log('ml5.version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/7CvDTtWmr/model.json', modelLoaded);
function modelLoaded() {
    console.log('Model loaded!');
}

function speak()
{
    var synth=window.speechSynthesis;
    v1="The  prediction is"+prediction;
    var utterThis=new SpeechSynthesisUtterance(v1);
    synth.speak(utterThis);
}
function check()
{
    img=document.getElementById("captured_image");
    classifier.classify(img,gotResults);
}
function gotResults(error,results)
{
if(error)
{
console.error(error);
}
else
{
    document.getElementById("result_gesture_name").innerHTML=results[0].label;
    prediction=results[0].label;
    speak();
    if(results[0].label=="best")
    {
    document.getElementById("update_gesture").innerHTML="&#128077;";
    document.getElementById("quote").innerHTML="All the Best";
    }
   else if(results[0].label=="victory")
    {
    document.getElementById("update_gesture").innerHTML="&#9996;";
    document.getElementById("quote").innerHTML="That was a marvellous victory";
    }
    else 
    {
    document.getElementById("update_gesture").innerHTML="&#128076;";
    document.getElementById("quote").innerHTML="This is looking amazing";
    }
}
}