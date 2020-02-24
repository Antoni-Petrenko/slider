import { createSlider } from "./sliderCreator.module.js";

const data = {
  P_Versa: {
    productIMG: [
      "./asset/img/products/P_Versa/P_Versa_Pink.png",
      "./asset/img/products/P_Versa/P_Versa_Grey.png",
      "./asset/img/products/P_Versa/P_Versa_Black.png"
    ],
    buttons: [
      [
        "./asset/img/products/P_Versa/buttons/P_Versa_Pink_off.png",
        "./asset/img/products/P_Versa/buttons/P_Versa_Pink_on.png"
      ],
      [
        "./asset/img/products/P_Versa/buttons/P_Versa_Grey_off.png",
        "./asset/img/products/P_Versa/buttons/P_Versa_Grey_on.png"
      ],
      [
        "./asset/img/products/P_Versa/buttons/P_Versa_Black_off.png",
        "./asset/img/products/P_Versa/buttons/P_Versa_Black_on.png"
      ]
    ],
    info: [
      { lockup: "./asset/img/products/P_Versa/P_Versa_lockup.png" },
      { price: "./asset/img/products/P_Versa/P_Versa_price.png" }
    ]
  },
  P_Charge3: {
    productIMG: [
      "./asset/img/products/P_Charge3/P_Charge3_Lilac.png",
      "./asset/img/products/P_Charge3/P_Charge3_Black.png",
      "./asset/img/products/P_Charge3/P_Charge3_Blue.png"
    ],
    buttons: [
      [
        "./asset/img/products/P_Charge3/buttons/P_Charge3_Lilac_off.png",
        "./asset/img/products/P_Charge3/buttons/P_Charge3_Lilac_on.png"
      ],
      [
        "./asset/img/products/P_Charge3/buttons/P_Charge3_Black_off.png",
        "./asset/img/products/P_Charge3/buttons/P_Charge3_Black_on.png"
      ],
      [
        "./asset/img/products/P_Charge3/buttons/P_Charge3_Blue_off.png",
        "./asset/img/products/P_Charge3/buttons/P_Charge3_Blue_on.png"
      ]
    ],
    info: [
      { lockup: "./asset/img/products/P_Charge3/P_Charge3_lockup.png" },
      { price: "./asset/img/products/P_Charge3/P_Charge3_price.png" },
      { disclaimer: "./asset/img/products/P_Charge3/P_HR_disclaimer.png" }
    ]
  },
  P_HR: {
    productIMG: [
      "./asset/img/products/P_HR/P_HR_White.png",
      "./asset/img/products/P_HR/P_HR_Lilac.png",
      "./asset/img/products/P_HR/P_HR_Black.png"
    ],
    buttons: [
      [
        "./asset/img/products/P_HR/buttons/P_HR_White_off.png",
        "./asset/img/products/P_HR/buttons/P_HR_White_on.png"
      ],
      [
        "./asset/img/products/P_HR/buttons/P_HR_Lilac_off.png",
        "./asset/img/products/P_HR/buttons/P_HR_Lilac_on.png"
      ],
      [
        "./asset/img/products/P_HR/buttons/P_HR_Black_off.png",
        "./asset/img/products/P_HR/buttons/P_HR_Black_on.png"
      ]
    ],
    info: [
      { lockup: "./asset/img/products/P_HR/P_HR_lockup.png" },
      { price: "./asset/img/products/P_HR/P_HR_price.png" }
    ]
  }
};

const main = document.getElementById("slider");

createSlider(data, main);
