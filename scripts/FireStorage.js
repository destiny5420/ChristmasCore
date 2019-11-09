var firebaseConfig = {
    apiKey: "AIzaSyC9ezsnUObU68twx1lEuDdjWh_I-MuXCQ8",
    authDomain: "merrychristmas-919dc.firebaseapp.com",
    databaseURL: "https://merrychristmas-919dc.firebaseio.com",
    projectId: "merrychristmas-919dc",
    storageBucket: "merrychristmas-919dc.appspot.com",
    messagingSenderId: "90469515583",
    appId: "1:90469515583:web:39a4215ac6d94907bb538a"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

var m_bGlobalTrigger = true;

function storedata()
{
  db.collection("movies").doc("新的分支").set({
    name: "新世紀福爾摩斯",
    date: "2010",
    description: "很棒的一本書",
    actors: ["蕭力維2", "Paper"]
  })
}

function getdata(){
  var docRef = db.collection("movies").doc("新世紀福爾摩斯");
  console.log("Stage-1");
  docRef.get().then(function(doc){
    if(doc.exists){
      console.log(doc.data());
      console.log("Name: " + doc.data().name + " / Date: " + doc.data().date + " / Description: " + doc.data().description);
    }else{
      console.log("找不到文件");
    }
  }).catch(function(error){
      console.log("提取文件時出錯: ", error);
  });
}

function getdata2(){
    var docRef = db.collection("Random").doc("張凱翔");
    console.log("Stage-1");
    docRef.get().then(function(doc){
        if (doc.exists == true) {
            console.log(doc.data());
        }else{
            console.log("找不到文件");
        }
    }).catch(function(error){
        console.log("提取文件時出錯: ", error);
    });
}

function DebugLog()
{
    console.log("FireStoreage / DebugLog method / GlobalTrigger: " + m_bGlobalTrigger);
}

function ChangeVariable()
{
    m_bGlobalTrigger = !m_bGlobalTrigger;
}