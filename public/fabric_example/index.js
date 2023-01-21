import { Person, persons } from "./test.js";

fabric.LineArrow = fabric.util.createClass(fabric.Line, {
  type: "lineArrow",

  initialize: function (element, options) {
    options || (options = {});
    this.callSuper("initialize", element, options);
  },

  toObject: function () {
    return fabric.util.object.extend(this.callSuper("toObject"));
  },

  _render: function (ctx) {
    this.callSuper("_render", ctx);

    // do not render if width/height are zeros or object is not visible
    if (this.width === 0 || this.height === 0 || !this.visible) return;

    ctx.save();

    var xDiff = this.x2 - this.x1;
    var yDiff = this.y2 - this.y1;
    var angle = Math.atan2(yDiff, xDiff);
    ctx.translate((this.x2 - this.x1) / 2, (this.y2 - this.y1) / 2);
    ctx.rotate(angle);
    ctx.beginPath();
    //move 10px in front of line to start the arrow so it does not have the square line end showing in front (0,0)
    ctx.moveTo(10, 0);
    ctx.lineTo(-20, 15);
    ctx.lineTo(-20, -15);
    ctx.closePath();
    ctx.fillStyle = this.stroke;
    ctx.fill();

    ctx.restore();
  },
});

const initCanvas = (id) => {
  return new fabric.Canvas(id, {
    width: document.body.clientWidth * 0.8,
    height: document.body.clientHeight * 0.8,
    selection: false,
  });
};

const resizeCanvas = () => {
  const outerCanvasContainer = document.querySelector(".fabric-canvas-wrapper");

  const ratio = canvas.getWidth() / canvas.getHeight();
  const containerWidth = outerCanvasContainer.clientWidth * 0.8;

  const scale =
    (containerWidth / canvas.getWidth()) *
    (window.innerWidth / window.innerHeight);
  // const zoom = canvas.getZoom() * scale;
  canvas.setDimensions({
    width: containerWidth,
    height: containerWidth / ratio,
  });
  canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
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

  const text = new fabric.Text(`${person.first_name} ${person.last_name}`, {
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
      id: `${person.id}`,
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
      // Linie dzieci
      let linesChild = [];
      for (let object of canvas.getObjects()) {
        if (new RegExp(`:${id}`).test(object.id)) {
          linesChild.push(object);
        }
      }
      for (let line of linesChild) {
        line.set({
          x2: line.x2 + opt.e.movementX / canvas.getZoom(),
          y2: line.y2 + opt.e.movementY / canvas.getZoom(),
        });
      }

      // Linie małżeństwa
      let lineSpouse1 = [];
      let lineSpouse2 = [];
      let lineChildren = [];
      for (let object of canvas.getObjects()) {
        if (
          new RegExp(`${id}/`).test(object.id) &&
          !new RegExp(`:`).test(object.id)
        ) {
          lineSpouse1.push(object);
        } else if (
          new RegExp(`/${id}`).test(object.id) &&
          !new RegExp(`:`).test(object.id)
        ) {
          lineSpouse2.push(object);
        } else if (
          (new RegExp(`${id}/`).test(object.id) ||
            new RegExp(`/${id}`).test(object.id)) &&
          new RegExp(`:`).test(object.id)
        ) {
          lineChildren.push(object);
        }
      }
      for (let line of lineSpouse1) {
        line.set({
          x1: line.x1 + opt.e.movementX / canvas.getZoom(),
          y1: line.y1 + opt.e.movementY / canvas.getZoom(),
        });
      }
      for (let line of lineSpouse2) {
        line.set({
          x2: line.x2 + opt.e.movementX / canvas.getZoom(),
          y2: line.y2 + opt.e.movementY / canvas.getZoom(),
        });
      }
      for (let line of lineChildren) {
        let parentsLine = getObject(`${line.id.split(":")[0]}`);
        line.set({
          x1: parentsLine.left + parentsLine.width / 2,
          y1: parentsLine.top + parentsLine.height / 2,
        });
      }
      canvas.renderAll();
    });

    group.on("mousedblclick", () => {
      const modal = document.querySelector(`#dialog_${group.id}`);
      modal.showModal();
    });
  });
};

const makeLineBetweenChildAndParent = (parentsLine, child) => {
  let line = new fabric.LineArrow(
    [
      parentsLine.left + parentsLine.width / 2,
      parentsLine.top + parentsLine.height / 2,
      child.left + child.width / 2,
      child.top,
    ],
    {
      fill: "red",
      stroke: "red",
      strokeWidth: 2,
      id: `${parentsLine.id}:${child.id}`,
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
      id: `${husband.id}/${wife.id}`,
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
  innerDiv.innerHTML += `Imię: ${person.first_name} <br />`;
  innerDiv.innerHTML += `Nazwisko: ${person.last_name} <br />`;
  innerDiv.innerHTML += `Wiek: ${person.age} <br />`;
  innerDiv.innerHTML += `Data urodzenia: ${person.birthday.getDate()}/${
    person.birthday.getMonth() + 1 < 10
      ? "0" + (person.birthday.getMonth() + 1)
      : person.birthday.getMonth() + 1
  }/${person.birthday.getFullYear()} <br />`;
  innerDiv.innerHTML +=
    person.death.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
      ? ``
      : `Data śmierci: ${person.death.getDate()}/${
          person.death.getMonth() + 1 < 10
            ? "0" + (person.death.getMonth() + 1)
            : person.death.getMonth() + 1
        }/${person.death.getFullYear()} <br />`;
  innerDiv.innerHTML += `Miejsce urodzenia: ${person.birthplace} <br />`;
  innerDiv.innerHTML += `Kraj urodzenia: ${person.country_of_birth} <br />`;
  innerDiv.innerHTML += `Płeć: ${person.sex} <br />`;
  innerDiv.innerHTML += `Zawód: ${person.profession} <br />`;
  innerDiv.innerHTML += `${person.additional_information}`;
  dialog.setAttribute("id", `${person.first_name}_${person.last_name}_dialog`);
  dialog.appendChild(innerDiv);
  document.body.appendChild(dialog);
};

const createDialogFromJSON = (user_id) => {
  $.ajax({
    method: "GET",
    url: `../show-user/${user_id}`,
  }).done((data) => {
    const person = JSON.parse(data);

    let personBirthday = new Date(person.birthday);
    let personDeath = new Date(person.death);

    const dialog = document.createElement("dialog");
    const closeBtn = document.createElement("button");
    closeBtn.setAttribute("class", "closeUserForm-btn btn-close float-end");
    closeBtn.addEventListener("click", () => dialog.close());
    dialog.appendChild(closeBtn);
    let innerDiv = document.createElement("div");
    innerDiv.innerHTML += `ID: ${person.id} <br />`;
    innerDiv.innerHTML += `Imię: ${person.first_name} <br />`;
    innerDiv.innerHTML += `Nazwisko: ${person.last_name} <br />`;
    innerDiv.innerHTML += `Wiek: ${
      person.death === undefined
        ? Math.floor(
            (Date.now() - Date.parse(person.birthday)) / 31536000000,
            0
          )
        : Math.floor(
            (Date.parse(person.death) - Date.parse(person.birthday)) /
              31536000000,
            0
          )
    } <br />`;
    innerDiv.innerHTML += `Data urodzenia: ${personBirthday.getDate()}/${
      personBirthday.getMonth() + 1 < 10
        ? "0" + (personBirthday.getMonth() + 1)
        : personBirthday.getMonth() + 1
    }/${personBirthday.getFullYear()} <br />`;
    innerDiv.innerHTML +=
      person.death === undefined
        ? ``
        : `Data śmierci: ${personDeath.getDate()}/${
            personDeath.getMonth() + 1 < 10
              ? "0" + (personDeath.getMonth() + 1)
              : personDeath.getMonth() + 1
          }/${personDeath.getFullYear()} <br />`;
    innerDiv.innerHTML += `Miejsce urodzenia: ${person.birthplace} <br />`;
    innerDiv.innerHTML += `Kraj urodzenia: ${person.country_of_birth} <br />`;
    innerDiv.innerHTML += `Płeć: ${
      Number(person.sex) === 0 ? "Mężczyzna" : "Kobieta"
    } <br />`;
    innerDiv.innerHTML += `${
      person.profession === undefined
        ? ""
        : "Zawód: " + person.profession + " <br />"
    }`;
    innerDiv.innerHTML += `${
      person.additional_information === undefined
        ? ""
        : person.additional_information
    }`;
    dialog.setAttribute("id", `dialog_${person.id}`);
    dialog.appendChild(innerDiv);
    const editPersonBtn = document.createElement("button");
    editPersonBtn.setAttribute("id", "editPersonBtn");
    editPersonBtn.setAttribute("class", "btn btn-primary");
    editPersonBtn.innerHTML += "Edytuj osobę";
    dialog.appendChild(editPersonBtn);
    document.body.appendChild(dialog);
    editPersonBtn.addEventListener("click", () => editPerson(user_id));
  });
};

const createAllPeople = () => {
  $.ajax({
    method: "GET",
    url: `../show-all-user`,
  }).done((data) => {
    const persons = JSON.parse(data);
    console.log(persons);
    for (const [index, personJSON] of persons.entries()) {
      createPerson(canvas, personJSON, index);
      createDialogFromJSON(personJSON.id);
    }
    canvas.renderAll();
  });
};

const editDialog = (user_id) => {
  const dialog = document.querySelector(`#dialog_${user_id}`);
  const innerDiv = dialog.querySelector("div");
  innerDiv.innerHTML = "";

  const person = new Person(
    user_id,
    $("#user_firstName").val(),
    $("#user_lastName").val(),
    $("#user_birthday").val(),
    $("#user_death").val(),
    undefined,
    $("#user_birthplace").val(),
    $("#user_country_of_birth").val(),
    $("#user_sex").val(),
    $("#user_profession").val(),
    $("#user_additional_information").val(),
    undefined,
    undefined
  );
  console.log(person);

  let personBirthday = new Date(person.birthday);
  let personDeath = new Date(person.death);
  innerDiv.innerHTML += `ID: ${person.id} <br />`;
  innerDiv.innerHTML += `Imię: ${person.first_name} <br />`;
  innerDiv.innerHTML += `Nazwisko: ${person.last_name} <br />`;
  innerDiv.innerHTML += `Wiek: ${
    person.death === ``
      ? Math.floor((Date.now() - Date.parse(person.birthday)) / 31536000000, 0)
      : Math.floor(
          (Date.parse(person.death) - Date.parse(person.birthday)) /
            31536000000,
          0
        )
  } <br />`;
  innerDiv.innerHTML += `Data urodzenia: ${personBirthday.getDate()}/${
    personBirthday.getMonth() + 1 < 10
      ? "0" + (personBirthday.getMonth() + 1)
      : personBirthday.getMonth() + 1
  }/${personBirthday.getFullYear()} <br />`;
  innerDiv.innerHTML +=
    person.death === ``
      ? ``
      : `Data śmierci: ${personDeath.getDate()}/${
          personDeath.getMonth() + 1 < 10
            ? "0" + (personDeath.getMonth() + 1)
            : personDeath.getMonth() + 1
        }/${personDeath.getFullYear()} <br />`;
  innerDiv.innerHTML += `Miejsce urodzenia: ${person.birthplace} <br />`;
  innerDiv.innerHTML += `Kraj urodzenia: ${person.country_of_birth} <br />`;
  innerDiv.innerHTML += `Płeć: ${
    Number(person.sex) === 0 ? "Mężczyzna" : "Kobieta"
  } <br />`;
  innerDiv.innerHTML += `${
    person.profession === "" ? "" : "Zawód: " + person.profession + " <br />"
  }`;
  innerDiv.innerHTML += `${person.additional_information}`;
  console.log(innerDiv);
};

const editPerson = (user_id) => {
  document
    .querySelectorAll("dialog")
    [document.querySelectorAll("dialog").length - 1].close();

  $.ajax({
    method: "GET",
    url: `../edit-user/${user_id}`,
  }).done((data) => {
    $("#addUserForm").html(data);
    const modal = document.querySelector("#addUserForm")
    const closeModal = document.querySelector(".closeUserForm-btn");
    closeModal.addEventListener("click", () => modal.close());
    modal.showModal();
    $(() => {
      $("form[name='user']").on("submit", (e) => {
        const formSerialize = $('form[name="user"]').serialize();
        console.log("dane zmienione"); // podmienić obiekt
        const person = getObject(user_id);
        person._objects[2].set(
          "text",
          `${$("#user_firstName").val()} ${$("#user_lastName").val()}`
        );
        editDialog(user_id);
        canvas.renderAll();
      });
    });
  });
};

const useForm = () => {
  const modal = document.querySelector("#addUserForm");
  $.ajax({
    method: "POST",
    url: "../new-user",
  }).done((data) => {
    $("#addUserForm").html(data);
    const closeModal = document.querySelector(".closeUserForm-btn");
    closeModal.addEventListener("click", () => modal.close());
    $(() => {
      $("form[name='user']").on("submit", (e) => {
        const formSerialize = $('form[name="user"]').serialize();

        $.post("../new-user", formSerialize, function (data) {
          $("form[name='user']").parent().html(data.content);
          $.ajax({
            method: "GET",
            url: `../show-user/${data.user_id}`,
          }).done((data) => {
            const personJSON = JSON.parse(data);
            const person = new Person(
              personJSON.id,
              personJSON.first_name,
              personJSON.last_name,
              personJSON.birthday,
              personJSON.death,
              undefined,
              personJSON.birthplace,
              personJSON.country_of_birth,
              personJSON.sex,
              personJSON.profession,
              personJSON.additional_information,
              undefined,
              undefined
              // $("#user_firstName").val(),
              // $("#user_lastName").val(),
              // $("#user_birthday").val(),
              // $("#user_death").val(),
              // undefined,
              // $("#user_birthplace").val(),
              // $("#user_country_of_birth").val(),
              // $("#user_sex").val(),
              // $("#user_profession").val(),
              // $("#user_additional_information").val(),
              // undefined,
              // undefined
            );
            console.log(person);
            createPerson(canvas, person, 0);
            createDialogFromJSON(person.id);
          });
        }).fail(function (data) {
          $("form[name='user']").parent().html(data);
        });
        e.preventDefault();
        return false;
      });
    });
  });

  modal.showModal();
};

const getObject = (id) => {
  for (let object of canvas.getObjects()) {
    if (Number(object.id) === id) return object;
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
  createDialogFromJSON();
});

makeCanvasInteractive(canvas);

// for (const [index, person] of persons.entries()) {
//   createPerson(canvas, person, index);
//   createDialog(person);
// }

canvas.renderAll();

const openModal = document.querySelector(".openAddUserForm-btn");

openModal.addEventListener("click", useForm);

// let cancel = true;
// window.addEventListener("mousemove", () => {
//   if (cancel) {
//     let o1 = getObject("Tomasz_Barnaś");
//     let o2 = getObject("Antoni_Zuber");
//     let o3 = getObject("Rafał_Ochorok");
//     makeLineBetweenSpouses(o2, getObject(o2.spouse));
//     for (let child of o2.children) {
//       makeLineBetweenChildAndParent(
//         getObject(`${o2.id}/${o2.spouse}`),
//         getObject(child)
//       );
//     }
//     canvas.renderAll();
//   }
//   cancel = false;
// });

window.addEventListener("resize", resizeCanvas);

createAllPeople();
