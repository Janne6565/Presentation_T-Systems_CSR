import {
  Presenter,
  PresenterInfo,
  Vector2,
  Project,
  Slides,
} from "@motion-canvas/core";
import projectImport from "../public/animations/project.js";

class PublicSlides extends Slides {
  public getLookup() {
    return this.lookup;
  }
}


function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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

const LOBBY_NAME = "t-systems";

const project: Project = projectImport;
const presenter = new Presenter(project);

const ENDPOINT = "wss://jannekeipert.de";

const SOCKET_URL = ENDPOINT + "/listen-websocket?" + LOBBY_NAME;

let socket;
let currentInfo: PresenterInfo;
let currentIndexShouldBe = 0;
let lastMouseMove: number | null = null;

const ownerControllMappings = {
  32: () => {
    if (currentInfo && currentInfo.isWaiting) {
      ownerSocket?.send(String(currentIndexShouldBe + 1));
    }
  },
  37: () => {
    if (currentIndexShouldBe > 0) {
      ownerSocket?.send(String(currentIndexShouldBe - 1));
    }
  },
  39: () => {
    ownerSocket?.send(String(currentIndexShouldBe + 1));
  },
};

let isDevMode = false;

const generalControllMappings = {
  113: () => {
    isDevMode = !isDevMode;

    if (isDevMode) {
      takeControllButton.classList.remove("invisible");
    } else {
      takeControllButton.classList.add("invisible");
    }
  },
};

let IS_OWNER = false;
let ownerSocket: WebSocket | null = null;
let providedPassword;

document.body.append(presenter.stage.finalBuffer);

const connectWebsocketSend = () => {
  const calculatedUrl =
    ENDPOINT + "/host-websocket?" + LOBBY_NAME + "=" + providedPassword;

  let receivedAutherized = false;
  ownerSocket = new WebSocket(calculatedUrl);

  ownerSocket.onclose = () => {
    if (receivedAutherized) {
      connectWebsocketSend();
    } else {
      console.log("Closed websocket because unauthorized");
    }
  };

  ownerSocket.onerror = () => {
    console.log("Error occured");
    if (receivedAutherized) {
      connectWebsocketSend();
    }
  };

  ownerSocket.onmessage = (event) => {
    console.log(event);
    const message = event.data;
    if (message == "authorized") {
      console.log("You are in");
      console.log("authorized");
      setCookie("password_" + LOBBY_NAME, providedPassword, 30);
      IS_OWNER = true;
      takeControllButton.classList.add("isOwner");
      receivedAutherized = true;
    }
  };
};

const requestControll = () => {
  console.log("Trying to become host");
  providedPassword = window.prompt("Enter password", "password");
  connectWebsocketSend();
};

const connectWebsocketListen = () => {
  socket = new WebSocket(SOCKET_URL);
  socket.onopen = () => {
    console.log("connected websocket");
  };

  socket.onerror = (error) => {
    console.log(error);
    connectWebsocketListen();
  };

  socket.onclose = () => {
    console.log("disconnected websocket");
    connectWebsocketListen();
  };

  socket.onmessage = (message) => {
    if (lastMouseMove != null && lastMouseMove < Date.now() - 3000) {
      fullScreenButton.classList.add("invisible");
      document.getElementsByTagName("body")[0].classList.add("mouseHide");
    } else {
      fullScreenButton.classList.remove("invisible");
      document.getElementsByTagName("body")[0].classList.remove("mouseHide");
    }

    // try {
    const indexNow = parseInt(message.data);
    currentIndexShouldBe = indexNow;

    if (currentInfo && currentInfo.index != null) {
      if (indexNow > currentInfo.index) {
        if (indexNow > currentInfo.index + 1) {
          presenter.requestNextSlide();
        }
        presenter.resume();
      }
      if (indexNow < currentInfo.index) {
        presenter.requestPreviousSlide();
      }
    }
    // } catch (ignored) {
    //   console.log("Error occurerd:", ignored);
    // }
  };
};

connectWebsocketListen();

presenter.onInfoChanged.subscribe((info) => {
  currentInfo = info;
  if (info && info.index != null && info.index < currentIndexShouldBe) {
    if (currentIndexShouldBe > info.index + 1) {
      const heheGivePrivate =  Object.values(presenter.playback.currentScene.slides);
      const nameOfSlideShouldBe = Array.from(heheGivePrivate["lookup"].keys())[currentIndexShouldBe - 1];
      console.log("Privates:", heheGivePrivate);
      console.log("Name of slide should be:", nameOfSlideShouldBe);
      if (typeof(nameOfSlideShouldBe) == "string") {
        presenter.requestSlide(nameOfSlideShouldBe);
      }
    }
    presenter.resume();
  }

  if (info && info.index != null && info.index > currentIndexShouldBe) {
    presenter.requestPreviousSlide();
  }
});

presenter.onStateChanged.subscribe((state) => {
  console.log(state);
});

presenter.present({
  name: "Presenter",
  background: null,
  size: new Vector2(1920, 1080),
  slide: project.scenes[0].name,
  fps: 60,
  resolutionScale: 1,
  colorSpace: "srgb",
});

var elem = document.documentElement;
var isOpened = false;

function toggleFullscreen() {
  if (isOpened) {
    closeFullscreen();
  } else {
    openFullscreen();
  }
  isOpened = !isOpened;
}
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

const fullScreenButton = document.createElement("button");
const fullScreenImage = document.createElement("img");
fullScreenImage.src =
  "https://www.svgrepo.com/download/491638/fullscreen-alt.svg";
fullScreenButton.appendChild(fullScreenImage);
fullScreenButton.onclick = () => {
  toggleFullscreen();
};
fullScreenButton.classList.add("fullscreenButton");
document.body.append(fullScreenButton);

const takeControllButton = document.createElement("button");
const takeControllImage = document.createElement("img");
takeControllImage.src = "https://www.svgrepo.com/show/532983/pen-circle.svg";
takeControllButton.appendChild(takeControllImage);

takeControllButton.onclick = () => {
  requestControll();
};
takeControllButton.classList.add("takecontrollButton");
takeControllButton.classList.add("invisible");

if (getCookie("password_" + LOBBY_NAME)) {
  providedPassword = getCookie("password_" + LOBBY_NAME);
  connectWebsocketSend();
}

window.addEventListener("keydown", (event) => {
  const keyCode = event.keyCode;
  if (keyCode in ownerControllMappings && IS_OWNER) {
    if (!ownerSocket || !ownerSocket.OPEN) {
      connectWebsocketSend();
    }
    ownerControllMappings[keyCode]();
  }

  if (keyCode in generalControllMappings) {
    generalControllMappings[keyCode]();
  }
  if (keyCode == 70) {
    toggleFullscreen();
  }
});

document.body.append(takeControllButton);

document.addEventListener("mousemove", (event) => {
  lastMouseMove = Date.now();
  if (fullScreenButton.classList.contains("invisible")) {
    fullScreenButton.classList.remove("invisible");
  }
  if (document.body.classList.contains("mouseHide")) {
    document.body.classList.remove("mouseHide");
  }
});

console.log(presenter.playback.currentScene.slides);