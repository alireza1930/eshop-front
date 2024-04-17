import { OrderItem } from './order-item';
import {User} from "../../../../users/src/lib/models/user";


export class Order {
  id?: string;
  orderItems?: any;
  shippingAddress1?: string;
  shippingAddress2?: string;
  city?: string;
  zip?: string;
  country?: string;
  phone?: string;
  status?: number;
  totalPrice?: any;
  user?: User;
  dateOrdered?: any;
}
