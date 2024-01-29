import MainContainer from "@/components/MainContainer";
import classNames from "classnames";
import React from "react";

export default function TextSection({ head, body, children, ...props }) {
  head = head && <TextSection.Head>{head}</TextSection.Head>;
  body = body && <TextSection.Paragraph>{body}</TextSection.Paragraph>;

  return (
    <section {...props}>
      <MainContainer className="py-20 leading-tight tracking-tight">
        {head}
        {body}
        {children}
      </MainContainer>
    </section>
  );
}

TextSection.Head = function TextSectionHead({ className, children }) {
  return <h1 className={classNames("text-3xl font-medium", className)}>{children}</h1>;
};

TextSection.Paragraph = function TextSectionParagraph({ className, children }) {
  return <p className={classNames("text-lg text-opaque-400", className)}>{children}</p>;
};
