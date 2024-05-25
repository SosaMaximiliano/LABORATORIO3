// SLECTOR POR ID
const $ = (id) => {
  return document.getElementById(id);
};

// SELECTOR POR CLASE
const $class = (className) => {
  return document.getElementsByClassName(className);
};

// CREADOR NODO TEXTO. RECIBE EL TEXTO
const crearNodoTxt = (txt) => {
  return document.createTextNode(txt);
};

// CREADOR ELEMENTO HTML. RECIBE STRING ELEMENTO
const crearElemento = (e) => {
  return document.createElement(e);
};

// ARRAY DE OBJETOS FILTRADOS
let camiones = [];
let autos = [];

let lista = JSON.parse(
  '[{"id":1,"modelo":"Fiat100","anoFabricacion":1987,"velMax":60,"cantidadPuertas":4,"asientos":4},{"id":2,"modelo":"FordMustang","anoFabricacion":1960,"velMax":100,"cantidadPuertas":2,"asientos":2},{"id":3,"modelo":"FerraryF100","anoFabricacion":1999,"velMax":200,"cantidadPuertas":2,"asientos":2},{"id":4,"modelo":"Escania","anoFabricacion":1987,"velMax":60,"carga":5550,"autonomia":300},{"id":5,"modelo":"DodgeRam","anoFabricacion":1970,"velMax":100,"carga":2333,"autonomia":400},{"id":666,"modelo":"ChevySilverado","anoFabricacion":1994,"velMax":80,"carga":1000,"autonomia":450}]'
);

// SELECTOR CHECKBOXES
let checkboxes = document.querySelectorAll(".chk-col .chk");

// CREA TABLAS. RECIBE LA CANTIDAD DE FILAS Y CELDAS (NO SE USA)
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

// CREA UNA FILA. RECIBE CLASSNAME
function crearFila(className) {
  let fila = document.createElement("tr");
  fila.setAttribute("class", className);
  return fila;
}

// CREA UNA CELDA. RECIBE CLASSNAME
function crearCelda(className) {
  let celda = document.createElement("td");
  celda.setAttribute("class", className);
  return celda;
}

// GENERAR UN ID POSTERIOR AL ULTIMO
function nuevoID() {
  let idLista = lista.map((e) => e.id);
  return Math.max(...idLista) + 1;
}

//SEPARA LOS OBJETOS POR CLASE EN DOS ARRAY
function catalogar() {
  let autoAux = [];
  let camionAux = [];
  lista.forEach((e) => {
    e.carga ? camionAux.push(e) : autoAux.push(e);
  });

  camiones = camionAux;
  autos = autoAux;
}

// CREA FILAS Y CELDAS Y CARGA LOS DATOS DE LA LISTA
function cargarTabla(lista) {
  $("tabla-cuerpo").innerHTML = "";
  catalogar();
  lista.forEach((e) => {
    let fila = crearFila("fila");
    let id = crearCelda("id");
    let modelo = crearCelda("modelo");
    let anio = crearCelda("anio");
    let vel = crearCelda("vel");
    let puertas = crearCelda("puertas");
    let asientos = crearCelda("asientos");
    let carga = crearCelda("carga");
    let autonomia = crearCelda("autonomia");

    id.appendChild(crearNodoTxt(e.id ? e.id : "--"));
    modelo.appendChild(crearNodoTxt(e.modelo ? e.modelo : "--"));
    anio.appendChild(crearNodoTxt(e.anoFabricacion ? e.anoFabricacion : "--"));
    vel.appendChild(crearNodoTxt(e.velMax ? e.velMax : "--"));
    puertas.appendChild(
      crearNodoTxt(e.cantidadPuertas ? e.cantidadPuertas : "--")
    );
    asientos.appendChild(crearNodoTxt(e.asientos ? e.asientos : "--"));
    carga.appendChild(crearNodoTxt(e.carga ? e.carga : "--"));
    autonomia.appendChild(crearNodoTxt(e.autonomia ? e.autonomia : "--"));

    fila.appendChild(id);
    fila.appendChild(modelo);
    fila.appendChild(anio);
    fila.appendChild(vel);
    fila.appendChild(puertas);
    fila.appendChild(asientos);
    fila.appendChild(carga);
    fila.appendChild(autonomia);

    $("tabla-cuerpo").appendChild(fila);

    cargarAbmDesdeTabla();
  });
}

// MUESTRA U OCULTA LAS COLUMNAS SEGUN CHECKBOX
function mostrarColumnas() {
  let tabla = $("tabla");
  let id = tabla.querySelectorAll(".id");
  let modelo = tabla.querySelectorAll(".modelo");
  let anio = tabla.querySelectorAll(".anio");
  let vel = tabla.querySelectorAll(".vel");
  let puertas = tabla.querySelectorAll(".puertas");
  let asientos = tabla.querySelectorAll(".asientos");
  let carga = tabla.querySelectorAll(".carga");
  let autonomia = tabla.querySelectorAll(".autonomia");

  $("chk-id").checked
    ? id.forEach((e) => {
        e.style.display = "";
      })
    : id.forEach((e) => {
        e.style.display = "none";
      });

  $("chk-modelo").checked
    ? modelo.forEach((e) => {
        e.style.display = "";
      })
    : modelo.forEach((e) => {
        e.style.display = "none";
      });

  $("chk-anio").checked
    ? anio.forEach((e) => {
        e.style.display = "";
      })
    : anio.forEach((e) => {
        e.style.display = "none";
      });

  $("chk-vel").checked
    ? vel.forEach((e) => {
        e.style.display = "";
      })
    : vel.forEach((e) => {
        e.style.display = "none";
      });

  $("chk-puertas").checked
    ? puertas.forEach((e) => {
        e.style.display = "";
      })
    : puertas.forEach((e) => {
        e.style.display = "none";
      });

  $("chk-asientos").checked
    ? asientos.forEach((e) => {
        e.style.display = "";
      })
    : asientos.forEach((e) => {
        e.style.display = "none";
      });

  $("chk-carga").checked
    ? carga.forEach((e) => {
        e.style.display = "";
      })
    : carga.forEach((e) => {
        e.style.display = "none";
      });

  $("chk-autonomia").checked
    ? autonomia.forEach((e) => {
        e.style.display = "";
      })
    : autonomia.forEach((e) => {
        e.style.display = "none";
      });
}

// CARGA LA VENTANA DE ABM DESDE LA TABLA
function cargarAbmDesdeTabla() {
  let filas = $("tabla").querySelectorAll(".fila");
  let abm = $("abm");
  let formDatos = $("form-datos");
  let opcion = $("abm-opcion");
  let id = $("abm-id");
  let modelo = $("abm-modelo");
  let anio = $("abm-anio");
  let vel = $("abm-vel");
  let asientos = $("abm-asientos");
  let puertas = $("abm-puertas");
  let carga = $("abm-carga");
  let autonomia = $("abm-autonomia");
  let tipo = $("abm-tipo");

  filas.forEach((f) =>
    f.addEventListener("dblclick", function () {
      id.value = f.querySelector(".id").innerText;
      modelo.value = f.querySelector(".modelo").innerText;
      anio.value = f.querySelector(".anio").innerText;
      vel.value = f.querySelector(".vel").innerText;

      // CAMION
      if (f.querySelector(".puertas").innerText.trim() === "--") {
        carga.value = f.querySelector(".carga").innerText;
        autonomia.value = f.querySelector(".autonomia").innerText;
        carga.disabled = false;
        autonomia.disabled = false;
        puertas.disabled = true;
        asientos.disabled = true;
        tipo.value = "camion";

        // AUTO
      } else {
        puertas.value = f.querySelector(".puertas").innerText;
        asientos.value = f.querySelector(".asientos").innerText;
        carga.disabled = true;
        autonomia.disabled = true;
        carga.value = "";
        autonomia.value = "";
        tipo.value = "auto";
      }

      abm.style.display = "";
      formDatos.style.display = "none";
      tipo.disabled = true;

      // opcion[0].disabled = true;
      // opcion[1].selected = true;

      $("abm-alta").style.display = "none";
      $("abm-baja").style.display = "";
      $("abm-modificar").style.display = "";
    })
  );
}

// VALIDA CAMPOS VACIOS DE ABM
function validarAbm() {
  let inputs = $("abm").querySelectorAll("input");
  let camposVacios = false;

  inputs.forEach((e) => {
    if (e.value.trim() === "") {
      camposVacios = true;
    }
  });

  if (camposVacios) {
    alert("Los campos no pueden estar vacíos");
    return false;
  }

  //**************** */

  let id = $("abm-id");
  let anio = $("abm-anio");
  let vel = $("abm-vel");
  let puertas = $("abm-puertas");
  let asientos = $("abm-asientos");
  let carga = $("abm-carga");
  let autonomia = $("abm-autonomia");

  if (
    isNaN(id.value) ||
    isNaN(anio.value) ||
    isNaN(vel.value) ||
    (isNaN(puertas.value) && puertas.value != "--") ||
    (isNaN(asientos.value) && asientos.value != "--") ||
    (isNaN(carga.value) && carga.value != "--") ||
    (isNaN(autonomia.value) && autonomia.value != "--")
  ) {
    alert("Error en los campos numericos");
    return false;
  }
  return true;
}

// ORDENA LA LISTA SEGUN CLICK EN CABECERA. RECIBE PROPIEDAD DEL OBJETO
function ordenarLista(prop) {
  let listaOrdenada = lista
    .map((e) => e)
    .sort((a, b) => {
      if (a[prop] < b[prop]) {
        return -1;
      }
      if (a[prop] > b[prop]) {
        return 1;
      }
      return 0;
    });

  cargarTabla(listaOrdenada);
}

// CALCULA PROMEDIO
function calcularVelocidadPromedio() {
  let velTotal = lista.reduce((a, e) => {
    return a + parseInt(e.velMax);
  }, 0);
  return velTotal / lista.length;
}

class Vehiculo {
  constructor(id, modelo, anio, vel) {
    this.id = nuevoID();
    this.modelo = modelo;
    this.anoFabricacion = anio;
    this.velMax = vel;
  }

  toString() {
    return `ID: ${this.id}, Modelo: ${this.modelo}, Año: ${this.anoFabricacion}, Vel. Max: ${this.velMax}`;
  }
}

class Auto extends Vehiculo {
  constructor(id, modelo, anio, vel, puertas, asientos) {
    super(id, modelo, anio, vel);
    this.cantidadPuertas = puertas;
    this.asientos = asientos;
  }
  toString() {
    return `${super.toString()},Puertas: ${this.cantidadPuertas}, Asientos: ${
      this.asientos
    }`;
  }
}

class Camion extends Vehiculo {
  constructor(id, modelo, anio, vel, carga, autonomia) {
    super(id, modelo, anio, vel);
    this.carga = carga;
    this.autonomia = autonomia;
  }
  toString() {
    return `${super.toString()},Carga: ${this.carga}, Autonomia: ${
      this.autonomia
    }`;
  }
}

// ***************** EVENTOS *****************

// DEFAULTS
$("abm").style.display = "none";
$("txt-calcular").value = "";
$("abm-id").disabled = true;

// FILTRO DE LA TABLA POR SELECT
$("filtrar").addEventListener("change", () => {
  switch ($("filtrar").value) {
    case "todos":
      cargarTabla(lista);
      mostrarColumnas();
      break;
    case "camiones":
      cargarTabla(camiones);
      mostrarColumnas();
      break;
    case "autos":
      cargarTabla(autos);
      mostrarColumnas();
      break;

    default:
      break;
  }
});

// FILTRO DE LA TABLA POR CAMPO
checkboxes.forEach((e) => {
  e.checked = true;
  e.addEventListener("change", mostrarColumnas);
});

// CALCULAR PROMEDIO
$("calcular").addEventListener("click", () => {
  $("txt-calcular").value = calcularVelocidadPromedio();
});

// ABM AGREGAR
$("agregar").addEventListener("click", () => {
  let abm = $("abm");
  let formDatos = $("form-datos");
  let opcion = $("abm-opcion");
  let tipo = $("abm-tipo");

  $("abm-id").value = nuevoID();
  $("abm-modelo").value = "";
  $("abm-anio").value = "";
  $("abm-vel").value = "";
  $("abm-puertas").value = "";
  $("abm-asientos").value = "";
  $("abm-carga").value = "--";
  $("abm-autonomia").value = "--";
  $("abm-asientos").disabled = false;
  $("abm-puertas").disabled = false;
  $("abm-carga").disabled = true;
  $("abm-autonomia").disabled = true;

  // opcion[0].disabled = false;
  // opcion[0].selected = true;

  abm.style.display == "none"
    ? (abm.style.display = "")
    : (abm.style.display = "none");

  formDatos.style.display == ""
    ? (formDatos.style.display = "none")
    : (formDatos.style.display = "");

  $("abm-alta").style.display = "";
  $("abm-baja").style.display = "none";
  $("abm-modificar").style.display = "none";
  tipo.disabled = false;
  tipo.selectedIndex = 0;
});

// ABM ALTA
$("abm-alta").addEventListener("click", () => {
  let abmTipo = $("abm-tipo").value;
  let id = $("abm-id").value;
  let modelo = $("abm-modelo").value;
  let anio = $("abm-anio").value;
  let vel = $("abm-vel").value;
  let puertas = $("abm-puertas").value;
  let asientos = $("abm-asientos").value;
  let carga = $("abm-carga").value;
  let autonomia = $("abm-autonomia").value;

  if (!validarAbm()) {
    return;
  }

  if (abmTipo === "auto") {
    lista.push(new Auto(id, modelo, anio, vel, puertas, asientos));
  } else {
    if (abmTipo === "camion")
      lista.push(new Camion(id, modelo, anio, vel, carga, autonomia));
  }
  cargarTabla(lista);
  $("abm").style.display = "none";
  $("form-datos").style.display = "";
});

// ABM BAJA
$("abm-baja").addEventListener("click", () => {
  let listaAux = [];
  let idAbm = $("abm-id");
  lista.forEach((e) => {
    if (e.id != idAbm.value) {
      listaAux.push(e);
    }
  });
  lista = listaAux;
  cargarTabla(lista);
  $("abm").style.display = "none";
  $("form-datos").style.display = "";
});

// ABM MODIFICAR
$("abm-modificar").addEventListener("click", () => {
  let idAbm = $("abm-id").value;
  lista.forEach((e) => {
    if (e.id == idAbm) {
      e.modelo = $("abm-modelo").value;
      e.anoFabricacion = $("abm-anio").value;
      e.velMax = $("abm-vel").value;
      if ($("abm-tipo").value === "camion") {
        e.carga = $("abm-carga").value;
        e.autonomia = $("abm-autonomia").value;
      } else {
        e.puertas = $("abm-puertas").value;
        e.asientos = $("abm-asientos").value;
      }
    }
  });
  cargarTabla(lista);
  $("abm").style.display = "none";
  $("form-datos").style.display = "";
});

// ABM CANCELAR
$("abm-cancelar").addEventListener("click", () => {
  $("abm").style.display = "none";
  $("form-datos").style.display = "";
  $("agregar").style.display = "";
});

//ABM TIPO
$("abm-tipo").addEventListener("change", () => {
  if ($("abm-tipo").value == "camion") {
    $("abm-asientos").disabled = true;
    $("abm-puertas").disabled = true;
    $("abm-asientos").value = "--";
    $("abm-puertas").value = "--";

    $("abm-carga").disabled = false;
    $("abm-autonomia").disabled = false;
    $("abm-carga").value = "";
    $("abm-autonomia").value = "";
  } else {
    $("abm-carga").disabled = true;
    $("abm-autonomia").disabled = true;
    $("abm-carga").value = "--";
    $("abm-autonomia").value = "--";

    $("abm-asientos").disabled = false;
    $("abm-puertas").disabled = false;
    $("abm-asientos").value = "";
    $("abm-puertas").value = "";
  }
});

// ORDENAR LAS FILAS POR CAMPO
$("tabla-cabecera")
  .querySelectorAll("th")
  .forEach((e) => e.addEventListener("click", () => ordenarLista(e.id)));

catalogar();
cargarTabla(lista);
cargarAbmDesdeTabla();
