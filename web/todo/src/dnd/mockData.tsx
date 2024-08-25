import { colors } from "@atlaskit/theme";
import finnImg from "./static/finn-min.png";
import bmoImg from "./static/bmo-min.png";
import princessImg from "./static/princess-min.png";
import jakeImg from "./static/jake-min.png";

const toDO = {
  id: "1",
  name: "To Do",
  url: "http://adventuretime.wikia.com/wiki/Jake",
  avatarUrl: jakeImg,
  colors: {
    soft: colors.Y50,
    hard: colors.B100
  }
};

const isDoing = {
  id: "2",
  name: "is Doing",
  url: "http://adventuretime.wikia.com/wiki/BMO",
  avatarUrl: bmoImg,
  colors: {
    soft: colors.G50,
    hard: colors.N400A
  }
};

const done = {
  id: "3",
  name: "Done",
  url: "http://adventuretime.wikia.com/wiki/Finn",
  avatarUrl: finnImg,
  colors: {
    soft: colors.B50,
    hard: colors.DN60
  }
};


export const authors = [toDO, isDoing, done];

export const quotes = [
  {
    id: "1",
    content: "Sometimes life is scary and dark",
    author: toDO
  },
  {
    id: "2",
    content:
      "Sucking at something is the first step towards being sorta good at something.",
    author: isDoing
  },
  {
    id: "3",
    content: "You got to focus on what's real, man",
    author: isDoing
  },
  {
    id: "4",
    content: "Is that where creativity comes from? From sad biz?",
    author: done
  },
  {
    id: "5",
    content: "Homies help homies. Always",
    author: done
  },
  
  {
    id: "8",
    content:
      "People make mistakes. It's all a part of growing up and you never really stop growing",
    author: done
  },
  {
    id: "9",
    content: "Don't you always call sweatpants 'give up on life pants,' Jake?",
    author: done
  },
 
 
];

// So we do not have any clashes with our hardcoded ones
let idCount = quotes.length + 1;

export const getQuotes = (count) =>
  Array.from({ length: count }, (v, k) => k).map(() => {
    const random = quotes[Math.floor(Math.random() * quotes.length)];

    const custom = {
      ...random,
      id: `G${idCount++}`
    };

    return custom;
  });

export const getAuthors = (count) =>
  Array.from({ length: count }, (v, k) => k).map(() => {
    const random = authors[Math.floor(Math.random() * authors.length)];

    const custom = {
      ...random,
      id: `author-${idCount++}`
    };

    return custom;
  });

const getByAuthor = (author, items) =>
  items.filter((quote) => quote.author === author);

export const authorQuoteMap: QuoteMap = authors.reduce(
  (previous, author) => ({
    ...previous,
    [author.name]: getByAuthor(author, quotes)
  }),
  {}
);

export const generateQuoteMap = (quoteCount) =>
  authors.reduce(
    (previous, author) => ({
      ...previous,
      [author.name]: getQuotes(quoteCount / authors.length)
    }),
    {}
  );
