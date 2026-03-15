import React, { useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Star,
  Minus,
  Plus,
} from "lucide-react";
import { bgColors, obsbooks } from "../assets/dummydata";
import { useCart } from "../CartContext/CartContext.jsx";
import toast from "react-hot-toast";

const OurBestSellers = () => {
  const scrollRef = useRef(null);
  const { cart, dispatch } = useCart();

  const inCart = (id) => cart?.items?.some((item) => item.id === id);
  const getQty = (id) =>
    cart?.items?.find((item) => item.id === id)?.quantity || 0;

  const handleAdd = (book) => {
    dispatch({ type: "ADD_ITEM", payload: { ...book, quantity: 1 } });
    toast.success("Item added to cart");
  };

  const handleInc = (id) =>
    dispatch({ type: "INCREMENT", payload: { id } });

  const handleDec = (id) => {
    const qty = getQty(id);
    dispatch({ type: "DECREMENT", payload: { id } });

    if (qty === 1) {
      toast.error("Item removed from cart");
    }
  };

  const scrollLeft = () =>
    scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });

  const scrollRight = () =>
    scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });

  return (
    <section className="py-12 md:py-16 bg-base-200">
      <div className="container mx-auto px-4 md:px-6">

        {/* header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-4 md:gap-6">

          <div className="space-y-1 md:space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-base-content">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Curated Excellence
              </span>
            </h1>

            <p className="text-base-content/70 text-base md:text-lg">
              Top Rated by Readers
            </p>
          </div>

          {/* scroll buttons */}
          <div className="flex items-center gap-4 w-full md:w-auto">

            <div className="hidden md:block flex-1 border-t border-base-300" />

            <div className="flex items-center gap-2 md:gap-3">

              <button
                onClick={scrollLeft}
                className="p-2 md:p-3 rounded-full bg-base-100 shadow-md md:shadow-lg hover:shadow-lg transition-shadow"
              >
                <ChevronLeft className="text-primary" size={20} />
              </button>

              <button
                onClick={scrollRight}
                className="p-2 md:p-3 rounded-full bg-base-100 shadow-md md:shadow-lg hover:shadow-lg transition-shadow"
              >
                <ChevronRight className="text-primary" size={20} />
              </button>

            </div>
          </div>
        </div>

        {/* book section */}
        <div
          className="flex overflow-x-auto gap-4 md:gap-8 pb-6 md:pb-8 scrollbar-hide scroll-smooth snap-x"
          ref={scrollRef}
        >
          {obsbooks.map((book, index) => (

            <div
              className={`flex-shrink-0 w-[calc(100vw-2rem)] sm:w-96 md:w-[400px] rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-br ${
                bgColors[index % bgColors.length]
              } shadow-lg md:shadow-xl relative group transition-all duration-300 hover:shadow-xl md:hover:shadow-2xl snap-center`}
              key={book.id}
            >

              <div className="p-6 md:p-8 pb-48 md:pb-60 flex flex-col justify-between h-full relative z-10">

                <div className="space-y-3 md:space-y-4">

                  <div className="flex items-center gap-1 md:gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        className="h-4 w-4 md:h-5 md:w-5 text-warning fill-warning"
                        key={i}
                      />
                    ))}
                  </div>

                  <div className="space-y-1.5 md:space-y-2">
                    <h2 className="text-xl md:text-2xl font-bold text-base-content leading-tight">
                      {book.title}
                    </h2>

                    <p className="text-xs md:text-sm font-medium text-base-content/70">
                      {book.author}
                    </p>
                  </div>

                  <p className="text-base-content/70 text-xs md:text-sm leading-relaxed line-clamp-3">
                    Jane McLane's latest masterpiece challenges conventional
                    storytelling. Explore transformation narratives that...
                  </p>

                </div>

                {/* cart controls */}
                <div className="flex flex-col gap-3 md:gap-4 mt-6 md:mt-8">

                  <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3">

                    <span className="text-xl md:text-2xl font-bold text-base-content">
                      ₹{book.price.toFixed(2)}
                    </span>

                    {inCart(book.id) ? (

                      <div className="flex items-center gap-3 md:gap-4 bg-base-100/90 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl shadow-sm">

                        <button
                          onClick={() => handleDec(book.id)}
                          className="text-primary hover:text-secondary p-1 md:p-1.5"
                        >
                          <Minus size={18} />
                        </button>

                        <span className="text-base-content font-medium w-6 text-center">
                          {getQty(book.id)}
                        </span>

                        <button
                          onClick={() => handleInc(book.id)}
                          className="text-primary hover:text-secondary p-1 md:p-1.5"
                        >
                          <Plus size={18} />
                        </button>

                      </div>

                    ) : (

                      <button
                        onClick={() => handleAdd(book)}
                        className="flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-2 md:py-3 bg-primary text-primary-content rounded-lg md:rounded-xl font-medium hover:scale-[1.02] transition-transform text-sm md:text-base"
                      >
                        <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />
                        <span>Add to Cart</span>
                      </button>

                    )}

                  </div>

                </div>
              </div>

              <img
                src={book.image}
                alt={book.title}
                className="absolute right-4 md:right-6 bottom-4 md:bottom-6 w-20 h-28 md:w-[120px] md:h-[180px] object-cover rounded-lg md:rounded-xl border-2 md:border-4 border-white shadow-xl md:shadow-2xl transform group-hover:-translate-y-1 md:group-hover:-translate-y-2 transition-transform"
              />

            </div>

          ))}
        </div>
      </div>
    </section>
  );
};

export default OurBestSellers;
