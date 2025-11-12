import { getCurrentUser } from "@/utils/auth";
import Navbar from "@/components/Navbar";
import Beranda from "@/modules/beranda";
import Layout from "./(dashboard)/layout";
import "./globals.css";
import Footer from "@/components/Footer";
import Dashboard from "@/components/dashboard/dashboard";

export default async function Home() {
    const user = await getCurrentUser();
    
    if (user) {
      return (
        <Layout>
          <Dashboard {...user} />
        </Layout>
      );
    }

    return (
      <>
        <Navbar />
        <Beranda />
        <Footer />
      </>
    );
}