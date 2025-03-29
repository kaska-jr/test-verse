import React from "react";
import {
  Visa,
  Mastercard,
  Paypal,
  Amex,
  Bitcoin,
  Applepay,
  Amazon,
} from "react-pay-icons";

function PaymentIcons() {
  return (
    <div className="flex items-center justify-center flex-wrap max-w-md border">
      <div style={{ margin: 10, width: 70 }}>
        <Visa />
      </div>
      <div style={{ margin: 10, width: 70 }}>
        <Mastercard />
      </div>
      <div style={{ margin: 10, width: 70 }}>
        <Bitcoin />
      </div>
      <div style={{ margin: 10, width: 70 }}>
        <Paypal />
      </div>
      <div style={{ margin: 10, width: 70 }}>
        <Amex />
      </div>
      <div style={{ margin: 10, width: 70 }}>
        <Applepay />
      </div>
      <div>
        <Amazon />
      </div>
    </div>
  );
}

export default PaymentIcons;
