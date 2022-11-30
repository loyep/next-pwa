const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  dynamicStartUrl: true, // this is same as default value
  dynamicStartUrlRedirect: "/login", // recommend to config this for best user experience if your start-url redirects on first load
});

module.exports = withPWA();
