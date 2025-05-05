import React from 'react';

const Product = ({ image, brand, title, price }) => {
  return (
    <div className="pro">
      <img src={image} alt="product" />
      <div className="des">
        <span>{brand}</span>
        <h5>{title}</h5>
        <div className="star">
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
        </div>
        <h4>{price}</h4>
      </div>
      <a href="#" className="cart"><i className="bi bi-cart2"></i></a>
    </div>
  );
};

const Products = () => {
  const products = [
    {
      image: "images/shirt-1.jpg",
      brand: "Adidas",
      title: "Cartoon astronaut",
      price: "$78"
    },
    {
      image: "images/shirt-2.jpg",
      brand: "Nike",
      title: "Cartoon astronaut",
      price: "$89"
    },
    {
        image: "images/shirt-3.jpg",
        brand: "Adidas",
        title: "Cartoon astronaut",
        price: "$65"
      },
      {
        image: "images/shirt-4.jpg",
        brand: "Puma",
        title: "Cartoon astronaut",
        price: "$75"
      },
      {
        image: "images/shirt-1.jpg",
        brand: "Nike",
        title: "Cartoon astronaut",
        price: "$45"
      },
      {
        image: "images/shirt-4.jpg",
        brand: "Puma",
        title: "Cartoon astronaut",
        price: "$75"
      },
      {
        image: "images/shirt-1.jpg",
        brand: "Adidas",
        title: "Cartoon astronaut",
        price: "$78"
      },
      {
        image: "images/shirt-4.jpg",
        brand: "Puma",
        title: "Cartoon astronaut",
        price: "$75"
      }
    // Add more products as needed
  ];

  return (
    <section id="Product-1" className="section-p1">
      <h2>Featured Products</h2>
      <p>Summer Collection New Modern Design</p>
      <div className="pro-container">
        {products.map((product, index) => (
          <Product
            key={index}
            image={product.image}
            brand={product.brand}
            title={product.title}
            price={product.price}
          />
        ))}
      </div>
    </section>
  );
};

export default Products;
