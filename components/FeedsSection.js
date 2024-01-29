import { Menu, Tab, Transition } from "@headlessui/react";
import Link from "next/link";
import { SOCIALS, SOCIALS_INFO } from "../utils/socials";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import Feed from "./feed/Feed";
import classNames from "classnames";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import MainContainer from "@/components/MainContainer";
import ActionButton from "./ActionButton";

export default function FeedsSection({ network, posts, pagination }) {
  const [mobile, setMobile] = useState(false);
  const onResize = useCallback(() => {
    setMobile(window.innerWidth < 769);
  }, []);

  useEffect(() => {
    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);

  return (
    <section className="flex flex-col gap-8">
      <Tab.Group selectedIndex={SOCIALS.indexOf(network)}>
        <MainContainer className="flex flex-col gap-4">
          <div className="flex justify-center">
            <FeedTabLinks className={classNames({ hidden: mobile })} />
            {mobile ? <FeedTabList network={network} /> : ""}
          </div>
          <Tab.Panels className="w-full text-center">
            {SOCIALS.map((id) => (
              <Tab.Panel key={id}>
                {id == network ? (
                  <div className="flex flex-col gap-4">
                    {posts.length ? <Feed {...{ network, posts, pagination }} /> : ""}
                  </div>
                ) : (
                  ""
                )}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </MainContainer>
        <div className={classNames({ "border-t border-opaque-800": posts.length })}>
          <MainContainer
            className={classNames(
              "flex flex-col items-center gap-4 pb-20 leading-tight tracking-tight text-center",
              { "pt-20": posts.length }
            )}
          >
            <p className="text-xl">
              {posts.length ? "אילו תכנים פספסנו?" : `עוד לא נוספו תכנים מ-${network}`}
            </p>
            <ActionButton href="mailto:contact@masbiron.com" rounded gradient="r" primary>
              הציעו תכנים
            </ActionButton>
          </MainContainer>
        </div>
      </Tab.Group>
    </section>
  );
}

function FeedTabLinks({ className }) {
  return (
    <Tab.List className={classNames("flex gap-4 text-xl tracking-tight", className)} id="feedTabs">
      {SOCIALS.map((id) => (
        <Tab key={id} as={Fragment}>
          {({ selected }) => (
            <FeedTab
              network={id}
              href={`/feed/${SOCIALS_INFO[id].slug}`}
              className={classNames("outline-none border-b-2 py-2 gap-2 font-medium", {
                "border-color": selected,
                "border-transparent text-opaque-500 hover:text-opaque-300": !selected,
              })}
            />
          )}
        </Tab>
      ))}
    </Tab.List>
  );
}

function FeedTabList({ network, className }) {
  return (
    <Menu
      as="div"
      className={classNames("relative inline-block text-lg", className)}
      id="feedTabList"
    >
      <Menu.Button as={Fragment}>
        <ActionButton rounded className="bg-opaque-800-invert" dir="ltr">
          <div className="flex items-center gap-2">
            <FeedTab network={network} className="gap-3" />
            <ArrowDropDown className="-mr-1 h-5 w-5" aria-hidden="true" />
          </div>
        </ActionButton>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-10 right-0 min-w-full mt-2 origin-top-right bg-opaque-100 shadow-lg ring-1 ring-black/5 dark:ring-white/5">
          {SOCIALS.map((id) => (
            <Menu.Item key={id}>
              <FeedTab
                network={id}
                href={`/feed/${SOCIALS_INFO[id].slug}`}
                className={classNames(
                  "w-full px-3 py-2 gap-3 whitespace-nowrap hover:bg-opaque-200 active:bg-opaque-300",
                  {
                    "bg-opaque-200": id == network,
                  }
                )}
              />
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function FeedTab({ network, selected, href, className }, ref) {
  const Component = href ? Link : "div";

  return (
    <Component
      {...(href ? { href, scroll: false } : {})}
      className={classNames("flex items-center leading-none", className)}
      dir="ltr"
      ref={ref}
    >
      <div className="w-8">{SOCIALS_INFO[network].icon}</div>
      <div>{network == "X" ? "X / Twitter" : network}</div>
    </Component>
  );
}

FeedTab = React.forwardRef(FeedTab);
