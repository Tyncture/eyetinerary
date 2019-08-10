import { connect } from "react-redux";
import { IItineraryEditTokens } from "../../../../store/itineraryEditTokens/types";
import { apiDelete, apiPost } from "../../../../library/common/utils/requests";
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
  useEffect(() => setPages(props.itinerary.pages), [props.itinerary]);
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

  async function updatePage(id: number, name?: string, description?: string) {
    // TODO: Implement editing view and logic
    const pageBefore = pages.find(page => page.id === id);
    if (pageBefore) {
      const pageAfter = {
        ...pageBefore,
        title: name ? name : pageBefore.title,
        description: description ? description : pageBefore.description,
      };
      // Mock response
      const response = { success: true };
      if (response.success) {
        const newPages = [...pages.filter(page => page.id !== id), pageAfter];
        setPages(newPages);
      }
    }
  }

  const EditButton = (childProps: { pageId: number; className?: string }) => {
    // TODO: Implement editing view
    const handleRemove = useCallback(() => removePage(childProps.pageId), []);
    return (
      <input
        className={childProps.className}
        type="button"
        name="remove"
        value="Edit"
        onClick={handleRemove}
      />
    );
  };

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
              <div className="itinerary-page-list-elem__name">
                {page.title}
              </div>
              <div className="itinerary-page-list-elem__description">
                {page.description}
              </div>
            </div>
            <div className="itinerary-page-list-elem__button_row">
              <EditButton
                className="itinerary-page-list-elem__button"
                pageId={page.id}
              />
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
