import { IItem, IItinerary } from "../../../../../library/itinerary/types";
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

  const handleEdit = useCallback(() => {}, [
    props.id,
    /*props.updateItem*/,
  ]);

  const userIsOwner = useMemo(() => props.user.id === props.owner.id, [
    props.user,
    props.owner,
  ]);

  return (
    <div className="item">
      <header className="item__header">
        <h2 className="item__name">
          {props.displayNumber} {props.title}
        </h2>
      </header>
      <div className="item__main">
        <section className="item__info">
          <div className="item__info_field">
            <div className="item__info_field_name">[name]</div>
            <div className="item__info_field_value">[value]</div>
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
            <div>
              <input
                type="button"
                name="edit"
                value="Edit"
                onClick={handleEdit}
              />
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
