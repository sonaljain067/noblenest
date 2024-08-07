import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { SkeletonLoader } from '../../../components/Loader';
import { DoughnutChart, PieChart } from '../../../components/admin/Charts';
import { usePieStatsQuery } from '../../../redux/api/dashboardAPI';
import { RootState } from '../../../redux/store';
import { ErrorAPIResponse } from '../../../types/api.types';

const PieCharts = () => {
  const { user } = useSelector((state: RootState) => (state.userReducer))
  const { data, isLoading, isError, error } = usePieStatsQuery(user?._id!);

  const stats = data?.data!;
  
  if(isError) {
    const err = (error as ErrorAPIResponse)?.data.message;
    toast.error(err); 
    return <Navigate to="/admin/dashboard"/>
  }
  return (
    <main className="pieChartContainer">
    {isLoading ? <SkeletonLoader/> : (<>
      <section>
        <h2>Order Fullfillment Ratio</h2>
        <div>
          <PieChart labels={Object.keys(stats.orderFullfillment)} data={Object.values(stats.orderFullfillment)} 
          bgColor={[`hsl(200,80%,80%)`, `hsl(200,80%,50%)`, `hsl(200,40%,50%)`]} offset={[0,0,50]} />
        </div>
      </section>
      <section>
        <h2>Products Category Ratio</h2>
        <div>
          <DoughnutChart 
            labels={stats.categories.map(category => category.category)} 
            data={stats.categories.map(category => category.count)} 
            bgColor={stats.categories.map(category => `hsl(${category.count*4},${category.count*Math.random()*3}%,80%)`)}
            legends={false} 
            offset={[0,50,20,0,0,0,0,0]}
            />
        </div>
      </section>
      <section>
        <h2>Stock Availability</h2>
        <div>
          <DoughnutChart 
            labels={Object.keys(stats.stockCount)} 
            data={Object.values(stats.stockCount)} 
            bgColor={["hsl(200,80%,40%)", "hsl(250,80%,40%)"]}
            legends={false} 
            offset={[0,50]}
            cutOut={100}
            />
        </div>
      </section>
      <section>
        <h2>Revenue Distribution</h2>
        <div>
          <DoughnutChart 
            labels={Object.keys(stats.amountSplit)}
            data={Object.values(stats.amountSplit)}
            bgColor={["hsl(200,80%,40%)","hsl(210,80%,40%)","hsl(220,60%,40%)","hsl(230,80%,40%)","hsl(240,80%,20%)"]}
            legends={false} 
            offset={[0,0,20,0,50]}
            cutOut={80}
            />
        </div>
      </section>
      <section>
          <h2>Users Age Group</h2>
          <div>
            <PieChart 
              labels={["Teenager(Below 20)", "Adult(20-40)", "Older(Above 40)"]} 
              data={Object.values(stats.usersAgeGroup)} 
              bgColor={[`hsl(209,80%,80%)`, `hsl(209,80%,50%)`, `hsl(209,40%,50%)`]} offset={[0,0,50]} />
          </div>
      </section>
      <section>
        <h2>Access Ratio</h2>
        <div>
          <DoughnutChart 
            labels={["Admin", "Customers"]} 
            data={Object.values(stats.accessRoleSplit)} 
            bgColor={["hsl(200,100%,38%)", "hsl(250,98%,50%)"]}
            legends={false} 
            offset={[30,10]}
            cutOut={100}
            />
        </div>
      </section>
    </>
    )}
    </main>
  )
}

export default PieCharts