"use client";

import { useState, use } from "react"; // 👈 import `use`
import ProjectHeader from "../ProjectHeader";
import BoardView from "../BoardView";

type Props = {
  params: Promise<{ id: string }>; // 👈 params is a Promise now
};

const Project = ({ params }: Props) => {
    const { id } = use(params); // 👈 unwrap params with React.use()
    const [activeTab, setActiveTab] = useState("Board");
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

    return (
        <div>
        {/* MODAL NEW TASK */}
        <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "Board" && (
            <BoardView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
        )}
        </div>
    );
};

export default Project;
