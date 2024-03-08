import React from 'react'

import github from './../assets/github.svg'
import x from './../assets/x.svg'
import linkedin from './../assets/linkedin.svg'

//TODO: Add social media icons
//TODO: Add util function to calculate the year
//TODO: Consider other footer designs
const Footer = () => {
    return (
        <footer className="py-4 flex flex-col items-center text-white bg-indigo-600 ">
            <div className="flex space-x-4 mb-4 text-lg">
                <p>Made by:</p>
                <span>
                    <p>Javan Otieno</p>
                    <div className='flex'>
                        <a href=""><img className='w-8 h-8' src={linkedin} alt="" /></a>
                        <a href=""><img className='w-8 h-8' src={x} alt="" /></a>
                        <a href=""><img className='w-8 h-8' src={github} alt="" /></a>

                    </div>
                </span>
                <span className="bg-indigo-50 w-[1px] h-full"></span>
                <span>
                    <p>Ian Dancun</p>
                    <div className='flex'>
                        <a href=""><img className='w-8 h-8' src={linkedin} alt="" /></a>
                        <a href=""><img className='w-8 h-8' src={x} alt="" /></a>
                        <a href=""><img className='w-8 h-8' src={github} alt="" /></a>

                    </div>
                </span>
            </div>
            {/* TODO: Add util function for the date */}
            <span className="">Copyright © 2024</span>
        </footer>
    )
}

export default Footer
