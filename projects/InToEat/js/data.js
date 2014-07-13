$(document).ready(function() {});

$.getScript('https://zmchenry.github.io/projects/InToEat/js/Chart.min.js',function(){

  var usedWastedData = [{
        value: 2224,
        color: "#64D977",
        label: "Used"
    }, {
        value: 424,
        color: "#F74D4C",
        label: "Wasted"
    }, 
    {
        value: 883,
        color: "#FFDE50",
        label: "Defective"
    }]

    var options = {
        animation: true,
        animateScale:true,
        showScale: true,
        responsive: true
    };

    //Get the context of the canvas element we want to select
    var c = $('#usedWastedChart');
    var ct = c.get(0).getContext('2d');
    var ctx = document.getElementById("usedWastedChart").getContext("2d");
    /*************************************************************************/
    myNewChart = new Chart(ct).Doughnut(usedWastedData, options);
})

function labelFormatter(label, series) {
    return "<div style='font-size:8pt; text-align:center; padding:1px; color:white;'>" + label + "<br/>" + Math.round(series.percent) + "%</div>";
}

// var data = [{
//         label: "Used",
//         data: 152,
//         color: '#55F74E'
//     }, {
//         label: "Wasted",
//         data: 29,
//         color: '#F74D4C'
//     }];

//     var additionalData = {
//         series: {
//             pie: {
//                 show: true,
//                 radius: 1,
//                 innerRadius: 0.5,
//                 label: {
//                     show: true,
//                     radius: 3/4,
//                     formatter: labelFormatter,
//                     background: {
//                         opacity: 0.5
//                     },
//                     color: "#000"
//                 }
//             }
//         },
//         grid: {
//             hoverable: true,
//             clickable: true
//         },
//         legend: {
//             show: false
//         }
//     };

// $(function() {
//     var plotObj = $.plot($("#flot-pie-chart"), data, additionalData);

// });

// window.onresize = function(event) {
//     $.plot($("#placeholder"), data, additionalData);
// }
