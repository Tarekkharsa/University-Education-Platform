import {merge} from 'lodash'
import ReactApexChart from 'react-apexcharts'
// material
import {Card, CardHeader, Box} from '@mui/material'
//
import {BaseOptionChart} from '../../../components/charts'

// ----------------------------------------------------------------------
// 'السنة الاولى': '8',
// 'السنة الثانية': '13',
// 'السنة الثالثة': '14',
// 'السنة الرابعة - برمجيات': '15',
// 'السنة الرابعة -شبكات': '16',
// 'السنة الرابعة -ذكاء الصنعي': '17',
// 'السنة الخامسة - برمجيات': '18',
// 'السنة الخامسة - شبكات': '19',
// 'السنة الخامسة - ذكاء صنعي': '20',

const CHART_DATA = [
  {
    name: 'السنة الأولى',
    type: 'column',
    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
  },
  {
    name: 'السنة الثانية',
    type: 'area',
    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
  },
  {
    name: 'لسنة الثالثة',
    type: 'line',
    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
  },
  {
    name: 'السنة الرابعة',
    type: 'line',
    data: [47, 59, 45, 70, 22, 27, 37, 21, 44, 22, 30],
  },
  {
    name: 'السنة الخامسة',
    type: 'line',
    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
  },
]

export default function AppWebsiteVisits() {
  const chartOptions = merge(BaseOptionChart(), {
    stroke: {width: [0, 2, 3]},
    plotOptions: {bar: {columnWidth: '11%', borderRadius: 4}},
    fill: {type: ['solid', 'gradient', 'solid']},
    labels: [
      '01/01/2003',
      '02/01/2003',
      '03/01/2003',
      '04/01/2003',
      '05/01/2003',
      '06/01/2003',
      '07/01/2003',
      '08/01/2003',
      '09/01/2003',
      '10/01/2003',
      '11/01/2003',
    ],
    xaxis: {type: 'datetime'},
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: y => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} visits`
          }
          return y
        },
      },
    },
  })

  return (
    <Card>
      <CardHeader title="Website Visits" subheader="(+43%) than last year" />
      <Box sx={{p: 3, pb: 1}} dir="ltr">
        <ReactApexChart
          type="line"
          series={CHART_DATA}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  )
}
