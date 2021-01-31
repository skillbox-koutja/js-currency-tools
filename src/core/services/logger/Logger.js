const logger = ({ level = 'log', msg = '', debug = null }) => {
  const message = msg ? [msg] : [];
  if (debug) {
    message.push(debug);
  }

  if (Object.prototype.hasOwnProperty.call(console, level)) {
    console[level].apply(console, [...message]);
  } else {
    console.warn(`unknown log level "${level}`);
    console.log.apply(console, [...message]);
  }
};

export default logger;
