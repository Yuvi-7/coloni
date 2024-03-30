import "react-toastify/dist/ReactToastify.css";
import Header from "@/_components/Header";
import HomeComp from "@/_components/Home";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <>
      <Header />
      <main className="">
        <HomeComp />
      </main>
      <ToastContainer />
    </>
  );
}
