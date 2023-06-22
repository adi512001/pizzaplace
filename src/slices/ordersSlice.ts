import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export type OrderType = {
  id: string,
  size: string,
  price: number,
  toppings: string[],
  client: {
    name: string,
    phone: string,
    email: string,
    address: string
  }
}
interface OrdersState {
  value: OrderType[],
  openOrderId: string
}

const initialState: OrdersState = {
  value: [],
  openOrderId: ""
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state,  action: PayloadAction<OrderType[]>) => {
      state.value = [...action.payload]
    },
    setOpenOrder: (state, action: PayloadAction<string>) => {
      state.openOrderId = action.payload
    }
  },
})

export const { setOrders, setOpenOrder } = ordersSlice.actions

export const selectOrders = (state: RootState) => state

export default ordersSlice.reducer