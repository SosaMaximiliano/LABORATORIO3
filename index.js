const $ = (id) => {
  return document.getElementById(id);
};

const $class = (className) => {
  return document.getElementsByClassName(className);
};

const crearNodoTxt = (txt) => {
  return document.createTextNode(txt);
};

const crearElemento = (e) => {
  return document.createElement(e);
};

function crearFila(className) {
  let fila = document.createElement("tr");
  fila.setAttribute("class", className);
  return fila;
}

function crearCelda(className) {
  let celda = document.createElement("td");
  celda.setAttribute("class", className);
  return celda;
}

let extranjeros = [];
let ciudadanos = [];

$("abm").style.display = "none";
$("txt-calcular").value = "";

let lista = JSON.parse(
  '[{"id":1,"apellido":"Serrano","nombre":"Horacio","fechaNacimiento":19840103,"dni":45876942},{"id":2,"apellido":"Casas","nombre":"Julian","fechaNacimiento":19990723,"dni":98536214},{"id":3,"apellido":"Galeano","nombre":"Julieta","fechaNacimiento":20081103,"dni":74859612},{"id":4,"apellido":"Molina","nombre":"Juana","fechaNacimiento":19681201,"paisOrigen":"Paraguay"},{"id":5,"apellido":"Barrichello","nombre":"Rubens","fechaNacimiento":19720523,"paisOrigen":"Brazil"},{"id":666,"apellido":"Hkkinen","nombre":"Mika","fechaNacimiento":19680928,"paisOrigen":"Finlandia"}]'
);

function nuevoID() {
  let idLista = lista.map((e) => e.id);
  return (idLista = Math.max(...idLista)) + 1;
}

function Catalogar() {
  let ciudAux = [];
  let extAux = [];
  lista.forEach((e) => {
    e.paisOrigen ? extAux.push(e) : ciudAux.push(e);
  });

  extranjeros = extAux;
  ciudadanos = ciudAux;
}

let tabla = $("tabla");
Catalogar();

class Persona {
  #id;
  constructor(id, nombre, apellido, fnac) {
    this.#id = nuevoID;
    this.nombre = nombre;
    this.apellido = apellido;
    this.fnac = fnac;
  }
}

class Ciudadano extends Persona {
  constructor(id, nombre, apellido, fnac, dni) {
    super(id, nombre, apellido, fnac);
    this.dni = dni;
  }

  static CalcularEdad() {
    let edad = lista.reduce((a, e) => {
      return a + e.fechaNacimiento;
    }, 0);
    return edad / lista.length.toString();
  }
}

class Extranjero extends Persona {
  constructor(id, nombre, apellido, fnac, origen) {
    super(id, nombre, apellido, fnac);
    this.origen = origen;
  }
}

function CargarTabla(lista) {
  $("tabla-cuerpo").innerHTML = "";
  Catalogar();
  lista.forEach((e) => {
    let fila = crearFila("fila");
    let id = crearCelda("id");
    let nombre = crearCelda("nombre");
    let apellido = crearCelda("apellido");
    let fnac = crearCelda("fnac");
    let dni = crearCelda("dni");
    let origen = crearCelda("origen");

    id.appendChild(crearNodoTxt(e.id ? e.id : "--"));
    nombre.appendChild(crearNodoTxt(e.nombre ? e.nombre : "--"));
    apellido.appendChild(crearNodoTxt(e.apellido ? e.apellido : "--"));
    fnac.appendChild(
      crearNodoTxt(e.fechaNacimiento ? e.fechaNacimiento : "--")
    );
    dni.appendChild(crearNodoTxt(e.dni ? e.dni : "--"));
    origen.appendChild(crearNodoTxt(e.paisOrigen ? e.paisOrigen : "--"));

    fila.appendChild(id);
    fila.appendChild(nombre);
    fila.appendChild(apellido);
    fila.appendChild(fnac);
    fila.appendChild(dni);
    fila.appendChild(origen);

    $("tabla-cuerpo").appendChild(fila);
  });
}

CargarTabla(lista);
cargarAbmDesdeTabla();

$("filtrar").addEventListener("change", () => {
  switch ($("filtrar").value) {
    case "todos":
      CargarTabla(lista);
      MostrarColumnas();
      break;
    case "extranjeros":
      CargarTabla(extranjeros);
      MostrarColumnas();
      break;
    case "ciudadanos":
      CargarTabla(ciudadanos);
      MostrarColumnas();
      break;

    default:
      break;
  }
});

let checkboxes = document.querySelectorAll(".chk-col .chk");

checkboxes.forEach((e) => {
  e.checked = true;
  e.addEventListener("change", MostrarColumnas);
});

function MostrarColumnas() {
  let tabla = $("tabla");
  let id = tabla.querySelectorAll(".id");
  let nombre = tabla.querySelectorAll(".nombre");
  let apellido = tabla.querySelectorAll(".apellido");
  let fnac = tabla.querySelectorAll(".fnac");
  let dni = tabla.querySelectorAll(".dni");
  let origen = tabla.querySelectorAll(".origen");

  $("chk-id").checked
    ? id.forEach((e) => {
        e.style.display = "";
      })
    : id.forEach((e) => {
        e.style.display = "none";
      });

  $("chk-nombre").checked
    ? nombre.forEach((e) => {
        e.style.display = "";
      })
    : nombre.forEach((e) => {
        e.style.display = "none";
      });

  $("chk-apellido").checked
    ? apellido.forEach((e) => {
        e.style.display = "";
      })
    : apellido.forEach((e) => {
        e.style.display = "none";
      });

  $("chk-fnac").checked
    ? fnac.forEach((e) => {
        e.style.display = "";
      })
    : fnac.forEach((e) => {
        e.style.display = "none";
      });

  $("chk-dni").checked
    ? dni.forEach((e) => {
        e.style.display = "";
      })
    : dni.forEach((e) => {
        e.style.display = "none";
      });

  $("chk-origen").checked
    ? origen.forEach((e) => {
        e.style.display = "";
      })
    : origen.forEach((e) => {
        e.style.display = "none";
      });
}

$("calcular").addEventListener("click", () => {
  $("txt-calcular").value = Ciudadano.CalcularEdad();
});

// CARGAR ABM HACIENDO DOBLE CLICK EN LA FILA
function cargarAbmDesdeTabla() {
  let filas = $("tabla").querySelectorAll(".fila");
  let abm = $("abm");
  let formDatos = $("form-datos");
  let opcion = $("abm-opcion");
  let id = $("abm-id");
  let nombre = $("abm-nombre");
  let apellido = $("abm-apellido");
  let fnac = $("abm-fnac");
  let origen = $("abm-origen");
  let dni = $("abm-dni");
  let tipo = $("abm-tipo");

  filas.forEach((f) =>
    f.addEventListener("dblclick", function () {
      id.value = f.childNodes[0].innerText;
      nombre.value = f.childNodes[1].innerText;
      apellido.value = f.childNodes[2].innerText;
      fnac.value = f.childNodes[3].innerText;
      // EXTRANJERO
      if (f.childNodes[4].innerText.trim() === "--") {
        origen.value = f.childNodes[5].innerText;
        dni.value = "";
        dni.disabled = true;
        origen.disabled = false;
        tipo.value = "extranjero";

        // CIUDADANO
      } else {
        dni.value = f.childNodes[4].innerText;
        origen.value = "";
        origen.disabled = true;
        dni.disabled = false;
        tipo.value = "ciudadano";
      }

      abm.style.display = "";
      formDatos.style.display = "none";

      opcion[0].disabled = true;
      opcion[1].selected = true;
    })
  );
}

/*  ABM  */

$("abm-id").disabled = true;

// ABM AGREGAR
$("agregar").addEventListener("click", () => {
  let abm = $("abm");
  let formDatos = $("form-datos");
  let opcion = $("abm-opcion");
  let tipo = $("abm-tipo");

  $("abm-id").value = nuevoID();
  $("abm-nombre").value = "";
  $("abm-apellido").value = "";
  $("abm-fnac").value = "";
  $("abm-dni").value = "";
  $("abm-origen").value = "";

  // opcion[0].disabled = false;
  // opcion[0].selected = true;

  abm.style.display == "none"
    ? (abm.style.display = "")
    : (abm.style.display = "none");

  formDatos.style.display == ""
    ? (formDatos.style.display = "none")
    : (formDatos.style.display = "");
});

/*ABM ALTA*/
$("abm-alta").addEventListener("click", function () {
  let abmTipo = $("abm-tipo").value;

  if (abmTipo === "ciudadano") {
    lista.push(
      new Ciudadano(
        $("abm-id").value,
        $("abm-nombre").value,
        $("abm-apellido").value,
        $("abm-fnac").value,
        $("abm-dni").value
      )
    );
  } else {
    if (abmTipo === "extranjero")
      lista.push(
        new Extranjero(
          $("abm-id").value,
          $("abm-nombre").value,
          $("abm-apellido").value,
          $("abm-fnac").value,
          $("abm-origen").value
        )
      );
  }
  CargarTabla(lista);
  $("abm").style.display = "none";
  $("form-datos").style.display = "";
});

// ABM BAJA
function Baja(id) {
  let listaAux = [];
  lista.forEach((e) => {
    if (e.id != id) {
      listaAux.push(e);
    }
  });
  lista = listaAux;
  CargarTabla(lista);
  $("abm").style.display = "none";
  $("form-datos").style.display = "";
}

$("abm-baja").addEventListener("click", Baja());

/*ABM CANCELAR*/
$("abm-cancelar").addEventListener("click", () => {
  $("abm").style.display = "none";
  $("form-datos").style.display = "";
  $("agregar").style.display = "";
});

//ABM TIPO
$("abm-tipo").addEventListener("change", function () {
  $("abm-tipo").value == "ciudadano"
    ? ($("abm-origen").disabled = true)
    : ($("abm-origen").disabled = false);
  $("abm-tipo").value == "extranjero"
    ? ($("abm-dni").disabled = true)
    : ($("abm-dni").disabled = false);
});

// FUNCION PARA CREAR TABLAS

function crearTabla(filas, celdas) {
  if (isNaN(filas) || isNaN(celdas)) {
    return false;
  }
  let tabla = document.createElement("table");
  let tHead = document.createElement("thead");
  let tBody = document.createElement("tbody");
  let cabecera = document.createElement("tr");

  tabla.appendChild(tHead);
  tabla.appendChild(tBody);
  tHead.appendChild(cabecera);

  for (let i = 0; i < celdas; i++) {
    let celda = document.createElement("th");
    celda.innerText = "Titulo " + i;
    cabecera.appendChild(celda);
  }

  for (let i = 0; i < filas; i++) {
    let fila = document.createElement("tr");
    tBody.appendChild(fila);
    for (let j = 0; j < celdas; j++) {
      let celda = document.createElement("td");
      celda.innerText = "Celda " + i + 1 + "/" + j;
      fila.appendChild(celda);
    }
  }

  tabla.style.border = "1px solid #000";
  return tabla;
}
