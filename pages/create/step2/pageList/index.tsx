import React, { useCallback, SetStateAction } from "react";
import { IPagePrototype } from "../types";

interface IProps {
  pages: IPagePrototype[];
  setPages: React.Dispatch<SetStateAction<IPagePrototype[]>>;
}

export function PageList(props: IProps) {
  // Remove button
  const RemovePageButton = (childProps: {
    index: number;
    className?: string;
  }) => {
    const handleRemovePage = useCallback(() => {
      props.setPages(props.pages.filter((x, index) => index !== childProps.index));
    }, [props.pages, props.setPages]);
    return (
      <input
        type="button"
        className={childProps.className}
        name="remove-page"
        value="Remove"
        onClick={handleRemovePage}
      />
    );
  };

  return (
    <div>
      <header>
        <h2 className="title-2">Page List</h2>
      </header>
      <ul className="create-itinerary-step-2-page-list">
        {props.pages.map((page, index) => (
          <li className="create-itinerary-step-2-page-list__item" key={index}>
            <div className="create-itinerary-step-2-page-list__icon">
              [icon]
            </div>
            <div className="create-itinerary-step-2-page-list__details">
              <div className="create-itinerary-step-2-page-list__name">
                {page.name}
              </div>
              <div className="create-itinerary-step-2-page-list__description">
                {page.description}
              </div>
              <RemovePageButton
                className="create-itinerary-step-2-page-list__remove"
                index={index}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
