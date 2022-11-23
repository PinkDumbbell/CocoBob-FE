import { RecentBodyWeightType } from '@/store/api/dailyApi';
import { theme } from '@/styles/theme';
import Chart from 'react-apexcharts';

export default function BodyWeightHistory({ data }: { data: RecentBodyWeightType }) {
  const chartKeys = Object.keys(data).sort();
  return (
    <Chart
      type="line"
      width="340"
      height="250"
      options={{
        xaxis: {
          categories: chartKeys,
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
          name: '몸무게',
          data: chartKeys.map((xaxis) => data[xaxis]),
        },
      ]}
    />
  );
}
