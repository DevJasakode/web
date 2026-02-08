interface ProjectProps {
    params: Promise<{
        name: string;
    }>;
};

export default async function Project({
    params,
}: ProjectProps) {
    const { name } = await params;
    return (
        <div className="min-h-svh">
            Profile {decodeURIComponent(name)}
        </div>
    )
};

