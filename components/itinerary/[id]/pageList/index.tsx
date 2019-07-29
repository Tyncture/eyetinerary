import { connect } from "react-redux";
import { IItineraryEditTokens } from "../../../../store/itineraryEditTokens/types";
import { apiDelete } from "../../../../common/utils/requests";
import { IItinerary, IPage } from "../../../../library/itinerary/types";
import { IUser } from "../../../../store/user/types";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import { sortPages } from "../../../../library/itinerary/common";

interface IProps {
  itinerary: IItinerary;
  editTokens: IItineraryEditTokens;
  user: IUser;
}

function ItineraryPageList(props: IProps) {
  const [pages, setPages] = useState<IPage[]>(props.itinerary.pages);

  const userToken = props.user.token ? props.user.token : null;
  const editToken = props.editTokens[props.itinerary.id]
    ? props.editTokens[props.itinerary.id].token
    : null;

  async function removePage(id: number) {
    const response = await apiDelete(`/page/${id}`, { editToken }, userToken);
    if (response.success) {
      const pagesLeft = pages.filter(page => page.id !== id);
      setPages(pagesLeft);
    }
  }

  const RemoveButton = (childProps: { pageId: number; className?: string }) => {
    // TODO: Display confirmation modal
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

  // Computed values
  const sortedPages = useMemo(() => {
    return pages ? sortPages(pages) : [];
  }, [pages]);

  return (
    <ul className="itinerary-page-list">
      {sortedPages.map(page => (
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
