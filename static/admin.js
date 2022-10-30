const ws = new WebSocket("ws://sciencehelp2.herokuapp.com:8081");

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

ws.addEventListener("open", () =>{
  //ws.send(JSON.stringify({value: "admin connected", type: -1}))
});

ws.onmessage = ({data}) => {
  console.log("Message from socket server: ", data)
};

const CreateUser = () => {
  ws.send(JSON.stringify({password: document.getElementById('passwd').value, email: document.getElementById('email').value, key: document.getElementById('key').value, type: 'signup'}))
}

const sendmessage = () => {
  ws.send(JSON.stringify({url: document.getElementById('game').value, img: document.getElementById('game_img').value, name: document.getElementById('game_name').value, type: 'game'}))
}

const Sendmessage = () => {
  //message = document.getElementById('game').value
  ws.send(JSON.stringify({value: document.getElementById('chat').value, type: 'chat', Key: document.getElementById('key').value}))
}

ws.onmessage = ({data}) => {
  if(JSON.parse(data).type == 'chat') {
    document.getElementById('chatbox').innerHTML += "<br>" + JSON.parse(data).value
  }
};



