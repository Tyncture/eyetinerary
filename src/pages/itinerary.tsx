import React from 'react';
import BaseContainer from '../components/base/baseContainer';
import Sidebar from '../components/base/sidebar';
import Main from '../components/base/main';
import ItineraryHeader from '../components/itinerary/itineraryHeader';
import ItineraryPageList from '../components/itinerary/itineraryPageList';
import './itinerary.scss';

class Itinerary extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BaseContainer>
        <Sidebar />
        <Main>
          <div className="itinerary">
            <ItineraryHeader
              title="This thing works and will continue to work"
              description="This thing works and will continue to work"
              location="Bangkok"
              countryCode="Thailand"
            />
            <ItineraryPageList
              pages={[
                {
                  id: 1,
                  title: 'Day 1: This thing works and will continue to work',
                  items: [
                    {
                      id: 12,
                      title:
                        'This thing works and will continue to work. This thing works and will continue to work. This thing works and will continue to work.',
                    },
                  ],
                  description:
                    'Day 1: This thing works and will continue to workDay 1: This thing works and will continue to workDay 1: This thing works and will continue to workDay 1: This thing works and will continue to work',
                },
                {
                  id: 2,
                  title:
                    'Day 2: QUKImsbGF0FAegMr6no9AEX74hCtM3CPr8QK              ',
                  items: [
                    {
                      id: 14,
                      title: 'This thing works and will continue to work',
                    },
                  ],
                  description:
                    'zlXdB9gcoErUigU2ENMA8iezoZDjSt9MXdB9gcoErUigU2ENMA8igcoErUigU2ENMA8igcoErUigU2ENMA8iezoZDjSt9MXdB9gcoErUigU2ENMA8iezoZDjSt9MU',
                },
                {
                  id: 4,
                  title: "Day 3: Some holiday in Thailand for example's sake",
                  items: [
                    {
                      id: 144,
                      title: 'This thing works and will continue to work',
                    },
                  ],
                },
                {
                  id: 5,
                  title: 'Day 4: This thing works and will continue to work',
                  items: [
                    {
                      id: 12,
                      title:
                        'This thing works and will continue to work. This thing works and will continue to work. This thing works and will continue to work.',
                    },
                  ],
                  description:
                    'Day 1: This thing works and will continue to workDay 1: This thing works and will continue to workDay 1: This thing works and will continue to workDay 1: This thing works and will continue to work',
                },
                {
                  id: 5,
                  title: 'Day 4: This thing works and will continue to work',
                  items: [
                    {
                      id: 12,
                      title:
                        'This thing works and will continue to work. This thing works and will continue to work. This thing works and will continue to work.',
                    },
                  ],
                  description:
                    'Day 1: This thing works and will continue to workDay 1: This thing works and will continue to workDay 1: This thing works and will continue to workDay 1: This thing works and will continue to work',
                },
                {
                  id: 5,
                  title: 'Day 4: This thing works and will continue to work',
                  items: [
                    {
                      id: 12,
                      title:
                        'This thing works and will continue to work. This thing works and will continue to work. This thing works and will continue to work.',
                    },
                  ],
                  description:
                    'Day 1: This thing works and will continue to workDay 1: This thing works and will continue to workDay 1: This thing works and will continue to workDay 1: This thing works and will continue to work',
                },
                {
                  id: 5,
                  title: 'Day 4: This thing works and will continue to work',
                  items: [
                    {
                      id: 12,
                      title:
                        'This thing works and will continue to work. This thing works and will continue to work. This thing works and will continue to work.',
                    },
                  ],
                  description:
                    'Day 1: This thing works and will continue to workDay 1: This thing works and will continue to workDay 1: This thing works and will continue to workDay 1: This thing works and will continue to work',
                },
              ]}
            />
          </div>
        </Main>
      </BaseContainer>
    );
  }
}

export default Itinerary;
