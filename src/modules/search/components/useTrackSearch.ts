import useYoutube from './useYoutube';

// const interleave = _f.pipe(
//   _f.zip,
//   _f.flatMap(_f.identity),
//   _f.filter<$Result>(Boolean)
// );
export default function useTrackSearch(search: string) {
  const youtubeResults = useYoutube(search);
  return youtubeResults;
  // const soundcloudResults = useSoundCloud(search);
  // return interleave(youtubeResults, soundcloudResults);
}
