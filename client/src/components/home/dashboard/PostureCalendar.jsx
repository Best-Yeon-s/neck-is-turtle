import MyResponsiveTimeRange from "./CalendarChart";

function PostureCalendar() {

    return (
        <div className="posture-calendar chart-wrapper">
            <div className="chart-title">자세</div>
            <div className="calendar-chart">
                <MyResponsiveTimeRange />
            </div>
        </div>
    )
}
export default PostureCalendar;