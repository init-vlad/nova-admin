import { ClientPage2 } from "./client-page2";
import { ClientPage } from "./client-page";

async function Page() {
  console.log("rerender page");

  return (
    <>
      <ClientPage />
      <ClientPage2 />
    </>
  );
}

export default Page;
