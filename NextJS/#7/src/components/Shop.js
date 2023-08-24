import Banner from "@/components/Banner";
import Image from "next/image";
import { useState, useEffect } from "react";
import pageArrow1 from "../assets/images/pageArrow1.svg";
import pageArrow2 from "../assets/images/pageArrow2.svg";
import ReactPaginate from "react-paginate";
import { getProducts } from "@/services/serverSideProps";
import Link from "next/link";

export default function Shop({data}) {
    const [products, setProducts] = useState([])
    const [config, setConfig] = useState({})
    const pageCount = Math.ceil(data.products?.total / (config.productsPerRow * config.rowsPerPage))
    
    function productsParse(data){
        const products = [];
        const usedId = [];
        Array.from({ length: data.config.rowsPerPage }).map((_, index) => {
          products.push([]);
        });
        products.map((product, index) => {
          data.products.items.map((product) => {
            if (
              !usedId.includes(product.id) &&
              products[index].length < data.config.productsPerRow
            ) {
              usedId.push(product.id);
              products[index].push(product);
            }
          });
        });
        setProducts(products);
        setConfig(data.config);
    }

    useEffect(()=> {
        productsParse(data)
    }, [])

    function handlePageClick({selected}){
        getProducts(selected).then((res) => {
            productsParse(res)
        })
    }

  function Items({ items }) {

    return (
      <>
        {items &&
          items.map((product, index) => (
            <Link href={`/product/${product.id}`} key={index} className="product">
              <div className="img-container">
                {product.attributeValues.map((value, i) => {
                  if (value.pic) {
                    return (
                      <div className="pic" key={i}>
                        {value.pic.map((image, key) => (
                          <Image
                            src={image.downloadLink}
                            alt={image.filename}
                            fill
                            key={key}
                          />
                        ))}
                      </div>
                    );
                  }
                })}
              </div>
              <div className="flex">
                <div className="title">
                  <p>{product.localizeInfos.en_US.title}</p>
                  <p>{product.price}</p>
                </div>
                <div>
                  <div className="flex">
                    <button>Add to cart</button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </>
    );
  }

  return (
    <>
      <Banner title={"Shop"} />
      <div className="shop-container">
        <div className="container">
          {products.map((row, index) => (
            <div key={index} className="products">
              <Items items={row} />
            </div>
          ))}
          <div className="pagination">
            <ReactPaginate
              breakLabel="..."
              nextLabel={<Image src={pageArrow2} alt="" />}
              previousLabel={<Image src={pageArrow1} alt="" />}
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
            />
          </div>
        </div>


      </div>
    </>
  );
}
