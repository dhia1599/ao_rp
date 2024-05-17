import { BarChart } from '@mui/x-charts/BarChart';

export default function StackBars() {
  return (
    <div>
        <h1 className="text-2xl font-bold mb-4 text-black">Costs</h1>
        <BarChart
            series={[
                { data: [3, 4, 1, 6, 5], label: 'Materiel' },
                { data: [4, 2, 5, 4, 1], label: 'Salaires' },
                { data: [10, 6, 5, 8, 9], label: 'Autres' },
            ]}
      width={600}
      height={400}
    />
    </div>
  );
}
