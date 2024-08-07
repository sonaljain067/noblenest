import { toast } from "react-hot-toast";
import { BiMaleFemale } from "react-icons/bi";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import { TbActivityHeartbeat } from "react-icons/tb";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { SkeletonLoader } from "../../../components/Loader";
import AdminSideBar from "../../../components/admin/AdminSideBar";
import { BarChart, DoughnutChart } from "../../../components/admin/Charts";
import DashboardTable from "../../../components/admin/DashboardTable";
import { useStatsQuery } from "../../../redux/api/dashboardAPI";
import { RootState } from "../../../redux/store";
import { ErrorAPIResponse } from "../../../types/api.types";
import { CategoryItemProps, WidgetComponentProps } from "../../../types/dash.types";

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => (state.userReducer))
  const { data, isLoading, isError, error } = useStatsQuery(user?._id!);

  const stats = data?.data!;

  if(isError) {
    const err = (error as ErrorAPIResponse)?.data.message;
    toast.error(err); 
    return <Navigate to="/"/>
  }

  return (
    <div className="adminContainer">
      <AdminSideBar />
      {isLoading ? <SkeletonLoader/> : (
        <div className="dashboard">
          {/* <div className="searchBar">
            <FaSearchengin />
            <input type = "text" placeholder = "Search for data, users, logs" />
            <HiMiniBellAlert />
            <FaUserCircle />
          </div> */}
          <section className="widgetContainer">
            <WidgetComponent heading="Revenue" value={stats?.total.revenue.toString()} amount={true} percent={stats.percentChange.revenue} color="rgb(0 115 255)" />
            <WidgetComponent heading="Users" value={stats?.total.user.toString()} percent={stats.percentChange.user} color="rgb(0 198 202)" />
            <WidgetComponent heading="Transactions" value={stats?.total.order.toString()} percent={stats.percentChange.order} color="rgb(255 196 0)" />
            <WidgetComponent heading="Products" value={stats.total.product.toString()} percent={stats.percentChange.product} color="rgb(75 0 255)" />
          </section>
          <section className="graphContainer">
            <div className="revenueChart">
              <h2>Revenue & Transactions</h2> 
              <BarChart 
              data={stats.chart.revenue} 
              data1={stats.chart.order} 
              title="Revenue"
              title1="Transactions"
              bgColor="rbg(100,115,255)"
              bgColor1="rgba(53,162,235,0.8)"
              />
            </div>
            <div className="dashboardCategories">
              <h2>Inventory</h2>
              <div>
                {stats.categories.map((category) => (
                  <CategoryComponent key = {category.category} heading = {category.category} value = {category.count} color = {`hsl(${category.count * Math.random()*360},${category.count}%,50%)`}/>
                ))}
              </div>
            </div>
          </section>
          <section className="transactionContainer">
            <div className="genderChart">
              <h2>Gender Ratio</h2>
                <DoughnutChart 
                  labels = {["Female", "Male"]}
                  data = {[stats.userRatio.Female, stats.userRatio.Male]}
                  bgColor = {["hsl(340,82%,56%", "rgba(53,162,235,0.8)"]}
                  cutOut={90}
                />
              <p><BiMaleFemale /></p>
            </div>
            <div className="transactionTable">
              <DashboardTable data = {stats.latestTransactions}/>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}


const WidgetComponent = ({ heading, value, percent, color, amount }: WidgetComponentProps) => (
  <article className="widget">
    <div className="widgetInfo">
      <p>{ heading }</p>
      <h4>{amount ? `$${value}` : value }</h4>
      <p>
      {(percent > 0) && 
        (<span className="green"> <HiTrendingUp />+{percent}%</span>)}
      {percent == 0 && <span className="yellow"><TbActivityHeartbeat/>{percent}%</span>}
      {percent < 0 && (<span className="red"> <HiTrendingDown />{percent}%</span>)}
      </p>
      
    </div>
    <div className="widgetCircle" style={{
      background: `conic-gradient(${color} ${Math.abs(percent)*360/100}deg, rgb(255, 255,255) 0)`
    }}>
      <span style={{
        color
      }}>
        {percent > 0 && `${percent > 10000 ? 9999 : percent}%`}
        {percent <= 0 && `${percent < -10000 ? -9999 : percent}%`}
      </span>
    </div>
  </article>
)  

const CategoryComponent = ({ heading, value, color}: CategoryItemProps) => (
  <div className="categoryItem">
    <h5>{heading}</h5>
    <div>
      <div style={{backgroundColor: color, width: `${value}%`}}></div>
    </div>
    <span>{value}%</span>
</div>
)
export default Dashboard