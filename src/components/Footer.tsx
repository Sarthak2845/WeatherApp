import { FaGithub, FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-[#1b1a1aae] text-white py-4 mt-10 sticky ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="text-sm">
            <p>&copy; {new Date().getFullYear()} Sarthak Rana All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://github.com/Sarthak2845"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white"
            >
              <FaGithub className="h-6 w-6 " />
            </a>
            <a
              href="https://www.linkedin.com/in/sarthak-rana-897519217"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white"
            >
              <FaLinkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

