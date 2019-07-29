import React, { useCallback } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { removeCreateItineraryPage } from "../../../../store/createItinerary/actions";
import { IPagePrototype } from "../../../../store/createItinerary/types";
import { IStoreState } from "../../../../store/types";
import "./index.scss";

interface IProps {
  pages: IPagePrototype[];
  removePage: (index: number) => void;
}

function CreateStep2PageList(props: IProps) {
  // Remove button
  const RemovePageButton = (childProps: {
    index: number;
    className?: string;
  }) => {
    const handleRemovePage = useCallback(() => {
      props.removePage(childProps.index);
    }, [props.removePage, childProps.index]);
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
      {(props.pages.length > 0 && (
        <div>
          <header>
            <h2 className="title-2">Page List</h2>
          </header>
          <ul className="create-itinerary-step-2-page-list">
            {props.pages.map((page, index) => (
              <li
                className="create-itinerary-step-2-page-list__item"
                key={index}
              >
                <div className="create-itinerary-step-2-page-list__icon">
                  [icon]
                </div>
                <div className="create-itinerary-step-2-page-list__details">
                  <div className="create-itinerary-step-2-page-list__name ">
                    {page.name}
                  </div>
                  <div className="create-itinerary-step-2-page-list__description">
                    {5}
                  </div>
                  <div className="create-itinerary-step-2-page-list__remove_container">
                    <RemovePageButton
                      className={[
                        "create-itinerary-step-2-page-list__remove",
                        "button",
                        "button--mini",
                        "button--red",
                      ].join(" ")}
                      index={index}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* 
  Share state between steps using Redux to avoid tree rerenders
  resetting form component state when passing state up
*/
const mapStateToProps = (state: IStoreState) => ({
  pages: state.createItinerary.pages,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removePage: (index: number) => dispatch(removeCreateItineraryPage(index)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateStep2PageList);
