import Container from "@/components/Container";
import Header from "./components/Header";
import About from "./About";

const TentangKita = () => {
  return (
    <Container className="mt-10">
      <Header>
        Apa yang <span className="text-custom-blue">kamu</span> tahu tentang{" "}
        <span className="text-custom-orange">kita?</span>
      </Header>
      <About />
    </Container>
  );
};

export default TentangKita;
