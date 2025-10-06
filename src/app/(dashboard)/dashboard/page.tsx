import { getUserSession } from "@/helpers/authOptions";

import Image from "next/image";

const DashboardHomePage = async () => {
  const session = await getUserSession();
  console.log(session);
  return (
    <div className="flex flex-col items-center mx-auto min-h-dvh justify-center">
      <h1>
        Welcome to{" "}
        <span className="text-green-800 font-bold">{session?.user?.name}</span>
      </h1>
      <p className="text-gray-700">{session?.user?.email}</p>
      <Image
        className="rounded-full"
        src={session?.user?.image as string}
        height={300}
        width={300}
        alt="Profle Image"
      />
    </div>
  );
};

export default DashboardHomePage;
