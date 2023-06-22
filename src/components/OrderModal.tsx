import React, { useEffect, useState } from "react";
import { useAppSelector } from "../hooks";
import { OrderType } from "../slices/ordersSlice";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import OrderWizard from "./OrderWizard";
import "./OrderModal.scss";

interface OrderModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrderModal: React.FC<OrderModalProps> = ({ open, setOpen }) => {
  const [orderDetails, setOrderDetails] = useState<OrderType | null>(null);

  const handleClose = () => setOpen(false);

  const orders = useAppSelector((state) => state.orders.value);
  const openOrderId = useAppSelector((state) => state.orders.openOrderId);

  const getOrderDetails = () => {
    const openOrder = orders.find((order) => order.id === openOrderId);
    if (openOrder) {
      setOrderDetails(openOrder);
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, [openOrderId]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ boxShadow: 24 }} className="modal">
        <OrderWizard order={orderDetails} handleClose={handleClose} />
      </Box>
    </Modal>
  );
};
export default OrderModal;
