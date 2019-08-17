import { connect } from "react-redux";
import { IItineraryEditTokens } from "../../../../store/itineraryEditTokens/types";
import { apiDelete, apiPost } from "../../../../library/common/utils/requests";
import { IItinerary, IPage } from "../../../../library/itinerary/types";
import { IUser } from "../../../../store/user/types";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import { sortPages } from "../../../../library/itinerary/common";
import Router from "next/router";
import "./index.scss";
import PageIcon from "../../../icons/PageIcon";
import Modal from "../../../modal";

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
        name="edit"
        value="Edit"
        onClick={handleRemove}
      />
    );
  };

  const RemoveButton = (childProps: { pageId: number; className?: string }) => {
    const [showModal, setShowModal] = useState(false);
    const handleClick = useCallback(() => setShowModal(!showModal), [showModal]);
    const handleRemove = useCallback(() => removePage(childProps.pageId), []);
    return (
      <div>
        <input
          className={childProps.className}
          type="button"
          name="remove"
          value="Remove"
          onClick={handleClick}
        />
        <Modal show={showModal} title="Delete Page">
          <div>Are you sure you want to delete this page?</div>
          <div className="modal__buttons">
            <input
              className="button button--wide modal__button"
              name="cancel"
              type="button"
              value="Cancel"
              onClick={handleClick}
            />
            <input
              className="button button--wide modal__button"
              name="confirm"
              type="button"
              value="Confirm"
              onClick={handleRemove}
            />
          </div>
        </Modal>
      </div>
    );
  };

  const ViewButton = (childProps: { pageRank: number; className?: string }) => {
    // TODO: Display confirmation modal
    const handleView = useCallback(() => {
      Router.push(
        `/itinerary/[id]/[page]`,
        `/itinerary/${props.itinerary.id}/${childProps.pageRank}`,
      );
    }, []);
    return (
      <input
        className={childProps.className}
        type="button"
        name="view"
        value="View"
        onClick={handleView}
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
          <div className="itinerary-page-list_elem__icon">
            <PageIcon />
          </div>
          <div className="itinerary-page-list_elem__info">
            <div>
              <div className="itinerary-page-list-elem__name">{page.title}</div>
              <div className="itinerary-page-list-elem__description">
                page description
              </div>
            </div>
            <div className="itinerary-page-list-elem__button_row">
              <EditButton
                className="itinerary-page-list-elem__button button button--micro"
                pageId={page.id}
              />
              <RemoveButton
                className="itinerary-page-list-elem__button button button--micro"
                pageId={page.id}
              />
            </div>
          </div>
          <div className="itinerary-page-list-elem__end">
            <ViewButton
              className="itinerary-page-list-elem__view_button 
                button button--mini button--blue"
              pageRank={page.rankInItinerary}
            />
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
