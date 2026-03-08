import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { socialLinks, quickLinks } from "../assets/dummydata";

const Footer = () => {

return (

<footer className="bg-base-200 border-t border-base-300 pt-16 pb-8">

<div className="container mx-auto px-6">

<div className="grid md:grid-cols-4 gap-10 mb-10">

<div>

<div className="flex items-center gap-3 mb-4">

<img src={logo} className="h-10 w-10"/>

<h1 className="text-xl font-bold text-primary">
BOOKMEDIA
</h1>

</div>

<p className="text-sm opacity-70">
Discover and explore amazing books from every genre.
</p>

</div>

<div>

<h3 className="font-semibold mb-3">
Quick Links
</h3>

<ul className="space-y-2">

{quickLinks.map((link,idx)=>(
<li key={idx}>
<Link to={link.url} className="hover:text-primary">
{link.title}
</Link>
</li>
))}

</ul>

</div>

<div>

<h3 className="font-semibold mb-3">
Stay Updated
</h3>

<input
type="email"
placeholder="Enter your email"
className="input input-bordered w-full"
/>

<button className="btn btn-primary w-full mt-2">
Subscribe
</button>

</div>

<div>

<h3 className="font-semibold mb-3">
Contact
</h3>

<p className="text-sm opacity-70">
123 Literary Lane
</p>

<p className="text-sm opacity-70">
contact@bookmedia.com
</p>

</div>

</div>

<div className="text-center text-sm opacity-60">
© {new Date().getFullYear()} BookMedia
</div>

</div>

</footer>

)

}

export default Footer