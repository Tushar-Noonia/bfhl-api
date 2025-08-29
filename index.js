import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const FULL_NAME = "tushar_noonia";
const DOB = "29062004";
const EMAIL = "tusharnoonia123@gmail.com";
const ROLL_NUMBER = "22BCE1998";

function alternatingCaps(str) {
  let result = "";
  let toggle = true;
  for (let i = str.length - 1; i >= 0; i--) {
    result += toggle ? str[i].toUpperCase() : str[i].toLowerCase();
    toggle = !toggle;
  }
  return result;
}

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data;
    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "data must be an array" });
    }

    let evenNumbers = [];
    let oddNumbers = [];
    let alphabets = [];
    let specialChars = [];
    let sum = 0;

    data.forEach(item => {
      if (!isNaN(item)) {
        const num = parseInt(item);
        sum += num;
        if (num % 2 === 0) evenNumbers.push(num);
        else oddNumbers.push(num);
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        specialChars.push(item);
      }
    });

    const concatString = alternatingCaps(alphabets.join(""));

    return res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      even_numbers: evenNumbers,
      odd_numbers: oddNumbers,
      alphabets: alphabets,
      special_characters: specialChars,
      sum: sum,
      concat_string: concatString
    });
  } catch (err) {
    return res.status(500).json({ is_success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
