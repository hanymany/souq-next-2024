"use client"


import React, { useRef, useState } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import Link from "next/link";
import styles from "../page.module.css"
import Service from "../components/Service/Service";
import LastofOffersProducts from "@/app/components/lastProduct/LastofOffersProducts";
import FooterBar from "@/app/components/FooterBar/FooterBar";
import { getchangePassword } from "@/store/authSlice";
import { useDispatch } from "react-redux";
import { Toast } from "primereact/toast";
const NewPassword = () => {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const toast = useRef(null);

  const dispatch = useDispatch();

  const validate = () => {
    toast.current.show({
      severity: "error",
      summary: 'يجب أن تتطابق كلمات المرور',
      life: 3000,
    });
  };
  const validatefill = () => {
    toast.current.show({
      severity: "error",
      summary: 'يرجى ملء جميع حقول كلمة المرور',
      life: 3000,
    });
  };
  
  const successful = () => {
    toast.current.show({
      severity: "success",
      summary: "تم تغيير كلمة السر بنجاح",
      life: 3000,
    });
  };

  const SendDate = (e) => {

    const mail = typeof window !== 'undefined' ? localStorage.getItem('userEmail') : null;
    console.log(mail)
e.preventDefault();

if (!password1 || !password2) {
  validatefill()
}
else if (password1 !== password2) {
    validate()
  
} else {
  dispatch(getchangePassword( password1 , mail));
    console.log(password1)
    successful()
    window.location.href = '/login';
  }

 
  };


  return (
    <>
        <Toast ref={toast} />
    <div  className={styles.LoginPage}>
      
      <h2 className="text-center">انشاء كلمة سر جديدة</h2>
      <form>
        <div  className={`${styles.input_div} ${styles.search_section}`}>
          <input
            type="password"
            name="password1"
            id="password1"
            placeholder="كلمة السر الجديدة"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
          <label htmlFor="password1" className="label_icon">
            <RiLockPasswordFill />
          </label>
        </div>

        <div className={`${styles.input_div} ${styles.search_section}`}>
          <input
            type="password"
            name="password2"
            id="password2"
            placeholder="اعادة كتابة كلمة السر"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <label htmlFor="password2" className="label_icon">
            <RiLockPasswordFill />
          </label>
        </div>

        <button
          name="login"
          type="submit"
          className={styles.submit_button}
          onClick={(e) => {
             SendDate(e)
            // navigate("/");
            window.scrollTo({
              top: 0,
              left: 100,
              behavior: "instant",
            });
          }}
        >
        {/* <Link href={"/"} >  */}
        ارسال
        {/* </Link> */}
        </button>
      </form>
    </div>
    <Service />
 <LastofOffersProducts />
 <FooterBar />
    </>
  );
};

export default NewPassword;
