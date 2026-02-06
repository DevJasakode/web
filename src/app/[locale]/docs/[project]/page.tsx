
interface ProjectProps {
    params: Promise<{
        project: string;
    }>;
};

export default async function Project({
    params,
}: ProjectProps) {
    const { project } = await params;
    return (
        <p>Project Name {project}</p>
    )
};

