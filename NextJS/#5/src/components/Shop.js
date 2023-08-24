import Banner from "@/components/Banner";
import Image from "next/image";
import { useEffect, useState } from "react";
import arrow from "../assets/images/arrow.png";
import pageArrow1 from "../assets/images/pageArrow1.svg";
import pageArrow2 from "../assets/images/pageArrow2.svg";
import ReactPaginate from "react-paginate";


export default function Shop({products}){
  const [currentItems, setCurrentItems] = useState(0)

  const itemsPerPage = 2;
  const pageCount = Math.ceil(products.total / itemsPerPage)
  useEffect(() =>{
    setCurrentItems(products.items)
  },[])

  async function getProducts(page, limit) {
    const response = await fetch(
      `https://youtube.oneentry.cloud/api/content/products/page/url/shop?limit=${limit}&offset=${page}&sortOrder=DESC&sortKey=id`,
      {
        method: "get",
        headers: {
          Authorization: "Bearer <AUTH_TOKEN>",
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  }

  function handlePageClick({selected}){
    getProducts(selected, itemsPerPage).then((res) => setCurrentItems(res.items))
  }

  function Items({items}){

    return(
      <>
      {items && items.map((product, index) => (
        <div key={index} className="product">
          <div className="img-container">
            {product.attributeValues.map((value, i) =>{
              if(value.pic){
                return(
                  <div className="pic" key={i}>
                    {value.pic.map((image, key) => (
                      <Image src={image.downloadLink} alt={image.filename} fill key={key}/>
                    ))}
                  </div>
                )
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
        </div>
      ))}
      </>
    )
  }

    return (
      <>
        <Banner title={"Shop"} />
        <div className="shop-container">
          <div className="container">
            <div className="products">
              <Items items={currentItems} />
            </div>
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