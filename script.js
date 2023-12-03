const registro = {
    id: '',
    trabajadora: '',
    diaFestivo: '',
    mes: ''
};


let isValid = false;
let isEditando = false;

document.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        realizarAccionUsuario();
    }
});

function realizarAccionUsuario() {
    accionUsuario(event);
}
function accionUsuario(event) {
    event.preventDefault();

    validData();
    if (isValid) {
        if (!isEditando) {
            addAlumno();
        } else {
            editAlumno();
        }
    }

    limpiarObj();
    limpiarCampos();
}

function addAlumno() {
    const id = new Date().getTime()

    const inpTrabajadora = document.getElementById("trabajadora").value;
    const inpDiaFestivo = document.getElementById("diaFestivo").value;
    const inpMes = document.getElementById("mes").value;

    const tbody = document.querySelector('#tableAlumnos tbody');

    const tr = document.createElement('tr');
    tr.setAttribute("id", id);

    const thId = document.createElement("th");
    thId.textContent = id;
    const thTrabajadora = document.createElement("th");
    thTrabajadora.textContent = inpTrabajadora;
    const thDiaFestivo = document.createElement("th");
    thDiaFestivo.textContent = inpDiaFestivo;
    const thMes = document.createElement("th");
    thMes.textContent = inpMes;

    btnEdit = document.createElement("button");
    btnEdit.classList.add("btn", "btn-edit");
    btnEdit.textContent = "Editar";
    btnEdit.onclick = function () {
        isEditando = true;

        registro.id = thId.textContent;
        registro.trabajadora = thTrabajadora.textContent;
        registro.diaFestivo = thDiaFestivo.textContent;
        registro.mes = thMes.textContent;

        document.getElementById("trabajadora").value = registro.trabajadora;
        document.getElementById("diaFestivo").value = registro.diaFestivo;
        document.getElementById("mes").value = registro.mes;

        document.getElementById("add-data").value = "Editar registro";
        document.getElementById("add-data").classList.add("btn-edit-data");
        document.getElementById("add-data").classList.remove("btn-acreate-alumno");
    }

    btnDelete = document.createElement("button");
    btnDelete.classList.add("btn", "btn-delete");
    btnDelete.textContent = "Borrar";
    btnDelete.onclick = function () {
        tr.remove()
    }

    tr.appendChild(thId);
    tr.appendChild(thTrabajadora);
    tr.appendChild(thDiaFestivo);
    tr.appendChild(thMes);
    const tdActions = document.createElement("td");
    tdActions.appendChild(btnEdit);
    tdActions.appendChild(btnDelete);
    tr.appendChild(tdActions);
    tbody.appendChild(tr);
}

function editAlumno(){
    const trId = document.getElementById(registro.id)

    trId.childNodes[1].textContent = document.getElementById("trabajadora").value;
    trId.childNodes[2].textContent = document.getElementById("diaFestivo").value;
    trId.childNodes[3].textContent = document.getElementById("mes").value;

    console.log("registro editado exitosamente")
    const btnEditar = document.getElementById("add-data")
    btnEditar.value = "Crear nuevo registro"
    btnEditar.classList.remove('btn-edit')
    btnEditar.classList.add('btn-acreate-alumno')
}

function limpiarObj(){
    registro.id = '';
    registro.trabajadora = '';
    registro.diaFestivo = '';
    registro.mes = '';
}

function limpiarCampos(){
    document.getElementById("trabajadora").value = '';
    document.getElementById("diaFestivo").value = '';
    document.getElementById("mes").value = '';

    isValid = false;
    isEditando = false;
}

function validData(){
    const inpTrabajadora = document.getElementById("trabajadora").value;
    const inpDiaFestivo = document.getElementById("diaFestivo").value;
    const inpMes = document.getElementById("mes").value;

    if(
        inpTrabajadora === '' || 
        inpDiaFestivo === '' || 
        inpMes === ''
    ){
        alert("Debes introducir todos los datos ")
        isValid = false; 
    } else {
        isValid = true;
    }
}


function generarPDF(event) {
    event.preventDefault();

    const tbody = document.querySelector('#tableAlumnos tbody');
    if(tbody.childElementCount === 0) {
        alert('No se puede crear el PDF ya que no existen registros en la tabla');
        return;
    }

    const str = recorrerTabla();

    const doc = new jsPDF();
    doc.autoTable({ html: '#tableAlumnos' });
    doc.save('Registro_notas.pdf');
}

function recorrerTabla() {
    let str = '';

    const table = document.getElementById('tableAlumnos');

    if (!table) {
        console.error('La tabla no se encontró.');
        return '';
    }

    return str;
}