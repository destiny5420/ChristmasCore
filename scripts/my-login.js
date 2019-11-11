/******************************************
 * My Login
 *
 * Bootstrap 4 Login Page
 *
 * @author          Muhamad Nauval Azhar
 * @uri 			https://nauval.in
 * @copyright       Copyright (c) 2018 Muhamad Nauval Azhar
 * @license         My Login is licensed under the MIT license.
 * @github          https://github.com/nauvalazhar/my-login
 * @version         1.2.0
 *
 * Help me to keep this project alive
 * https://www.buymeacoffee.com/mhdnauvalazhar
 * 
 ******************************************/

'use strict';

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
var m_sPlayerCollectionName = "PlayerList";

	

function Regist()
{
	var docRef = db.collection("Global").doc("Variable");
	docRef.get().then(function(doc)
	{
		if(doc.exists)
		{
			console.log("StartRandom: " + doc.data().StartRandom);
			if (doc.data().StartRandom == true) {
				alert("目前不能在創建帳號囉");          
				return false;
			}
		}

		return true;
	}).then(function(v_key){
		
		if (v_key == false) 
			return;
			
		var sRegistName = document.getElementById("regist-name").value;
		var sRegistFavoriteFood = document.getElementById("regist-favoriteFood").value;

		if (sRegistName == "") {
			VisibilityRegistTipsHelp("請輸入你的中文名稱", true);
			return;
		}

		if (sRegistFavoriteFood == "") {
			VisibilityRegistTipsHelp("請輸入你最喜歡的食物", true);
			return;
		}

		console.log("sRegistName: " + sRegistName + " / sRegistFavoriteFood: " + sRegistFavoriteFood);

		var docRef = db.collection(m_sPlayerCollectionName).doc(sRegistName);
		
		docRef.get().then(function(doc)
		{
			if(doc.exists)
			{
				VisibilityRegistTipsHelp("此帳號已經存在, 你不能再註冊一個了!!!!", true);
			}
			else
			{
				RegistToFirebase(sRegistName, sRegistFavoriteFood);
			}
		})
		.catch(function(error)
		{
			console.log("提取文件時出錯: ", error);
		});
	})
	.catch(function(error)
	{
		console.log("提取文件時出錯: ", error);
	});

    
}

function RegistToFirebase(v_name, v_favoriteFood)
{
	console.log("RegistToFirebase");
	db.collection(m_sPlayerCollectionName).doc(v_name).set({
		Favorite: v_favoriteFood,
		Content_01: "",
		Content_02: "",
		Content_03: "",
		SavePresentSuccess: false,
		PresentTarget: "",
		PresentContent_01: "",
		PresentContent_02: "",
		PresentContent_03: "",
		Beclaim: false,
		WhoBeclaim: "",
	}).then(function(){
		// change html page by javascript.
		document.location.href="successforregist.html";
	})
}

function VisibilityRegistTipsHelp(v_message, v_key)
{
  if (v_key == true){
    document.getElementById("regist-tips").textContent = v_message;
    document.getElementById("regist-tips").style.visibility = "visible";
  }
  else{
    document.getElementById("regist-tips").textContent = "";
    document.getElementById("regist-tips").style.visibility = "hidden";
  }
}

$(function() {
	$("input[type='password'][data-eye]").each(function(i) {
		var $this = $(this),
			id = 'eye-password-' + i,
			el = $('#' + id);

		$this.wrap($("<div/>", {
			style: 'position:relative',
			id: id
		}));

		$this.css({
			paddingRight: 60
		});
		$this.after($("<div/>", {
			html: 'Show',
			class: 'btn btn-primary btn-sm',
			id: 'passeye-toggle-'+i,
		}).css({
				position: 'absolute',
				right: 10,
				top: ($this.outerHeight() / 2) - 12,
				padding: '2px 7px',
				fontSize: 12,
				cursor: 'pointer',
		}));

		$this.after($("<input/>", {
			type: 'hidden',
			id: 'passeye-' + i
		}));

		var invalid_feedback = $this.parent().parent().find('.invalid-feedback');

		if(invalid_feedback.length) {
			$this.after(invalid_feedback.clone());
		}

		$this.on("keyup paste", function() {
			$("#passeye-"+i).val($(this).val());
		});
		$("#passeye-toggle-"+i).on("click", function() {
			if($this.hasClass("show")) {
				$this.attr('type', 'password');
				$this.removeClass("show");
				$(this).removeClass("btn-outline-primary");
			}else{
				$this.attr('type', 'text');
				$this.val($("#passeye-"+i).val());				
				$this.addClass("show");
				$(this).addClass("btn-outline-primary");
			}
		});
	});

	$(".my-login-validation").submit(function() {
		var form = $(this);
        if (form[0].checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
		form.addClass('was-validated');
	});
});
