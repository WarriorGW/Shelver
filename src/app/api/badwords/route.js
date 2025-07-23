// const BAD_WORDS = ["tonto", "idiota", "imbécil", "estúpido"];

// const CHAR_MAP = {
//   0: "o",
//   1: "i",
//   3: "e",
//   4: "a",
//   5: "s",
//   7: "t",
//   "@": "a",
//   $: "s",
//   "+": "t",
//   "¡": "i",
//   "|": "i",
//   "¡": "i",
//   ñ: "n",
// };

// function normalize(text) {
//   return text
//     .toLowerCase()
//     .normalize("NFD") // elimina tildes
//     .replace(/[\u0300-\u036f]/g, "") // elimina tildes
//     .split("")
//     .map((char) => CHAR_MAP[char] || char)
//     .join("");
// }

// function censorText(text) {
//   const normalizedText = normalize(text);
//   const matches = [];

//   BAD_WORDS.forEach((badWord) => {
//     const normBad = normalize(badWord);

//     let match;
//     let re = new RegExp(normBad, "gi");
//     while ((match = re.exec(normalizedText))) {
//       matches.push({
//         index: match.index,
//         length: badWord.length,
//       });
//     }
//   });

//   let censored = text.split("");
//   matches.forEach(({ index, length }) => {
//     for (let i = index; i < index + length && i < censored.length; i++) {
//       censored[i] = "*";
//     }
//   });

//   return {
//     hasProfanity: matches.length > 0,
//     censored: censored.join(""),
//   };
// }

// export async function POST(request) {
//   const { text } = await request.json();

//   if (typeof text !== "string") {
//     return Response.json({ error: "Texto inválido" }, { status: 400 });
//   }

//   const { hasProfanity, censored } = censorText(text);

//   return Response.json({ original: text, censored, hasProfanity });
// }

// src/pages/api/badwords.js (Next.js API Route)

const BAD_WORDS = [
  "bastardo",
  "boluda",
  "boludo",
  "cabron",
  "cabrón",
  "cagada",
  "capullo",
  "carajo",
  "chingada",
  "chingar",
  "chingona",
  "chingón",
  "chinga",
  "cojones",
  "coño",
  "culero",
  "culia",
  "culiao",
  "culpa",
  "estupido",
  "estúpido",
  "facha",
  "gilipollas",
  "hijo de puta",
  "hostia",
  "idiota",
  "imbecil",
  "imbécil",
  "jilipollas",
  "joder",
  "madre",
  "maldito",
  "malparido",
  "mamón",
  "maricon",
  "matate",
  "mierda",
  "mierdas",
  "pedo",
  "pelotuda",
  "pelotudo",
  "pendeja",
  "pendejo",
  "pene",
  "pinche",
  "pito",
  "polla",
  "puta",
  "puta madre",
  "puto",
  "tonta",
  "verga",
  "zorra",
  "zorete",
];

const CHAR_CLASSES = {
  a: "[a4@]",
  b: "[b8]",
  c: "[c]",
  d: "[d]",
  e: "[e3]",
  g: "[g9]",
  i: "[i1¡|]",
  l: "[l1|]",
  m: "[m]",
  n: "[n]",
  o: "[o0]",
  p: "[p]",
  q: "[q]",
  r: "[r]",
  s: "[s5$]",
  t: "[t7+]",
  u: "[u]",
  v: "[v]",
  x: "[x]",
  y: "[y]",
  z: "[z2]",
};

function createPattern(word) {
  return word
    .split("")
    .map((c) => CHAR_CLASSES[c.toLowerCase()] || c)
    .join("");
}

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function POST(request) {
  const { text } = await request.json();

  if (typeof text !== "string") {
    return new Response(JSON.stringify({ error: "Texto inválido" }), {
      status: 400,
      headers,
    });
  }

  let censored = text;
  let hasProfanity = false;

  BAD_WORDS.forEach((word) => {
    const pattern = createPattern(word);
    const regex = new RegExp(pattern, "gi");

    if (regex.test(censored)) {
      hasProfanity = true;
      censored = censored.replace(regex, (match) => "*".repeat(match.length));
    }
  });

  return new Response(
    JSON.stringify({ original: text, censored, hasProfanity }),
    {
      status: 200,
      headers,
    }
  );
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers,
  });
}
