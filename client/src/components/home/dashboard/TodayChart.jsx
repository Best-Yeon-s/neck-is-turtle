import Mission from '../mission';
import MyResponsivePie from './TodayPieChart';

const missionList = [
  { complete: false, name: '바른자세 연속 15분 달성하기' },
  { complete: false, name: '바른 자세 시간 30분 이상 채우기' },
  { complete: true, name: '스트레칭 하기' },
]

export function TodayChart() {
  return (
    <div className="today-chart chart-wrapper">
        <div className="chart-title">Today</div>
        <div className="today-status-wrapper">
            <div className="today-status-chart">
                <MyResponsivePie/>
            </div>
            <div className="today-time-mission-wrapper">
              <div className="today-straight-time">
                <div className="straight-title">바른 자세 시간</div>
                <div className="straight-time">5h 30min</div>
              </div>
              <Mission missionList={missionList}/>
            </div>
        </div>

    </div>
  )
}
