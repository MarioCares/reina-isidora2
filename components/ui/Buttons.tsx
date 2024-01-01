import { ReactNode } from "react";

interface SendFormModalProps {
  className: string;
  form: string;
  children: ReactNode;
}
const SendFormModal = ({ className, form, children }: SendFormModalProps) => (
  <button className={`button ${className}`} form={form} type="submit">
    {children}
  </button>
);

export { SendFormModal };
