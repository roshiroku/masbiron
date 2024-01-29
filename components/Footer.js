import Image from "next/image";
import MainContainer from "@/components/MainContainer";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-opaque-800">
      <MainContainer className="flex items-center justify-center gap-2">
        <p className="font-medium text-opaque-400 tracking-tight">יחד ננצח</p>
        <Image src={"/logo.png"} alt="logo" width={32} height={30} />
      </MainContainer>
    </footer>
  );
}
