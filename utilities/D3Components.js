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

const categories = [
  'Beverages',
  'Condiments',
  'Confections',
  'Dairy Products',
  'Grains/Cereals',
  'Meat/Poultry',
  'Produce',
  'Seafood'
]

export const CategoryPieChart = ({data, viewMode, customer}) => {
  return (
    <div className="Chart">
      <h3 className="ChartHeader">{customer}</h3>
      <h3 className="ChartHeader">{viewMode} by Category</h3>
      <Donut
        data={data}
        margin={{top: 30, bottom: 30, left: 30, right: 30}}
        width={400}
        height={400}
        colorSchema={["#6aedc7", "#39c2c9", "#ffce00", "#ffa71a", "#f866b9", "#998ce3", '#0000ff', '#00FF00']}
        isAnimated="true"
        />
        <Legend
          data={data}
          numberFormat="($,.0f"
          colorSchema={["#6aedc7", "#39c2c9", "#ffce00", "#ffa71a", "#f866b9", "#998ce3", '#0000ff', '#00FF00']}
          height={data.length * 25}
        />
    </div>
  )
}

export const CategoryPieDataInit = categories.reduce((accum, cat) => {
  accum[cat] = {
    quantity: 0.01,
    name: cat
  }
  return accum
},{})

export const YearlyDeltaDataInit = year => {
  return categories.reduce((accum, cat) => {
    accum[cat] = {
      value: 0.01,
      name: year,
      group: cat
    }
    return accum
  },{})
}

export const YearlyDeltaGroupBarChart = ({data, viewMode, customer}) => {
  const {figures, legend} = data
  return (
    <div className="Chart">
      <h3 className="ChartHeader">{customer}</h3>
      <h3 className="ChartHeader">{viewMode} Yearly Delta</h3>
      <GroupedBar
        data={figures}
        margin={{top: 30, bottom: 30, left: 30, right: 30}}
        width={600}
        height={400}
        colorSchema={["#998ce3", '#0000ff', '#00FF00', "#6aedc7", "#39c2c9", "#ffce00", "#ffa71a", "#f866b9"]}
        // isAnimated="true"
        />
        <Legend
          data={legend}
          numberFormat="($,.0f"
          colorSchema={["#6aedc7", "#39c2c9", "#ffce00", "#ffa71a", "#f866b9", "#998ce3", '#0000ff', '#00FF00']}
          height={data.length * 25}
        />
    </div>
  )
}

