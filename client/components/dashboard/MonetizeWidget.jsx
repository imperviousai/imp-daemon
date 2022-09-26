import React from "react";
import Card from "../Card";
import SubscribersWidget from "./monetize/SubscribersWidget";
import SubscriptionPaymentWidget from "./monetize/SubscriptionPaymentWidget";
import PublishImage from "../../images/undraw_publish.svg";

const MonetizeWidget = () => {
  return (
    <div className="bg-purple-100 md:row-span-2 md:col-span-2">
      <Card>
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-semibold text-primary pt-4">
            Direct Content Monetization
          </h3>
          <p className="text-lg font-light text-primary opacity-80 py-2">
            Self publish, host, and monetize premium subscriptions and other
            paid content.
          </p>
          <p className="text-md font-semibold pt-4 pb-1">
            Estimate what you could make using Impervious publishing tools.
          </p>
          <div className="flex flex-row pb-4">
            <div className="px-2">
              <SubscribersWidget />
            </div>
            <div className="px-2">
              <SubscriptionPaymentWidget />
            </div>
          </div>
          <h1 className="text-4xl font-bold pb-4">
            $4,648 <span className="text-2xl font-light">per month</span>
          </h1>
          {/* <PublishImage className="h-28 mb-10" /> */}
          <button
            type="button"
            className="inline-flex items-center px-20 py-2 border border-transparent text-2xl font-bold rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Get Started
          </button>
        </div>
      </Card>
    </div>
  );
};

export default MonetizeWidget;
