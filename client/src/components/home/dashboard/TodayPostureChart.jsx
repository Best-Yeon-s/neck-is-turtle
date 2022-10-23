import { ResponsivePie } from '@nivo/pie'

let data = [
    {
        "id": "바른 자세",
        "label": "바른 자세",
        "value": 84,
    },
    {
        "id": "turtle",
        "label": "거북목 자세",
        "value": 16,
    },
]

const TodayPostureChart = ({  /* see data tab */ }) => (
    <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        sortByValue={true}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={['#89c264', '#F47560']}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsStraightLength={20}
        arcLinkLabelsDiagonalLength={0}
        arcLinkLabelsColor={{ from: 'color', modifiers: [] }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor="#ffffff"
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'turtle'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'lisp'
                },
                id: 'lines'
            },
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
)
export default TodayPostureChart;