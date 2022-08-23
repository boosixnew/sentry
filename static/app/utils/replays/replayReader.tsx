import type {Crumb} from 'sentry/types/breadcrumbs';
import {
  breadcrumbFactory,
  replayTimestamps,
  rrwebEventListFactory,
  spansFactory,
} from 'sentry/utils/replays/replayDataUtils';
import type {ChunkInvocation} from 'sentry/views/replays/detail/filesize/utils';
import type {
  MemorySpanType,
  RecordingEvent,
  ReplayCrumb,
  ReplayError,
  ReplayRecord,
  ReplaySpan,
} from 'sentry/views/replays/types';

interface ReplayReaderParams {
  breadcrumbs: ReplayCrumb[] | undefined;
  errors: ReplayError[] | undefined;

  /**
   * The root Replay event, created at the start of the browser session.
   */
  replayRecord: ReplayRecord | undefined;

  /**
   * The captured data from rrweb.
   * Saved as N attachments that belong to the root Replay event.
   */
  rrwebEvents: RecordingEvent[] | undefined;

  spans: ReplaySpan[] | undefined;
}

type RequiredNotNull<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

export default class ReplayReader {
  static factory({
    breadcrumbs,
    replayRecord,
    errors,
    rrwebEvents,
    spans,
  }: ReplayReaderParams) {
    if (!breadcrumbs || !replayRecord || !rrwebEvents || !spans || !errors) {
      return null;
    }

    return new ReplayReader({breadcrumbs, replayRecord, errors, rrwebEvents, spans});
  }

  private constructor({
    breadcrumbs,
    replayRecord,
    errors,
    rrwebEvents,
    spans,
  }: RequiredNotNull<ReplayReaderParams>) {
    // TODO(replays): We should get correct timestamps from the backend instead
    // of having to fix them up here.
    const {startTimestampMs, endTimestampMs} = replayTimestamps(
      rrwebEvents,
      breadcrumbs,
      spans
    );
    replayRecord.startedAt = new Date(startTimestampMs);
    replayRecord.finishedAt = new Date(endTimestampMs);

    this.spans = spansFactory(spans);
    this.breadcrumbs = breadcrumbFactory(replayRecord, errors, breadcrumbs, this.spans);

    this.rrwebEvents = rrwebEventListFactory(replayRecord, rrwebEvents);

    this.replayRecord = replayRecord;
  }

  private replayRecord: ReplayRecord;
  private rrwebEvents: RecordingEvent[];
  private breadcrumbs: Crumb[];
  private spans: ReplaySpan[];

  /**
   * @returns Duration of Replay (milliseonds)
   */
  getDurationMs = () => {
    return this.replayRecord.duration * 1000;
  };

  getReplay = () => {
    return this.replayRecord;
  };

  getRRWebEvents = () => {
    return this.rrwebEvents;
  };

  getRawCrumbs = () => {
    return this.breadcrumbs;
  };

  getRawSpans = () => {
    return this.spans;
  };

  isMemorySpan = (span: ReplaySpan): span is MemorySpanType => {
    return span.op === 'memory';
  };

  isNetworkSpan = (span: ReplaySpan) => {
    return !this.isMemorySpan(span) && !span.op.includes('paint');
  };

  getWebpackStatsFile() {
    return {};
  }

  getChunkInvocationsByTxn(): ChunkInvocation[] {
    const data = {
      '/organizations/:orgId/replays/': {},
      '/organizations/:orgId/replays/:replayId/': {
        './app/views/app/index.tsx': 2,
        './app/views/app/systemAlerts.tsx': 2,
        './app/views/onboarding/targetedOnboarding/utils.tsx': 2,
        './app/views/organizationContextContainer.tsx': 2,
        './app/views/organizationDetails/index.tsx': 2,
        './app/views/projects/redirectDeprecatedProjectRoute.tsx': 3,
        './app/views/replays/detail/breadcrumbs/index.tsx': 4,
        './app/views/replays/detail/console/index.tsx': 5,
        './app/views/replays/detail/console/utils.tsx': 5,
        './app/views/replays/detail/filesize/index.tsx': 3,
        './app/views/replays/detail/focusArea.tsx': 16,
        './app/views/replays/detail/focusTabs.tsx': 16,
        './app/views/replays/detail/layout/chooseLayout.tsx': 16,
        './app/views/replays/detail/layout/fluidPanel.tsx': 18,
        './app/views/replays/detail/layout/index.tsx': 16,
        './app/views/replays/detail/layout/splitPanel.tsx': 16,
        './app/views/replays/detail/layout/utils.tsx': 32,
        './app/views/replays/detail/network/utils.tsx': 3,
        './app/views/replays/detail/page.tsx': 16,
        './app/views/replays/detail/replayMetaData.tsx': 16,
        './app/views/replays/details.tsx': 10,
      },
    };

    return Object.entries(data).flatMap(([transaction, files]) => {
      return Object.entries(files).flatMap(([filename, size]) => {
        return {
          filename,
          size,
          transaction,
        };
      });
    });
  }
}
