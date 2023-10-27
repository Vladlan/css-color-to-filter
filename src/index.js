import { Color } from './utils/color.js';
import { Solver } from './utils/solver.js';
import { hexToRgb } from './utils/hex-to-rgb.js';
import index from "./index.css";

document.addEventListener("DOMContentLoaded", function () {
  addHTML();
  document.querySelector("button.execute").addEventListener("click", function () {
    const hexColor = document.querySelector("input.target").value;
    const rgb = hexToRgb(hexColor);
    if (rgb.length !== 3) {
      alert('Invalid format!');
      return;
    }

    const color = new Color(rgb[0], rgb[1], rgb[2]);
    const solver = new Solver(color);
    const result = solver.solve();

    let lossMsg;
    if (result.loss < 1) {
      lossMsg = 'This is a perfect result.';
    } else if (result.loss < 5) {
      lossMsg = 'The is close enough.';
    } else if (result.loss < 15) {
      lossMsg = 'The color is somewhat off. Consider running it again.';
    } else {
      lossMsg = 'The color is extremely off. Run it again!';
    }

    document.querySelector('.realPixel').style.backgroundColor = color.toString();
    document.querySelector('.filterPixel').setAttribute('style', result.filter);
    document.querySelector('.filterDetail').textContent = result.filter;
    document.querySelector('.lossDetail').innerHTML = `Loss: ${result.loss.toFixed(1)}. <b>${lossMsg}</b>`;
  });
}); 


function addHTML() {
  const baseDiv = document.createElement("div");
  const ID_ADD_AFTER_ME = "add_after_me"
  baseDiv.id = ID_ADD_AFTER_ME;
  document.body.appendChild(baseDiv);

  document.getElementById(ID_ADD_AFTER_ME).insertAdjacentHTML(
    "afterend",
    `<table>
    <tr valign="top">
      <td width="50%">
        <fieldset>
          <p>
            <label>Target color</label> <input class="target" type="text" placeholder="target hex" value="#00a4d6"/>
          </p>
          <button class="execute">Compute Filters</button>
        </fieldset>
        <p>Real pixel, color applied through CSS <code>background-color</code>:</p>
        <div class="pixel realPixel"></div>
  
        <p>Filtered pixel, color applied through CSS <code>filter</code>:</p>
        <div class="pixel filterPixel"></div>
  
        <p class="filterDetail"></p>
        <p class="lossDetail"></p>
      </td>
      <td>
        <p>The goal was to be able to create custom style sheets and allow for the coloring of icons for <a href="https://sosuke.com/creating-a-dovetail-agent-theme/" target="_blank">Creating a Dovetail Agent Theme</a>.</p>
        <p>For this code to work well the starting color needs to be black. If your icon set isn't black you can prepend "brightness(0) saturate(100%)" to your filter property which will first turn the icon set to black.</p>
        <p>
          For as long as I worked on creating this solution from multiple resources I found some had spent far
          longer to create this already completed solution. Only slightly modified to focus on HEX colors. Credit
          goes to MultiplyByZer0 for their post <a href="https://stackoverflow.com/a/43960991/604861" target="_blank">https://stackoverflow.com/a/43960991/604861</a>
        </p>
      </td>
    </tr>
  </table>`
  );
}
