import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import axios from "axios";
import { setOpenOrder, setOrders } from "../slices/ordersSlice";
import "./OrdersList.scss";
import OrderModal from "./OrderModal";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

const OrdersList = () => {
  const orders = useAppSelector((state) => state.orders.value);
  const dispatch = useAppDispatch();

  const [modalOpen, setModalOpen] = useState(false);

  const getOrdersData = () => {
    axios
      .get("data.json")
      .then((res) => dispatch(setOrders(res.data)))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getOrdersData();
  }, []);

  const handleOpenModal = () => setModalOpen(true);

  const onOrderClick = async (orderId: string) => {
    await dispatch(setOpenOrder(orderId));
    handleOpenModal();
  };

  return (
    <>
      <Typography variant="h4" gutterBottom className="title">
        Pizza Place <LocalPizzaIcon fontSize="medium" />
      </Typography>
      <div className="list">
        {orders.map((order) => (
          <Card sx={{ width: "100%" }} key={order.id}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {`${order.client.name}'s Order`}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => onOrderClick(order.id)}>
                start
              </Button>
            </CardActions>
          </Card>
        ))}
        <OrderModal open={modalOpen} setOpen={setModalOpen} />
      </div>
    </>
  );
};
export default OrdersList;
