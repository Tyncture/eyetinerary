import React from "react";
import BaseContainer from "../../components/base/baseContainer";
import Sidebar from "../../components/base/sidebar";
import Main from "../../components/base/main";
import "./index.scss";

interface IState {
  name: string;
  description: string;
  private: boolean;
  anonymous: boolean;
  pageBuilderName: string;
  pageBuilderDescription: string;
}

const initialState: IState = {
  name: "",
  description: "",
  private: false,
  anonymous: false,
  pageBuilderName: "",
  pageBuilderDescription: "",
};

class CreateItinerary extends React.Component<any, IState> {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    // Handling Multiple Inputs https://reactjs.org/docs/forms.html
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name: keyof IState = target.name;
    this.setState({ [name]: value } as IState);
  }

  render() {
    return (
      <BaseContainer>
        <Sidebar />
        <Main>
          <div className="create-itinerary">
            <header className="create-itinerary-header">
              <h1 className="title">Create Itinerary</h1>
              <div className="sub-title">
                First, let’s get the basics out of the way.
              </div>
            </header>
            <main className="create-itinerary-main">
              <form className="create-itinerary-main-form">
                <div className="create-itinerary-main-form-item">
                  <label htmlFor="form-name-input">Itinerary Name</label>
                  <input
                    id="form-name-input"
                    name="name"
                    type="text"
                    placeholder="Winter holiday in Southeast Asia"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="create-itinerary-main-form-item">
                  <label htmlFor="form-description-input">
                    Itinerary Description
                  </label>
                  <input
                    id="form-description-input"
                    name="description"
                    type="text"
                    placeholder="Two weeks in Thailand and Laos"
                    value={this.state.description}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="create-itinerary-main-form-item">
                  <label>Privacy Options</label>
                  <div className="create-itinerary-main-form-item-check-group">
                    <div className="create-itinerary-main-form-item-check-group-item">
                      <input
                        id="form-private"
                        name="private"
                        type="checkbox"
                        checked={this.state.private}
                        onChange={this.handleInputChange}
                      />
                      <label htmlFor="form-private">
                        Make this itinerary private
                      </label>
                    </div>
                    <div className="create-itinerary-main-form-item-check-group-item">
                      <input
                        id="form-anonymous"
                        name="anonymous"
                        type="checkbox"
                        checked={this.state.anonymous}
                        onChange={this.handleInputChange}
                      />
                      <label htmlFor="form-anonymous">
                        Create anonymously
                      </label>
                    </div>
                  </div>
                </div>
                <div className="create-itinerary-main-form-bottom-buttons">
                  <input type="button" value="Cancel" />
                  <input type="button" value="Next" />
                </div>
              </form>
            </main>
          </div>
        </Main>
      </BaseContainer>
    );
  }
}

export default CreateItinerary;
