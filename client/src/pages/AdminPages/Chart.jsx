import BarsCharts from '../../components/adminComponents/Charts/BarsCharts';
import LinesChart from '../../components/adminComponents/Charts/LineChart';
import Pies from '../../components/adminComponents/Charts/PiesCharts';

const Chart = () => {
  return (
    <div className='flex flex-wrap justify-start w-full'>
      <div className='flex flex-wrap mx-auto my-0 w-fit'>
        <div className=' w-96'>
          <LinesChart />
        </div>
        <div className=' w-96'>
          <BarsCharts />
        </div>
      </div>

      <div className='flex flex-wrap mx-auto my-0 w-fit'>
        <div className='h-96 w-96 '>
          <Pies />
        </div>
        <div className='h-96 w-96 '>
          <Pies />
        </div>
      </div>
    </div>
  );
};

export default Chart;
