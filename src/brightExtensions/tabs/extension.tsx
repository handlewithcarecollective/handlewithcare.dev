import { BrightProps, Code, Extension } from "bright";
import { TabsRoot, TabsContent, TabsList } from "./client";

function TitleBarComponent(brightProps: BrightProps) {
  const { subProps, title, Tab } = brightProps;
  const titles = (
    subProps?.length ? subProps.map((subProp) => subProp.title) : [title]
  ).filter((t): t is string => !!t);
  const childProps = subProps?.length ? subProps : [brightProps];
  return (
    <TabsList titles={titles}>
      {titles.map((title, i) => (
        // @ts-expect-error Bad lib types
        <Tab key={title} {...childProps[i]} />
      ))}
    </TabsList>
  );
}

function Root(brightProps: BrightProps) {
  const { subProps, title } = brightProps;

  const titles = subProps?.length
    ? subProps.map((subProp) => subProp.title)
    : [title];

  return (
    <TabsRoot defaultValue={titles[0]}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
[data-bright-tab][data-state="inactive"]{
  --tab-background: var(--inactive-tab-background);
  --tab-color: var(--inactive-tab-color);;
  --tab-bottom-border: transparent;
  --tab-top-border: transparent;
}`,
        }}
      />
      {/* @ts-expect-error Bad lib types */}
      <Code.Root {...brightProps} />
    </TabsRoot>
  );
}

/** @type {import("bright").BrightProps["Pre"]} */
function Content(brightProps: BrightProps) {
  const { subProps } = brightProps;
  const propsList = subProps?.length ? subProps : [brightProps];
  return (
    <>
      {propsList.map((props) => (
        <TabsContent key={props.title} value={props.title!}>
          {/* @ts-expect-error Bad lib types */}
          <Code.Pre {...props} />
        </TabsContent>
      ))}
    </>
  );
}

export const tabs: Extension = {
  name: "tabs",
  Root,
  TitleBarContent: TitleBarComponent,
  Pre: Content,
};
