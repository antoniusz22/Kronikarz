import { persons } from "./test.js";

const initCanvas = (id) => {
  return new fabric.Canvas(id, {
    width: document.body.clientWidth * 0.8,
    height: document.body.clientHeight * 0.8,
  });
};

const togglePan = () => {
  if (currentMode === modes.pan) {
    currentMode = "";

    for (let object of canvas.getObjects()) {
      if (object.get("type") !== "line") {
        object.set({
          selectable: true,
        });
      }
    }
  } else {
    currentMode = modes.pan;
    for (let object of canvas.getObjects()) {
      object.set({
        selectable: false,
      });
    }
  }
};

const makeCanvasInteractive = (canvas) => {
  let mousePressed = false;
  // Zoomable canvas
  canvas.on("mouse:wheel", (opt) => {
    let delta = opt.e.deltaY;
    let zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 3) zoom = 3;
    if (zoom < 0.3) zoom = 0.3;
    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
  });

  // Moveable canvas
  canvas.on("mouse:move", (event) => {
    if (currentMode === modes.pan) canvas.setCursor("grab");
    if (mousePressed && currentMode === modes.pan) {
      canvas.setCursor("move");
      canvas.renderAll();
      const mEvent = event.e;
      const delta = new fabric.Point(mEvent.movementX, mEvent.movementY);
      canvas.relativePan(delta);
    }
  });

  canvas.on("mouse:down", (event) => {
    mousePressed = true;
    if (currentMode === modes.pan) {
      canvas.setCursor("grab");
      canvas.renderAll();
    }
  });

  canvas.on("mouse:up", (event) => {
    mousePressed = false;
    canvas.setCursor("default");
    canvas.renderAll();
  });
};

const createPerson = (canvas, person, i) => {
  const rect = new fabric.Rect({
    left: 0,
    top: 0,
    stroke: "red",
    strokeWidth: 1,
    fill: "white",
    width: 200,
    height: 220,
  });

  const text = new fabric.Text(`${person.name} ${person.surname}`, {
    fontSize: 20,
    top: 181,
    originX: "center",
    left: rect.width * 0.5,
  });

  fabric.Image.fromURL("./test.jpg", (oImg) => {
    oImg.scaleToHeight(180);
    let img = oImg.set({
      width: (150 * oImg.height) / 180,
      left: 25,
      top: 1,
    });
    let group = new fabric.Group([rect, img, text], {
      id: `${person.name}_${person.surname}`,
      left: 50 + i * 200,
      top: 50 + i * 200,
      spouse: `${person.spouse}`,
      children: person.childs,
      hasControls: false,
    });
    canvas.add(group);
    canvas.renderAll();
    group.on("moving", (opt) => {
      let id = canvas.getActiveObject().id;
      let linesParent = [];
      let linesChild = [];
      for (let object of canvas.getObjects()) {
        if (new RegExp(`${id}:`).test(object.id)) {
          linesParent.push(object);
        } else if (new RegExp(`:${id}`).test(object.id)) {
          linesChild.push(object);
        }
      }
      for (let line of linesParent) {
        line.set({
          x1: line.x1 + opt.e.movementX / canvas.getZoom(),
          y1: line.y1 + opt.e.movementY / canvas.getZoom(),
        });
      }
      for (let line of linesChild) {
        line.set({
          x2: line.x2 + opt.e.movementX / canvas.getZoom(),
          y2: line.y2 + opt.e.movementY / canvas.getZoom(),
        });
      }
      canvas.renderAll();
    });

    group.on("mousedblclick", () => {
      const modal = document.querySelector(`#${group.id}_dialog`);
      modal.showModal();
    });
  });
};

const makeLineBetweenChildAndParent = (parent, child) => {
  let line = new fabric.Line(
    [
      parent.left + parent.width / 2,
      parent.top + parent.height,
      child.left + child.width / 2,
      child.top,
    ],
    {
      fill: "red",
      stroke: "red",
      strokeWidth: 2,
      id: `${parent.id}:${child.id}`,
      selectable: false,
    }
  );
  canvas.add(line);
  line.moveTo(0);
  canvas.renderAll();
};

const makeLineBetweenSpouses = (husband, wife) => {
  let line = new fabric.Line(
    [
      husband.left + husband.width,
      husband.top + husband.height / 2,
      wife.left,
      wife.top + wife.height / 2,
    ],
    {
      fill: "red",
      stroke: "red",
      strokeWidth: 2,
      id: `${husband.id}:${wife.id}`,
      selectable: false,
    }
  );
  canvas.add(line);
  line.moveTo(0);
  canvas.renderAll();
};

const createDialog = (person) => {
  const dialog = document.createElement("dialog");
  let innerDiv = document.createElement("div");
  innerDiv.innerHTML += `Imię: ${person.name} <br />`;
  innerDiv.innerHTML += `Nazwisko: ${person.surname} <br />`;
  innerDiv.innerHTML += `Wiek: ${person.age} <br />`;
  innerDiv.innerHTML += `Data urodzenia: ${person.dateOfBirth.getDate()}/${
    person.dateOfBirth.getMonth() + 1 < 10
      ? "0" + (person.dateOfBirth.getMonth() + 1)
      : person.dateOfBirth.getMonth() + 1
  }/${person.dateOfBirth.getFullYear()} <br />`;
  innerDiv.innerHTML +=
    person.dateOfDeath.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
      ? ``
      : `Data śmierci: ${person.dateOfDeath.getDate()}/${
          person.dateOfDeath.getMonth() + 1 < 10
            ? "0" + (person.dateOfDeath.getMonth() + 1)
            : person.dateOfDeath.getMonth() + 1
        }/${person.dateOfDeath.getFullYear()} <br />`;
  innerDiv.innerHTML += `Miejsce urodzenia: ${person.placeOfBirth} <br />`;
  innerDiv.innerHTML += `Kraj urodzenia: ${person.countryOfBirth} <br />`;
  innerDiv.innerHTML += `Płeć: ${person.sex} <br />`;
  innerDiv.innerHTML += `Zawód: ${person.occupation} <br />`;
  innerDiv.innerHTML += `${person.additionalInfo}`;
  dialog.setAttribute("id", `${person.name}_${person.surname}_dialog`);
  dialog.appendChild(innerDiv);
  document.body.appendChild(dialog);
};

const getObject = (id) => {
  for (let object of canvas.getObjects()) {
    if (object.id === id) return object;
  }
};

const canvas = initCanvas("canvas");

// Switching pan mode
let currentMode;
const modes = {
  pan: "pan",
};

const togglePanButton = document.querySelector("#togglePan");
togglePanButton.addEventListener("mousedown", togglePan);

const resetZoomButton = document.querySelector("#resetZoom");
resetZoomButton.addEventListener("mousedown", () => {
  canvas.zoomToPoint(new fabric.Point(0, 0), 1);
});

const getCoords = document.querySelector("#getCoords");
getCoords.addEventListener("mousedown", () => {
  let o1 = getObject("Tomasz_Barnaś");
  let o2 = getObject("Antoni_Zuber");
  let o3 = getObject("Rafał_Ochorok");
  console.log(o2.children);
  makeLineBetweenSpouses(o2, getObject(o2.spouse));
  for (let child of o2.children) {
    console.log(child);
    makeLineBetweenChildAndParent(o2, getObject(child));
    makeLineBetweenChildAndParent(getObject(o2.spouse), getObject(child));
  }
  canvas.renderAll();
});

makeCanvasInteractive(canvas);

for (const [index, person] of persons.entries()) {
  createPerson(canvas, person, index);
  createDialog(person);
}

canvas.renderAll();

const modal = document.querySelector("#addUserForm");
const openModal = document.querySelector(".openAddUserForm-btn");
const closeModal = document.querySelector(".closeAddUserForm-btn");

openModal.addEventListener("click", () => {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "../new-user", false);
  xhttp.send();

  document.getElementById("addUserForm").innerHTML = xhttp.responseText;
  document.querySelector('form[name="user"]').setAttribute('action', '../new-user');

  modal.showModal();

});

closeModal.addEventListener("click", () => {
  modal.close();
});

let cancel = true;
window.addEventListener("mousemove", () => {
  if (cancel) {
    let o1 = getObject("Tomasz_Barnaś");
    let o2 = getObject("Antoni_Zuber");
    let o3 = getObject("Rafał_Ochorok");
    console.log(o2.children);
    makeLineBetweenSpouses(o2, getObject(o2.spouse));
    for (let child of o2.children) {
      console.log(child);
      makeLineBetweenChildAndParent(o2, getObject(child));
      makeLineBetweenChildAndParent(getObject(o2.spouse), getObject(child));
    }
    canvas.renderAll();
  }
  cancel = false;
});
