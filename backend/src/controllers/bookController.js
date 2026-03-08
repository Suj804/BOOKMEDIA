import Book from "../model/bookModel.js";
export async function createBook(req,res){
    try{
        const{title,author,publishYear,price,image,category,description}=req.body
        if(!title||!author||!publishYear||!price||!image||!category||!description){
            return res.status(404).json({message:"All fields are required"})
        }
        const book = new Book({
            title,
            author,
            publishYear,
            price,
            image,
            category,
            description})
        const savedBooks = await Book.create({
            title,
            author,
            publishYear,
            image,
            price,
            category,
            description
        })
        res.status(200).json({savedBooks})
    }catch(error){
        console.error("error in createBook controller",error)
        res.status(500).json({message:"Internal server error"})
    }
}
export async function getAllBooks(_,res){
    try{
        const books = await Book.find().sort({ CreatedAt: -1 })
        res.status(200).json(books)
    }catch(error){
        console.error("error in getAllBooks controller",error)
        res.status(500).json({message:"Internal server error"})
    }
}
export async function getBookById(req,res){
    try{
        const book=await Book.findById(req.params.id)
        if (!book) return res.status(404).json({
            message:"Book not Found"
        })
        res.status(200).json(book)
    }catch(error){
        console.error("error in getBookById controller",error)
        res.status(500).json({message:"Internal server error"})
    }
}
export async function updateBook(req,res){
    try{
        const {title,author,publishYear,price,image,category,description}=req.body
        const updateBook=await Book.findByIdAndUpdate(req.params.id,{title,author,publishYear,price,category,description},{new:true})
        if(!updateBook) return res.status(404).json({message:"Book not Found"})
        res.status(200).json(updateBook)
    }catch(error){
        console.error("error in updateBook controller",error)
        res.status(500).json({message:"Internal server error"})
    }
}
export async function  deleteBook(req,res){
    try{
        const deleteBook = await Book.findByIdAndDelete(req.params.id)
        if(!deleteBook) return res.status(404).json({message:"Book deleted successfully!"})
    }catch(error){
        console.error("error in deleteBook controller",error)
        res.status(500).json({message:"Internal server error"})}
}
//filters 
export async function getBookByCategory(req,res){
    try{
        const { category } = req.params;
        const books = await Book.find({ category });
        res.status(200).json(books);
    }catch(error){
        console.error("error in getBookByCategory controller",error)
        res.status(500).json({message:"Internal server error"})
    }
}
export async function getBookByPrice(req, res) {
  try {
    const { minCost, maxCost } = req.query;
    let filter = {};

    if (minCost || maxCost) {
      filter.price = {};
      if (minCost) filter.price.$gte = Number(minCost);
      if (maxCost) filter.price.$lte = Number(maxCost);
    }

    const books = await Book.find(filter);
    res.status(200).json(books);

  } catch (error) {
    console.error("error in getBookByCost controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}