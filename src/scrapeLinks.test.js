import scrapeLinks from "./scrapeLinks";

const markdownString = `
Markdown example with a [link to Google](https://www.google.com), one [with a URL path](https://www.google.com/nested/page.html), and others:

- One [to reddit](www.reddit.com)
- A fourth [to Facebook](facebook.com) (incomplete URLs)

There's also some blank lines, misc. text, and <span>HTML</span> code.
`;

const plaintextString = `
This string is plaintext, with links like https://www.google.com and https://www.google.com/nested/page.html

I can scrape "https://reddit.com/r/subreddit" and (https://facebook.com) as well!

The new regex can pull www.youtube.com too!? Unfortunately, gmail.com is just too vague.
`;

const markdownTestResult = [
  "https://www.google.com",
  "https://www.google.com/nested/page.html",
  "www.reddit.com",
  "facebook.com",
];

const plaintextTestResult = [
  "https://www.google.com",
  "https://www.google.com/nested/page.html",
  "https://reddit.com/r/subreddit",
  "https://facebook.com",
  "www.youtube.com",
];

test("It scrapes from the markdown test string", () => {
  expect(
    scrapeLinks({
      filePath: "test.md",
      content: markdownString,
    })
  ).toEqual(markdownTestResult);
});

test("It scrapes from the markdown test split by newlines", () => {
  const splitTest = markdownString.split("\n");
  expect(
    scrapeLinks({
      filePath: "test.md",
      content: splitTest,
    })
  ).toEqual(markdownTestResult);
});

test("It scrapes absolute links from unrecognized extensions", () => {
  expect(
    scrapeLinks({
      filePath: "test",
      content: plaintextString,
    })
  ).toEqual(plaintextTestResult);
});
