"use client";
import { Card } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import { text } from "stream/consumers";

const TradingViewWidget = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: "100%",
      height: 400,
      currencies: ["EUR", "USD", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD"],
      isTransparent: true,
      colorTheme: "dark",
      locale: "en",
      textColor: "#ffffff",
    });

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }
  }, []);

  return (
    <Card>
      <div className="p-6">
        <h1 className="mb-2 uppercase text-sm font-semibold">
          Real time market data
        </h1>{" "}
        <div className="tradingview-widget-container">
          <div
            ref={containerRef}
            className="tradingview-widget-container__widget"
          />
          <div className="tradingview-widget-copyright">
            <a
              href="https://www.tradingview.com/"
              rel="noopener nofollow"
              target="_blank"
            >
              <span className="blue-text">
                Track all markets on TradingView
              </span>
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TradingViewWidget;
