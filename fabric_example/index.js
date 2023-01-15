import { persons } from "./test.js";

const initCanvas = (id) => {
  return new fabric.Canvas(id, {
    width: document.body.clientWidth * 0.8,
    height: document.body.clientHeight * 0.8,
  });
};

const togglePan = () => {
  if (currentMode === modes.pan) currentMode = "";
  else currentMode = modes.pan;
};

const makeCanvasInteractive = (canvas) => {
  let mousePressed = false;
  // Zoomable canvas
  canvas.on("mouse:wheel", (opt) => {
    let delta = opt.e.deltaY;
    let zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
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

const createPerson = (canvas, person) => {
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
      left: 50,
      top: 50,
    });
    canvas.add(group);
  });
};

const createDialog = (person) => {
  const dialog = document.createElement("dialog");
  let innerDiv = document.createElement("div");
  innerDiv.innerHTML += `Wiek: ${persons[0].age} <br />`;
  innerDiv.innerHTML += `Data urodzenia: ${persons[0].dateOfBirth.getDate()}/${
    persons[0].dateOfBirth.getMonth() + 1 < 10
      ? "0" + (persons[0].dateOfBirth.getMonth() + 1)
      : persons[0].dateOfBirth.getMonth() + 1
  }/${persons[0].dateOfBirth.getFullYear()} <br />`;
  innerDiv.innerHTML +=
    persons[0].dateOfDeath.setHours(0, 0, 0, 0) ===
    new Date().setHours(0, 0, 0, 0)
      ? `Data śmierci: żyje <br />`
      : `Data śmierci: ${persons[0].dateOfDeath.getDate()}/${
          persons[0].dateOfDeath.getMonth() + 1 < 10
            ? "0" + (persons[0].dateOfDeath.getMonth() + 1)
            : persons[0].dateOfDeath.getMonth() + 1
        }/${persons[0].dateOfDeath.getFullYear()} <br />`;
  innerDiv.innerHTML += `Miejsce urodzenia: ${persons[0].placeOfBirth} <br />`;
  innerDiv.innerHTML += `Kraj urodzenia: ${persons[0].countryOfBirth} <br />`;
  innerDiv.innerHTML += `Płeć: ${persons[0].sex} <br />`;
  innerDiv.innerHTML += `Zawód: ${persons[0].occupation} <br />`;
  innerDiv.innerHTML += `${persons[0].additionalInfo}`;
  dialog.appendChild(innerDiv);
  document.body.appendChild(dialog);
};

const canvas = initCanvas("canvas");

// Switching pan mode
let currentMode;
const modes = {
  pan: "pan",
};

const togglePanButton = document.querySelector("#togglePan");
togglePanButton.addEventListener("mousedown", togglePan);

makeCanvasInteractive(canvas);

for (let person of persons) {
  createPerson(canvas, person);
  createDialog(person);
}

canvas.renderAll();
