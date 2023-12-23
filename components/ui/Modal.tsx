import { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  closeModal: () => void;
  isOpen: boolean;
  title: string;
  successButton: ReactNode;
  isLoading: boolean;
}

export default function Modal({
  children,
  closeModal,
  isOpen,
  title,
  successButton,
  isLoading,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={closeModal} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={closeModal}
          ></button>
        </header>
        <section className="modal-card-body">{children}</section>
        <footer className="modal-card-foot">
          <nav className="level is-fullwidth">
            <div className="level-left">
              <div className="level-item">
                <button
                  className={`button ${isLoading && "is-loading"}`}
                  onClick={closeModal}
                  disabled={isLoading}
                >
                  Cerrar
                </button>
              </div>
            </div>
            <div className="level-right">
              <div className="level-item">
                {isLoading ? (
                  <button
                    className={`button is-success is-light ${
                      isLoading && "is-loading"
                    }`}
                  />
                ) : (
                  successButton
                )}
              </div>
            </div>
          </nav>
        </footer>
      </div>
    </div>
  );
}
