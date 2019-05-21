import React from 'react'
import {
  // Donut,
  // Legend,
  // Line,
  Bar,
  // StackedArea,
  Tooltip,
  // withResponsiveness,
  // ResponsiveContainer
} from 'britecharts-react'

export const CategoryBarChart = ({data}) => {
  return (
    <div className="Chart">
      <Bar
        data={data}
        margin={{top: 50, bottom: 50, left: 50, right: 50}}
        width={700}
        height={700}
        isAnimated="true"
        // style={{color: "white"}}
      />
    </div>
  )
}
