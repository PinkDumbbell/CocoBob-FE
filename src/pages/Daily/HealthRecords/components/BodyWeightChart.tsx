import { BodyWeightHistoryType } from '@/store/api/dailyApi';
import { theme } from '@/styles/theme';
import Chart from 'react-apexcharts';

export default function BodyWeightHistory({ data }: { data: BodyWeightHistoryType[] }) {
  return (
    <Chart
      type="line"
      width="340"
      height="250"
      options={{
        xaxis: {
          categories: data.map(({ date }) => date),
        },
        chart: {
          toolbar: { show: false },
        },
        stroke: {
          curve: 'smooth',
          width: 2,
          colors: [theme.colors.primary.main],
        },
        markers: {
          size: 4,
          colors: theme.colors.primary.dark,
        },
      }}
      series={[
        {
          name: 'bodyWeights',
          data: data.map(({ bodyWeight }) => bodyWeight),
        },
      ]}
    />
  );
}
