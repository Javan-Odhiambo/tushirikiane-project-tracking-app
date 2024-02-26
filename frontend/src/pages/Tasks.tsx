import React, { useEffect, useState } from 'react';
import Header from '../components/Header'

const Tasks: React.FC = () => {

    const [activeTabID, setActiveTabID] = useState<String>('assigned_btn');
    useEffect(() => {
        const tabs = document.querySelectorAll<HTMLElement>(".heading_btn");
        tabs.forEach(tab => tab.classList.remove("active_tab"));
        const sections = document.querySelectorAll<HTMLElement>(".tab-content");
        sections.forEach(section => section.classList.add("hidden"));

        const activeTab = document.querySelector<HTMLElement>(`#${activeTabID}`);
        activeTab?.classList.add("active_tab");
        const activeSection = document.querySelector<HTMLElement>(activeTab?.dataset.section || '');
        activeSection?.classList.remove("hidden");

    }, [activeTabID]);

  return (
    <>
    <Header/>
    <main className="flex-grow flex flex-col items-center">
    <h1 className="text-3xl font-bold my-4">My Tasks</h1>
    
    <section className="border border-indigo-200 rounded-md overflow-hidden shadow mx-4 md:w-2/3 lg:w-1/2">

        <div className="flex text-lg border-b border-indigo-200 font-semibold text-center">
            <span onClick={e => setActiveTabID(e.target.id)} id="assigned_btn" data-section="#assigned" className="heading_btn border-r border-indigo-200 hover:cursor-pointer flex-1 py-1">Assigned</span>
            <span onClick={e => setActiveTabID(e.target.id)} id="in_progress_btn" data-section="#in_progress" className="heading_btn border-r border-indigo-200 hover:cursor-pointer flex-1 py-1">In Progress</span>
            <span onClick={e => setActiveTabID(e.target.id)} id="completed_btn" data-section="#completed" className="heading_btn hover:cursor-pointer flex-1 py-1">Completed</span>
        </div>

        {/* <!-----Tasks container-------> */}
        <div className="flex">

            {/* <!---------------Assigned tasks container-----------------------> */}
            <div id="assigned" className='tab-content'>  

                <div className="border-b border-gray-200 p-2">
                    <h3 className="text-xl font-bold">Assigned</h3>
                    <p className="text-gray-600 mb-2" >Description about the task that is to be done by this person/individual member within the given time</p>
                    <div className="flex items-center justify-between">
                        <p className=" font-semibold text-sm text-gray-700">Tushirikiane Project</p>
                         <a href="">
                            <button className="btn bg-primary-400 btn-sm border-primary-300 rounded-full hover:bg-primary-500 text-gray-100 transition ease-in duration-300"> Start</button>
                         </a>
                    </div>
                </div>

            </div>
            {/* <!---------------Assigned tasks container End-----------------------> */}


            {/* <!---------------In Progress tasks container-----------------------> */}
            <div id="in_progress" className="hidden tab-content"> 

                <div className="border-b border-gray-200 p-2">
                    <h3 className="text-xl font-bold">In progress</h3>
                    <p className="text-gray-600 mb-2" >Description about the task that is to be done by this person/individual member within the given time</p>
                    <div className="flex items-center justify-between">
                        <p className=" font-semibold text-sm text-gray-700">Tushirikiane Project</p>
                        <button className="btn btn-sm bg-primary-400 rounded-full border-primary-400"> Mark as completed</button>
                    </div>
                </div>
   
            </div> 
            {/* <!---------------In Progress tasks container End-----------------------> */}

            {/* <!----------------Completed tasks container-----------------------> */}
            <div id="completed" className="hidden tab-content">

                <div className="border-b border-gray-200 p-2">
                    <h3 className="text-xl font-bold">Completed</h3>
                    <p className="text-gray-600 mb-2" >Description about the task that is to be done by this person/individual member within the given time</p>
                    <div className="flex items-center justify-between">
                        <p className=" font-semibold text-sm text-gray-700">Tushirikiane Project</p>
                        <button className="btn btn-sm bg-primary-400 rounded-full border-primary-400"> View</button>
                    </div>
                </div>
            </div>
            {/* <!---------------Completed tasks container End-----------------------> */}

        </div>
        {/* <!-----Tasks container End-------> */}
        
    </section> 
</main>
</>
  )
}

export default Tasks