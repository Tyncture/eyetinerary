import { IItem, IItinerary } from "../../../types";
import { IUser } from "../../../../../store/user/types";
import { IStoreState } from "../../../../../store/types";
import { connect } from "react-redux";
import { useMemo, useCallback } from "react";

interface IProps extends IItem {
  displayNumber: number;
  owner: IUser | {
    id: number;
    username: string;
  };
  removeItem: (id: number) => void;
  user: IUser;
}

function PageItem(props: IProps) {
  const handleRemove = useCallback(() => props.removeItem(props.id), [
    props.id,
    props.removeItem,
  ]);

  const userIsOwner = useMemo(() => props.user.id === props.owner.id, [
    props.user,
    props.owner,
  ]);

  return (
    <div className="itinerary-item">
      <header className="itinerary-item__header">
        <h2 className="itinerary-item__name">
          {props.displayNumber} {props.title}
        </h2>
      </header>
      <div className="itinerary-item__main">
        <section className="itinerary-item__info">
          <div className="itinerary-item__info_field">
            <div className="itinerary-item__info_field_name">[name]</div>
            <div className="itinerary-item__info_field_value">[value]</div>
          </div>
        </section>
        <section className="itinerary-item__body">
          <header className="itinerary-item__body_header">
            <h3>Details</h3>
          </header>
          <div className="itinerary-item-body__text">{props.body}</div>
        </section>
        <section className="itinerary-item__buttons">
          <input type="button" name="share" value="Share" />
          {userIsOwner && (
            <div>
              <input type="button" name="edit" value="Edit" />
              <input
                type="button"
                name="remove"
                value="Remove"
                onClick={handleRemove}
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

const mapStateToProps = (state: IStoreState) => ({
  user: state.user,
});

export default connect(mapStateToProps)(PageItem);
