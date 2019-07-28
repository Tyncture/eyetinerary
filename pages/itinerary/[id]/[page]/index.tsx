import { useMemo, useState, useEffect } from "react";
import { connect } from "react-redux";
import { apiGet } from "../../../../common/utils/requests";
import BaseContainer from "../../../../components/base/baseContainer";
import Sidebar from "../../../../components/base/sidebar";
import Main from "../../../../components/base/main";
import { IStoreState } from "../../../../store/types";
import { IUser } from "../../../../store/user/types";
import { IItinerary, IPage, IItem } from "../../types";
import { useItinerary, sortPages } from "../common";
import Head from "next/head";
import PageItem from "./pageItem";

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
    const filteredItems = page.items.filter(e => e.id !== id);
    setItems(filteredItems);
  }

  return (
    <BaseContainer>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Sidebar />
      <Main>
        <div>
          {page && (
            <div>
              <header>
                <h1 className="title">{page.title}</h1>
              </header>
              {items && (
                <div>
                  {items.map((item, index) => (
                    <PageItem
                      key={item.id}
                      displayNumber={index + 1 /* TODO: Calculate position */}
                      removeItem={removeItem /* TODO: remove from API */}
                      owner={itinerary.owner}
                      {...item}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </Main>
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
