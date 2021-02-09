// Animacion navBar
$(function() {
    $(document).scroll(function() {
        var $nav = $(".fixed-top");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
});

// Slides
$('#navNosotros').click(function(e) {
    e.preventDefault();

    $('html, body').animate({
        scrollTop: ($("#nosotros").offset().top - $(".fixed-top").height())
    }, 1000);
});

$('#navSimular').click(function(e) {
    e.preventDefault();

    $('html, body').animate({
        scrollTop: ($("#simular").offset().top - $(".fixed-top").height())
    }, 1000);
});

$('#navContacto').click(function(e) {
    e.preventDefault();

    $('html, body').animate({
        scrollTop: ($("#contacto").offset().top - $(".fixed-top").height())
    }, 1000);
});

// Variables
const tipoCredito = document.querySelector('#tipoCredito');
const btnSimular = document.querySelector("#btnSimular");
const selectTipo = document.querySelector('#select-tipo');
const selectCuotas = document.querySelector('#select-cuotas');
const url = "../data/data.json";
var datosJson;

// DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    obtenerDatos(url);
    selectTipo.addEventListener('change', e => agregarCuotas(e));
});



function obtenerDatos() {
    fetch(url)
        .then(respuesta => {
            return respuesta.json();
        })
        .then(datos => {
            guardarDatos(datos);
            // limpiarHTML();
            cargarTipos()
                // }
        })
        .catch(error => {
            console.log(error)
        });
}

function guardarDatos(datos) {
    datosJson = datos;
}

function cargarTipos() {
    Object.keys(datosJson).forEach(tipo => {
        const opcion = document.createElement('option');
        opcion.innerHTML = `${tipo}`;
        selectTipo.appendChild(opcion);
    });
}

function agregarCuotas(e) {
    const valor = e.target.value;
    arrCuotas = datosJson[valor].cuotas;
    limpiarSelectCuotas();
    arrCuotas.forEach(cuota => {
        const opcion = document.createElement('option');
        opcion.innerHTML = cuota;
        selectCuotas.appendChild(opcion);
    })

}

function limpiarSelectCuotas() {
    console.log('Limpiando formulario');
    selectCuotas.innerHTML = `
    <option disabled="" selected="">Selecciona una opción</option>
    `
}