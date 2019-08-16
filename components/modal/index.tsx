import "./index.scss";

interface IProps {
  children?:
    | Array<JSX.Element | React.Component>
    | JSX.Element
    | React.Component;
  show: boolean;
  title?: string;
}

function Modal(props: IProps) {
  return (
    props.show && (
      <div className="modal">
        <div className="modal__inner">
          {props.title && (
            <header className="modal__header">
              <h1 className="modal__title">{props.title}</h1>
            </header>
          )}
          {props.children}
        </div>
      </div>
    )
  );
}

export default Modal;
