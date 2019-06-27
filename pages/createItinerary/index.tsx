import React from "react";
import BaseContainer from "../../components/base/baseContainer";
import Sidebar from "../../components/base/sidebar";
import Main from "../../components/base/main";
import "./index.scss";

interface IPageBuilder {
  name: string;
  description: string;
  rankInItinerary: number;
}

interface IState {
  name: string;
  description: string;
  pages: IPageBuilder[];
  private: boolean;
  anonymous: boolean;
  pageBuilderName: string;
  pageBuilderDescription: string;
}

const initialState: IState = {
  name: "",
  description: "",
  pages: [],
  private: false,
  anonymous: false,
  pageBuilderName: "",
  pageBuilderDescription: ""
};

class CreateItinerary extends React.Component<any, IState> {
  private pageBuilderNameField: HTMLInputElement;

  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handlePageNameChange = this.handlePageNameChange.bind(this);
    this.handlePageDescriptionChange = this.handlePageDescriptionChange.bind(
      this
    );
    this.handlePageEnter = this.handlePageEnter.bind(this);
    this.handlePageSubmit = this.handlePageSubmit.bind(this);
  }

  handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ name: e.target.value });
  }

  handleDescriptionChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ description: e.target.value });
  }

  handlePageNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ pageBuilderName: e.target.value });
  }

  handlePageDescriptionChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ pageBuilderDescription: e.target.value });
  }

  handlePageEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.keyCode === 13) {
      this.handlePageSubmit();
      this.pageBuilderNameField.focus();
    }
  }

  handlePageRemove(pageNumberToRemove: number) {
    const remainingPages = this.state.pages
      .filter(page => page.rankInItinerary !== pageNumberToRemove)
      .map(page => ({
        ...page,
        rankInItinerary:
          page.rankInItinerary > pageNumberToRemove
            ? page.rankInItinerary - 1
            : page.rankInItinerary
      }));
    this.setState({
      pages: remainingPages
    });
  }

  handlePageSubmit() {
    if (this.state.pageBuilderName.length > 0) {
      this.setState({
        pageBuilderName: "",
        pageBuilderDescription: "",
        pages: [
          ...this.state.pages,
          {
            name: this.state.pageBuilderName,
            description: this.state.pageBuilderDescription,
            rankInItinerary: this.state.pages.length + 1
          }
        ]
      });
    }
  }

  render() {
    return (
      <BaseContainer>
        <Sidebar />
        <Main>
          <div className="create-itinerary">
            <header className="create-itinerary-header">
              <h1>Create Itinerary</h1>
            </header>
            <main className="create-itinerary-main">
              <section className="create-itinerary-section">
                <header className="create-itinerary-section-header">
                  <h3>Itinerary</h3>
                </header>
                <main className="create-itinerary-section-main">
                  <div className="create-itinerary-field">
                    <label htmlFor="create-itinerary-name">
                      Let's give your itinerary a name. What do you want to call
                      it?
                    </label>
                    <input
                      type="text"
                      name="create-itinerary-name"
                      id="create-itinerary-name"
                      value={this.state.name}
                      placeholder="Bangkok in December"
                      maxLength={100}
                      required={true}
                      onChange={this.handleNameChange}
                    />
                  </div>
                  <div className="create-itinerary-field">
                    <label htmlFor="create-itinerary-description">
                      And optionally, give it a description to provide more
                      detail.
                    </label>
                    <input
                      type="text"
                      name="create-itinerary-description"
                      id="create-itinerary-description"
                      value={this.state.description}
                      placeholder="Two weeks on a budget of $1000"
                      maxLength={100}
                      required={true}
                      onChange={this.handleDescriptionChange}
                    />
                  </div>
                </main>
              </section>
              <section className="create-itinerary-section">
                <header className="create-itinerary-section-header">
                  <h3>Pages</h3>
                </header>
                <main className="create-itinerary-section-main">
                  <div>
                    Now let's add some pages to your itinerary. Use a page to
                    represent a single day or whatever unit of time you prefer.
                  </div>
                  <div className="create-itinerary-page-builder">
                    <div className="create-itinerary-page-section">
                      <div className="create-itinerary-page-builder-field">
                        <label id="create-itinerary-page-builder-name">
                          Name
                        </label>
                        <input
                          type="text"
                          name="create-itinerary-page-builder-name"
                          id="create-itinerary-page-builder-name"
                          value={this.state.pageBuilderName}
                          ref={el => (this.pageBuilderNameField = el)}
                          placeholder="Day 1: Arriving from the airport"
                          maxLength={100}
                          required={true}
                          onChange={this.handlePageNameChange}
                        />
                      </div>
                      <div className="create-itinerary-page-builder-field">
                        <label htmlFor="create-itinerary-page-builder-description">
                          Description
                        </label>
                        <input
                          type="text"
                          name="create-itinerary-page-builder-description"
                          id="create-itinerary-page-builder-description"
                          value={this.state.pageBuilderDescription}
                          placeholder="Checking into the hostel"
                          maxLength={100}
                          required={true}
                          onChange={this.handlePageDescriptionChange}
                          onKeyUp={this.handlePageEnter}
                        />
                      </div>
                    </div>
                    <div className="create-itinerary-page-section">
                      <input
                        type="button"
                        value="Add"
                        onClick={this.handlePageSubmit}
                      />
                    </div>
                  </div>
                  <div>Here are the pages you have added so far.</div>
                  <ol className="create-itinerary-page-list">
                    {this.state.pages.map(page => (
                      <li
                        key={page.rankInItinerary}
                        className="create-itinerary-page-list-item"
                      >
                        <div className="create-itinerary-page-list-item-info">
                          <div className="create-itinerary-page-list-info-name">
                            {page.name}
                          </div>
                          <div className="create-itinerary-page-list-info-description">
                            {page.description}
                          </div>
                        </div>
                        <input
                          type="button"
                          className="create-itinerary-page-list-remove"
                          value="Remove"
                          onClick={this.handlePageRemove.bind(
                            this,
                            page.rankInItinerary
                          )}
                        />
                      </li>
                    ))}
                  </ol>
                </main>
              </section>
            </main>
          </div>
        </Main>
      </BaseContainer>
    );
  }
}

export default CreateItinerary;
