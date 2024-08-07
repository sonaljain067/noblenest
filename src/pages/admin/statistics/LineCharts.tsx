import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { SkeletonLoader } from '../../../components/Loader';
import { LineChart } from '../../../components/admin/Charts';
import { useLineStatsQuery } from '../../../redux/api/dashboardAPI';
import { RootState } from '../../../redux/store';
import { ErrorAPIResponse } from '../../../types/api.types';
import { getLastSixTwelveMonths } from '../../../utils/helper';

const LineCharts = () => {
  const { user } = useSelector((state: RootState) => (state.userReducer))
  const { data, isLoading, isError, error } = useLineStatsQuery(user?._id!);
  
  const {lastTwelveMonths} = getLastSixTwelveMonths(); 
  const stats = data?.data!;
  
  if(isError) {
    const err = (error as ErrorAPIResponse)?.data.message;
    toast.error(err); 
    return <Navigate to="/admin/dashboard"/>
  }
  return (
    <main className="lineChartContainer">
      {isLoading ? <SkeletonLoader/> : (<>
        <section>
          <h2>Monthly Active Users</h2>
          <LineChart
            data={stats.users}
            labels={lastTwelveMonths}
            label="Users" 
            bgColor={`rgba(53,162,255,0.2)`} borderColor={`rgba(53,162,255)`}
          />
        </section>
        <section>
          <h2>Total Products (sku)</h2>
          <LineChart 
            data={stats.products}
            labels={lastTwelveMonths}
            label="Products" 
            bgColor={`hsla(269,80%,40%,0.4)`} borderColor={`hsl(269,80%,40%)`}
          />
        </section>
        <section>
          <h2>Total Revenue</h2>
          <LineChart
            data={stats.revenue}
            labels={lastTwelveMonths}
            label="Revenue" 
            bgColor={`rgba(3, 81, 134, 0.2)`} borderColor={`rgb(3, 81, 134)`}
          />
        </section>
        <section>
          <h2>Discount Alloted</h2>
          <LineChart
            data={stats.discounts}
            labels={lastTwelveMonths}
            label="Discount" 
            bgColor={`hsla(29,80%,40%,0.4)`} borderColor={`hsl(29,80%,40%)`}
          />
        </section>
      </>)}
    </main>
  )
}

export default LineCharts