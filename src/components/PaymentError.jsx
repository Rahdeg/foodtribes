import React from "react";

const PaymentError = () => {
  return (
    <div className="mt4">
      <article class="mw7 center ph3 ph5-ns tc br2 pv5 bg-washed-green dark-green mb2">
        <h1 class="fw6 f3 f2-ns lh-title mt0 mb3">Registration Successfull</h1>
        <h2 class="fw2 f4 lh-copy mt0 mb3">
          This will change things. And we want you to be involved. Keep tracks
          of your To do
        </h2>
        <p class="fw1 f5 mt0 mb3">Sign in to continue ......</p>
        <div>
          <a
            class="f6 br-pill bg-dark-green no-underline tc washed-green ba b--dark-green grow pv2 ph3 dib mr3"
            href="/signin"
          >
            Sign in
          </a>
        </div>
      </article>
    </div>
  );
};

export default PaymentError;
