import React, { ReactEventHandler } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../redux/features/auth/authSlice'
import { useSelector } from 'react-redux';
import { RootState, purgeData } from '../redux/store';



// TODO: conditional rendering for when the user is on the landing page.
//TODO: Add case when user does not have a profile picture
const Header = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const navigate = useNavigate();


  const handleLogout = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    console.log('logging out')
    logout();
    purgeData();
    navigate('/login')
  }
  
  return (
    <div className="navbar bg-base-100 shadow">
      <div className="flex-1">
        <Link to='/' className="text-xl bold">Tushirikiane</Link>
      </div>
      <div className="flex-none">
        <nav className='space-x-3 mx-5'>
          <Link to='/projects' className="link link-primary">Projects</Link>
          <Link to='/tasks' className="link link-primary">Tasks</Link>
        </nav>

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {/* <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li> */}
            {/* <li><a>Settings</a></li> */}
            { !isAuthenticated ? <li><Link to="/login">Login</Link></li> : <li onClick={handleLogout}><a>Logout</a></li>}
          </ul>
        </div>
        
      </div>
    </div>
  )
}

export default Header