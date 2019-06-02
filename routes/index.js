var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');
const puppeteerUtil = require('../util/puppeteerUtil');
const authLib = require('../lib/authLib');
const applicationsLib = require('../lib/applicationsLib');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/applications/get', async (req, res) => {
  const {
    username,
    password,
  } = req.body;
  let {
    selectedTerm,
  } = req.body;

  if (!username || !password) {
    return res.json({
      status: 'Error',
      message: 'Missing username or password',
    });
  }

  if (!selectedTerm) {
    const now = new Date();
    const termNum = 411 + 3 * (now.getFullYear() - 2018) +
      Math.floor((now.getMonth()) / 4);
    selectedTerm = termNum.toString();
  }

  const browser = await puppeteer.launch(puppeteerUtil.getLaunchFlags());

  try {
    const page = await browser.newPage();

    try {
      await authLib.login(page, username, password);
    } catch (error) {
      return res.json({
        status: 'Error',
        message: 'Failed to login',
      });
    }

    const {
      jobIds,
      jobs,
    } = await applicationsLib.getApplications(page, selectedTerm);

    return res.json({
      status: 'OK',
      jobIds: jobIds,
      jobs: jobs,
    });
  } catch (error) {
    return res.json({
      status: 'Error',
      message: 'An unknown error occurred',
      error: error.message,
    });
  } finally {
    await browser.close();
  }
});


module.exports = router;
