import React from "react";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { NumericFormat, PatternFormat } from "react-number-format";
import { addPeople } from "../redux/states/people";
import { format, parse } from "date-fns";
import { v4 as uuidv4 } from "uuid";

import cardIcon from  "../cardIcon.png"

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from '@mui/material/CardMedia';

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

  const onSubmit = (data) => {
    const id = uuidv4();
    const formatedTime = format(data.validThru, "MM/yyyy");
    data.validThru = formatedTime;
    data.id = id;
    dispatch(addPeople(data));
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
      <Card
        elevation={12}
        className="p-4 justify-center flex flex-col items-center"
        sx={{ borderRadius: "16px !important" }}
      >
        {/* background: `url(${productCTAImageDots})`, */}
        <CardMedia>
          <img src={cardIcon} alt="accept all cards" height="21px" width="280px" />
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
            rules={{ required: true, pattern: /\d+/, maxLength: 19, minLength: 19 }}
            render={({ field }) => (
              <PatternFormat
                className="mb-4 rounded border-2 border-indigo-500/25 hover:border-indigo-500/75"
                format="#### #### #### ####"
                {...field}
              />
            )}
          />
          {errors.cardNumber && <p>credit card number must have 16 digits.</p>}
          <br />
          <label className="text-left" htmlFor="holderName">
            CARD HOLDER NAME
          </label>
          <br />
          <input
            className="mb-4 rounded border-2 border-indigo-500/25 hover:border-indigo-500/75"
            id="holderName"
            {...register("holderName", { required: true, maxLength: 84 })}
          />
          {errors.holderName && <p>Please enter full name.</p>}
          <br />
          <Box
            className="mb-4 justify-center flex"
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
            </Box>
            {errors.validThru && <p>Please select month and year.</p>}
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
            </Box>
          </Box>
          {errors.cvv && <p>Please enter number for CVV .</p>}
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
