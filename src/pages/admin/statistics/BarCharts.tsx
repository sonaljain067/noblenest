import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { SkeletonLoader } from '../../../components/Loader';
import { BarChart } from '../../../components/admin/Charts';
import { useBarStatsQuery } from '../../../redux/api/dashboardAPI';
import { RootState } from '../../../redux/store';
import { ErrorAPIResponse } from '../../../types/api.types';
import { getLastSixTwelveMonths } from '../../../utils/helper';

const BarCharts = () => {
  const { user } = useSelector((state: RootState) => (state.userReducer))
  const { data, isLoading, isError, error } = useBarStatsQuery(user?._id!);
  
  const {lastSixMonths, lastTwelveMonths} = getLastSixTwelveMonths(); 

  const stats = data?.data!;
  
  if(isError) {
    const err = (error as ErrorAPIResponse)?.data.message;
    toast.error(err); 
    return <Navigate to="/admin/dashboard"/>
  }
  return (
    <main className="barChartContainer">
      {isLoading ? <SkeletonLoader/> : (<>
        <section>
          <h2>Top Selling Products & Top Customers</h2>
          <BarChart 
            data={stats.products}
            data1={stats.users}
            labels={lastSixMonths}
            title="Product" title1="Users" bgColor={`hsl(260, 50%,30%)`} bgColor1={`hsl(360,90%,90%)`}
          />
        </section>
        <section>
          <h2>Orders throughout the year</h2>
          <BarChart horizontal={true}
            data={stats.orders}
            data1={[]}
            labels={lastTwelveMonths}
            title="Product" title1="Users" bgColor={`hsl(180, 40%, 50%)`} bgColor1=""
          />            
        </section>
      </>
      )}
      </main>
    
  )
}

export default BarCharts