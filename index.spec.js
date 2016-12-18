var mockery = require('mockery');

describe('index', function() {
  var mockNodeSchedule,
      spyOnMockSlackNotify,
      spyOnScheduleJob,
      spyOnSlackNotifySend;

  beforeEach(function() {
    var date = new Date(2015, 9, 4);

    jasmine.clock().install();

    jasmine.clock().mockDate(date);

    spyOnScheduleJob = jasmine
      .createSpy('nodeSchedule.scheduleJob')
      .and.callFake(function(cron, callback) {
        callback();
      });

    spyOnSlackNotifySend = jasmine
      .createSpy('slackNotify.send');

    spyOnMockSlackNotify = jasmine
      .createSpy('slackNotify')
      .and.returnValue({send: spyOnSlackNotifySend});

    mockNodeSchedule = {scheduleJob: spyOnScheduleJob};

    mockery.enable({
      useCleanCache: true,
      warnOnUnregistered: false
    });

    mockery.registerMock('node-schedule', mockNodeSchedule);
    mockery.registerMock('slack-notify', spyOnMockSlackNotify);

    require('./index.js');
  });

  afterEach(function() {
    jasmine.clock().uninstall();

    mockery.disable();

    mockery.deregisterAll();
  });

  describe('node-schedule', function() {
    it('should be set up', function() {
      expect(spyOnScheduleJob)
        .toHaveBeenCalledWith(jasmine.any(String), jasmine.any(Function));
    });
  });

  describe('slack-notify', function() {
    it('should be set up', function() {
      expect(spyOnMockSlackNotify)
        .toHaveBeenCalled();
    });

    it('should send a message', function() {
      expect(spyOnSlackNotifySend)
        .toHaveBeenCalledWith({
          channel: jasmine.any(String),
          icon_url: jasmine.any(String),
          text: jasmine.stringMatching('2015-10-04'),
          unfurl_links: jasmine.any(Boolean),
          username: jasmine.any(String)
        });
    });
  });
});
