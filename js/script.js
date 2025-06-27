$(document).ready(function () {
  // Animar tarjetas al cargar
  $(".tarjeta").hide().each(function (i) {
    $(this).delay(200 * i).fadeIn(600);
  });

  //  Hover 
  $(".tarjeta").hover(
    function () {
      $(this).css("box-shadow", "0 0 10px 4px rgba(0,0,0,0.3)");
    },
    function () {
      $(this).css("box-shadow", "none");
    }
  );

  // Validar formulario contacto en consejos.html
  $("#formulario-contacto").submit(function (e) {
    e.preventDefault();

    let valido = true;

    const nombre = $("#nombre");
    const correo = $("#correo");
    const mensaje = $("#mensaje");

    // Validar nombre (no vacío)
    if (nombre.val().trim() === "") {
      nombre.addClass("is-invalid");
      valido = false;
    } else {
      nombre.removeClass("is-invalid").addClass("is-valid");
    }

    // Validar correo con regex simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo.val().trim())) {
      correo.addClass("is-invalid");
      valido = false;
    } else {
      correo.removeClass("is-invalid").addClass("is-valid");
    }

    // Validar mensaje no vacío
    if (mensaje.val().trim() === "") {
      mensaje.addClass("is-invalid");
      valido = false;
    } else {
      mensaje.removeClass("is-invalid").addClass("is-valid");
    }

    if (valido) {
      alert("Formulario enviado correctamente. ¡Gracias!");
      this.reset();
      $(".form-control").removeClass("is-valid");
    }
  });

  // Función para limpiar el campo texto: solo letras y espacios
  window.validarCampoTexto = function (input) {
    let texto = input.value;
    // Quitar caracteres que no sean letras ni espacios
    texto = texto.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
    input.value = texto;
  };

  // Evaluar test de seguridad (modal) (f=Falso, v=Verdadero)
  $("#btnEvaluar").click(function () {
    let respuestas = ["f", "v", "f", "v", "v"]; 
    let puntaje = 0;

    for (let i = 1; i <= respuestas.length; i++) {
      const seleccion = $(`input[name=q${i}]:checked`).val();
      if (seleccion === respuestas[i - 1]) {
        puntaje++;
      }
    }

    let textoResultado = "";
    if (puntaje === respuestas.length) {
      textoResultado = "¡Excelente! Tu conocimiento en ciberseguridad es muy bueno.";
    } else if (puntaje >= respuestas.length / 2) {
      textoResultado = `Bien, respondiste ${puntaje} de ${respuestas.length}. Puedes mejorar.`;
    } else {
      textoResultado = `Necesitas aprender más. No sabes nada de de ciberseguridad. Respondiste ${puntaje} de ${respuestas.length}.`;
    }

    $("#resultado-test").text(textoResultado);
  });
});
