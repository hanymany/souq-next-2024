"use client"
import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import { getLogin } from "../../store/authSlice";
import { BsFillPersonFill } from "react-icons/bs";
import { Toast } from "primereact/toast";
import { RiLockPasswordFill } from "react-icons/ri";
import { GetFromCart } from "../../store/ShopSlice";
import { getjsonStrings } from "../../store/ControlPanalSlice";
// import "./Login.css";
// import { MetaTags } from "react-meta-tags";
// import { Helmet } from "react-helmet";
import styles from "../page.module.css";
import Link from "next/link";

const Login = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const toast = useRef(null);




  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "الاسم او الرقم السري غير صحيح",
      detail: "برجاء التأكد من ادخل البيانات بشكل صحيح",
      life: 3000,
    });
  };

  const EMptyInput = () => {
    toast.current.show({
      severity: "error",
      summary: "برجاء ادخال جميع البيانات",
      life: 3000,
    });
  };

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "تم تسجيل الدخول بنجاح",
      // detail: "Message Content",
      life: 3000,
    });
    // return true;
  };
 

  const ForgetPass = (e) => {
    const ForgetPassword = true;
     if (typeof window !== 'undefined') {
      localStorage.setItem('ForgetPassword', JSON.stringify(ForgetPassword));
     }
  
    console.log(ForgetPassword);
  }
  


  const SendDate = (e) => {
    e.preventDefault();
    if (name.length === 0 || password.length === 0) {
      EMptyInput();
    } else {
      const data = {
        name,
        password,
      };
      dispatch(getLogin(data))
        .unwrap()
        .then((originalPromiseResult) => {
          if (originalPromiseResult.Result === false) {
            showError();
          } else {
            dispatch(GetFromCart(originalPromiseResult.id));
            dispatch(getjsonStrings(originalPromiseResult.id));
            // navigate(`/cp`);
            window.location.href = "/cp";
            showSuccess();
            const ForgetPassword = false;
            if (typeof window !== 'undefined') {
             localStorage.setItem('ForgetPassword', JSON.stringify(ForgetPassword));
            }
  console.log("ForgetPassword" ,ForgetPassword)
}
        })
        .catch((rejectedValueOrSerializedError) => {
          console.log(rejectedValueOrSerializedError);
        });
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <div className={styles.LoginPage}>
        <h2 className="text-center">تسجيل الدخول</h2>
        <Form>
          <div className={`${styles.search_section } ${styles.input_div}`} >
            <input
              type="text"
              name="name"
              id="name"
              placeholder="اسم المستخدم"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="name"  className="label_icon">
              <BsFillPersonFill />
            </label>
          </div>
          <div className={`${styles.search_section } ${styles.input_div}`}>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="كلمة السر"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password"  className="label_icon"> 
              <RiLockPasswordFill />
            </label>
          </div>

          <button
            name="login"
            type="submit"
            className={styles.submit_button}
            onClick={(e) => {
              SendDate(e);
            }}
          >
            تسجيل الدخول
          </button>
          <button
            className={styles.forgetPass}
            name="forgetPass"
            type="button"
            onClick={(e) => {
              ForgetPass(e);
            }}
          >
          <Link href={"/reset"} > 
           هل نسيت كلمة السر ؟
          </Link>
          </button>
          <div  className={styles.go_to_regPage_container}>
            <span>ليس لديك حساب ؟</span>
            <button
              className={styles.go_to_regPage_button}
              name="go-to-regPage-button"
              type="button"
              onClick={() => {
                // navigate(`/sign-up`);
                window.scrollTo({
                  top: 0,
                  left: 100,
                  behavior: "instant",
                });
              }}
            >
              <Link href={"/sign-up"}>
                 انشاء حساب
          </Link>
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
