import FilePreview from "../../components/Projects/FilePreview";
import ProjectLayout from "../../layouts/ProjectLayout";

const UAV = () => (
  <ProjectLayout page="UAV Swarms" type="coding" github="https://github.com/dtran421/3D-SHARKS">
    <div className="md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl flex flex-col xl:flex-row justify-between space-y-10 xl:space-y-0 xl:space-x-20 py-20 mx-10 md:mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 xl:gap-x-20 gap-y-10 xl:gap-y-0">
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl xl:text-3xl font-bold">Background & Motivation</h1>
          <p className="xl:text-lg leading-relaxed">
            Over the summer of 2021, I interned for a research program under the National Science Foundation (NSF) to do
            research in VR. My specific project pertained to UAV swarm security and involved simulating algorithms that
            would enable swarms to be resilient to adversarial UAVs. Within the span of 10 weeks, I successfully
            developed and simulated algorithms in Unity 3D that empowered UAVs within swarms to eject away from
            adversaries while maintaining the appropriate distance to their target/objective and ran 27 comprehensive
            simulations to gather data on the efficiency of the algorithm. The results of the study are summarized in
            the adjacent paper, which can be viewed in full screen.
          </p>
        </div>
        <div>
          <FilePreview
            label="UAV Paper"
            filePath="/uav/uav_paper.pdf"
            previewImgPath="/projects/uav/cover_page.jpg"
            width={1700}
            height={2200}
          />
        </div>
      </div>
    </div>
  </ProjectLayout>
);

export default UAV;
