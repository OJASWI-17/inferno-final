import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputComponent from "../components/InputComponent";
import BG from '../assets/BgInferno.svg';

export default function Signup() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Add your form submission logic here
    navigate("/signin");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover" style={{ backgroundImage: `url(${BG})` }}>
      <div className="bg-gray-900 bg-opacity-90 p-8 rounded-lg shadow-lg text-center w-96 backdrop-blur-sm">
        <Heading heading="Sign Up" className="text-white" />
        <div className="mt-4 space-y-4 flex flex-col items-center item-center">
          <div className="text-left w-full">
            <label className="block text-gray-300 font-medium mb-1">
              Email ID
            </label>
            <InputComponent 
              type="text" 
              placeholder="Enter your email" 
              className="bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="text-left w-full">
            <label className="block text-gray-300 font-medium mb-1">
              Password
            </label>
            <InputComponent
              type="password"
              placeholder="Enter your password"
              className="bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="text-left w-full">
            <label className="block text-gray-300 font-medium mb-1">
              Confirm Password
            </label>
            <InputComponent
              type="password"
              placeholder="Confirm your password"
              className="bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <Button 
            text="Submit" 
            onClick={handleSubmit}
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
    </div>
  );
}