import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

Chartjs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

let beneficios = [0, 10, 20, 30, 40, -50, 60, 70, 80, 90];
let meses = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];
let midata = {
  labels: meses,
  datasets: [
    {
      label: 'Beneficios',
      data: beneficios,
      tension: 0.5,
      fill: true,
      backgroundColor: 'rgba(153, 102, 255, 0.3)',
      borderColor: ['rgba(153, 102, 255, .4)'],
      pointRadios: 5,
      pointBorderColor: 'rgba(49, 0, 147, 0.6)',
      pointBackgroundColor: 'rgba(49, 0, 147, 1)',
    },
  ],
};

let misoptions = {
  scales: {
    y: {
      //   min: 0,
    },
    x: {
      ticks: { color: 'rgba(49, 0, 147, 0.6)' },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

export default function LinesChart() {
  return <Line data={midata} options={misoptions} />;
}
