import React from 'react'


//TODO: Add social media icons
//TODO: Add util function to calculate the year
//TODO: Consider other footer designs
const Footer = () => {
    return (
        <footer className="py-4 flex flex-col items-center text-white bg-indigo-600 ">
            <div className="flex space-x-4 mb-4">
                <p>Made by:</p>
                <span>
                    <p>Javan Otieno</p>
                    <a href="">Ln</a>
                    <a href="">X</a>
                    <a href="">GH</a>
                </span>
                <span className="bg-indigo-50 w-[1px] h-full"></span>
                <span>
                    <p>Ian Dancun</p>
                    <a href="">Ln</a>
                    <a href="">X</a>
                    <a href="">GH</a>
                </span>
            </div>
            <span className="">Copyright © 2023</span>
        </footer>
    )
}

export default Footer
