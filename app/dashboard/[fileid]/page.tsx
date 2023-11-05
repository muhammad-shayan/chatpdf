import ChatWrapper from "@/components/ChatWrapper";
import PdfRenderer from "@/components/PdfRenderer";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

interface DashboardProps {
  params: {
    fileid: string;
  };
}

const Page = async ({ params }: DashboardProps) => {
  const { fileid } = params;
  const { getUser } = getKindeServerSession();
  const user = getUser();

  if (!user || !user.id) redirect(`/auth-callback?origin=dashboard/${fileid}`);

  const file = await db.file.findUnique({
    where: {
      id: fileid,
      userId: user.id,
    },
  });

  return (
    <div className="h:[calc(100vh-3.5rem] max-w-8xl w-full lg:flex">
      <div className="px-4 py-6 sm:px-6 lg:grow">
        <PdfRenderer url={file?.url} />
      </div>

      <div className="shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
        <ChatWrapper />
      </div>
    </div>
  );
};

export default Page;
