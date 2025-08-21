/**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// === Constants ===
const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];
const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Engineer"];
const PRICE_RANGE = { min: 20, max: 200 };
const NUM_FREELANCERS = 100;

//=== STATE ====//

const freelancer = Array.from({ length: NUM_FREELANCERS }, makeFreelancers);
const averageRate = getAverageRate();

function makeFreelancers() {
  const name = NAMES[Math.floor(Math.random() * NAMES.length)];
  const occupation =
    OCCUPATIONS[Math.floor(Math.random() * OCCUPATIONS.length)];
  const rate =
    Math.floor(Math.random() * (PRICE_RANGE.max - PRICE_RANGE.min + 1)) +
    PRICE_RANGE.min;

  return { name, occupation, rate };
}

console.log(freelancer, averageRate);

function getAverageRate() {
  const total =
    freelancer.reduce((accum, currentFreelancer) => {
      return accum + currentFreelancer.rate;
    }, 0) / NUM_FREELANCERS;

  return total;
}

function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function FreelancerRow({ name, occupation, rate }) {
  const $tr = document.createElement("tr");
  $tr.innerHTML = `
    <td>${name}</td>
    <td>${occupation}</td>
    <td>$${rate}</td>
  `;
  return $tr;
}

function FreelancerRows(freelancers) {
  const $tbody = document.createElement("tbody");
  const $freelancers = freelancers.map(FreelancerRow);
  $tbody.replaceChildren(...$freelancers);
  return $tbody;
}

function AverageRate(rate) {
  const $p = document.createElement("p");
  $p.textContent = `The average rate is $${averageRate.toFixed(2)}.`;
  return $p;
}

function render() {
  const $app = document.querySelector("#app");

  $app.innerHTML = `
    <h1>Freelancer Forum</h1>
    <AverageRate></AverageRate>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Occupation</th>
          <th>Rate</th>
        </tr>
      </thead>
      <tbody id="FreelancerRows"></tbody>
    </table>
  `;
  $app.querySelector("AverageRate").replaceWith(AverageRate(averageRate));
  $app
    .querySelector("#FreelancerRows")
    .replaceWith(FreelancerRows(freelancers));
}

render();
