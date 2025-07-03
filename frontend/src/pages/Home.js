import { Fragment } from "react/jsx-runtime";
import Productcard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [SearchParams,setSearchParams] = useSearchParams()

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + '/products?'+SearchParams)
      .then((res) => res.json())
      .then((res) => setProducts(res.products))
    }, [SearchParams]);

  return (
    <Fragment>
      <div style={{ textAlign: "center" }}>
        <h1 id="products_heading">Selvi Snacks Corner</h1>
      </div>

      <section id="products" className="container mt-5">
        <div className="row">
             {products.map(product => <Productcard product={product}/>)}
            </div>
      </section>
    </Fragment>
  );
}
