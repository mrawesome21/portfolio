import { FC } from "react";

import ProjectLayout from "../../components/Global/layouts/ProjectLayout";

const Godspeed: FC<{}> = () => {
   return (
      <ProjectLayout
         page="Godspeed"
         accent="bg-purple-600"
         darkText={false}
         github="https://github.com/dtran421/project-godspeed">
         <div className="md:max-w-2xl lg:max-w-4xl xl:max-w-6xl flex mx-10 md:mx-auto">
            <div className="w-full flex flex-col items-center mt-8">
               <div className="flex flex-col lg:flex-row justify-center items-center space-y-4 lg:space-y-0 lg:space-x-4">
                  <h2 className="text-2xl font-medium">View the project:</h2>
                  <a
                     href="https://godspeed.vercel.app/"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex items-center text-2xl border-2 border-primary hover:bg-primary transition duration-200 ease-out rounded-lg p-3">
                     godspeed.vercel.app
                  </a>
               </div>
               <div className="w-full flex flex-col space-y-6 mt-20">
                  <h1 className="text-4xl font-semibold">Background & Motivation</h1>
                  <div className="grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 text-xl leading-relaxed gap-10 lg:gap-20">
                     <p>
                        {`In 2019, my younger brother took up a hobby of purchasing and reselling highly-demanded,
                        limited-stock shoes through online venues such as StockX, GOAT, and Grailed. At the height of the
                        pandemic the following year, people were stuck at home, and this pastime of reselling sneakers grew
                        to a frenzy, with people hyped for the next drops and looking to turn a hot profit on their latest
                        purchases. I began to get interested in this increasingly-popular movement, helping my brother
                        manage his inventory of shoes and learning more about the sneaker reselling market.`}
                     </p>
                     <p>
                        {`As we expanded our inventory and looked to acquire more shoes, I realized there wasn't really any
                        free, readily-available tools to help aspiring shoe resellers (and casual buyers looking to cop their favorite
                        pair of sneakers) find and keep track of the latest drops. Hence, the birth of Godspeed. A comprehensive web
                        platform designed to help sneaker enthusiasts identify drop dates for shoes they're looking to cop. It also
                        provides useful market data (similar to those for stocks) to enable shoe resellers to spot their next favorable 
                        sneaker resell.`}{" "}
                        <span className="italic">All for the wonderful price of $0.</span>
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </ProjectLayout>
   );
};

export default Godspeed;