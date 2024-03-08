import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer';

import task from './../assets/tasks.jpg';
import project from './../assets/project.jpg';  
import team from './../assets/team.jpg';    


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

            <section className="text-center bg-[#fafafa]">
                <div className="flex flex-col py-5 lg:flex-row w-full items-center justify-around">
                    <div className="mb-5 flex-grow-1">
                        <h3 className="text-3xl font-bold text-indigo-900">Track your project</h3>
                        <p className='text-lg'>Always know where your project is.</p>
                    </div>
                    <div className='flex-grow-1'>
                        <img className="max-w-[600px]" src={project} alt="" />
                    </div>
                </div>
                <div className="flex flex-col flex-col-reverse py-5 lg:flex-row bg-[#bfcbff] w-full items-center justify-around">
                    <div className='flex-grow-1'>
                        <img className="max-w-[600px]" src={team} alt="" />
                    </div>
                    <div className="mb-5 flex-grow-1">
                        <h3 className="text-3xl font-bold text-indigo-900">Manage your teams</h3>
                        <p className='text-lg'>See all your team members and what they are up to.</p>
                    </div>
                </div>
                <div className="flex flex-col py-5 lg:flex-row w-full bg-[#ffe4bf] items-center justify-around">
                    <div className="mb-5 flex-grow-1">
                        <h3 className="text-3xl font-bold text-indigo-900">All your tasks in one place</h3>
                        <p className='text-lg'>Easily track your tasks and never miss a deadline.</p>
                    </div>
                    <div className='flex-grow-1'>
                        <img className="max-w-[600px]" src={task} alt="" />
                    </div>
                </div>
            </section>
            <section className="mb-3 px-4 text-center ">
                <h2 id="about" className="my-5 text-3xl font-bold">About</h2>
                <p className='text-lg'>
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