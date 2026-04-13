const sections = {
  "Kiln 1": {
    total: 289227,
    compressors: {
      "800.50": 115259,
      "800.53": 20032.75,
      "800.51": 153935
    }
  },
  "Kiln 2": {
    total: 84984.97,
    compressors: {
      "800.13": 7022.46,
      "800.12": 31552,
      "800.10": 35981
    }
  },
  "Kiln 3": {
    total: 125242.66,
    compressors: {
      "B-09": 123407.69,
      "B-12": 1621,
      "B-05": 213.25
    }
  },
  "Coal Mill": {
    total: 73345.72,
    compressors: {
      "800.52": 36638.22,
      "B-03": 36707.50
    }
  },
  "Cement": {
    total: 265643.09,
    compressors: {
      "800.08": 58534.75,
      "800.07": 119207.75,
      "800.10": 87900.59
    }
  },
  "Packing": {
    total: 59876.76,
    compressors: {
      "B-10": 53542.5,
      "B-11": 1193,
      "644.02": 5141.26
    }
  }
};

// TOTAL ENERGY
const totalEnergy = Object.values(sections)
  .reduce((sum, sec) => sum + sec.total, 0);

document.getElementById("totalEnergy").innerText =
  totalEnergy.toFixed(2) + " kWh";

// MAIN PIE (with %)
const labels = Object.keys(sections);
const values = Object.values(sections).map(s => s.total);

const mainChart = new Chart(document.getElementById("mainChart"), {
  type: "doughnut",
  data: {
    labels: labels,
    datasets: [{
      data: values,
      backgroundColor: ["cyan","blue","purple","orange","pink","green"]
    }]
  },
  options: {
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            let value = context.raw;
            let percent = ((value / totalEnergy) * 100).toFixed(1);
            return context.label + ": " + percent + "% (" + value + " kWh)";
          }
        }
      }
    },
    onClick: (e, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        showDrillChart(labels[index]);
      }
    }
  }
});

// DRILL CHART FUNCTION
let drillChart;

function showDrillChart(sectionName) {

  const compData = sections[sectionName].compressors;
  const total = sections[sectionName].total;

  const compLabels = Object.keys(compData);
  const compValues = Object.values(compData);

  if (drillChart) drillChart.destroy();

  drillChart = new Chart(document.getElementById("drillChart"), {
    type: "pie",
    data: {
      labels: compLabels,
      datasets: [{
        data: compValues,
        backgroundColor: ["#00f5ff","#008cff","#7a00ff","#ff008c","#00ff99"]
      }]
    },
    options: {
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              let value = context.raw;
              let percent = ((value / total) * 100).toFixed(1);
              return context.label + ": " + percent + "% (" + value + " kWh)";
            }
          }
        }
      }
    }
  });
}
