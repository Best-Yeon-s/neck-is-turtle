// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/calendar
import { ResponsiveTimeRange } from '@nivo/calendar'

let data = [
    {
      "value": 141,
      "day": "2022-09-11"
    },
    {
      "value": 130,
      "day": "2022-09-23"
    },
    {
      "value": 16,
      "day": "2022-06-04"
    },
    {
      "value": 347,
      "day": "2022-07-02"
    },
    {
      "value": 313,
      "day": "2022-08-13"
    },
    {
      "value": 344,
      "day": "2022-08-02"
    },
    {
      "value": 10,
      "day": "2022-08-09"
    },
    {
      "value": 273,
      "day": "2022-09-26"
    },
    {
      "value": 274,
      "day": "2022-06-05"
    },
    {
      "value": 83,
      "day": "2022-06-25"
    },
    {
      "value": 251,
      "day": "2022-08-04"
    },
    {
      "value": 144,
      "day": "2022-09-09"
    },
    {
      "value": 141,
      "day": "2022-06-26"
    },
    {
      "value": 308,
      "day": "2022-09-14"
    },
    {
      "value": 218,
      "day": "2022-08-06"
    },
    {
      "value": 70,
      "day": "2022-09-30"
    },
    {
      "value": 178,
      "day": "2022-08-08"
    },
    {
      "value": 150,
      "day": "2022-07-24"
    },
    {
      "value": 191,
      "day": "2022-09-28"
    },
    {
      "value": 384,
      "day": "2022-09-20"
    },
    {
      "value": 22,
      "day": "2022-09-19"
    },
    {
      "value": 260,
      "day": "2022-06-13"
    },
    {
      "value": 322,
      "day": "2022-06-02"
    },
    {
      "value": 390,
      "day": "2022-06-12"
    },
    {
      "value": 358,
      "day": "2022-09-22"
    },
    {
      "value": 24,
      "day": "2022-09-03"
    },
    {
      "value": 338,
      "day": "2022-06-09"
    },
    {
      "value": 218,
      "day": "2022-06-14"
    },
    {
      "value": 9,
      "day": "2022-07-07"
    },
    {
      "value": 234,
      "day": "2022-07-15"
    },
    {
      "value": 320,
      "day": "2022-08-05"
    },
    {
      "value": 61,
      "day": "2022-06-19"
    },
    {
      "value": 14,
      "day": "2022-06-24"
    },
    {
      "value": 244,
      "day": "2022-07-16"
    },
    {
      "value": 41,
      "day": "2022-07-28"
    },
    {
      "value": 76,
      "day": "2022-09-25"
    },
    {
      "value": 41,
      "day": "2022-06-06"
    },
    {
      "value": 335,
      "day": "2022-08-07"
    },
    {
      "value": 174,
      "day": "2022-08-10"
    },
    {
      "value": 246,
      "day": "2022-09-01"
    },
    {
      "value": 331,
      "day": "2022-08-27"
    },
    {
      "value": 341,
      "day": "2022-06-15"
    },
    {
      "value": 2,
      "day": "2022-08-08"
    },
    {
      "value": 314,
      "day": "2022-06-11"
    },
    {
      "value": 154,
      "day": "2022-06-16"
    },
    {
      "value": 108,
      "day": "2022-07-13"
    },
    {
      "value": 390,
      "day": "2022-07-29"
    },
    {
      "value": 145,
      "day": "2022-08-19"
    },
    {
      "value": 182,
      "day": "2022-08-03"
    },
    {
      "value": 245,
      "day": "2022-09-16"
    },
    {
      "value": 94,
      "day": "2022-09-10"
    },
    {
      "value": 250,
      "day": "2022-08-09"
    },
    {
      "value": 335,
      "day": "2022-07-14"
    },
    {
      "value": 144,
      "day": "2022-08-03"
    },
    {
      "value": 216,
      "day": "2022-07-27"
    },
    {
      "value": 22,
      "day": "2022-08-21"
    },
    {
      "value": 331,
      "day": "2022-08-17"
    },
    {
      "value": 149,
      "day": "2022-06-23"
    },
    {
      "value": 111,
      "day": "2022-09-29"
    },
    {
      "value": 123,
      "day": "2022-06-08"
    },
    {
      "value": 246,
      "day": "2022-09-02"
    },
    {
      "value": 128,
      "day": "2022-09-12"
    },
    {
      "value": 4,
      "day": "2022-08-04"
    },
    {
      "value": 376,
      "day": "2022-07-04"
    },
    {
      "value": 18,
      "day": "2022-07-26"
    },
    {
      "value": 33,
      "day": "2022-06-07"
    },
    {
      "value": 391,
      "day": "2022-07-25"
    },
    {
      "value": 251,
      "day": "2022-08-20"
    },
    {
      "value": 178,
      "day": "2022-08-07"
    },
    {
      "value": 219,
      "day": "2022-06-18"
    },
    {
      "value": 136,
      "day": "2022-08-29"
    },
    {
      "value": 230,
      "day": "2022-06-20"
    },
    {
      "value": 164,
      "day": "2022-09-08"
    },
    {
      "value": 117,
      "day": "2022-09-27"
    },
    {
      "value": 400,
      "day": "2022-07-17"
    },
    {
      "value": 71,
      "day": "2022-08-15"
    },
    {
      "value": 212,
      "day": "2022-07-18"
    },
    {
      "value": 208,
      "day": "2022-08-01"
    },
    {
      "value": 339,
      "day": "2022-07-11"
    },
    {
      "value": 322,
      "day": "2022-07-19"
    },
    {
      "value": 26,
      "day": "2022-09-06"
    },
    {
      "value": 99,
      "day": "2022-08-31"
    },
    {
      "value": 43,
      "day": "2022-08-10"
    },
    {
      "value": 137,
      "day": "2022-09-24"
    },
    {
      "value": 157,
      "day": "2022-06-01"
    },
    {
      "value": 288,
      "day": "2022-08-26"
    },
    {
      "value": 100,
      "day": "2022-06-22"
    },
    {
      "value": 75,
      "day": "2022-06-28"
    },
    {
      "value": 286,
      "day": "2022-08-14"
    },
    {
      "value": 222,
      "day": "2022-07-09"
    },
    {
      "value": 386,
      "day": "2022-07-10"
    },
    {
      "value": 250,
      "day": "2022-06-30"
    },
    {
      "value": 231,
      "day": "2022-06-03"
    },
    {
      "value": 337,
      "day": "2022-08-02"
    },
    {
      "value": 312,
      "day": "2022-07-12"
    },
    {
      "value": 8,
      "day": "2022-07-30"
    },
    {
      "value": 178,
      "day": "2022-08-23"
    },
    {
      "value": 16,
      "day": "2022-07-20"
    },
    {
      "value": 67,
      "day": "2022-09-21"
    },
    {
      "value": 214,
      "day": "2022-07-31"
    },
    {
      "value": 279,
      "day": "2022-08-22"
    },
    {
      "value": 106,
      "day": "2022-09-15"
    },
    {
      "value": 42,
      "day": "2022-08-12"
    },
    {
      "value": 321,
      "day": "2022-08-28"
    },
    {
      "value": 263,
      "day": "2022-09-17"
    },
    {
      "value": 183,
      "day": "2022-07-23"
    },
    {
      "value": 4,
      "day": "2022-07-21"
    },
    {
      "value": 209,
      "day": "2022-07-03"
    },
    {
      "value": 133,
      "day": "2022-08-30"
    },
    {
      "value": 109,
      "day": "2022-08-18"
    },
    {
      "value": 321,
      "day": "2022-09-07"
    },
    {
      "value": 11,
      "day": "2022-07-06"
    },
    {
      "value": 96,
      "day": "2022-06-17"
    },
    {
        "value": 96,
        "day": "2022-10-16"
    }
  ]

const MissionChart = ({ /* see data tab */ }) => (
    <ResponsiveTimeRange
        data={data}
        from="2022-06-01"
        to="2022-10-16"
        emptyColor="#eeeeee"
        colors={[ '#D5E7B8', '#A7D489', '#e8c1a0', '#F47560' ]}
        margin={{ top: 40, right: 40, bottom: 100, left: 40 }}
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'row',
                justify: false,
                itemCount: 4,
                itemWidth: 42,
                itemHeight: 36,
                itemsSpacing: 14,
                itemDirection: 'right-to-left',
                translateX: -60,
                translateY: -60,
                symbolSize: 20
            }
        ]}
    />
)
export default MissionChart;