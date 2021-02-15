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
const btnSimularYa = document.querySelector("#btnSimularYa");
const btnSimular = document.querySelector("#btnSimular");
const selectTipo = document.querySelector('#select-tipo');
const selectCuotas = document.querySelector('#select-cuotas');
const inputMonto = document.querySelector('#input-monto');
const modalBody = document.querySelector('.modal-body');
const url = "../data/data.json";
var datosJson;

// DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    obtenerDatos(url);
    selectTipo.addEventListener('change', e => agregarCuotas(e));
    btnSimular.addEventListener('click', e => simularCredito(e));
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
        opcion.value = `${tipo}`;
        selectTipo.appendChild(opcion);
    });
}

function agregarCuotas(e) {
    const valor = e.target.value;
    arrCuotas = datosJson[valor].cuotas;
    limpiarSelectCuotas();
    arrCuotas.forEach(cuota => {
        const opcion = document.createElement('option');
        opcion.text = cuota;
        opcion.value = cuota;
        selectCuotas.appendChild(opcion);
    })

}

function limpiarSelectCuotas() {
    selectCuotas.innerHTML = `
    <option value="" disabled selected>Selecciona una opción</option>
    `
}

function simularCredito(e) {
    e.preventDefault();
    if (btnSimular.classList.contains('disabled')) {
        return;
    }
    btnSimular.classList.add('disabled');
    const alerta = document.querySelector('.alerta');
    if (alerta) {
        alerta.remove();
    }
    if (selectTipo.value === "" | selectCuotas.value === "" | inputMonto.value === "") {
        if (!alerta) {
            console.log('Todos los campos son obligatorios')
            const mensaje = document.createElement('div');
            mensaje.id = "mensaje";
            mensaje.innerHTML = `
            <p>Todos los campos son obligatorios<p>
            `;
            mensaje.classList.add("alert", "alert-danger", "text-center", "alerta");
            modalBody.appendChild(mensaje);
            $(".alerta").fadeIn(300)
            setTimeout(() => {
                $(".alerta").fadeOut(300);
                setTimeout(() => {
                    mensaje.remove();
                }, 301);
                btnSimular.classList.remove('disabled')
            }, 3000);
        }
    } else {
        if (alerta) {
            alerta.remove();
        }
        const mensaje = document.createElement('div');
        mensaje.id = "mensaje";
        mensaje.innerHTML = `
            <p>Simulando...<p>
            <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
            </div>
            `;
        //mensaje.classList.add("bg-light", "text-center", "text-secondary", "rounded");
        mensaje.classList.add("alert", "alert-primary", "text-center", "alerta");
        modalBody.appendChild(mensaje);
        $(".alerta").fadeIn(300)
        setTimeout(() => {
            const tipoCredito = selectTipo.value;
            const montoSolicitado = parseInt(inputMonto.value);
            const cuotas = parseInt(selectCuotas.value);
            const interes = (datosJson[tipoCredito].interes) / 100;
            const intereses = montoSolicitado * interes * (cuotas / 12);
            const total = montoSolicitado + intereses;
            const valorCuotas = (total / cuotas).toFixed(2);
            mensaje.innerHTML = `
                    <p>Se deberan abonar ${cuotas} cuotas de USD $${valorCuotas}<p>
                    `;
            mensaje.classList.add("alert", "alert-primary", "text-center", "alerta");
            modalBody.appendChild(mensaje);
            btnSimular.classList.remove('disabled');
        }, 2000);



    }

}