import MainContainer from "@/components/MainContainer";
import {
  getPages,
  getMenus,
  getProduct
} from "@/services/serverSideProps";
import Banner from "@/components/Banner";
import Image from "next/image";
import { useState, useEffect } from "react";
import Error from "@/components/Error";

export default function Product({pages, menus, data}){

  const [errorCode, setErrorCode] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false)
  const [product, setProduct] = useState({})

    useEffect(() =>{
      if(data.statusCode){
        setErrorCode(data)
      } else {
        const newProduct = { title: data.localizeInfos.en_US.title };
        data.attributeValues.map((attribute) => {
          const value = Object.values(attribute)[0];
          const key = Object.keys(attribute)[0];
          newProduct[key] = value.length > 1 ? value : value[0];
        });
        setProduct(newProduct)
        setSelectedImage(newProduct.pic)
      }
    }, [])

    function Description({text}){
        return  <div dangerouslySetInnerHTML={{__html: text?.value}}/>
        }

    return (
      <MainContainer menus={menus} pages={pages}>
        <Banner tutle="Shop" />
        {errorCode ? (
          <Error data={errorCode} />
        ) : (
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
                      <div className="price">{product.price}$</div>
                      <button>Add to cart</button>
                    </div>
                  </div>
                  <div className="description">
                    <h3>Description</h3>
                    <Description text={product.description} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </MainContainer>
    );
}

export async function getServerSideProps({params}){
    const pages = await getPages()
    const menus = await getMenus()
    const data = await getProduct(params.id)

    return {
        props: {
            pages,
            menus,
            data
        }
    }
}