const Loader = () => {
  return (
    <section className="loader">
      <div>Loading.....</div>
    </section>
  )
}


export const SkeletonLoader = ({ length = 15 }: { length?: number}) => {
  const skeletons = Array.from({ length }, (_, idx) =>  <div key 
={idx} className="skeleton-shape"></div>)
  return <div className="skeleton-loader">
    {skeletons}
  </div>
}

  
export default Loader