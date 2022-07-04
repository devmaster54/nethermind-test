async function runInParallel(
  urls: string[],
  concurrency: number
): Promise<string[]> {
  function chunkArrayInGroups<T>(arr: T[], size: number): T[][] {
    const myArray: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      myArray.push(arr.slice(i, i + size));
    }
    return myArray;
  }

  const urlChunks = chunkArrayInGroups(urls, concurrency);

  let responsTexts: string[] = [];
  for (let i = 0; i < urlChunks.length; i += 1) {
    const _urls = urlChunks[i];
    const responses = await Promise.all(
      _urls.map((url) => fetch(url).then((res) => res.text()))
    );
    responsTexts = responsTexts.concat(responses);
  }

  return responsTexts;
}
