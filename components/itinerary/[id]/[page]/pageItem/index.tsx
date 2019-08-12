import { IItem, IItinerary } from "../../../../../library/itinerary/types";
import { IUser } from "../../../../../store/user/types";
import { IStoreState } from "../../../../../store/types";
import { connect } from "react-redux";
import { useMemo, useCallback } from "react";
import "./index.scss";

interface IProps extends IItem {
  id: number;
  displayNumber: number;
  owner:
    | IUser
    | {
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

  const handleEdit = useCallback(() => {}, [
    props.id,
    /*props.updateItem*/
    ,
  ]);

  const userIsOwner = useMemo(
    () => /*props.owner && props.user.id === props.owner.id,*/ true,
    [props.user, props.owner],
  );

  return (
    <div className="item">
      <header className="item__header">
        <h2 className="item__name">
          {props.displayNumber}. {props.title}
        </h2>
      </header>
      <div className="item__main">
        <section className="item__info">
          <div className="item__info_field_name">Time Start</div>
          <div className="item__info_field_value">
            lorem ipsum dolor sit amet
          </div>
          <div className="item__info_field_name">Time End</div>
          <div className="item__info_field_value">
            lorem ipsum dolor sit amet
          </div>
          <div className="item__info_field_name">Place</div>
          <div className="item__info_field_value">
            lorem ipsum dolor sit amet
          </div>
        </section>
        <section className="item__body">
          <header className="item__body_header">
            <h3>Details</h3>
          </header>
          <div className="item-body__text">{props.body}</div>
        </section>
        <section className="item__buttons">
          <input type="button" name="share" value="Share" />
          {userIsOwner && (
            <input
              type="button"
              name="edit"
              value="Edit"
              onClick={handleEdit}
            />
          )}
          {userIsOwner && (
            <input
              type="button"
              name="remove"
              value="Remove"
              onClick={handleRemove}
            />
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
