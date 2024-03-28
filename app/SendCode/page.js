"use client"
import React, { useEffect, useRef, useState } from "react";
import OtpInput from "react-otp-input";
// import { Helmet } from "react-helmet";
import { Toast } from "primereact/toast";
import styles from "../page.module.css";
import Link from "next/link";
import Service from "../components/Service/Service";
import LastofOffersProducts from "@/app/components/lastProduct/LastofOffersProducts";
import FooterBar from "@/app/components/FooterBar/FooterBar";
import { useDispatch } from "react-redux";
import { getvalidateEmaile, getverify } from "@/store/authSlice";
 


const SendCode = () => {
  const dispatch = useDispatch();

  const toast = useRef(null);
  const [code, setCode] = useState("")
  const handleChange = (code) => {
    setCode({ code });
  };
  const renderInput = (inputProps) => {
    return <input {...inputProps} />;
  };
 
  const mail = typeof window !== 'undefined' ? localStorage.getItem('userEmail') : null;

  const SendDate = async (e) => {
    e.preventDefault();
 
const ForgetPassword = JSON.parse(localStorage.getItem('ForgetPassword'));

    const response = await dispatch(getvalidateEmaile({ code, mail: mail }));
  console.log("response" ,response.payload.saved)
  if (response && response.payload.saved === true) {
      successful()                                                                                                       
      if (ForgetPassword === true) {
        window.location.href = '/NewPassword';
      } else {
        window.location.href = '/login';
      }
    } else {
      EMptyInput();
    }
  };

 
  const ResendCode = (e) => {
    
  };

  useEffect(()=>{
    dispatch(getverify(mail));
    //  document.getElementById("resend_button").disabled = true;
     EResendCode()
  
  },[])
  
  const EResendCode = () => {
    toast.current.show({
      severity: "success",
      summary: "تم ارسال الرمز بنجاح  ",
      life: 3000,
    });
  };
  const successful = () => {
    toast.current.show({
      severity: "success",
      summary: "تم تسجيل الدخول بنجاح",
      life: 3000,
    });
  };

  const EMptyInput = () => {
    toast.current.show({
      severity: "error",
      summary: "برجاء ادخال  كود صحيح ",
      life: 3000,
    });
  };
   
  return (
    <>
      <div className={`${styles.SendCode} ${styles.LoginPage}`}>

        <Toast ref={toast} />
        <h2 className="text-center">لقد تم ارسال رسالة الى بريدك الابكترونى</h2>
        <form>
          <div className={styles.otp_container} >
            <OtpInput
              value={code.code}
              onChange={handleChange}
              numInputs={4}
              separator={<span>-</span>}
              placeholder={"****"}
              inputStyle={{
                width: "4rem",
                height: "4rem",
                margin: "0 1rem",
                fontSize: "2rem",
                borderRadius: 12,
              }}
              renderInput={renderInput}
            />
          </div>
          <button
            className={styles.submit_button}
            name="login"
            type="submit"
            onClick={(e) => {
              SendDate(e);
            }}
          >
            {/* <Link href={"/"}>  */}
            ارسال الكود
            {/* </Link> */}
          </button>

           <button
            name="resend_code"
            type="button"
            id="resend_button"
            className={styles.resend_code}
            onClick={ResendCode}
          >
            ارسال الرمز مرة اخرى
          </button>  
        </form>
      </div>
      <Service />
      <LastofOffersProducts />
      <FooterBar />
    </>
  );
};

export default SendCode;
