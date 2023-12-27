"use client";

import Icono from "@/components/ui/Icono";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import useDeletePayment from "@/hooks/pagos-servicio/useDeletePayment";
import Modal from "@/components/ui/Modal";
import React, { useState } from "react";

export default function DeletePaymentButton({
  paymentId,
}: {
  paymentId: number;
}) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const { loadingDeletePayment, handleDeletePayment } = useDeletePayment();
  const handleDelete = () => setIsModalOpen(true);

  const onConfirmDelete = () => {
    handleDeletePayment(paymentId);
    router.refresh();
  };

  const DeleteButton = () => (
    <button
      className="button is-danger"
      type="button"
      onClick={onConfirmDelete}
    >
      Eliminar Registro
    </button>
  );

  return (
    <>
      <button className="button is-danger" onClick={handleDelete}>
        <Icono icon={faTrash} />
      </button>
      <Modal
        closeModal={() => setIsModalOpen(!isModalOpen)}
        isOpen={isModalOpen}
        title="Eliminando Registro"
        successButton={<DeleteButton />}
        isLoading={loadingDeletePayment}
      >
        <p>Una vez eliminado, no podrá recuperarse.</p>
        Esto no eliminará el archivo de respaldo.
      </Modal>
    </>
  );
}
