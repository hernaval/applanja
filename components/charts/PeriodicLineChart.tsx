import React from 'react'
import { Dimensions } from 'react-native'
import { LineChart } from 'react-native-chart-kit'

type PeriodicLineChartProps = {
    labels: string[]
    data: number[]
}
const PeriodicLineChart = (props: PeriodicLineChartProps) => {
    const {labels, data} = props
  return (
    <LineChart
    data={{
      labels: labels,
      datasets: [
        {
          data: data
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    yAxisSuffix="kg"
    chartConfig={{
    //   backgroundColor: "#e26a00",
    // backgroundColor: '#ffefff',
    // backgroundGradientFrom: '#ffffff',
    // backgroundGradientTo: '#ffffff',
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 1, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "4",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      marginRight: 16,
      borderRadius: 16
    }}
  />
  )
}

export default PeriodicLineChart