import { PieChart } from '@mui/x-charts/PieChart';

const data = [
  { id: 0, value: 60, label: 'Ressources' },
  { id: 1, value: 25, label: 'Dépenses' },
  { id: 2, value: 15, label: 'Approvisionnement' },
];

export default function PieActiveArc() {
  return (
    <div className='w-full flex flex-col'>
      <h1 className="text-2xl font-bold mb-4 text-black">Budget</h1>
      <h3 className='text-xl font -bold mb-4 text-black text-center'>May</h3>
      <h3 className='text-xl font -bold mb-4 text-black text-center'>150.000,56</h3>
      <PieChart
      series={[
        {
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      height={200}
    />
    </div>
  );
}