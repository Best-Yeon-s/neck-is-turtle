import MyResponsiveBar from './PoseTimeStackChart';

function PoseGraph() {

    return (
        <div className="pose-graph chart-wrapper">
            <div className="chart-title">변화 추이</div>
            <div className="pose-graph-chart">
              <MyResponsiveBar />
            </div>
        </div>
    )
}
export default PoseGraph;