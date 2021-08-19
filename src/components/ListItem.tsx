import { StatObject, Artist } from "../types";
type ListItemProps = {
  statObj: StatObject | undefined;
};

export const ListItem = (props: ListItemProps) => {
  return (
    <>
      {props.statObj?.items.map((item) => {
        return (
          <>
            {(item as Artist).images ? (
              <div>
                <img src={(item as Artist).images![0].url} />
                <h1>{item.name}</h1>
              </div>
            ) : (
              <h1> "hello" </h1>
            )}
          </>
        );
      })}
    </>
  );
};
