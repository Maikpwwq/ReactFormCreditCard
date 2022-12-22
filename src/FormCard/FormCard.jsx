import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { PatternFormat } from "react-number-format";
import { addPeople } from "../redux/states/people";
import { format } from "date-fns"; // parse
import { v4 as uuidv4 } from "uuid";
import sha512 from "js-sha512";

import SnackBarAlert from "../components/SnackBarAlert/SnackBarAlert";
import cardIcon from "../cardIcon.png";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

const FormCard = () => {
  const dispatch = useDispatch();
  const {
    control,
    register,
    reset,
    // watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    } else {
      setAlert({ ...alert, open: false, message: "" });
    }
  };

  const onSubmit = (data) => {
    const id = uuidv4();
    const formatedTime = format(data.validThru, "MM/yyyy");
    data.validThru = formatedTime;
    data.id = id;
    const encryptedCVV = sha512(data.cvv);
    data.cvv = encryptedCVV;
    dispatch(addPeople(data));
    setAlert({
      ...alert,
      open: true,
      message: "Se han registrado los datos de forma correcta.",
    });
    reset({
      cardNumber: "",
      holderName: "",
      validThru: "",
      cvv: "",
    });
  };

  // console.log(
  //   watch("cardNumber"),
  //   watch("holderName"),
  //   watch("validThru"),
  //   watch("cvv")
  // );

  return (
    <Box
      className="p-4"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        "& > :not(style)": {
          width: 384,
          minHeight: 350,
        },
      }}
    >
      {alert.open && (
        <SnackBarAlert
          message={alert.message}
          onClose={handleClose}
          severity={alert.severity} // success, error, warning, info, default
          open={alert.open}
        />
      )}
      <Card
        elevation={12}
        className="p-4 justify-center flex flex-col items-center"
        sx={{ borderRadius: "16px !important" }}
      >
        {/* background: `url(${productCTAImageDots})`, */}
        <CardMedia>
          <img
            src={cardIcon}
            alt="accept all cards"
            height="21px"
            width="280px"
          />
        </CardMedia>
        <form
          className="p-4 w-full justify-center flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="text-left" htmlFor="cardNumber">
            CREDIT CARD NUMBER
          </label>
          <br />
          <Controller
            sx={{ borderStyle: "solid" }}
            control={control}
            id="cardNumber"
            name="cardNumber"
            rules={{
              required: true,
              pattern: /\d+/,
              maxLength: 19,
              minLength: 19,
            }}
            render={({ field }) => (
              <PatternFormat
                className="rounded border-2 border-indigo-500/25 hover:border-indigo-500/75"
                format="#### #### #### ####"
                {...field}
              />
            )}
          />
          {errors.cardNumber && (
            <p className="text-sm font-extralight">
              Credit card number must have 16 digits.
            </p>
          )}
          <br />
          <label className="mt-4 text-left" htmlFor="holderName">
            CARD HOLDER NAME
          </label>
          <br />
          <input
            className="rounded border-2 border-indigo-500/25 hover:border-indigo-500/75"
            id="holderName"
            {...register("holderName", { required: true, maxLength: 84 })}
          />
          {errors.holderName && (
            <p className="text-sm font-extralight">Please enter full name.</p>
          )}
          <br />
          <Box
            className="mt-4 mb-4 justify-center flex"
            sx={{
              flexDirection: { xs: "column", sm: "row", md: "row" },
            }}
          >
            <Box className="mb-4 justify-center flex flex-col w-8/12">
              <label className="text-left" htmlFor="validThru">
                VALID THRU
              </label>
              <br />
              <Controller
                id="validThru"
                name="validThru"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <ReactDatePicker
                    className="w-48 rounded border-2 border-indigo-500/25 hover:border-indigo-500/75"
                    onChange={(date) => {
                      field.onChange(date);
                    }}
                    selected={field.value}
                    dateFormat="MM/yyyy"
                    // startDate={parse("12/2022", new Date())}
                    showMonthYearPicker
                    showFullMonthYearPicker
                    // isClearable={true}
                  />
                )}
              />
              {errors.validThru && (
                <p className="text-sm font-extralight">
                  Please select month and year.
                </p>
              )}
            </Box>
            <Box className="mb-4 justify-center flex flex-col w-4/12">
              <label className="text-left" htmlFor="cvv">
                CVV
              </label>
              <br />
              <Controller
                control={control}
                id="cvv"
                name="cvv"
                rules={{ required: true, pattern: /\d+/, maxLength: 3 }}
                render={({ field }) => (
                  <PatternFormat
                    className="w-24 rounded border-2 border-indigo-500/25 hover:border-indigo-500/75"
                    format="###"
                    {...field}
                  />
                )}
              />
              {errors.cvv && (
                <p className="text-sm font-extralight">
                  Please enter number for CVV .
                </p>
              )}
            </Box>
          </Box>
          <br />
          <button
            className="mt-2 rounded-lg p-4 bg-slate-400 hover:bg-slate-500 border border-slate-300 hover:border-slate-400 "
            title="Submit"
          >
            SUBMIT DETAILS
          </button>
        </form>
      </Card>
    </Box>
  );
};

export default FormCard;
