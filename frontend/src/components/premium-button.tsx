import { motion } from "motion/react";
import { BackgroundGradient } from "@/components/background-gradient";
import { useState } from "react";
import { cn } from "@/utils/cn";

function PremButton({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const x = (e.clientX - centerX) / 10;
        const y = (e.clientY - centerY) / 10;

        setMousePosition({ x, y });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
    };

    return (
        <div
            className="flex items-center justify-center"
            style={{ perspective: "1000px" }}
        >
            <motion.div
                initial={{
                    opacity: 0,
                    y: -10,
                    filter: "blur(10px)",
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    rotateX: isHovered ? -mousePosition.y : 0,
                    rotateY: isHovered ? mousePosition.x : 0,
                    translateZ: isHovered ? 50 : 0,
                }}
                transition={{
                    duration: 0.3,
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                }}
                whileTap={{
                    scale: 0.98,
                    translateZ: 30,
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    transformStyle: "preserve-3d",
                }}
            >
                <BackgroundGradient
                    containerClassName="rounded-full"
                    className="rounded-full"
                >
                    <button
                        className={cn(
                            "py-4 px-6 rounded-full text-[1.2rem] cursor-pointer bg-purple-700 text-gray-100 outline-none border-none font-medium",
                            className,
                        )}
                    >
                        {children}
                    </button>
                </BackgroundGradient>
            </motion.div>
        </div>
    );
}

export default PremButton;
