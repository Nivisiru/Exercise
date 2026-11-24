const express = require('express');
const ExpressError = require('./expressError');
const { parseNums, findMode, findMean, findMedian } = require('./helpers');

const app = express();

/** Middleware: parse and validate ?nums=..., storing the result on req.nums */
function requireNums(req, res, next) {
  try {
    req.nums = parseNums(req.query.nums);
    return next();
  } catch (err) {
    return next(err);
  }
}

app.get('/mean', requireNums, function (req, res) {
  return res.json({ operation: 'mean', value: findMean(req.nums) });
});

app.get('/median', requireNums, function (req, res) {
  return res.json({ operation: 'median', value: findMedian(req.nums) });
});

app.get('/mode', requireNums, function (req, res) {
  return res.json({ operation: 'mode', value: findMode(req.nums) });
});

app.get('/all', requireNums, function (req, res) {
  return res.json({
    operation: 'all',
    mean: findMean(req.nums),
    median: findMedian(req.nums),
    mode: findMode(req.nums),
  });
});

/** 404 handler */
app.use(function (req, res, next) {
  return next(new ExpressError('Not Found', 404));
});

/** general error handler */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  if (status === 500) console.error(err.stack);

  return res.status(status).json({
    error: { message: err.message, status },
  });
});

app.listen(3000, function () {
  console.log('Server starting on port 3000');
});
