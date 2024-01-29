import { Open_Sans } from "next/font/google";
import Header from "@/components/Header";
import classNames from "classnames";
import Head from "next/head";
import Footer from "./Footer";

const font = Open_Sans({ subsets: ["latin", "hebrew"] });

export default function Layout({ children, className, ...props }) {
  return (
    // <MainContainer className={classNames(font.className, "flex flex-col", className)} {...props}>
    <main
      className={classNames(font.className, "flex flex-col min-h-full bg-opaque text-opaque", className)}
      {...props}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />
      <div className="grow">{children}</div>
      <Footer />
    </main>
    // </MainContainer>
  );
}
