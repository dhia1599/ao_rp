import StackBars from '../../components/cost';
import ClientsList from '../../components/dashboard-clients-list';
import PieActiveArc from '../../components/pie-chart';
import MarkOptimization from '../../components/taux';

function Home() {
  return (
    <div className='flex flex-col w-full px-4 items-center gap-8'>
      <div className="flex w-full h-full gap-8">
        <div className="flex-1">
          <ClientsList />
        </div>
        <div className="flex-1">
          <PieActiveArc />
        </div>
      </div>
      <StackBars />
      <MarkOptimization />
    </div>
    
  );
  
}

export default Home;
