import ClientOnly from "@/components/ClientOnly";
import Container from "@/components/Container";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "sonner";

export default async function Home() {
  return (
    <ClientOnly>
      <Toaster />
      <Container>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit in
        sint non ut, totam exercitationem officiis ex voluptatum nobis dolores
        rem omnis. Ut iste facilis doloremque magnam similique laboriosam quae?
      </Container>
    </ClientOnly>
  );
}
