import React from "react"

const Overlay = () => {
  return (
    <div className="overlay">
      <h1>
        <span>With</span> Seasonal Greetings{" "}
        <span>
          from <a href="https://pehaa.com">PeHaa</a>
        </span>
      </h1>
      <footer>
        <p>Built with Three.js and React.</p>
        <p>
          Inspired by{" "}
          <a href="https://0xca0a.gumroad.com/l/B4N4N4S">
            this fantastic tutorial
          </a>{" "}
          by <a href="https://twitter.com/0xca0a">Paul Henschel.</a>
        </p>
        <p className="small">
          <a href="https://skfb.ly/66UxM">
            Gingerbread Man (from Shrek) by Valentine Buketov
          </a>{" "}
          licensed under{" "}
          <a href="http://creativecommons.org/licenses/by/4.0/">
            CC Attribution.
          </a>
        </p>
        <p className="small">
          Candy cane by Poly by Google{" "}
          <a href="https://creativecommons.org/licenses/by/3.0/">CC-BY</a> via{" "}
          <a href="https://poly.pizza/m/eybaJ6A5xPj">Poly Pizza</a>
        </p>
      </footer>
    </div>
  )
}

export default Overlay
