$("#btnColumnas").click(function(){

    nueva();

});
$("#btnLineas").click(function(){
    lineas();
});
$("#btnTortaprimaria").click(function(){ 

   /* $(".modal-header").css("background-color", "#343a40");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Gráfico de Torta");
    $("#modal-1").modal("show");*/
    primariatorta();
});
$("#secundariabtnTorta").click(function(){ 

   /* $(".modal-header").css("background-color", "#343a40");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Gráfico de Torta");
    $("#modal-1").modal("show");*/
    secundariatorta();
});
$("#btnPrueba").click(function(){
    /*$(".modal-header").css("background-color", "#dc3545");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Gráfico de pruebas");
    $("#modal-1").modal("show");*/
    prueba();
});


var chart1, options;
$("#btnBD").click(function(){
    $(".modal-header").css("background-color", "#17a2b8");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Gráfico desde BD");
    $("#modal-1").modal("show");
    
    $.ajax({
        url:"../vista/grafico/graficos.php",
        type: "POST",
        dataType:"json",
        success:function(data){
            options.series[0].data = data;
            chart1 = new Highcharts.Chart(options);
            console.log(data);
        }
    })    
    datos();
});

function datos(){
    var v_modal = $("#modal_1").modal({show: false});      
    options = {
        chart:{
            renderTo: 'contenedor-modal',
            type: 'column'
        },
        title:{
            text: 'Stock de Productos'
        },
        xAxis:{
            type: 'category'
        },
        yAxis:{
            title:{
                text: ' Cantidad'
            }
        },
        plotOptions: {
            series:{
                borderWidth:1,
                dataLabels:{
                    enabled:true,
                    format:'{point.y:.0f}'
                }
            }
        },
        tooltip:{
            headerFormat:"<span style='font-size:11px'> {series.name}</span><br>",
            pointFormat: "<span style='color:{point.color}'>{point.name}</span>: <b>{point.y:.0f}</b>"
        },
        series:[{
            name: "Productos",
            colorByPoint:true,
            data:[{
                     



            }],
        }]        
    }
    v_modal.on("shown",function(){});
    v_modal.modal("show");
}

function nueva(){

pruecolumnas();

}



function pruecolumnas(){
    Highcharts.chart('pagos',{
        chart:{
            type: 'column'
        },
        title:{
            text: 'Stock de Productos'
        },
        xAxis:{
            type: 'category'
        },
        yAxis:{
            title:{
                text: ' Cantidad'
            }
        },

        series:[{
            name: "Productos",
            colorByPoint:true,
            data:[],
        }] 

             
    });
}
function lineas(){
Highcharts.chart('pagos',{  
    chart:{
            type:'line'
    },
    title:{
        text:'Crecimiento del empleo por Áreas - Energía sola'
    },
    xAxis:{
        allowDecimals: false
    },
    yAxis:{
        title:{
            text:'Número de empleados'
        }
    },
    legend:{
        layout:'vertical',
        align: 'right',
        verticalAlign:'middle'
    },
    plotOptions:{
        series:{
            pointStart:2018
        }
    },
    series:[{
        name:'Instalación',
        data:[1000, 2000, 3000, 3500, 5000]
    },{
        name:'Fabricación',
        data:[1880, 2580, 3900, 4500, 4800]
    },{
        name:'Ventas',
        data:[780, 2000, 3100, 3700, 3900]
    }],    
    
});    
}
function primariatorta(){
    Highcharts.chart('grados', {
        chart:{
            type:'pie',
            plotBackgroundColor: '#f8f9fa', //color de fondo del gráfico
            plotBorderwidth: 1,
            plotShadow:false,   
        },
        title:{
          text: 'ALUMNOS MATRICULADOS. PRIMARIA. Enero 2021.' ,

        },
        tooltip:{
            pointFormat:'{series.name}:<b>{point.percentage:.2f}</b>%',
        },
        plotOptions:{

            pie:{
                allowPointSelect:true,
                cursor:'pointer',
                dataLabels:{
                    enabled: true,
                    format: '{point.name}:<b>{point.percentage:.2f}</b>%'                    
                }
            }
        },            
        series: [{
            name: 'PRIMARIA',
            colorByPoint: true,
            data:[{
                name:'PRIMERO',
                y:28.41,
                sliced:true,
                selected: true
            },{
                name:'SEGUNDO',
                y:32.84
            },{
                name:'TERCERO',
                y:25.67
            },{
                name:'CUARTO',
                y:15.18
            },{
                name:'QUINTO',
                y:32.64
            },{
                name:'SEXTO',
                y:29.6
            }]
        }]               
    });
}

function secundariatorta(){
    Highcharts.chart('grados', {
        chart:{
            type:'pie',
            plotBackgroundColor: '#f8f9fa', //color de fondo del gráfico
            plotBorderwidth: 1,
            plotShadow:false,   
        },
        title:{
          text: 'ALUMNOS MATRICULADOS. SECUNDARIA. Enero 2021.' ,

        },
        tooltip:{
            pointFormat:'{series.name}:<b>{point.percentage:.2f}</b>%',
        },
        plotOptions:{

            pie:{
                allowPointSelect:true,
                cursor:'pointer',
                dataLabels:{
                    enabled: true,
                    format: '{point.name}:<b>{point.percentage:.2f}</b>%'                    
                }
            }
        },            
        series: [{
            name: 'SECUNDARIA',
            colorByPoint: true,
            data:[{
                name:'PRIMERO',
                y:30.41,
                sliced:true,
                selected: true
            },{
                name:'SEGUNDO',
                y:11.84
            },{
                name:'TERCERO',
                y:20.67
            },{
                name:'CUARTO',
                y:28.18
            },{
                name:'QUINTO',
                y:32.64
            }]
        }]               
    });
}




function fcolumnas(){
    $.ajax({
        url:"../vista/grafico/graficos.php",
        type: "POST",
        dataType:"json",
        success:function(data){
            options.series[0].data = data;
            chart1 = new Highcharts.Chart(options);
            console.log(data);
        }
    })    
    fdatos();
         
}


function fdatos(){

  Highcharts.chart('pagos',{  
     chart:{
            type: 'column'
        },
        title:{
            text: 'Stock de Productos'
        },
        xAxis:{
            type: 'category'
        },
        yAxis:{
            title:{
                text: ' Cantidad'
            }
        },
    plotOptions: {
            series:{
                borderWidth:1,
                dataLabels:{
                    enabled:true,
                    format:'{point.y:.0f}'
                }
            }
        },
        tooltip:{
            headerFormat:"<span style='font-size:11px'> {series.name}</span><br>",
            pointFormat: "<span style='color:{point.color}'>{point.name}</span>: <b>{point.y:.0f}</b>"
            

        },series:[{
            name: "Productos",
            colorByPoint:true,
            data:[],
        }]    
    
});




/*

    Highcharts.chart('pagos',{ 
        chart:{
            type: 'column'
        },
        title:{
            text: 'Stock de Productos'
        },
        xAxis:{
            type: 'category'
        },
        yAxis:{
            title:{
                text: ' Cantidad'
            }
        },
        plotOptions: {
            series:{
                borderWidth:1,
                dataLabels:{
                    enabled:true,
                    format:'{point.y:.0f}'
                }
            }
        },
        tooltip:{
            headerFormat:"<span style='font-size:11px'> {series.name}</span><br>",
            pointFormat: "<span style='color:{point.color}'>{point.name}</span>: <b>{point.y:.0f}</b>"
            

        },
        series:[{
            name: "Productos",
            colorByPoint:true,
            data:[],
        }]        
    
});*/
    
}
