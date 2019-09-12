import { useMemo, useState, useEffect } from "react";
import { connect } from "react-redux";
import { apiGet } from "../../../../library/common/utils/requests";
import BaseContainer from "../../../../components/base/baseContainer";
import Sidebar from "../../../../components/base/sidebar";
import Main from "../../../../components/base/main";
import { IStoreState } from "../../../../store/types";
import { IUser } from "../../../../store/user/types";
import { useItinerary, sortPages } from "../../../../library/itinerary/common";
import Head from "next/head";
import PageItem from "../../../../components/itinerary/[id]/[page]/pageItem";
import { IItem, IItinerary, IPage } from "../../../../library/itinerary/types";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { config } from "@fortawesome/fontawesome-svg-core";
import Masonry from "react-masonry-css";
config.autoAddCss = false;
import "./index.scss";

interface IProps {
  query: {
    id: string;
    page: string;
  };
  itinerary: IItinerary;
  user: IUser;
}

function ItineraryPage(props: IProps) {
  const [items, setItems] = useState<IItem[]>();
  const [apiError, setApiError] = useState<string>();
  const userToken = props.user.token ? props.user.token : null;
  const itinerary = useItinerary(
    Number(props.query.id),
    props.itinerary,
    userToken,
    setApiError,
  );

  // Computed values
  const page = useMemo<IPage>(() => {
    if (itinerary) {
      const pageNumber = Number(props.query.page);
      const sortedPages = sortPages(itinerary.pages);
      if (sortedPages && sortedPages.length >= pageNumber) {
        return sortedPages[pageNumber - 1];
      }
    }
  }, [itinerary]);
  const pageTitle = useMemo(
    () => `${page ? `${page.title} - ` : ""}Eyetinerary`,
    [page],
  );

  // Manage items state
  useEffect(() => setItems(page ? page.items : []), [page]);
  async function removeItem(id: number) {
    const filteredItems = items.filter(e => e.id !== id);
    setItems(filteredItems);
  }

  return (
    <BaseContainer>
      {page && (
        <div className="page">
          <header className="page__header">
            <div className="page__breadcrumb">
              <Link
                href="/itinerary/[id]"
                as={`/itinerary/${props.itinerary.id}`}
              >
                <a className="page__breadcrumb_segment">
                  <span>
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </span>
                  <span>{props.itinerary.title}</span>
                </a>
              </Link>
              <div className="page__breadcrumb_segment">
                <span>|</span>
                <span className="page__breadcrumb_status">Viewing Page</span>
              </div>
            </div>
            <h1 className="page__title title">{page.title}</h1>
          </header>
          {items && (
            <Masonry
              breakpointCols={{ default: 2 }}
              className="page__mansonry"
              columnClassName="page__mansonry_column"
            >
              {items.map((item, index) => (
                <PageItem
                  key={item.id}
                  id={item.id}
                  displayNumber={index + 1 /* TODO: Calculate position */}
                  removeItem={removeItem /* TODO: remove from API */}
                  owner={itinerary.owner}
                  {...item}
                />
              ))}
            </Masonry>
          )}
        </div>
      )}
    </BaseContainer>
  );
}

ItineraryPage.getInitialProps = async ({ query }) => {
  const props = { query, itinerary: null };
  const response = await apiGet(`/itinerary/${query.id}`);
  if (response.success) {
    props.itinerary = response.body;
  }
  return props;
};

const mapStateToProps = (state: IStoreState) => ({
  user: state.user,
});

export default connect(mapStateToProps)(ItineraryPage);
