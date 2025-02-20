$(document).ready(function () {
  $("#btnSend").on("click", (e) => {
    e.preventDefault();

    const regexValidacion = /^[a-záéíóúñ0-9\s.]+$/i;
    let idSuperHero = $("#heroName").val();

    if (
      regexValidacion.test(idSuperHero) &&
      idSuperHero < 732 &&
      idSuperHero > 0
    ) {
      getHero(idSuperHero);
    } else {
      failRegex(idSuperHero);
    }
  });

  const getHero = (idSuperHero) => {
    $.ajax({
      type: "GET",
      url:
        "https://www.superheroapi.com/api.php/3525635500807579/" + idSuperHero,
      contentType: "application/json",
      dataType: "json",
      success: (data) => {
        if (data != undefined || data != null) {
          renderData(data);
          console.log(data);
        } else if (data == null || data == undefined) {
          alert("No se encontraron datos");
          return;
        }
      },
      error: (error) => {
        console.log("Error, data llego sin datos");
      },
    });
  };

  const renderData = (data) => {
    console.log(data);

    $("#heroName").val("");
    dataGraph(data);

    $("#card-img").attr("src", data.image.url);
    $("#card-title").text(`Nombre: ${data.name} `);
    $("#card-info").text(data.connections["group-affiliation"]);
    $("#card-info-1").text(`Publicado por: ${data.biography.publisher}`);
    $("#card-info-2").text(`Ocupación: ${data.work.occupation}`);
    $("#card-info-3").text(`Primera aparición: ${data.biography["first-appearance"]}`);
    $("#card-info-4").text(`Altura: ${data.appearance.height}`);
    $("#card-info-5").text(`Peso: ${data.appearance.weight}`);
    $("#card-info-6").text(`Alianzas: ${data.biography.aliases}`);
    $("#card-show").removeClass("d-none");
    

   
  };

  const dataGraph = (data) => {
    let { powerstats: stats } = data;
    const powerstats = data.powerstats;

    const statsdata = [];
    for (const key in powerstats) {
      statsdata.push({ label: key, y: Number(powerstats[key]) ?? 20 });
      
    };
    

    let chart = new CanvasJS.Chart("graphContainer", {
      theme: "dark2", // "light1", "light2", "dark1", "dark2"
      //exportEnabled: true,
      animationEnabled: true,
      title: {
        text: `Estadisticas de Poder para "${data.name}`,
        
        
      },
      
      data: [
        {
          type: "pie",
          startAngle: 25,
          toolTipContent: "<b>{label}</b>: {y}",
          showInLegend: "true",
          legendText: "{label}",
          indexLabelFontSize: 16,
          indexLabel: "{label} - ({y})",
          dataPoints: statsdata,
        },
      ],
    });
    chart.render();

      };

  const failRegex = (idSuperHero) => {
    $("#modalLabel").text(`El Heroe con id: ${idSuperHero} no existe`);
    $("#exampleModal").modal("show");
    $("#modalBody").text(
      `Por favor introduce un ID numérico valido y menor a 732`
    );
    $("#pokeName").val("");
    console.log("Error al capturar datos por fracaso de validacion en regex ");
  };
});
