import React from "react";
import BaseContainer from "../components/base/baseContainer";
import Sidebar from "../components/base/sidebar";
import Main from "../components/base/main";

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
}

class CreateItinerary extends React.Component<any, IState> {
  constructor(props) {
    super(props);
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
            <main>
              <section>
                <header>
                  <h2>Itinerary</h2>
                </header>
                <div>
                  <label>Let's give your itinerary a name. What do you want to call it?</label>
                </div>
              </section>
              <section>
                <header>
                  <h2>Pages</h2>
                </header>
                <div>
                  <label>
                    Now let's add some pages to your itinerary. Use a page to
                    represent a single day or whatever unit of time you prefer.
                  </label>
                </div>
              </section>
            </main>
          </div>
        </Main>
      </BaseContainer>
    );
  }
}

export default CreateItinerary;
