const ctx = document.getElementById("myChart").getContext("2d");

let gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, "rgba(58,123,231,1)");
gradient.addColorStop(1,"rgba(0,210,255,0.3)")

const labels = [
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
  "Pazar",
];

const data = {
  labels,
  datasets: [
    {
      data: [5, 2, 12, 6, 6, 7, 2],
      label: "Performans",
      fill: true,
      backgroundColor: gradient,
      borderColor:"#fff",
    },
  ],
};

const config = {
  type: "line",
  data: data,
  options: {
    responsive: true,
    radius:5,
    hoverRadius:12,
    hitRadius:25,
  },
};
const myChart = new Chart(ctx, config);
