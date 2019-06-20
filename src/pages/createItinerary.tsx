import React from "react";
import BaseContainer from "../components/base/baseContainer";
import Sidebar from "../components/base/sidebar";
import Main from "../components/base/main";
import "./createItinerary.scss";

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
  pageBuilderName: string;
  pageBuilderDescription: string;
}

const initialState: IState = {
  name: "",
  description: "",
  pages: [],
  private: false,
  pageBuilderName: "",
  pageBuilderDescription: ""
};

class CreateItinerary extends React.Component<any, IState> {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handlePageNameChange = this.handlePageNameChange.bind(this);
    this.handlePageDescriptionChange = this.handlePageDescriptionChange.bind(this);
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
                  <h2>Itinerary</h2>
                </header>
                <main className="create-itinerary-section-main">
                  <div className="create-itinerary-field">
                    <label>
                      Let's give your itinerary a name. What do you want to call
                      it?
                    </label>
                    <input
                      type="text"
                      value={this.state.name}
                      placeholder="Bangkok in December"
                      maxLength={100}
                      required={true}
                      onChange={this.handleNameChange}
                    />
                  </div>
                  <div className="create-itinerary-field">
                    <label>
                      And optionally, give it a description to provide more
                      detail.
                    </label>
                    <input
                      type="text"
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
                  <h2>Pages</h2>
                </header>
                <main className="create-itinerary-section-main">
                  <div>
                    Now let's add some pages to your itinerary. Use a page to
                    represent a single day or whatever unit of time you prefer.
                  </div>
                  <div className="create-itinerary-page-builder">
                    <div className="create-itinerary-page-builder-field">
                      <label>Name</label>
                      <input
                        type="text"
                        value={this.state.pageBuilderName}
                        placeholder="Day 1: Arriving from the airport"
                        maxLength={100}
                        required={true}
                        onChange={this.handlePageNameChange}
                      />
                    </div>
                    <div className="create-itinerary-page-builder-field">
                      <label>Description</label>
                      <input
                        type="text"
                        value={this.state.pageBuilderDescription}
                        placeholder="Checking into the hostel and making use of the rest of evening."
                        maxLength={100}
                        required={true}
                        onChange={this.handlePageDescriptionChange}
                      />
                    </div>
                  </div>
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
