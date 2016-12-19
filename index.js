var schedule = require('node-schedule'),
    slackNotify = require('slack-notify');

/**
 * @name getSlackOptions
 * @description Returns options that are necessary to send a Slack message
 *              Formats text to include current date in ISO8601 format
 * @returns {Object} Options to send a Slack message
 */
function getSlackOptions() {
  var channel = 'dilbert',
      comicUrl = 'http://dilbert.com/',
      iconUrl = 'http://i.imgur.com/lHQJDMj.png',
      unfurlLinks = true,
      username = 'Dilbert';

  return {
    channel: channel,
    icon_url: iconUrl,
    text: [comicUrl, (new Date()).toISOString().substring(0, 10)].join(''),
    unfurl_links: unfurlLinks,
    username: username
  };
}

/**
 * @name Send
 * @description Sends a message to Slack with options
 */
function send() {
  var options = getSlackOptions(),
      slack = slackNotify(process.env.SLACK_WEBHOOK_URL);

  slack.send(options);
}

// Sends a message daily at 15:00 UTC
schedule.scheduleJob('0 15 * * *', send);
