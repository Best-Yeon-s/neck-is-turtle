import Sidebar from './Sidebar';
import Dashboard from './dashboard/index';
import './index.scss';

function Home() {
  
    return (
        <div className="home">
            <Sidebar />
            <Dashboard />
        </div>
    )
}
export default Home;