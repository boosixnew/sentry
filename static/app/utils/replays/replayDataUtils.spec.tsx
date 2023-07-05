import {breadcrumbFactory} from 'sentry/utils/replays/replayDataUtils';

const fooSpan = TestStubs.ReplaySpanPayload({
  op: 'foo',
  data: {},
});
const lcpSpan = TestStubs.ReplaySpanPayload({
  op: 'largest-contentful-paint',
  data: {
    nodeId: 2,
  },
});
const navigateSpan = TestStubs.ReplaySpanPayload({
  op: 'navigation.navigate',
  description: 'http://test.com',
});

describe('breadcrumbFactory', () => {
  it('adds LCP as a breadcrumb', () => {
    const rawSpans = [fooSpan, lcpSpan];

    const results = breadcrumbFactory(
      TestStubs.Event({
        started_at: new Date(0),
      }),
      [],
      [],
      rawSpans
    );

    expect(results).toMatchInlineSnapshot(`
      [
        {
          "color": "gray300",
          "data": {
            "action": "replay-init",
            "label": "Start recording",
            "url": undefined,
          },
          "description": "Default",
          "id": 0,
          "level": "info",
          "message": undefined,
          "timestamp": "1970-01-01T00:00:00.000Z",
          "type": "init",
        },
        {
          "category": "default",
          "color": "purple300",
          "data": {
            "action": "largest-contentful-paint",
            "label": "LCP",
            "nodeId": 2,
          },
          "description": "Debug",
          "id": 1,
          "level": "info",
          "timestamp": "2017-10-17T02:41:20.000Z",
          "type": "debug",
        },
      ]
    `);
  });

  it('adds navigation as a breadcrumb', () => {
    const rawSpans = [fooSpan, navigateSpan];

    const results = breadcrumbFactory(
      TestStubs.Event({
        started_at: new Date(0),
      }),
      [],
      [],
      rawSpans
    );

    expect(results).toMatchInlineSnapshot(`
      [
        {
          "action": "navigate",
          "category": "default",
          "color": "green300",
          "data": {
            "label": "Page load",
            "to": "http://test.com",
          },
          "description": "Navigation",
          "id": 0,
          "level": "info",
          "message": "http://test.com",
          "timestamp": "2017-10-17T02:41:20.000Z",
          "type": "navigation",
        },
      ]
    `);
  });

  it('sorts breadcrumbs by timestamp', () => {
    const rawSpans = [
      TestStubs.ReplaySpanPayload({
        ...navigateSpan,
        endTimestamp: new Date(31),
        startTimestamp: new Date(30),
      }),
      TestStubs.ReplaySpanPayload({
        ...lcpSpan,
        endTimestamp: new Date(11),
        startTimestamp: new Date(10),
      }),
      TestStubs.ReplaySpanPayload({
        ...navigateSpan,
        endTimestamp: new Date(41),
        startTimestamp: new Date(40),
      }),
      TestStubs.ReplaySpanPayload({
        ...navigateSpan,
        endTimestamp: new Date(21),
        startTimestamp: new Date(20),
      }),
    ];

    const results = breadcrumbFactory(
      TestStubs.Event({
        started_at: new Date(0),
      }),
      [],
      [],
      rawSpans
    );

    function toTime(input: string | undefined) {
      return new Date(input || '').getTime();
    }

    expect(results).toHaveLength(4);
    expect(toTime(results[0].timestamp)).toBeLessThan(toTime(results[1].timestamp));
    expect(toTime(results[1].timestamp)).toBeLessThan(toTime(results[2].timestamp));
    expect(toTime(results[2].timestamp)).toBeLessThan(toTime(results[3].timestamp));
  });
});
