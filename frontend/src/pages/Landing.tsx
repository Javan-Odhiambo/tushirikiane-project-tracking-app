import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer';


//TODO: Add mockups using the daisy ui art board
//TODO: Get a hero section image
//TODO: Consider other designs
const Landing: React.FC = () => {
    return (
    <>
        <Header />
        <main className="flex-grow">

            <section className="h-[calc(100vh-200px)] bg-indigo-400 bg-opacity-30 text-center flex flex-col justify-center">
                <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl">Welcome to <span className="text-indigo-500">Tushirikiane</span></h1>
                <p className="md:text-lg">A one way stop for tracking your Projects</p>
            </section>

            <section className="text-center">
                <h2 className="my-5 text-2xl font-semibold">Why Tushirikiane?</h2>
                <div className="flex flex-col py-5 md:flex-row w-full items-center justify-around">
                    <div className="mb-5">
                        <h3 className="text-xl text-indigo-400">Track your project</h3>
                        <p>Always know where your project is.</p>
                    </div>
                    <div>
                        <img src="" alt="" />
                        <div className="w-full h-60 bg-slate-500"> Img</div>
                    </div>
                </div>
                <div className="flex flex-col py-5 md:flex-row bg-gray-100 w-full items-center justify-around">
                    <div className="mb-5">
                        <h3 className="text-xl text-indigo-400">Manage your teams</h3>
                        <p>See all your team members and what they are up to.</p>
                    </div>
                    <div>
                        <img src="" alt="" />
                        <div className="w-full h-60 bg-slate-500"> Img</div>
                    </div>
                </div>
                <div className="flex flex-col py-5 md:flex-row w-full items-center justify-around">
                    <div className="mb-5">
                        <h3 className="text-xl text-indigo-400">All your tasks in one place</h3>
                        <p>Easily track your tasks and never miss a deadline.</p>
                    </div>
                    <div>
                        <img src="" alt="" />
                        <div className="w-full h-60 bg-slate-500"> Img</div>
                    </div>
                </div>
            </section>
            <section className="mb-3 px-4 text-center ">
                <h2 id="about" className="my-5 text-2xl font-semibold">About</h2>
                <p>
                    Tushirikiane is a project tracking application for all teams.
                    The project was inspired by the lack of affordable platform for managing projects. 
                    The project was designed with university students in mind but can be utilized by anyone in a team or even as an individual.
                </p>
            </section>


        </main>
        <Footer />
    </>
)};

export default Landing