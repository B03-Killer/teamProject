'use client';

import {
  FocusLayout,
  GridLayout,
  ParticipantClickEvent,
  ParticipantTile,
  TrackReferenceOrPlaceholder,
  useTracks
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import { useEffect, useState } from 'react';
import BottomControlBar from '../BottomControlBar';
import VideoChannelHeader from '../VideoChannelHeader';

const CustomVideoConference = () => {
  const [focusedTrack, setFocusedTrack] = useState<TrackReferenceOrPlaceholder | null>();
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false }
    ],
    { onlySubscribed: false }
  );
  const speakerTrackRef = tracks.find((track) => track.participant.isSpeaking);
  const screenShareTrackRef = useTracks([Track.Source.ScreenShare])[0];

  useEffect(() => {
    if (screenShareTrackRef) {
      setFocusedTrack(screenShareTrackRef);
    } else {
      setFocusedTrack(null);
    }
  }, [screenShareTrackRef]);

  useEffect(() => {
    if (screenShareTrackRef) return;
    if (speakerTrackRef) {
      setFocusedTrack(speakerTrackRef);
    }
  }, [speakerTrackRef]);

  const clickFocus = (e: ParticipantClickEvent) => {
    setFocusedTrack({
      participant: e.participant,
      publication: e.participant.getTrackPublication(e.track!.source),
      source: e.track!.source
    });
  };

  return (
    <>
      <VideoChannelHeader />
      <div className="flex flex-col items-center gap-2 h-[80vh] p-3">
        <div className="flex p-4 h-full items-center">
          <div className={`${focusedTrack ? 'sm:w-[full] m-5' : 'none'} rounded-lg overflow-hidden mr-5`}>
            {focusedTrack && <FocusLayout trackRef={focusedTrack} className="fixed left-0 " />}
          </div>
          <div className={`${focusedTrack ? 'hidden md:block w-[300px]' : 'w-full'} h-full`}>
            <GridLayout tracks={tracks} style={{ height: 'calc(50vh 50vw - var(--lk-control-bar-height))' }}>
              <ParticipantTile onParticipantClick={clickFocus} />
            </GridLayout>
          </div>
        </div>
        <BottomControlBar controls={{ microphone: true, camera: true, screenShare: true }} variation="verbose" />
      </div>
    </>
  );
};

export default CustomVideoConference;
