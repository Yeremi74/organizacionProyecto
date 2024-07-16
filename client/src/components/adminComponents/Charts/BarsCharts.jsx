import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

var beneficios = [72, 56, 20, 36, 80, 40, 30, -20, 25, 30, 12, 60];
var meses = [
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

var misoptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      ticks: { color: 'rgba(49, 0, 147, 0.6)' },
    },
  },
};

var midata = {
  labels: meses,
  datasets: [
    {
      label: 'Beneficios',
      data: beneficios,
      backgroundColor: [
        'rgba(255, 99, 132, .4)',
        'rgba(255, 206, 86, .4)',
        'rgba(54, 162, 235, .4)',
        'rgba(75, 192, 192, .4)',
        'rgba(153, 102, 255, .4)',
      ],
    },
  ],
};

export default function Bars() {
  return <Bar data={midata} options={misoptions} />;
}
