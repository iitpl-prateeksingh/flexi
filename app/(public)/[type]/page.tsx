import StaticPage from "../staticPage";

const Page = async ({ params }: { params: Promise<{ type: string }> }) => {
    const resolvedParams = await params;

    console.log("PARAMS:", resolvedParams.type);

    return <StaticPage pageType={resolvedParams.type} />;
};

export default Page;