var page=1;
window.onscroll=function(){
  if(document.documentElement.scrollTop>=document.documentElement.scrollHeight-document.documentElement.clientHeight){
    console.log("Добавляем");
    var xhr=new XMLHttpRequest();
    xhr.open("GET","https://reqres.in/api/users?page="+page,true);
    xhr.onload=function(){
      var data=JSON.parse(xhr.responseText)
      var usable=data.data;
      if(usable.length>0){
        for(var i=0;i<usable.length;i++)
        {
           var content = document.createElement("div");
           content.setAttribute("class","contentDisplayed")
           var img=document.createElement("img");
           img.setAttribute("src",usable[i].avatar);
           var div=document.createElement("div")
           var name=document.createElement("span");
           name.innerText=usable[i].last_name+" "+usable[i].first_name;
           div.appendChild(name);
           content.appendChild(img);
           content.appendChild(div); 
           var htmlWrap=document.querySelector(".content");
           htmlWrap.appendChild(content);
        }
        page++;        
      }
    }
    xhr.send();
  }
}

var btnForAut=document.querySelector("#auth__form_submit");
 btnForAut.onclick=function(){
   var email=document.querySelector("#auth__form_email").value;
   var password=document.querySelector("#auth__form_password").value;
   var xhr=new XMLHttpRequest();
   xhr.open("POST","https://reqres.in/api/login",true);
   var json = JSON.stringify({
   email: email,
   password: password
 });
 xhr.setRequestHeader('Content-Type', 'application/json');  
 xhr.send(json);
 xhr.onload=function(){
    if(xhr.status==400)
      alert("Не заполнены обязательные поля ввода");
    else
    {
      document.querySelector("#auth__form_email").value="";
      document.querySelector("#auth__form_password").value="";
      document.getElementById('auth').style.display = 'none';
      alert("Вы авторизованы");
    }
     console.log(xhr.status);
 }
}


var btnForReg=document.querySelector("#reg__form_submit");
btnForReg.onclick=function(){
   var email=document.querySelector("#reg__form_email").value;
   var password=document.querySelector("#reg__form_password").value;
   var xhr=new XMLHttpRequest();
   xhr.open("POST","https://reqres.in/api/register",true);
   var json = JSON.stringify({
   email: email,
   password: password
 });
 xhr.setRequestHeader('Content-Type', 'application/json');  
 xhr.send(json);
 xhr.onload=function(){
    if(xhr.status==400)
      alert("Не заполнены обязательные поля ввода");
    else
    {
      document.querySelector("#reg__form_email").value="";
      document.querySelector("#reg__form_password").value="";
      document.getElementById('reg').style.display = 'none';
	  alert("Регистрация прошла успешно");
    }
     console.log(xhr.status);
 }
}
