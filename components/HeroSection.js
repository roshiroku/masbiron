import ActionText from "@/components/ActionText";
import MainContainer from "./MainContainer";

export default function HeroSection() {
  return (
    <section>
      <MainContainer className="flex flex-col items-center gap-4 py-20 leading-tight text-center">
        <div className="inline-block text-5xl font-bold tracking-tighter md:text-6xl xl:text-7xl">
          <ActionText
            as="h1"
            gradient="t"
            className="from-black to-gray-700 dark:from-gray-300 dark:to-white"
          >
            מתחברים
            <br className="sm:hidden" /> להסברה בעולם
          </ActionText>
        </div>
        <p className="text-xl tracking-tight text-opaque-400">
          לא כל אחד הוא מסבירן, אבל כל אחד יכול לעזור לאחרים{" "}
          <span className="text-color">בהסברה</span>.
          <br />
          תשקלו לעקוב אחריהם ולשתף כדי שיראו את <span className="text-color">התמיכה</span> מישראל.
        </p>
      </MainContainer>
    </section>
  );
}
