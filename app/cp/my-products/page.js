"use client";
import styles from "@/app/page.module.css";
import Service from "@/app/components/Service/Service";
import LastofOffersProducts from "@/app/components/lastProduct/LastofOffersProducts";
import FooterBar from "@/app/components/FooterBar/FooterBar";
import Image from "next/image";

import React, { useEffect, useState, useRef } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import EmptyCart from "@/public/images/emptyCart.svg";
import Modal from "react-bootstrap/Modal";
import {
  AddProduct,
  EditProduct,
  getjsonStrings,
  getMatgarProducts,
  GetMatgerCats,
  getMatgarType,
} from "@/store/ControlPanalSlice";
import { TiDelete } from "react-icons/ti";
import { RiAddCircleLine } from "react-icons/ri";

// TiDeleteOutline
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { Subcategories, getMainCat } from "@/store/CategoriesSlice";
import ProductCard from "@/app/components/ProductCard/ProductCard";
import { baseUrl } from "../../baseUrl";
import Link from "next/link";
const MyProducts = () => {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const [show, setShow] = useState(false);
  const [showEditCard, setshowEditCard] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [cat, SelectCat] = useState(null);
  const [catid, SelectCatid] = useState(null);
  const [Matgercat, SelectMatgerCat] = useState(null);
  const [EditData, setEditData] = useState({
           catId : 0,
          subCatId : '',
          name : '',
          price : '',
          images : [],
          description : ''
  });

  const [Matgercatid, MatgerSelectCatid] = useState(null);
  // const [MatgerTe, MatgerSelectCatid] = useState(null);
  const [images, setimages] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseEdit = () => setshowEditCard(false);
  const handleShowEdit = () => setshowEditCard(true);
  

  const [Categories, setCategories] = useState(null);
  const [RelatedCat, setRelatedCat] = useState(null);
  const [RelatedcatSelected, setRelatedCatSelected] = useState(0);
  const { MatgarProductsArr, MatgerCatsArr } = useSelector(
    (state) => state.ControlPanalSlice
  );
  const { SubcategoriesArr } = useSelector((state) => state.CategoriesSlice);
  const [catSelected, setCatSelected] = useState(0);

  useEffect(() => {
    if (catSelected > 0) {
      const filterData = Categories.filter((ele) => ele.id == catSelected);
      setRelatedCat(filterData[0].catList);
    }else{
      if(Categories){
        setRelatedCat(Categories[0].catList);
      }
    }


  });

  useEffect(() => {
    const UserId = window.localStorage.getItem("ClientId"); 
    dispatch(getMainCat(0))
    dispatch(getMatgarType(UserId))
      .unwrap()
      .then((res) => {
        setCategories(res.categoriesData);
      });
  }, []);
  // const page = typeof window !== 'undefined' ? localStorage.getItem('page_matger') : null;

  const page = 0;
  useEffect(() => {
    const UserId = window.localStorage.getItem("ClientId");
    const MatgarProducts = {
      page: page,
      id: UserId,
      "pid":0,
    };
    if (!MatgarProductsArr) {
      dispatch(getMatgarProducts(MatgarProducts));
      dispatch(GetMatgerCats(UserId));
    }
  }, [dispatch, MatgarProductsArr]);


  


  const Products =
    MatgarProductsArr && MatgarProductsArr.length > 0 ? (
      MatgarProductsArr.map((ele, idx) => {
        const pathName = ele.name.replace(/\s/g, "-");
        const imageID = ele.images[0];
        return (
          <Col className={styles.Product_col} md={3} xs={6} key={idx}>
               {imageID &&  <div className={`${styles.ProductCard} ${styles["normal_div"]}`}>
           <div className={styles.Card_img} onClick={(()=>{ handleShowEdit()})} >
        <div className="IMG_CARD_CATEGORY" onClick={()=>setEditData({
          catId : ele.catId,
          subCatId : ele.subCatId,
          name : ele.name,
          price : ele.priceBefore,
          images : ele.images,
          description : ele.description
        })}>
        <div className={styles.logo_imgg}  >
          <LazyLoadImage
            src={`${baseUrl}/imag?id=${imageID}`}
            alt={ele.name}
            className="logo_imgg"
            // effect="blur"
            
          />
        </div>
        </div>
      </div>

      <div className={styles.CardInfo}
      >
       

        <div className={styles.Product_Name}>
          <h3 onClick={() => {
            if (Goto === "product") {
              router.push(`/product/${id}/${pathName}`);
              window.scrollTo({
                top: 0,
                left: 100,
                behavior: "instant",
              });
            }
            if (Goto === "matgar") {
              router.push(`/matgar/${id}/${pathName}`);
              window.scrollTo({
                top: 0,
                left: 100,
                behavior: "instant",
              });
            }
          }}>{ele.name.substring(0, 30) + '...'}</h3>

        </div>
        {/* onClick={() => {
            router.push(`/category/${matgarId}/${CatName}`);
          }} */}
        <h5 className=" "
          >
            <Link href={''} >{ele.name}</Link> </h5>

      </div>
    </div> }
          </Col>
        );
      })
    ) : (
      <div className={styles.CartEmpty}>
        <div className={styles.card_container_empty}>
          <Image src={EmptyCart} effect="blur" alt="empty" />
        </div>
        <h3> لم يتم اضافة منتجات</h3>
        <p>اضف منتجاتك و عروضك الخاصة في المتجر</p>
      </div>
    );

  let Selectcats = MatgerCatsArr && MatgerCatsArr.cats;
  const SelectMatgerCatsFilter = SubcategoriesArr && SubcategoriesArr.cats;
  const onCatChange = (e) => {
    SelectCat(e.value);
    SelectCatid(e.value.id);
    dispatch(Subcategories(e.value.id));
  };

  const onMatgerCatChange = (e) => {
    SelectMatgerCat(e.value);
    MatgerSelectCatid(e.value.id);
  };

  const SendDate = (e) => {
    const UserId = window.localStorage.getItem("ClientId");
    if (
      name.length === 0 ||
      price.length === 0 ||
      description.length === 0 ||
      images.length <= 0
    ) {
      showError();
    } else {
      const data = {
        userId: UserId,
        categoryId: catSelected == 0 ? Categories[0].id : RelatedcatSelected,
        productName: name,
        price,
        description,
        images,
      };
      const MatgarProducts = {
        page: page,
        id: UserId,
        "pid":0,
      };
      dispatch(AddProduct(data))
        .unwrap()
        .then(() => {
          dispatch(getjsonStrings(UserId));
          dispatch(getMatgarProducts(MatgarProducts));
        });
      // console.log(data);
      showSuccess();
    }
  }; 

  const SendEditDate = (e) => {
    const UserId = window.localStorage.getItem("ClientId");
    const data = {
      // userId: UserId,
      id : 1319,
      subCatId: 166,
      name: name,
      price,
      description,
      images,
    };
    const MatgarProducts = {
      page: page,
      id: UserId,
      "pid":0,
    };
    dispatch(EditProduct(data))
      .unwrap()
      .then(() => {
        dispatch(getjsonStrings(UserId));
        dispatch(getMatgarProducts(MatgarProducts));
      });
    // console.log(data);
    showSuccess();
  }; 
  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "برجاء ادخال جميع البيانات المطلوبة",
      life: 3000,
    });
  };

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "تم تحديث البيانات بنجاح",
      life: 3000,
    });
  };

  const UploadImge = (file) => {
    // console.log(file[0]);
    const test = [...file];
    // console.log(test);
    test.map((ele) => {
      const reader = new FileReader();
      reader.readAsDataURL(ele);
      return (reader.onload = () => {
        // Make a fileInfo Object
        const baseURL = reader.result;
        const position = baseURL.search("base64,");
        const res = baseURL.slice(position + 7);
        setimages((current) => [...current, res]);
      });
    });
  };

  const DeletImage = (e) => {
    const result = images.filter((ele) => ele !== e);
    setimages(result);
  };

  const ProductsImage = images.map((ele, idx) => {
    return (
      <div className={styles.Card_image} key={idx}>
        <LazyLoadImage
          src={`data:image/jpeg;base64,${ele}`}
          // src={`data:image/jpeg;base64,${Logo}`}
          // src={img}
          alt="matgerLogo"
          effect="blur"
          width={70}
          height={70}
        />
        <TiDelete onClick={() => DeletImage(ele)} />
      </div>
    );
  });

  return (
    <>
      <div className={styles.MyProducts}>
        <Toast ref={toast} />
        <h1 className={styles.main_heading}>منتجاتي</h1>
        {!show && (
          <button
            name="اضافة منتج"
            type="button"
            className={styles.submit_button}
            onClick={() => {
              handleShow();
            }}
          >
            اضغط لاضافة منتج جديد
            <RiAddCircleLine />
          </button>
        )}
        <Container>
          <Row>{Products}</Row>
        </Container>
        {/* {TestImages} */}
        <Modal show={show} onHide={handleClose} size={"lg"}>
          <Modal.Header closeButton>
            <Modal.Title>اضافة منتج</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={styles.pro_input_div}>
              <label htmlFor="selectcat">اختار التصنيف</label>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => setCatSelected(e.target.value)}
              >
                {Categories
                  ? Categories.map((ele) => {
                      return (
                        <option value={ele.id} key={ele.id}>
                          {ele.name}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>

            {RelatedCat ? (
              <div className={styles.pro_input_div}>
                <label htmlFor="selectcat">اختار التصنيف الفرعي</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => setRelatedCatSelected(e.target.value)}
                >
                  {RelatedCat
                    ? RelatedCat.map((ele) => {
                        return (
                          <option value={ele.id} key={ele.id}>
                            {ele.name}
                          </option>
                        );
                      })
                    : null}
                </select>
              </div>
            ) : null}

            <div className={styles.pro_input_div}>
              <label htmlFor="name">اسم المنتج</label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.pro_input_div}>
              <label htmlFor="price">سعر المنتج</label>
              <input
                type="number"
                name="price"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className={styles.pro_input_div}>
              <label htmlFor="storeImage">صورة المنتج</label>
              <div className={styles.select_product_Image}>
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="storeImage"
                  name="storeImage"
                  accept="image/*"
                  multiple={true}
                  // onChange={handleImage}
                  onChange={(e) => {
                    // getBase64(e.target.files[0]);
                    // UploadImge(e.target.files[0]);
                    UploadImge(e.target.files);
                    // handleImage(e);
                  }}
                />
                <label htmlFor="storeImage" className={styles.chosseProImages}>
                  اختر
                </label>
              </div>
            </div>
            <div className={`${styles.ProductIamge} ${styles.MatgerImage}`}>
              {ProductsImage}
            </div>
            <div className={styles.pro_input_div}>
              <label htmlFor="description">وصف المنتج</label>
              <Form.Control
                as="textarea"
                id="description"
                placeholder="وصف المنتج"
                style={{ height: "200px" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button
              name="حفظ"
              type="submit"
              className={styles.submit_button}
              onClick={(e) => {
                SendDate(e);
                handleClose();
              }}
            >
              رفع المنتج
            </button>
          </Modal.Body>
        </Modal>

        <Modal show={showEditCard} onHide={handleCloseEdit} size={"lg"}>
          <Modal.Header closeButton>
            <Modal.Title>التعديل علي المنتج </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={styles.pro_input_div}>
              <label htmlFor="selectcat">اختار التصنيف</label>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => setCatSelected(e.target.value)}
              >
                {Categories && EditData
                  ? Categories.map((ele) => {
                      return (
                        <option value={ele.id} key={ele.id} selected={ele.id == EditData.catId}>
                          {ele.name}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>

            {RelatedCat ? (
              <div className={styles.pro_input_div}>
                <label htmlFor="selectcat">اختار التصنيف الفرعي</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => setRelatedCatSelected(e.target.value)}
                >
                  {RelatedCat
                    ? RelatedCat.map((ele) => {
                        return (
                          <option value={ele.id} key={ele.id} >
                            {ele.name}
                          </option>
                        );
                      })
                    : null}
                </select>
              </div>
            ) : null}

            <div className={styles.pro_input_div}>
              <label htmlFor="name">اسم المنتج</label>
              <input
                type="text"
                name="name"
                id="name"
                defaultValue={EditData.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.pro_input_div}>
              <label htmlFor="price">سعر المنتج</label>
              <input
                type="number"
                name="price"
                id="price"
                defaultValue={EditData.price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className={styles.pro_input_div}>
              <label htmlFor="storeImage">صورة المنتج</label>
              <div className={styles.select_product_Image}>
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="storeImage"
                  
                  name="storeImage"
                  accept="image/*"
                  multiple={true}
                  // onChange={handleImage}
                  onChange={(e) => {
                    // getBase64(e.target.files[0]);
                    // UploadImge(e.target.files[0]);
                    UploadImge(e.target.files);
                    // handleImage(e);
                  }}
                />
                
                <label htmlFor="storeImage" className={styles.chosseProImages}>
                  اختر
                </label>
                
              </div>
              {EditData.images ? 
                  <div style={{width : '100%', textAlign : 'center'}}>
                     <LazyLoadImage src={`${baseUrl}/imag?id=${EditData.images[0]}`} width={100} height={100}/>
                  </div>
                 : null}
            </div>
            <div className={`${styles.ProductIamge} ${styles.MatgerImage}`}>
              {ProductsImage}
            </div>
            <div className={styles.pro_input_div}>
              <label htmlFor="description">وصف المنتج</label>
              <Form.Control
                as="textarea"
                id="description"
                placeholder="وصف المنتج"
                style={{ height: "200px" }}
                defaultValue={EditData.description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button
              name="حفظ"
              type="submit"
              className={styles.submit_button}
              onClick={(e) => {
                SendEditDate(e);
                handleClose();
              }}
            >
              تعديل المنتج
            </button>
          </Modal.Body>
        </Modal>
      </div>
      <Service />
      <LastofOffersProducts />
      <FooterBar />
    </>
  );
};

export default MyProducts;
