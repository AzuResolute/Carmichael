import React from 'react'
import {
  Donut,
  Legend,
  // Line,
  Bar,
  // StackedArea,
  Tooltip,
  // withResponsiveness,
  ResponsiveContainer
} from 'britecharts-react'
import {colors} from 'britecharts'

export const CategoryPieChart = ({data, viewMode}) => {
  return (
    <div className="Chart">
      <h3 className="ChartHeader">{viewMode} by Category</h3>
      <Donut
        data={data}
        margin={{top: 50, bottom: 50, left: 50, right: 50}}
        width={400}
        height={400}
        colorSchema={colors.colorSchemas.britecharts}
        isAnimated="true"
        />
        <Legend
          data={data}
          numberFormat="($,.2f"
          height={data.length * 25}
        />
    </div>
  )
}
