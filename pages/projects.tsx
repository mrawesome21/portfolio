import dynamic from "next/dynamic";

import projects from "../public/json/projects.json";

import MainLayout from "../components/Global/layouts/MainLayout";
import Emoji from "../components/Global/Emoji";

const ProjectCard = dynamic(import("../components/Projects/ProjectCard"), {
    ssr: false
});

const Projects = () => {
    const { coding, finance } = projects;

    const preloadColors = ["border-[#a6cee3]", "border-[#ff7f0e]"];
    const preloadClass = `hidden ${preloadColors.join(" ")}`;

    return (
        <MainLayout page="Projects">
            <div className="min-h-screen">
                <div className="w-3/5 max-w-sm md:w-full md:max-w-xl lg:max-w-3xl xl:w-3/4 xl:max-w-none flex flex-col gap-y-10 mx-auto mt-16">
                    <h1 className="text-3xl md:text-4xl xl:text-5xl font-semibold text-center md:text-left">
                        CODING <Emoji label="desktop computer" symbol="🖥️" />
                    </h1>
                    <div className="w-full flex justify-center">
                        <div className="w-full flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-4 xl:gap-x-8 gap-y-20">
                            {Object.keys(coding).map((name) => (
                                <ProjectCard
                                    key={name}
                                    {...{
                                        name,
                                        ...coding[name]
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl xl:text-5xl font-semibold text-center md:text-left mt-24">
                        FINANCE <Emoji label="chart increasing" symbol="📈" />
                    </h1>
                    <div className="w-full flex justify-center">
                        <div className="w-full flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-4 xl:gap-x-8 gap-y-20">
                            {Object.keys(finance).map((name) => (
                                <ProjectCard
                                    key={name}
                                    {...{
                                        name,
                                        ...finance[name]
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className={preloadClass} />
        </MainLayout>
    );
};

export default Projects;
