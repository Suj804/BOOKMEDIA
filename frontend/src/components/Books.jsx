import React, { useState } from 'react'
import { ShoppingBag, Plus, Minus, Star, Search } from "lucide-react"
import { useLocation } from "react-router-dom"
import {useCart} from "../CartContext/CartContext.jsx"
import toast from "react-hot-toast"

import BP1 from "../assets/Book1.png"
import BP2 from "../assets/Book2.png"
import BP3 from "../assets/Book3.png"
import BP4 from "../assets/Book4.png"
import BP5 from "../assets/Book5.png"
import BP6 from "../assets/Book6.png"
import BP7 from "../assets/Book7.png"
import BP8 from "../assets/Book8.png"
import BP9 from "../assets/BP9.png"
import BP10 from "../assets/BP10.png"
import BP11 from "../assets/BP11.png"
import BP12 from "../assets/BP12.png"
import BP13 from "../assets/BP13.png"
import BP14 from "../assets/BP14.png"
import BP15 from "../assets/BP15.png"
import BP16 from "../assets/BP16.png"

const Books = () => {

  const {cart,dispatch}=useCart()
  const location=useLocation()

  const queryParams = new URLSearchParams(location.search)
  const searchFromURL =queryParams.get("search") || ""

  const [searchTerm,setSearchTerm]=useState(searchFromURL)
  const[sortBy,setSortBy]=useState('title')
  const[filterCategory,setFilterCategory]=useState('all')

  const books=[
    { id:1, title:"The Midnight Library", author:"Matt Haig", price:14.99, rating:4.5, category:"Fiction", image:BP1, description:"Between life and death there is a library." },
    { id:2, title:"Atomic Habits", author:"James Clear", price:16.99, rating:5.0, category:"Self-Help", image:BP2, description:"Build good habits." },
    { id:3, title:"Sapiens", author:"Yuval Noah Harari", price:18.99, rating:4.8, category:"History", image:BP3, description:"History of humankind." },
    { id:4, title:"The Alchemist", author:"Paulo Coelho", price:12.99, rating:4.7, category:"Fiction", image:BP4, description:"Follow your dreams." },
    { id:5, title:"Deep Work", author:"Cal Newport", price:15.99, rating:4.6, category:"Self-Help", image:BP5, description:"Focus mastery." },
    { id:6, title:"1984", author:"George Orwell", price:11.99, rating:4.9, category:"Fiction", image:BP6, description:"Dystopian classic." },
    { id:7, title:"Thinking Fast and Slow", author:"Daniel Kahneman", price:17.99, rating:4.6, category:"Science", image:BP7, description:"Decision science." },
    { id:8, title:"Power of Now", author:"Eckhart Tolle", price:13.99, rating:4.4, category:"Self-Help", image:BP8, description:"Spiritual guide." },
    { id:9, title:"Educated", author:"Tara Westover", price:15.49, rating:4.8, category:"Biography", image:BP9, description:"Memoir." },
    { id:10, title:"Body Keeps the Score", author:"Bessel van der Kolk", price:16.49, rating:4.7, category:"Science", image:BP10, description:"Trauma research." },
    { id:11, title:"Rich Dad Poor Dad", author:"Robert Kiyosaki", price:13.49, rating:4.5, category:"Business", image:BP11, description:"Money mindset." },
    { id:12, title:"To Kill a Mockingbird", author:"Harper Lee", price:12.49, rating:4.9, category:"Fiction", image:BP12, description:"Classic novel." },
    { id:13, title:"Subtle Art", author:"Mark Manson", price:14.49, rating:4.3, category:"Self-Help", image:BP13, description:"Life advice." },
    { id:14, title:"Homo Deus", author:"Yuval Noah Harari", price:18.49, rating:4.5, category:"History", image:BP14, description:"Future history." },
    { id:15, title:"Great Gatsby", author:"F. Scott Fitzgerald", price:10.99, rating:4.4, category:"Fiction", image:BP15, description:"American dream." },
    { id:16, title:"Zero to One", author:"Peter Thiel", price:17.49, rating:4.6, category:"Business", image:BP16, description:"Startup thinking." },
  ]

  const isInCart = (id) => cart?.items?.some(item => item.id === id && item.source === "booksPage")
  const getCartQuantity = (id) => cart?.items?.find(item => item.id === id && item.source === "booksPage")?.quantity || 0

  const handleAddToCart = (book) => {
    dispatch({ type: "ADD_ITEM", payload: { ...book, quantity: 1, source: "booksPage" } })
    toast.success("Item added to cart")
  }

  const handleIncrement = (id) => dispatch({ type: "INCREMENT", payload: { id, source: "booksPage" } })
  const handleDecrement = (id) => dispatch({ type: "DECREMENT", payload: { id, source: "booksPage" } })

  const filteredBooks=books.filter(book =>{
    const matchCategory= filterCategory === 'all'||book.category === filterCategory
    const lowerSearch=searchTerm.toLowerCase()
    const matchSearch=searchTerm === "" || book.title.toLowerCase().includes(lowerSearch) || book.author.toLowerCase().includes(lowerSearch)
    return matchCategory && matchSearch
  })

  const sortedBooks=[...filteredBooks].sort((a,b)=>{
    switch (sortBy){
      case 'price-low':return a.price-b.price
      case 'price-high':return b.price-a.price
      case 'rating':return b.rating-a.rating
      default: return a.title.localeCompare(b.title)
    }
  })

  const categories=['all',...new Set(books.map(book => book.category).filter(Boolean))]

  return (

<div className="min-h-screen pt-24 pb-16 bg-base-200">

<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

<div className="text-center mb-16 space-y-3">

<h1 className="text-4xl md:text-5xl font-bold text-primary">
Galaxy of Literature
</h1>

<p className="text-base-content/70 text-lg max-w-3xl mx-auto">
Explore and dive into our collection of books
</p>

</div>

<div className="mb-12 space-y-6">

<div className="relative group">

<div className="absolute top-0 bottom-0 left-0 flex items-center pl-5">

<Search className='h-5 w-5 text-base-content/40'/>

</div>

<input
type="text"
placeholder='Search titles, authors...'
value={searchTerm}
onChange={(e)=>setSearchTerm(e.target.value)}

className="w-full pl-14 pr-6 py-4 bg-base-100 border border-base-300 rounded-2xl shadow focus:ring-2 focus:ring-primary text-lg placeholder-base-content/40"
/>

</div>

<div className="flex flex-col md:flex-row gap-4 justify-between">

<div className="flex flex-col md:flex-row gap-4">

<select
value={filterCategory}
onChange={(e)=>setFilterCategory(e.target.value)}

className="px-5 py-3 bg-base-100 border border-base-300 rounded-xl shadow text-base-content focus:ring-2 focus:ring-primary"
>

{categories.map((category)=>(

<option value={category} key={category}>

{category === 'all' ? 'All Categories':category}

</option>

))}

</select>

<select
value={sortBy}
onChange={(e)=>setSortBy(e.target.value)}

className="px-5 py-3 bg-base-100 border border-base-300 rounded-xl shadow text-base-content focus:ring-2 focus:ring-primary"
>

<option value="title">Sort by Title</option>
<option value="price-low">Price:Low to High</option>
<option value="price-high">Price:High to Low</option>
<option value="rating">Top Rated</option>

</select>

</div>

<div className="text-base-content/70">
Showing {sortedBooks.length} results
</div>

</div>

</div>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

{sortedBooks.map(book =>{

const inCart=isInCart(book.id)
const qty=getCartQuantity(book.id)

return(

<div key={book.id} className="group bg-base-100 rounded-2xl p-6 shadow hover:shadow-lg transition">

<div className="relative aspect-square mb-6 overflow-hidden rounded-xl">

<img src={book.image} alt={book.title}
className="w-full h-full object-cover transform group-hover:scale-105 transition"
/>

</div>

<h3 className="text-xl font-semibold text-base-content mb-1">{book.title}</h3>

<p className="text-sm text-base-content/60 mb-3">by {book.author}</p>

<div className="flex items-center gap-1 text-yellow-400 mb-3">

{[...Array(Math.floor(book.rating || 0))].map((_,index)=>(
<Star key={index} className="w-4 h-4 fill-yellow-400 stroke-yellow-400"/>
))}

<span className="text-base-content/70">
({book.rating ? book.rating.toFixed(1) : 'N/A'})
</span>

</div>

<p className="text-sm text-base-content/70 mb-4">{book.description}</p>

<div className="flex items-center justify-between">

<span className="text-lg font-bold text-primary">
${book.price.toFixed(2)}
</span>

<div className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-content rounded-xl font-medium">

{!inCart ?(

<button onClick={()=>handleAddToCart(book)}>
<ShoppingBag className="h-5 w-5"/>
</button>

):( 

<div className="flex items-center gap-2">

<button onClick={()=> handleDecrement(book.id)}>
<Minus className="h-4 w-4"/>
</button>

<span>{qty}</span>

<button onClick={()=> handleIncrement(book.id)}>
<Plus className="h-4 w-4"/>
</button>

</div>

)}

</div>

</div>

</div>

)

})}

</div>

</div>

</div>

  )
}

export default Books