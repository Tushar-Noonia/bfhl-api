import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/bfhl", (req, res) => {
  const data = req.body.data || [];
  
  const evenNumbers = [];
  const oddNumbers = [];
  const alphabets = [];
  const specialChars = [];
  let sum = 0;

  data.forEach((item) => {
    if (/^\d+$/.test(item)) {
      const num = parseInt(item, 10);
      if (num % 2 === 0) evenNumbers.push(item);
      else oddNumbers.push(item);
      sum += num;
    } else if (/^[a-zA-Z]+$/.test(item)) {
      alphabets.push(item.toUpperCase());
    } else {
      specialChars.push(item);
    }
  });

  const concatString = alphabets
    .join("")
    .split("")
    .reverse()
    .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");

  res.json({
    is_success: true,
    user_id: "tushar_noonia_29062004",
    email: "tusharnoonia123@gmail.com",
    roll_number: "22BCE1998",
    even_numbers: evenNumbers,
    odd_numbers: oddNumbers,
    alphabets,
    special_characters: specialChars,
    sum,
    concat_string: concatString,
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
