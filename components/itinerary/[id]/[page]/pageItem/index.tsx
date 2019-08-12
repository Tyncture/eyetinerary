import { config } from "@fortawesome/fontawesome-svg-core";
import { useCallback, useMemo } from "react";
import { connect } from "react-redux";
import { IItem } from "../../../../../library/itinerary/types";
import { IStoreState } from "../../../../../store/types";
import { IUser } from "../../../../../store/user/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShareSquare,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import "./index.scss";
config.autoAddCss = false;

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

  const preventFocus = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

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
          <button name="share" onMouseDown={preventFocus}>
            <FontAwesomeIcon icon={faShareSquare} />
            &nbsp;Share
          </button>
          {userIsOwner && (
            <button name="edit" onClick={handleEdit} onMouseDown={preventFocus}>
              <FontAwesomeIcon icon={faEdit} />
              &nbsp;Edit
            </button>
          )}
          {userIsOwner && (
            <button
              name="share"
              onClick={handleRemove}
              onMouseDown={preventFocus}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
              &nbsp;Remove
            </button>
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
