import MainContainer from "@/components/MainContainer";
import ActionButton from "@/components/ActionButton";

export default function SuggestSection() {
  return (
    <section className="border-t border-opaque-800">
      <MainContainer className="flex flex-col items-center gap-4 py-20 leading-tight tracking-tight text-center">
        <p className="text-xl">חסרים תכנים?<br className="sm:hidden" /> ספרו לנו מה עוד תרצו לראות!</p>
        <ActionButton href="mailto:contact@masbiron.com" rounded gradient="r" primary>
          הציעו תכנים
        </ActionButton>
      </MainContainer>
    </section>
  );
}
