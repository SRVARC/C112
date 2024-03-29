Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_Snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    })
}

console.log("ml5 version" , ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/RDV2EQYT2/model.json',modelLoaded);

function modelLoaded()
{
    console.log("model Loaded !")
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is" + prediction_1;
    var utterTHis = new SpeechSynthesisUtterance(speak_data_1 );
    synth.speak(utterTHis);
}

function Check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img , gotResults);
}

function gotResults(error , results)
{
     if(error)
     {
        console.error(error);
     }

     else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction_1 = results[0].label;
        speak();

        if(results[0].label == "Victory")
        {
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }

        
        if(results[0].label == "Best")
        {
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }

        
        if(results[0].label == "Amazing")
        {
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }


        
     }
}