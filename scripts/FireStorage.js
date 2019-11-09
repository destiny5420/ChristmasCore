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

function GetData()
{
    var sSearchName = document.getElementById("input-login-name").value;

    if (sSearchName == "") {
      console.log("sSearchName is null flow...");
      VisibilityNameHelp("Input field can't be empty.", true);
      IntoInfoPage();
      return;
    }

    
    var docRef = db.collection("Random").doc(sSearchName);
    docRef.get().then(function(doc)
    {
      if(doc.exists)
      {
        console.log(doc.data());
        VisibilityNameHelp("", false);
        IntoInfoPage();
      }
      else
      {
        console.log("找不到文件");
        document.getElementById("input-login-name").value = "";
        
        VisibilityNameHelp("Can't find your name from database, .", true);
      }
    }).catch(function(error)
    {
        console.log("提取文件時出錯: ", error);
    });
}

function IntoInfoPage()
{
  $(document).ready(function(){
    $('#sect-login-page').fadeOut(function(){
      $('#sect-info-page').fadeIn();
    });
  });
}

function VisibilityNameHelp(v_message, v_key)
{
  if (v_key == true){
    document.getElementById("name-help").textContent = v_message;
    document.getElementById("name-help").style.visibility = "visible";
  }
  else{
    document.getElementById("name-help").textContent = "";
    document.getElementById("name-help").style.visibility = "hidden";
  }
}

function DebugLog(v_msg)
{
    var sInputValue = document.getElementById("sign-in-real-name");
    console.log("FireStoreage / DebugLog method / GlobalTrigger: " + m_bGlobalTrigger + " / InputValue: " + sInputValue.value + " / Msg: " + v_msg);
}

function ChangeVariable()
{
    m_bGlobalTrigger = !m_bGlobalTrigger;
}