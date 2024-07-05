import StripeCheckout from "react-stripe-checkout";
import { useState, useEffect } from "react";
import axios from "axios";

const KEY = "pk_test_51PYauSRsc5shmBBkYeJV7qdRiKQNyF4igBuja5Dizm3qrmuTze0UQsrjHKuxN4iYcJGSFWj9VMghl4Q29zBknc3J00pwhDaz62";

const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory()

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post("http://localhost:3000/api/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 3000,
        });
        console.log(res.data);
        history.push("/sucess");
      } catch (err) {
        console.log(err);
      }
    };

    if (stripeToken) {
      makeRequest();
    }
  }, [stripeToken, history]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center", 
        justifyContent: "center",
      }}
    >
      {stripeToken ? (
        <span>Processing. Please wait!</span>
      ) : (
        <StripeCheckout
          name="My Project"
          image="https://www.bing.com/images/search?view=detailV2&ccid=LtJa1Tvl&id=F51E4B9EB836F6AF71661B5074EE5A05084A7020&thid=OIP.LtJa1TvlS6Yh6u8b5bHXyAHaH_&mediaurl=https%3a%2f%2fcdn1.vectorstock.com%2fi%2f1000x1000%2f37%2f30%2fshopping-bag-e-commerce-logo-vector-30103730.jpg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.2ed25ad53be54ba621eaef1be5b1d7c8%3frik%3dIHBKCAVa7nRQGw%26pid%3dImgRaw%26r%3d0&exph=1080&expw=1000&q=ecommerce+logo&simid=608004380195301542&FORM=IRPRST&ck=3F0CB5A4B3FE08B6D853C634F3D7BB21&selectedIndex=0&itb=0&idpp=overlayview&ajaxhist=0&ajaxserp=0"
          billingAddress
          shippingAddress
          description="Your total bill is $30"
          amount={3000}
          token={onToken}
          stripeKey={KEY}
        >
          <button
            style={{
              border: "none",
              width: 120,
              borderRadius: 5,
              padding: "20px",
              backgroundColor: "black",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Pay Now
          </button>
        </StripeCheckout>
      )}
    </div>
  );
};

export default Pay;
