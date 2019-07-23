import React from 'react'
import {
  Donut,
  Legend,
  // Line,
  Bar,
  GroupedBar,
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
        margin={{top: 30, bottom: 30, left: 30, right: 30}}
        width={400}
        height={400}
        colorSchema={colors.colorSchemas.purple}
        isAnimated="true"
        />
        <Legend
          data={data}
          numberFormat="($,.2f"
          colorSchema={colors.colorSchemas.purple}
          height={data.length * 25}
        />
    </div>
  )
}

export const YearlyDeltaGroupBarChart = ({data, viewMode}) => {
  const {figures, legend} = data
  return (
    <div className="Chart">
      <h3 className="ChartHeader">{viewMode} Yearly Delta</h3>
      <GroupedBar
        data={figures}
        margin={{top: 30, bottom: 30, left: 30, right: 30}}
        width={600}
        height={400}
        colorSchema={colors.colorSchemas.purple}
        // isAnimated="true"
        />
        <Legend
          data={legend}
          numberFormat="($,.2f"
          colorSchema={colors.colorSchemas.purple}
          height={data.length * 25}
        />
    </div>
  )
}

