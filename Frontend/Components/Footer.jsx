import React from 'react';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#031D30] text-white py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-10 text-center md:text-left">

        {/* Left Section */}
        <div className="md:w-1/3 flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold mb-4">JAMES CONSULTING</h3>
          <p className="text-sm mb-2">500 Terry Francine Street,<br />San Francisco, CA 94158</p>
          <p className="text-sm mb-2">
            Mail: <a href="mailto:info@mysite.com" className="text-gray-300 hover:text-white">info@mysite.com</a>
          </p>
          <p className="text-sm">Tel: 123-456-7890</p>
        </div>

        {/* Middle Section - Menu */}
        <div className="md:w-1/3 flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold mb-4">MENU</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-gray-300 hover:text-white">About</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Services</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Projects</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Plans & Pricing</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Tools & Tips</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Right Section - Socials */}
        <div className="md:w-1/3 flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold mb-4">SOCIALS</h3>
          <div className="flex space-x-4 mb-4 justify-center md:justify-start">
            <a href="#" className="text-white hover:text-gray-300"><FaFacebookF /></a>
            <a href="#" className="text-white hover:text-gray-300"><FaTwitter /></a>
          </div>
          <p className="text-sm mb-1">© 2035 by JAMES CONSULTING.</p>
          <p className="text-sm">
            Powered and secured by <a href="#" className="text-gray-300 hover:text-white">Wix</a>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
