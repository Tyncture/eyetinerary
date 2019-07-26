import { connect } from "react-redux";
import { IItineraryEditTokens } from "../../../store/itineraryEditTokens/types";
import { apiDelete } from "../../../common/utils/requests";
import { IItinerary } from "../types";
import { IUser } from "../../../store/user/types";
import React, { useCallback, SetStateAction } from "react";

interface IProps {
  itinerary: IItinerary;
  setItinerary: React.Dispatch<SetStateAction<IItinerary>>;
  editTokens: IItineraryEditTokens;
  user: IUser;
}

function ItineraryPageList(props: IProps) {
  const userToken = props.user.token ? props.user.token : null;
  const editToken = props.editTokens[props.itinerary.id]
    ? props.editTokens[props.itinerary.id]
    : null;

  const removePage = async (id: number) => {
    const response = await apiDelete(`/page/${id}`, { editToken }, userToken);
    if (response.success) {
      const pagesRemaining = props.itinerary.pages.filter(page => page.id !== id);
      const itinerary = {...props.itinerary, pages: pagesRemaining };
      props.setItinerary(itinerary);
    }
  };

  const RemoveButton = (childProps: { pageId: number; className?: string }) => {
    const handleRemove = useCallback(() => removePage(childProps.pageId), []);
    return (
      <input
        className={childProps.className}
        type="button"
        name="remove"
        value="Remove"
        onClick={handleRemove}
      />
    );
  };

  return (
    <ul className="itinerary-page-list">
      {props.itinerary.pages.map(page => (
        <li className="itinerary-page-list-elem" key={page.id}>
          <div className="itinerary-page-list_elem__icon">[icon]</div>
          <div>
            <div>
              <div className="itinerary-page-list-elem__name">{page.title}</div>
              <div className="itinerary-page-list-elem__description">
                {page.description}
              </div>
            </div>
            <div className="itinerary-page-list-elem__button_row">
              <RemoveButton
                className="itinerary-page-list-elem__button"
                pageId={page.id}
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

const mapStateToProps = state => ({
  editTokens: state.itineraryEditTokens,
  user: state.user,
});

export default connect(mapStateToProps)(ItineraryPageList);
