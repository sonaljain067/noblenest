import AdminSideBar from '../../../components/admin/AdminSideBar'
import BarCharts from '../statistics/BarCharts'
import LineCharts from '../statistics/LineCharts'
import PieCharts from '../statistics/PieCharts'

const Statistics = () => {
  return (
    <div className="adminContainer">
      <AdminSideBar />
      <main className="statistics">
        <BarCharts />
        <PieCharts /> 
        <LineCharts />
      </main>
    </div>

  )
}

export default Statistics