import MainContainer from "@/components/MainContainer";
import Banner from "@/components/Banner";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { defineOneEntry } from "oneentry";

export default function Product({pages, menus, data, status = ''}){
  const [selectedImage, setSelectedImage] = useState('')
  const [relatedProducts, setRelatedProducts] = useState([])
  const [product, setProduct] = useState({})
  const [locales, setLocales] = useState([])
  const [currentLocale, setCurrentLocale] = useState('en_US')
    const { Product, Locales } = defineOneEntry(
      "https://youtube.oneentry.cloud"
    );

  useEffect(() => {
    const newProduct = { ...product, title: data.localizeInfos[currentLocale]?.title,  };
    const attributes = data.attributeValues[currentLocale]
    if(attributes){
      for (let key in attributes) {
        const value = attributes[key].value;
        product[key] = value.length > 1 ? value : value[0];
      }
    }
    setSelectedImage(newProduct?.pic);
    setProduct(newProduct);
  }, [currentLocale]);

  function Description({text}){
        return  <div dangerouslySetInnerHTML={{__html: text?.value}}/>
        }

        async function relatedParse(array){
          const items = [];
          await Promise.all(
            array.map((async (relatedId) => {
              await Product.getProductById(relatedId).then((result) => {
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
          Locales.getLocales().then((res) => {
            const locales = res.map((locale) => {
              return { value: locale.code, label: locale.name}
            })
            setLocales(locales)
          })
        }, [])

        function ParseItems({items}){
          return (
            <>
              {items &&
                items.map((product, index) => (
                  <Link
                    href={`/product/${product.id}`}
                    key={index}
                    className="product"
                  >
                    <div className="img-container">
                      {product.attributeValues[currentLocale]?.pic && (
                          <div className="pic">
                            {product.attributeValues[currentLocale]?.pic.value
                              .length > 0 ? (
                              product.attributeValues[
                                currentLocale
                              ].pic.value.map((image, key) => (
                                <Image
                                  src={image.downloadLink}
                                  alt={image.filename}
                                  fill
                                  key={key}
                                />
                              ))
                            ) : (
                              <Image
                                src={product.pic.downloadLink}
                                alt={product.pic.filename}
                                fill
                                key={key}
                              />
                            )}
                          </div>
                        )}
                    </div>
                    <div className="flex">
                      <div className="title">
                        <p>{product.localizeInfos[currentLocale]?.title}</p>
                        <p>{product.price}</p>
                      </div>
                    </div>
                  </Link>
                ))}
            </>
          );
        }

        return (
      <MainContainer menus={menus} pages={pages}>
        <Banner title="Shop" />
        <div className="shop-container">
          <div className="container">
            <div className="products">
              <div className="selectedProduct">
                <Dropdown
                  options={locales}
                  onChange={(locale) => setCurrentLocale(locale.value)}
                  value={currentLocale}
                  placeholder="Select language"
                />
                <h2>{product.title}</h2>
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
                      {product.more_pic &&
                        product.more_pic.map((image, index) => (
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
                        ))}
                    </div>
                  </div>
                  <div className="add-to-cart">
                    {status && status.identifier === "Stock" ? (
                      <div className="price">{product.price}$</div>
                    ) : (
                      <p>{status.name}</p>
                    )}
                    <button>Add to cart</button>
                  </div>
                </div>
                <div className="description">
                  <h3>Description</h3>
                  <Description text={product.description} />
                </div>
                <div className="related">
                  <h3>Related products</h3>
                  <ParseItems items={relatedProducts} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainContainer>
    );
}

export async function getServerSideProps({params}){
    const { Product, Page, ProductStatus, Menus } = defineOneEntry(
      "https://youtube.oneentry.cloud"
    );
    const pages = await Page.getPages('en_US');
    const menus = await Menus.getMenusByMarker('header');
    const data = await Product.getProductById(params.id);
    const status = data.statusId ? await ProductStatus.getProductStatusesById(data.statusId) : null;
    return {
        props: {
            pages,
            menus,
            data,
            status
        }
    }
}