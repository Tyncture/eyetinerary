import "./index.scss";

interface IProps {
  children?:
    | Array<JSX.Element | React.Component>
    | JSX.Element
    | React.Component;
  show: boolean;
}

function Modal(props: IProps) {
  return (
    props.show && (
      <div className="modal">
        <div className="modal__inner">{props.children}</div>
      </div>
    )
  );
}

export default Modal;
