"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectItem, 
  SelectContent, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  ShoppingCart, 
  Trash2, 
  RefreshCw, 
  PlusCircle, 
  CheckCircle2, 
  ArrowRight, 
  Apple, 
  Grape, 
  Cherry 
} from "lucide-react";
import { GiLemon, GiStrawberry } from "react-icons/gi";
import { PiOrangeFill } from "react-icons/pi";
import { toast } from 'react-toastify';


// Types
interface Fruit {
  id: string;
  name: string;
  icon: JSX.Element;
  price: number;
  bgColor: string;
  borderColor: string;
  hoverColor: string;
}

interface Order {
  id: number;
  name: string;
  icon: JSX.Element;
  quantity: number;
  price: number;
  bgColor: string;
  borderColor: string;
  hoverColor: string;
}

// Constants
const fruitAndPrices: Fruit[] = [
  {
    id: "Apple",
    name: "Apple",
    icon: <Apple className="text-red-500" size={24} />,
    price: 200.0,
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    hoverColor: "hover:bg-red-100",
  },
  {
    id: "Orange",
    name: "Orange",
    icon: <PiOrangeFill className="text-orange-500" size={24} />,
    price: 150.0,
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    hoverColor: "hover:bg-orange-100",
  },
  {
    id: "Strawberry",
    name: "Strawberry",
    icon: <GiStrawberry className="text-pink-500" size={24} />,
    price: 350.0,
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
    hoverColor: "hover:bg-pink-100",
  },
  {
    id: "Grapes",
    name: "Grapes",
    icon: <Grape className="text-purple-500" size={24} />,
    price: 250.0,
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    hoverColor: "hover:bg-purple-100",
  },
  {
    id: "Lemon",
    name: "Lemon",
    icon: <GiLemon className="text-yellow-500" size={24} />,
    price: 300.0,
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    hoverColor: "hover:bg-yellow-100",
  },
  {
    id: "Cherry",
    name: "Cherry",
    icon: <Cherry className="text-red-600" size={24} />,
    price: 120.0,
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    hoverColor: "hover:bg-red-100",
  },
];

// Components
const FruitSelector = ({
  onFruitChange,
  selectedFruit,
}: {
  onFruitChange: (value: string) => void;
  selectedFruit: Fruit | null;
}) => (
  <div className="space-y-2">
    <Label className="text-sm font-medium text-purple-700">Select Fruit</Label>
    <Select onValueChange={onFruitChange} value={selectedFruit?.id}>
      <SelectTrigger className="text-lg border-purple-200 hover:border-purple-300 transition-colors">
        <SelectValue placeholder="Choose a fruit" />
      </SelectTrigger>
      <SelectContent>
        {fruitAndPrices.map((fruit) => (
          <SelectItem 
            key={fruit.id} 
            value={fruit.id} 
            className={`${fruit.bgColor} ${fruit.borderColor} ${fruit.hoverColor} text-lg flex items-center transition-colors`}
          >
            <div className="flex items-center space-x-2">
              {fruit.icon}
              <span>{fruit.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

const OrderList = ({
  orders,
  onDeleteOrder,
  onResetOrders,
  onProceedOrder,
  totalPrice,
}: {
  orders: Order[];
  onDeleteOrder: (id: number) => void;
  onResetOrders: () => void;
  onProceedOrder: () => void;
  totalPrice: number;
}) => (
  <div className="space-y-3">
    <div className="max-h-[400px] overflow-y-auto pr-2 space-y-3">
      {orders.map((order) => (
        <div
          key={order.id}
          className={`flex justify-between items-center border rounded-lg p-3 transition-all transform hover:scale-[1.02] ${order.borderColor} ${order.bgColor} ${order.hoverColor}`}
        >
          <div className="flex items-center space-x-2">
            <span className="font-medium flex items-center gap-2">
              {order.quantity}KG {order.name}
              {order.icon}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-purple-700 font-semibold">
              PK {order.price.toFixed(2)}
            </span>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDeleteOrder(order.id)}
              className="h-8 w-8 p-0 bg-red-500 hover:bg-red-600 transition-colors"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-4 pt-4 border-t border-purple-100">
      <div className="flex justify-between text-lg font-semibold mb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          Total Amount:
        </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          PK {totalPrice.toFixed(2)}
        </span>
      </div>

      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full border-purple-200 text-purple-700 hover:bg-purple-50 transition-colors"
          onClick={onResetOrders}
        >
          <RefreshCw className="mr-2" size={18} />
          Reset All Orders
        </Button>
        <Button
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all"
          onClick={onProceedOrder}
        >
          <CheckCircle2 className="mr-2" size={18} />
          Proceed Order
          <ArrowRight className="ml-2" size={18} />
        </Button>
      </div>
    </div>
  </div>
);

export default function FruitSelectorApp() {
  const [selectedFruit, setSelectedFruit] = useState<Fruit | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orders, setOrders] = useState<Order[]>([]);

  const handleOrder = () => {
    if (!selectedFruit) {
      toast.warning("Please select a fruit first");
      return;
    }

    const newOrder = {
      id: Date.now(),
      name: selectedFruit.name,
      icon: selectedFruit.icon,
      quantity,
      price: totalPrice,
      bgColor: selectedFruit.bgColor,
      borderColor: selectedFruit.borderColor,
      hoverColor: selectedFruit.hoverColor,
    };
    setOrders([...orders, newOrder]);
    resetForm();
    toast.success("Order added successfully");
  };

  const handleDeleteOrder = (orderId: number) => {
    setOrders(orders.filter((order) => order.id !== orderId));
    toast.info(`Order has been removed from the list`);
  };

  const resetForm = () => {
    setSelectedFruit(null);
    setQuantity(1);
    setTotalPrice(0);
  };

  const resetOrders = () => {
    setOrders([]);
    resetForm();
    toast.info(`All orders have been removed from the list`);
  };

  const handleFruitChange = (value: string) => {
    const fruit = fruitAndPrices.find((f) => f.id === value);
    setSelectedFruit(fruit || null);
    setTotalPrice(fruit ? fruit.price * quantity : 0);
  };

  const handleQuantityChange = (value: number) => {
    if (value < 1) {
      toast.warning("Quantity must be at least 1");
      return;
    }
    setQuantity(value);
    if (selectedFruit) {
      setTotalPrice(value * selectedFruit.price);
    }
  };

  const handleProceedOrder = () => {
    if (orders.length === 0) {
      toast.error("Please add some items to your order first");
      return;
    }
    toast.success(`Successfully processed ${orders.length} items`);
    console.log("Orders:", orders);
    resetOrders();
  };

  const calculateTotalOrderPrice = () => orders.reduce((sum, order) => sum + order.price, 0);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-center gap-6">
          {/* Fruit Selection Form */}
          <div className="w-full max-w-md p-6 bg-white/90 shadow-xl rounded-xl border border-purple-100 backdrop-blur-sm">
            <div className="flex items-center justify-center mb-6">
              <ShoppingCart className="text-purple-600 mr-2" size={24} />
              <h1 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Fruit Selector
              </h1>
            </div>

            <div className="space-y-4">
              <FruitSelector 
                onFruitChange={handleFruitChange} 
                selectedFruit={selectedFruit} 
              />

              <div className="space-y-2">
                <Label className="text-sm font-medium text-purple-700">Quantity (KG)</Label>
                <Input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                {selectedFruit ? (
                  <div className="flex items-center justify-between text-purple-800">
                    <div className="flex items-center gap-2">
                      {selectedFruit.icon}
                      <span>Total Price:</span>
                    </div>
                    <strong className="text-lg">PK {totalPrice.toFixed(2)}</strong>
                  </div>
                ) : (
                  <p className="text-purple-600 text-center">Select a fruit to see the total price</p>
                )}
              </div>

              <div className="flex justify-between mt-6 gap-3">
                <Button
                  onClick={handleOrder}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all"
                >
                  <PlusCircle className="mr-2" size={18} />
                  Add Order
                </Button>
                <Button
                  variant="outline"
                  onClick={resetForm}
                  className="flex-1 border-purple-200 text-purple-700 hover:bg-purple-50 transition-colors"
                >
                  <RefreshCw className="mr-2" size={18} />
                  Reset
                </Button>
              </div>
            </div>
          </div>

          {/* Order List */}
          <div className="w-full max-w-lg bg-white/90 p-6 shadow-xl rounded-xl border border-purple-100 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 flex items-center">
                <ShoppingCart className="mr-2 text-purple-600" size={20} />
                Order List
              </h2>
              {orders.length > 0 && (
                <span className="text-sm bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-3 py-1 rounded-full">
                  {orders.length} items
                </span>
              )}
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <ShoppingCart className="mx-auto mb-3 text-gray-400" size={48} />
                <p>No orders yet. Start adding some!</p>
              </div>
            ) : (
              <OrderList
                orders={orders}
                onDeleteOrder={handleDeleteOrder}
                onResetOrders={resetOrders}
                onProceedOrder={handleProceedOrder}
                totalPrice={calculateTotalOrderPrice()}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}