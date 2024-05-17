import { LineChart } from '@mui/x-charts/LineChart';

export default function MarkOptimization() {
  return (
    <div>
        <h1 className="text-2xl font-bold mb-4 text-black">taux de revenus</h1>
        <LineChart
        xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
        series={[
            {
                curve: "linear",
                data: [6, 5, 7, 6, 4, 5, 5, 6, 5, 6],
                showMark: ({ index }) => index % 2 === 0,
            },
        ]}
        width={600}
        height={400}
        />
    </div>
  );
}
