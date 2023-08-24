import MainContainer from "@/components/MainContainer";
import {
  getPages,
  getMenus,
  getProduct,
  getStatus
} from "@/services/serverSideProps";
import Banner from "@/components/Banner";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Product({pages, menus, data, status = ''}){
  const product = { title: data.localizeInfos.en_US.title };
  data.attributeValues.map((attribute) => {
    const value = Object.values(attribute)[0];
    const key = Object.keys(attribute)[0];
    product[key] = value.length > 1 ? value : value[0];
  });

  const [selectedImage, setSelectedImage] = useState(product.pic)
  const [relatedProducts, setRelatedProducts] = useState([])

    function Description({text}){
        return  <div dangerouslySetInnerHTML={{__html: text?.value}}/>
        }

        async function relatedParse(array){
          const items = [];
          await Promise.all(
            array.map((async (relatedId) => {
              await getProduct(relatedId).then((result) => {
                items.push(result)
              })
            }))
          )
          setRelatedProducts(items)
        }

        useEffect(() => {
          if(data.relatedIds.length > 0) {
            relatedParse(data.relatedIds)
          }
        }, [])

        function PatseItems({items}){
          return (
            <>
              {items && items.map((product, index) => (
                <Link href={`/product/${product.id}`} key={index} className="product">
                  <div className="img-container">
                    {product.attributeValues.map((value, i) => {
                      if(value.pic){
                        return (
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
                  </div>
                </Link>
              ))}
            </>
          )
        }

    return (
      <MainContainer menus={menus} pages={pages}>
        <Banner title="Shop" />
          <div className="shop-container">
            <div className="container">
              <div className="products">
                <div className="selectedProduct">
                  <h2></h2>
                  <div className="flex2">
                    <div className="slider">
                      <div className="main-image">
                        <Image
                          width="300"
                          height="300"
                          src={selectedImage.downloadLink}
                          alt=""
                        />
                      </div>
                      <div className="slider1">
                        {product.more_pic && product.more_pic.map(
                          (image, index) => (
                            <div
                              onClick={() => setSelectedImage(image)}
                              key={index}
                              className="item"
                            >
                              <Image
                                width="100"
                                height="100"
                                src={image.downloadLink}
                                alt=""
                              />
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div className="add-to-cart">
                      {status && status.identifier === "Stock" ? <div className="price">{product.price}$</div> : <p>{status.name}</p>}
                      <button>Add to cart</button>
                    </div>
                  </div>
                  <div className="description">
                    <h3>Description</h3>
                    <Description text={product.description} />
                  </div>
                  <div className="related">
                    <h3>Related products</h3>
                    <PatseItems items={relatedProducts}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </MainContainer>
    );
}

export async function getServerSideProps({params}){
    const pages = await getPages()
    const menus = await getMenus()
    const data = await getProduct(params.id)
    const status = data.statusId ? await getStatus(data.statusId) : null;
    return {
        props: {
            pages,
            menus,
            data,
            status
        }
    }
}