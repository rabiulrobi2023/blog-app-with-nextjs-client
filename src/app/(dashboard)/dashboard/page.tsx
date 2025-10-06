import { getUserSession } from "@/helpers/userSession";
import Image from "next/image";

const DashboardHomePage = async () => {
  const session = await getUserSession();
  const user = session?.user;
  return (
    <div className="flex flex-col items-center mx-auto min-h-dvh justify-center">
      <h1>
        Welcome to{" "}
        <span className="text-green-800 font-bold">{user?.name}</span>
      </h1>
      <p className="text-gray-700">{user?.email}</p>
      <p>ID: {user?.id}</p>
      <p>ROLE: {user?.role}</p>

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
