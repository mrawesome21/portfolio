import { ReactNode, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";

import { lgScreenQuery } from "../../lib/Breakpoints";

const logoMotion = {
    inactive: { x: 0, zIndex: 1 },
    hover: {
        x: -15,
        zIndex: 1
    }
};

const textMotion = {
    inactive: { opacity: 0, x: -35, zIndex: 0, ease: "easeOut", duration: 0.2 },
    hover: {
        opacity: 1,
        x: 10,
        zIndex: 0,
        ease: "easeIn",
        duration: 0.5
    }
};

type SocialProfileProps = {
    name: string;
    link: string;
    children: ReactNode;
};

const SocialProfile = ({ name, link, children }: SocialProfileProps) => {
    const lgScreen = useMediaQuery(lgScreenQuery);

    const [isHovered, setHovered] = useState(false);
    return lgScreen ? (
        <motion.a
            className="flex justify-center items-center cursor-pointer"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            initial="inactive"
            animate={isHovered ? "hover" : "inactive"}
        >
            <motion.div
                variants={logoMotion}
                className="relative flex items-center"
            >
                <div className="z-10 flex justify-center items-center text-white bg-primary rounded-full shadow-lg p-2">
                    {children}
                </div>
                <motion.p
                    variants={textMotion}
                    className="text-zinc-800 dark:text-zinc-200 dark-transition text-xl"
                >
                    {name}
                </motion.p>
            </motion.div>
        </motion.a>
    ) : (
        <a
            className="h-full flex md:justify-center items-center"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className="relative flex items-center space-x-4 md:space-x-3">
                <div className="z-10 flex justify-center items-center text-white bg-primary rounded-full shadow-lg p-2">
                    {children}
                </div>
                <p className="text-zinc-800 dark:text-zinc-200 dark-transition text-lg lg:text-xl">
                    {name}
                </p>
            </div>
        </a>
    );
};

export default SocialProfile;