import React from "react";
import { ArrowBigRight, BookOpen, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext/CartContext.jsx";
import toast from "react-hot-toast";

const Cart = () => {

const { cart, dispatch } = useCart();

const total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

const inc = (item) => dispatch({ type: "INCREMENT", payload: { id: item.id, source: item.source } });
const dec = (item) => dispatch({ type: "DECREMENT", payload: { id: item.id, source: item.source } });

const remove = (item) => {
dispatch({ type: "REMOVE_ITEM", payload: { id: item.id, source: item.source } });
toast.error("Item removed from cart");
};

return (

<div className="min-h-screen bg-base-200 pt-24 pb-12 px-4">

<div className="max-w-6xl mx-auto">

<h1 className="text-4xl font-bold text-center text-primary mb-10">
Your Cart
</h1>

{cart.items.length === 0 ? (

<div className="text-center bg-base-100 p-10 rounded-xl shadow">

<ShoppingBag className="h-16 w-16 mx-auto text-primary mb-4" />

<h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>

<Link to="/books" className="btn btn-primary">
<BookOpen className="h-5 w-5"/> Browse Books
</Link>

</div>

) : (

<div className="grid lg:grid-cols-3 gap-8">

<div className="lg:col-span-2 space-y-6">

{cart.items.map((item)=>(
<div key={`${item.source}-${item.id}`} className="bg-base-100 p-6 rounded-xl shadow">

<div className="flex gap-6">

<img src={item.image} alt={item.title} className="w-24 h-32 object-cover rounded"/>

<div className="flex-1">

<div className="flex justify-between">

<div>
<h3 className="font-semibold">{item.title}</h3>
<p className="text-sm opacity-70">{item.author}</p>
</div>

<button onClick={()=>remove(item)} className="btn btn-sm btn-error">
<Trash2 className="h-4 w-4"/>
</button>

</div>

<div className="flex justify-between items-center mt-4">

<div className="flex items-center gap-2">

<button onClick={()=>dec(item)} className="btn btn-sm">
<Minus className="w-4 h-4"/>
</button>

<span>{item.quantity}</span>

<button onClick={()=>inc(item)} className="btn btn-sm">
<Plus className="w-4 h-4"/>
</button>

</div>

<span className="font-bold text-primary">₹
{(item.price * item.quantity).toFixed(2)}
</span>

</div>

</div>

</div>

</div>
))}

</div>

<div className="bg-base-100 p-6 rounded-xl shadow h-fit">

<h2 className="text-xl font-bold mb-6">Order Summary</h2>

<div className="flex justify-between mb-4">
<span>Subtotal</span>
<span>₹{total.toFixed(2)}</span>
</div>

<button className="btn btn-primary w-full">
Checkout <ArrowBigRight className="w-4 h-4"/>
</button>

<Link to="/books" className="btn btn-outline w-full mt-3">
Continue Shopping
</Link>

</div>

</div>

)}

</div>

</div>

);
};

export default Cart;
