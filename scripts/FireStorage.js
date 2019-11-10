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

var m_sName;
var m_sFavoriteFood;
var m_bSavePresentSuccess;

function Login()
{
    VisibilityNameHelp("", false);
    VisibilityFavoriteFoodHelp("", false);
    VisibilityLoginTips("", false);

    var sSearchName = document.getElementById("input-login-name").value;
    var sSearchFavoriteFood = document.getElementById("input-login-favoritefood").value;

    var bError = false;
    if (sSearchName == "") {
      console.log("SearchName is null flow...");
      VisibilityNameHelp("Input field can't be empty.", true);
      // IntoInfoPage();
      bError = true;
    }

    if (sSearchFavoriteFood == "") {
      console.log("SearchFavoriteFood is null flow...");
      VisibilityFavoriteFoodHelp("Input field can't be empty.", true);
      // IntoInfoPage();
      bError = true;
    }

    if (bError == true)
      return;

    var docRef = db.collection("Random").doc(sSearchName);
    docRef.get().then(function(doc)
    {
      if(doc.exists)
      {
        if (doc.data().Favorite != sSearchFavoriteFood)
        {
          console.log("Incurrent your favorite food.");
          VisibilityFavoriteFoodHelp("Incorrect your favorite food.", true);
        }
        else
        {
          console.log(doc.data());
          m_sName = sSearchName;
          m_sFavoriteFood = sSearchFavoriteFood;
          VisibilityNameHelp("", false);
          VisibilityFavoriteFoodHelp("", false);
          IntoInfoPage();
          SearchAllPlayer();
          SettingPresentInfo();
          console.log(m_sNames.length);
        }
      }
      else
      {
        console.log("找不到文件");

        VisibilityLoginTips("不存在此帳戶", true);
      }
    }).catch(function(error)
    {
        console.log("提取文件時出錯: ", error);
    });
}

var m_sNames = [];

function SearchAllPlayer()
{
  var iIndex = 0;
  db.collection("Random").get().then(function(querySnapshot){
    querySnapshot.forEach(function(doc){
      console.log(doc.id, "=>", doc.data());
      m_sNames[iIndex] = doc.id;
      iIndex++;
    });
  })
  .catch(function(error){
    console.log("Error getting documents: " , error);
  });

  // console.log(" >>>>>> sNames.length: " + sNames.length);
}

function SettingPresentInfo()
{

  var docRef = db.collection("Random").doc(m_sName);
  var self = this;
  docRef.get().then(function(doc)
  {
    if(doc.exists)
    {
      self.m_bSavePresentSuccess = doc.data().SavePresentSuccess;
      console.log("----------------- " + self.m_bSavePresentSuccess);

      if (self.m_bSavePresentSuccess == true)
      {
        ModifyPresentInfo("你目前在聖誕襪中存的形容詞分別為 " + doc.data().Content_01 + "、" + doc.data().Content_02 + "、" + doc.data().Content_03 + "，目前開放可以無限次更改喔！");
      }
      else
      {
        ModifyPresentInfo("為了聖誕節活動的方便, 請在 下方輸入三個 想要收到聖誕禮物的形容詞.");
      }
    }
  }).catch(function(error)
  {
      console.log("提取文件時出錯: ", error);
  });
}

function CheckHaveSavedPresent()
{
  var docRef = db.collection("Random").doc(m_sName);
  var self = this;
  docRef.get().then(function(doc)
  {
    if(doc.exists)
    {
      self.m_bSavePresentSuccess = doc.data().SavePresentSuccess;
      console.log("----------------- " + self.m_bSavePresentSuccess);
      
    }
  }).catch(function(error)
  {
      console.log("提取文件時出錯: ", error);
  });
}

function Submit()
{
  VisibilitySubmitHelp("", false);
  var sContent01 = document.getElementById("input-content-01").value;
  var sContent02 = document.getElementById("input-content-02").value;
  var sContent03 = document.getElementById("input-content-03").value;

  if (sContent01 == "" || sContent02 == "" || sContent03 == "") 
  {
    VisibilitySubmitHelp("請確實填寫三個禮物的形容詞阿 ~~~~~", true);
    return;
  }

    console.log("m_sName: " + m_sName + " / m_sFavoriteFood: " + m_sFavoriteFood + " /Content01: " + sContent01 + " /Content02: " + sContent02 + " /Content03: " + sContent03);

	  var docRef = db.collection("Random").doc(m_sName);
    docRef.get().then(function(doc)
    {
      if(doc.exists)
      {
        docRef.update({
          Content_01: sContent01,
          Content_02: sContent02,
          Content_03: sContent03,
          SavePresentSuccess: true,
        });

        VisibilitySubmitHelp("恭喜你提交成功, 已將形容詞存進你專屬的聖誕襪中^___^", true);
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

function ModifyPresentInfo(v_message)
{
  document.getElementById("p-present-info").innerHTML = v_message;
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

function VisibilityFavoriteFoodHelp(v_message, v_key)
{
  if (v_key == true){
    document.getElementById("favoritefood-help").textContent = v_message;
    document.getElementById("favoritefood-help").style.visibility = "visible";
  }
  else{
    document.getElementById("favoritefood-help").textContent = "";
    document.getElementById("favoritefood-help").style.visibility = "hidden";
  }
}

function VisibilityLoginTips(v_message, v_key)
{
  if (v_key == true){
    document.getElementById("login-tips").textContent = v_message;
    document.getElementById("login-tips").style.display = "";
  }
  else{
    document.getElementById("login-tips").textContent = "";
    document.getElementById("login-tips").style.display = "none";
  }
}

function VisibilitySubmitHelp(v_message, v_key)
{
  if (v_key == true){
    document.getElementById("submit-tips").textContent = v_message;
    document.getElementById("submit-tips").style.visibility = "visible";
  }
  else{
    document.getElementById("submit-tips").textContent = "";
    document.getElementById("submit-tips").style.visibility = "hidden";
  }
}